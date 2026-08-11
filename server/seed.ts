// ============================================================
//  server/seed.ts — Seed inicial dos presentes no MongoDB
//  ============================================================
//  Execute este script UMA VEZ para popular o banco com os
//  presentes do config. Após isso, use a API normalmente.
//
//  Comando:
//    npm run seed
// ============================================================

import 'dotenv/config';
import { connectDB, closeDB, COLLECTION_PRESENTES, COLLECTION_RESERVATIONS } from './db';
import { conviteConfig } from '../src/config/convite';

async function seed() {
  console.log('🌱 Iniciando seed dos presentes...');

  const db = await connectDB();
  const collection = db.collection(COLLECTION_PRESENTES);

  // Verifica se já existe dados
  const count = await collection.countDocuments();

  if (count > 0) {
    console.log(`⚠️  Coleção já tem ${count} presentes. Deseja sobrescrever? (Ctrl+C para cancelar)`);
    await new Promise((r) => setTimeout(r, 3000)); // Pausa de 3s para cancelar
    await collection.deleteMany({});
    console.log('🗑️  Presentes anteriores removidos.');
  }

  // Zera também as reservas
  await db.collection(COLLECTION_RESERVATIONS).deleteMany({});
  console.log('🗑️  Reservas anteriores removidas.');

  // Insere os presentes do config
  const presentesParaSalvar = conviteConfig.presentes.map((p) => {
    // Para remover a prop escolhido se ainda estiver lá
    const { escolhido, escolhidoPor, ...rest } = p as any; 
    return {
      ...rest,
      maxQuantity: rest.maxQuantity || 1,
      activeReservationsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  await collection.insertMany(presentesParaSalvar);

  console.log(`✅ ${presentesParaSalvar.length} presentes inseridos com sucesso!`);
  console.log('📋 Presentes:', presentesParaSalvar.map((p) => `  - ${p.nome}`).join('\n'));

  await closeDB();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});
