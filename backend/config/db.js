import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
    // Conecta ao banco de dados utilizando a connection string definida no seu .env (schema configurado, conforme o projeto Viver Solidário)
const sql = postgres(connectionString)

export default sql