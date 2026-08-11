// ============================================================
//  server/db.ts — Conexão com MongoDB Atlas
//  ============================================================
//  Mantém uma única conexão reutilizável (connection pooling).
//  A connection string vem do arquivo .env (variável MONGODB_URI).
// ============================================================

import { MongoClient, Db } from 'mongodb';
import 'dotenv/config';

// ── CONFIGURAÇÕES ──────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = 'cha-panela'; // Nome do banco de dados no Atlas

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI não definida no arquivo .env!');
  console.error('   Copie .env.example para .env e preencha com seus dados.');
  process.exit(1);
}

// ── SINGLETON DE CONEXÃO ────────────────────────────────────
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) {
    return db; // Reutiliza conexão existente
  }

  try {
    console.log('🔗 Conectando ao MongoDB Atlas...');
    client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      tls: true,
    });

    await client.connect();
    db = client.db(DB_NAME);

    console.log(`✅ Conectado ao MongoDB Atlas — banco: ${DB_NAME}`);
    return db;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('🔌 Conexão com MongoDB encerrada.');
  }
}

// Nome das coleções
export const COLLECTION_PRESENTES = 'presentes';
export const COLLECTION_RESERVATIONS = 'reservations';
