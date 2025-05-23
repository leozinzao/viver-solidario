import postgres from 'postgres';

// Carrega a string de conexão do arquivo .env
const connectionString = process.env.DATABASE_URL;

// Verifica se a variável DATABASE_URL está definida
if (!connectionString) {
    throw new Error('A variável de ambiente DATABASE_URL não está definida no arquivo .env');
}

// Inicializa a conexão com o banco de dados
const sql = postgres(connectionString, {
    ssl: { rejectUnauthorized: false }, // Configuração SSL necessária para Supabase
});

// Exporta a conexão
export default sql;