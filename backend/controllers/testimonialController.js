
import * as testimonialService from "../services/testimonialService.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { ApiError } from "../utils/errorMiddleware.js";

export const getTestimonials = async(req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        
        const result = await testimonialService.findAllTestimonials(page, pageSize);
        
        return ApiResponse.success(res, result);
    } catch (error) {
        next(error);
    }
};

export const getTestimonial = async(req, res, next) => {
    try {
        const { id } = req.params;
        const testimonial = await testimonialService.findTestimonialById(id);
        
        if (!testimonial) {
            throw ApiError.notFound("Depoimento não encontrado");
        }
        
        return ApiResponse.success(res, testimonial);
    } catch (error) {
        next(error);
    }
};

export const createTestimonial = async(req, res, next) => {
    try {
        const { titulo, conteudo, autor_nome, autor_cargo, publicado } = req.body;
        
        // Validação básica
        if (!titulo || !conteudo || !autor_nome) {
            throw ApiError.badRequest("Campos obrigatórios: titulo, conteudo, autor_nome");
        }
        
        const newTestimonial = await testimonialService.createTestimonial({ 
            titulo, 
            conteudo, 
            autor_nome, 
            autor_cargo, 
            publicado 
        });
        
        return ApiResponse.success(res, newTestimonial, 201);
    } catch (error) {
        next(error);
    }
};

export const updateTestimonial = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { titulo, conteudo, autor_nome, autor_cargo, publicado } = req.body;
        
        const updatedTestimonial = await testimonialService.updateTestimonial(id, { 
            titulo, 
            conteudo, 
            autor_nome, 
            autor_cargo, 
            publicado 
        });
        
        if (!updatedTestimonial) {
            throw ApiError.notFound("Depoimento não encontrado");
        }
        
        return ApiResponse.success(res, updatedTestimonial);
    } catch (error) {
        next(error);
    }
};

export const deleteTestimonial = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await testimonialService.deleteTestimonial(id);
        
        if (!result) {
            throw ApiError.notFound("Depoimento não encontrado");
        }
        
        return ApiResponse.noContent(res);
    } catch (error) {
        next(error);
    }
};

export const togglePublishStatus = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { publicado } = req.body;
        
        if (publicado === undefined) {
            throw ApiError.badRequest("O campo 'publicado' é obrigatório");
        }
        
        const result = await testimonialService.toggleTestimonialPublished(id, publicado);
        
        if (!result) {
            throw ApiError.notFound("Depoimento não encontrado");
        }
        
        return ApiResponse.success(res, result);
    } catch (error) {
        next(error);
    }
};
