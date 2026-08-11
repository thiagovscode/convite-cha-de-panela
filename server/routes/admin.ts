// ============================================================
//  server/routes/admin.ts — API Administrativa
//  ============================================================
//  Rotas para controle de reservas (semauth complexa por enquanto)
//    GET  /api/admin/gifts          → lista presentes com qtde interna
//    POST /api/admin/reservations/:id/cancel → cancela uma reserva
// ============================================================

import { Router, Request, Response } from 'express';
import { connectDB, COLLECTION_PRESENTES, COLLECTION_RESERVATIONS } from '../db';
import { ObjectId } from 'mongodb';

const router = Router();

// Middleware básico de segurança (opcional via variável de ambiente)
// Ex: se tiver ADMIN_SECRET=123 no .env, tem que mandar x-admin-secret=123
router.use((req, res, next) => {
  const secret = process.env.ADMIN_SECRET;
  if (secret && req.headers['x-admin-secret'] !== secret) {
    res.status(401).json({ success: false, error: 'Não autorizado.' });
    return;
  }
  next();
});

// ── GET /api/admin/gifts — Lista todos com detalhes ────────
router.get('/gifts', async (_req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const presentesRaw = await db
      .collection(COLLECTION_PRESENTES)
      .find({}, { projection: { _id: 0 } })
      .sort({ id: 1 })
      .toArray();

    const reservationsRaw = await db
      .collection(COLLECTION_RESERVATIONS)
      .find({ status: 'RESERVED' }) // Pegamos apenas as ativas ou todas se quiser histórico completo
      .toArray();

    // Agrupa reservas por giftId
    const reservationsByGift = reservationsRaw.reduce((acc: any, res: any) => {
      const giftId = res.giftId;
      if (!acc[giftId]) acc[giftId] = [];
      acc[giftId].push({
        id: res._id.toString(),
        guestName: res.guestName,
        status: res.status,
        createdAt: res.createdAt
      });
      return acc;
    }, {});

    const presentes = presentesRaw.map((p) => {
      return {
        ...p,
        reservedQuantity: p.activeReservationsCount || 0,
        availableQuantity: (p.maxQuantity || 1) - (p.activeReservationsCount || 0),
        reservations: reservationsByGift[p.id] || []
      };
    });

    res.json({ success: true, data: presentes });
  } catch (error) {
    console.error('GET /admin/gifts error:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar presentes administrativos.' });
  }
});

// ── POST /api/admin/reservations/:id/cancel — Cancela Reserva ────────
router.post('/reservations/:id/cancel', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, error: 'ID de reserva inválido.' });
      return;
    }

    const db = await connectDB();
    const collectionReservations = db.collection(COLLECTION_RESERVATIONS);
    const collectionPresentes = db.collection(COLLECTION_PRESENTES);

    // Encontra a reserva
    const reservation = await collectionReservations.findOne({ _id: new ObjectId(id) });

    if (!reservation) {
      res.status(404).json({ success: false, error: 'Reserva não encontrada.' });
      return;
    }

    if (reservation.status === 'CANCELLED') {
      res.status(400).json({ success: false, error: 'Reserva já está cancelada.' });
      return;
    }

    // Marca como CANCELLED
    await collectionReservations.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: 'CANCELLED', updatedAt: new Date() } }
    );

    // Decrementa no presente
    await collectionPresentes.updateOne(
      { id: reservation.giftId },
      { $inc: { activeReservationsCount: -1 } }
    );

    res.json({ success: true, message: 'Reserva cancelada com sucesso.' });
  } catch (error) {
    console.error('POST /admin/reservations/:id/cancel error:', error);
    res.status(500).json({ success: false, error: 'Erro ao cancelar reserva.' });
  }
});

export default router;
