import { supabase } from '../config/supabase.js';

export const getUsers = async(req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};

export const listVoluntarios = async(req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('perfil', 'voluntario'); // ajuste o campo conforme seu schema

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
};