
import * as testimonialModel from "../models/testimonialModel.js";

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

export const findTestimonialById = async(id) => {
    return await testimonialModel.findById(id);
};

export const createTestimonial = async(testimonialData) => {
    return await testimonialModel.create(testimonialData);
};

export const updateTestimonial = async(id, testimonialData) => {
    return await testimonialModel.update(id, testimonialData);
};

export const deleteTestimonial = async(id) => {
    return await testimonialModel.remove(id);
};

export const toggleTestimonialPublished = async(id, published) => {
    return await testimonialModel.update(id, { publicado: published });
};
