
import bcrypt from "bcrypt";
import * as User from "../models/userModel.js";

export const getProfile = async(req, res) => {
    try {
        const userId = req.user.sub;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        
        // Only return safe fields
        res.json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role || "donor",
            theme: user.theme || "light"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

export const updateProfile = async(req, res) => {
    try {
        const userId = req.user.sub;
        const { nome, email, theme } = req.body;
        
        // Update only the fields that were provided
        const updatedUser = await User.updateProfile(userId, { nome, email, theme });
        
        if (!updatedUser) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        
        res.json({
            id: updatedUser.id,
            nome: updatedUser.nome,
            email: updatedUser.email,
            role: updatedUser.role,
            theme: updatedUser.theme
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};

export const updatePassword = async(req, res) => {
    try {
        const userId = req.user.sub;
        const { currentPassword, newPassword } = req.body;
        
        // Validate required fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ msg: "Senha atual e nova senha são obrigatórias" });
        }
        
        // Get user to verify current password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        
        // Verify current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.senha_hash);
        if (!passwordMatch) {
            return res.status(401).json({ msg: "Senha atual incorreta" });
        }
        
        // Hash new password
        const hash = await bcrypt.hash(newPassword, 10);
        
        // Update password
        await User.updatePassword(userId, hash);
        
        res.json({ msg: "Senha atualizada com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Erro no servidor" });
    }
};
