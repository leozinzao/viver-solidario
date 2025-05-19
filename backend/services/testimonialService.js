import * as testimonialModel from "../models/testimonialModel.js";

// Buscar todos os depoimentos com paginação
export const findAllTestimonials = async(page = 1, pageSize = 10) => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;
    const testimonials = await testimonialModel.findAll(limit, offset);
    const total = await testimonialModel.count();
    return {
        testimonials,
        pagination: {
            total,
            page,
            pageSize,
            pages: Math.ceil(total / pageSize)
        }
    };
};

// Buscar depoimento por ID
export const findTestimonialById = async(id) => {
    return await testimonialModel.findById(id);
};

// Criar novo depoimento
export const createTestimonial = async(testimonialData) => {
    return await testimonialModel.create(testimonialData);
};

// Atualizar depoimento
export const updateTestimonial = async(id, testimonialData) => {
    return await testimonialModel.update(id, testimonialData);
};

// Remover depoimento
export const deleteTestimonial = async(id) => {
    return await testimonialModel.remove(id);
};

// Publicar/despublicar depoimento
export const toggleTestimonialPublished = async(id, published) => {
    return await testimonialModel.update(id, { publicado: published });
};