// ============================================================
//  server/index.ts — Servidor Express Principal
//  ============================================================
//  Inicia o servidor HTTP e conecta ao MongoDB Atlas.
//  Porta padrão: 3001 (configurável pelo .env)
// ============================================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, closeDB } from './db';
import presentesRouter from './routes/presentes';
import adminRouter from './routes/admin';

const app = express();
const PORT = parseInt(process.env.PORT || '3001');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ── MIDDLEWARES ────────────────────────────────────────────
app.use(express.json());

// CORS — permite apenas o frontend
app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ── ROTAS ─────────────────────────────────────────────────
app.use('/api/presentes', presentesRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Chá de Panela API',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada.' });
});

// ── INICIALIZAÇÃO ──────────────────────────────────────────
async function start() {
  try {
    // Conecta ao MongoDB antes de aceitar requisições
    await connectDB();

    app.listen(PORT, () => {
      console.log('');
      console.log('🌸 ══════════════════════════════════════ 🌸');
      console.log('   Chá de Panela — API Server');
      console.log(`   🚀 Rodando em: http://localhost:${PORT}`);
      console.log(`   📋 Presentes:  http://localhost:${PORT}/api/presentes`);
      console.log(`   ❤️  Health:     http://localhost:${PORT}/api/health`);
      console.log('🌸 ══════════════════════════════════════ 🌸');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

start();
