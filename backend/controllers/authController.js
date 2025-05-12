// backend/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as User from "../models/userModel.js";

const jwtSecret = process.env.JWT_SECRET;

export const register = async(req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) return res.status(400).json({ msg: "Campos obrigatórios" });

        const exists = await User.findByEmail(email);
        if (exists) return res.status(409).json({ msg: "Usuário já existe" });

        const hash = await bcrypt.hash(senha, 10);
        const user = await User.create({ nome, email, hash });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

export const login = async(req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ msg: "Credenciais inválidas" });

        const ok = await bcrypt.compare(senha, user.senha_hash);
        if (!ok) return res.status(401).json({ msg: "Credenciais inválidas" });

        const token = jwt.sign({ sub: user.id, role: "internal" }, // ajuste role conforme regra
            jwtSecret, { expiresIn: "12h" }
        );

        res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};