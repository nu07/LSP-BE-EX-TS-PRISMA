import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Part 3  LSP

const prisma = new PrismaClient();
// Create Pelanggan
export const createPelanggan = async (req: Request, res: Response) => {
  const { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif } = req.body;
  try {
    const pelanggan = await prisma.pelanggan.create({
      data: {
        username,
        password,
        nomer_kwh,
        nama_pelanggan,
        alamat,
        id_tarif,
      },
    });
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read Pelanggan
export const getPelanggan = async (req: Request, res: Response) => {
  try {
    const pelanggan = await prisma.pelanggan.findMany();
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Pelanggan
export const updatePelanggan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif } = req.body;
  try {
    const pelanggan = await prisma.pelanggan.update({
      where: { id_pelanggan: Number(id) },
      data: {
        username,
        password,
        nomer_kwh,
        nama_pelanggan,
        alamat,
        id_tarif,
      },
    });
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Pelanggan
export const deletePelanggan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pelanggan.delete({
      where: { id_pelanggan: Number(id) },
    });
    res.send('Pelanggan deleted');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
