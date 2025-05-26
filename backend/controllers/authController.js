import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "../config/db.js";

// Função de registro de usuário
export const register = async(req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        // Validação básica
        if (!nome || !email || !senha || !perfil) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Verifica se o e-mail já está cadastrado
        const [existingUser] = await sql `SELECT id FROM users WHERE email = ${email}`;
        if (existingUser) {
            return res.status(409).json({ message: "Este e-mail já está cadastrado." });
        }

        // Hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Define aprovação com base no perfil
        const aprovado = perfil === "volunteer" ? false : true;

        // Insere o usuário
        await sql `
            INSERT INTO users (nome, email, senha, perfil, aprovado)
            VALUES (${nome}, ${email}, ${senhaHash}, ${perfil}, ${aprovado})
        `;

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
};

// Função de login de usuário
export const login = async(req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        const [user] = await sql `SELECT * FROM users WHERE email = ${email}`;
        if (!user) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        // Se voluntário não aprovado, bloqueia acesso
        if (user.perfil === "volunteer" && !user.aprovado) {
            return res.status(403).json({ message: "Seu cadastro de voluntário aguarda aprovação de um administrador." });
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: "Usuário ou senha inválidos." });
        }

        // Gera token JWT
        const token = jwt.sign({ id: user.id, email: user.email, perfil: user.perfil },
            process.env.JWT_SECRET, { expiresIn: "2h" }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil,
                aprovado: user.aprovado // importante para UI!
            }
        });
    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ message: "Erro ao realizar login." });
    }
};

// Verifica o token atual (usada para autenticação persistente)
export const verifyCurrentToken = async(req, res) => {
    // Se chegou aqui, o token já foi validado pelo middleware
    res.status(200).json({ message: "Token válido!", user: req.user });
};