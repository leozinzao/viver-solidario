
import * as userService from "../services/userService.js";

export const listVoluntarios = async(_req, res) => {
    try {
        const voluntarios = await userService.findAllVoluntarios();
        res.json(voluntarios);
    } catch (error) {
        console.error("Erro ao listar voluntários:", error);
        res.status(500).json({ msg: "Erro ao listar voluntários" });
    }
};
