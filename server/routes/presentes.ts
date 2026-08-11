// ============================================================
//  server/routes/presentes.ts — API de Presentes
//  ============================================================
//  Rotas:
//    GET  /api/presentes          → lista todos os presentes
//    GET  /api/presentes/:id      → busca um presente por ID
//    POST /api/presentes/:id/reservar → reserva um presente
//    POST /api/presentes/reset     → (dev) reseta todas as reservas
// ============================================================

import { Router, Request, Response } from 'express';
import { connectDB, COLLECTION_PRESENTES, COLLECTION_RESERVATIONS } from '../db';
import { ObjectId } from 'mongodb';

const router = Router();

// ── GET /api/presentes — Lista todos ──────────────────────
router.get('/', async (_req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const presentesRaw = await db
      .collection(COLLECTION_PRESENTES)
      .find({}, { projection: { _id: 0 } }) // Não expõe o _id interno
      .sort({ id: 1 })
      .toArray();

    // Remove informações administrativas e calcula 'esgotado'
    const presentes = presentesRaw.map((p) => {
      const { maxQuantity, activeReservationsCount, ...safeData } = p;
      return {
        ...safeData,
        esgotado: activeReservationsCount >= maxQuantity
      };
    });

    res.json({ success: true, data: presentes });
  } catch (error) {
    console.error('GET /presentes error:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar presentes.' });
  }
});

// ── GET /api/presentes/:id — Busca um presente ────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'ID inválido.' });
      return;
    }

    const db = await connectDB();
    const presente = await db
      .collection(COLLECTION_PRESENTES)
      .findOne({ id }, { projection: { _id: 0 } });

    if (!presente) {
      res.status(404).json({ success: false, error: 'Presente não encontrado.' });
      return;
    }

    const { maxQuantity, activeReservationsCount, ...safeData } = presente;
    
    res.json({ 
      success: true, 
      data: {
        ...safeData,
        esgotado: activeReservationsCount >= maxQuantity
      } 
    });
  } catch (error) {
    console.error('GET /presentes/:id error:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar presente.' });
  }
});

// ── POST /api/presentes/:id/reservar — Reserva ──────────
router.post('/:id/reservar', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { guestName } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ success: false, error: 'ID inválido.' });
      return;
    }

    if (!guestName || typeof guestName !== 'string' || guestName.trim().length < 2) {
      res.status(400).json({ success: false, error: 'Nome do convidado inválido.' });
      return;
    }

    const db = await connectDB();
    const collectionPresentes = db.collection(COLLECTION_PRESENTES);
    const collectionReservations = db.collection(COLLECTION_RESERVATIONS);

    // 1. Busca o presente para validar e obter maxQuantity
    const presente = await collectionPresentes.findOne({ id });

    if (!presente) {
      res.status(404).json({ success: false, error: 'Presente não encontrado.' });
      return;
    }

    // 2. Proteção de concorrência: tenta incrementar activeReservationsCount apenas se for menor que maxQuantity
    const result = await collectionPresentes.findOneAndUpdate(
      { 
        id, 
        $expr: { $lt: ["$activeReservationsCount", "$maxQuantity"] } 
      },
      {
        $inc: { activeReservationsCount: 1 },
        $set: { updatedAt: new Date() }
      },
      { returnDocument: 'after', projection: { _id: 0 } }
    );

    if (!result) {
      // Falhou porque o limite já foi atingido
      res.status(409).json({
        success: false,
        error: 'Este presente não está mais disponível para seleção. Por favor, escolha outro presente.',
      });
      return;
    }

    // 3. Sucesso no incremento! Agora insere a reserva no histórico.
    const reservation = {
      giftId: id,
      guestName: guestName.trim(),
      status: 'RESERVED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const insertResult = await collectionReservations.insertOne(reservation);

    const reservationData = {
      id: insertResult.insertedId.toString(),
      ...reservation
    };

    console.log(`💗 Presente #${id} (${presente.nome}) reservado por ${reservationData.guestName}!`);
    res.json({ success: true, data: reservationData, message: 'Presente reservado com sucesso!' });

  } catch (error) {
    console.error('POST /presentes/:id/reservar error:', error);
    res.status(500).json({ success: false, error: 'Erro ao reservar presente.' });
  }
});

// ── POST /api/presentes/reset — Reset (somente desenvolvimento)
router.post('/reset', async (req: Request, res: Response) => {
  // Protege em produção
  if (process.env.NODE_ENV === 'production') {
    res.status(403).json({ success: false, error: 'Não disponível em produção.' });
    return;
  }

  try {
    const db = await connectDB();
    
    // Reseta contadores nos presentes
    await db.collection(COLLECTION_PRESENTES).updateMany(
      {},
      {
        $set: {
          activeReservationsCount: 0,
          updatedAt: new Date(),
        },
      }
    );

    // Apaga todas as reservas
    await db.collection(COLLECTION_RESERVATIONS).deleteMany({});

    console.log('🔄 Todas as reservas foram resetadas.');
    res.json({ success: true, message: 'Todas as reservas foram resetadas.' });
  } catch (error) {
    console.error('POST /reset error:', error);
    res.status(500).json({ success: false, error: 'Erro ao resetar presentes.' });
  }
});

// ── ROTAS ADMINISTRATIVAS ───────────────────────────────────

// Middleware de Autenticação para Admin
router.use('/admin', (req: Request, res: Response, next) => {
  const auth = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('❌ ADMIN_PASSWORD não configurada no .env!');
    res.status(500).json({ success: false, error: 'Erro de configuração do servidor.' });
    return;
  }

  if (auth !== adminPassword) {
    res.status(401).json({ success: false, error: 'Senha incorreta ou ausente.' });
    return;
  }

  next();
});

// GET /api/presentes/admin/todas — Lista presentes com detalhes de reservas
router.get('/admin/todas', async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const presentesRaw = await db
      .collection(COLLECTION_PRESENTES)
      .find({}, { projection: { _id: 0 } })
      .sort({ id: 1 })
      .toArray();

    const reservas = await db
      .collection(COLLECTION_RESERVATIONS)
      .find({ status: 'RESERVED' })
      .toArray();

    const data = presentesRaw.map((p) => {
      const resp = reservas.filter(r => r.giftId === p.id);
      return {
        ...p,
        reservedBy: resp.map(r => ({ name: r.guestName, reservationId: r._id.toString() }))
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('GET /admin/todas error:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar dados administrativos.' });
  }
});

// PUT /api/presentes/admin/:id — Atualiza maxQuantity
router.put('/admin/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { maxQuantity } = req.body;
    
    if (isNaN(id) || typeof maxQuantity !== 'number' || maxQuantity < 1) {
      res.status(400).json({ success: false, error: 'Dados inválidos.' });
      return;
    }

    const db = await connectDB();
    await db.collection(COLLECTION_PRESENTES).updateOne(
      { id },
      { $set: { maxQuantity, updatedAt: new Date() } }
    );

    res.json({ success: true, message: 'Quantidade máxima atualizada.' });
  } catch (error) {
    console.error('PUT /admin/:id error:', error);
    res.status(500).json({ success: false, error: 'Erro ao atualizar presente.' });
  }
});

// DELETE /api/presentes/admin/reservas/:reservationId — Cancela reserva
router.delete('/admin/reservas/:reservationId', async (req: Request, res: Response) => {
  try {
    const { reservationId } = req.params;
    const db = await connectDB();
    
    const reservation = await db.collection(COLLECTION_RESERVATIONS).findOne({ _id: new ObjectId(reservationId) });
    if (!reservation || reservation.status === 'CANCELLED') {
      res.status(404).json({ success: false, error: 'Reserva não encontrada ou já cancelada.' });
      return;
    }

    // Marca como cancelada
    await db.collection(COLLECTION_RESERVATIONS).updateOne(
      { _id: new ObjectId(reservationId) },
      { $set: { status: 'CANCELLED', updatedAt: new Date() } }
    );

    // Decrementa activeReservationsCount no presente
    await db.collection(COLLECTION_PRESENTES).updateOne(
      { id: reservation.giftId },
      { $inc: { activeReservationsCount: -1 } }
    );

    res.json({ success: true, message: 'Reserva cancelada com sucesso.' });
  } catch (error) {
    console.error('DELETE /admin/reservas/:reservationId error:', error);
    res.status(500).json({ success: false, error: 'Erro ao cancelar reserva.' });
  }
});

export default router;
