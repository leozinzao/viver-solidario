
import * as eventService from "../services/eventService.js";

// Controlador para eventos
export const listEvents = async(_req, res) => {
    try {
        const events = await eventService.findAllEvents();
        res.json(events);
    } catch (error) {
        console.error("Erro ao listar eventos:", error);
        res.status(500).json({ msg: "Erro ao listar eventos" });
    }
};

export const getEvent = async(req, res) => {
    try {
        const { id } = req.params;
        const event = await eventService.findEventById(id);
        
        if (!event) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }
        
        res.json(event);
    } catch (error) {
        console.error("Erro ao buscar evento:", error);
        res.status(500).json({ msg: "Erro ao buscar evento" });
    }
};

export const createEvent = async(req, res) => {
    try {
        const { titulo, resumo, link, data_inicio, data_fim } = req.body;
        const newEvent = await eventService.insertEvent({ 
            titulo, resumo, link, data_inicio, data_fim 
        });
        
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        res.status(500).json({ msg: "Erro ao criar evento" });
    }
};

export const updateEvent = async(req, res) => {
    try {
        const { id } = req.params;
        const { titulo, resumo, link, data_inicio, data_fim } = req.body;
        
        const updatedEvent = await eventService.modifyEvent(id, { 
            titulo, resumo, link, data_inicio, data_fim 
        });
        
        if (!updatedEvent) {
            return res.status(404).json({ msg: "Evento não encontrado" });
        }
        
        res.json(updatedEvent);
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({ msg: "Erro ao atualizar evento" });
    }
};

export const deleteEvent = async(req, res) => {
    try {
        const { id } = req.params;
        await eventService.removeEvent(id);
        res.sendStatus(204);
    } catch (error) {
        console.error("Erro ao excluir evento:", error);
        res.status(500).json({ msg: "Erro ao excluir evento" });
    }
};
