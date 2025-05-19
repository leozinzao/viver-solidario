import * as testimonialService from "../services/testimonialService.js";

// Buscar todos os depoimentos com paginação
export const getAllTestimonials = async(req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    try {
        const result = await testimonialService.findAllTestimonials(Number(page), Number(pageSize));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTestimonialById = async(req, res) => {
    try {
        const testimonial = await testimonialService.findTestimonialById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Depoimento não encontrado" });
        }
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTestimonial = async(req, res) => {
    try {
        const testimonial = await testimonialService.createTestimonial(req.body);
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTestimonial = async(req, res) => {
    try {
        const testimonial = await testimonialService.updateTestimonial(req.params.id, req.body);
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTestimonial = async(req, res) => {
    try {
        await testimonialService.deleteTestimonial(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};