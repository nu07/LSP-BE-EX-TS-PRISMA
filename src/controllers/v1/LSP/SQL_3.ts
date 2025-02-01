import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Level Controllers
export const getLevels = async (_req: Request, res: Response) => {
  try {
    const levels = await prisma.level.findMany();
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLevel = async (req: Request, res: Response) => {
  const { nama_level } = req.body;
  try {
    const level = await prisma.level.create({ data: { nama_level } });
    res.status(201).json(level);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLevelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const level = await prisma.level.findUnique({
      where: { id_level: Number(id) },
    });
    if (!level) return res.status(404).json({ message: 'Level tidak ditemukan' });
    res.json(level);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLevel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nama_level } = req.body;
  try {
    const updatedLevel = await prisma.level.update({
      where: { id_level: Number(id) },
      data: { nama_level },
    });
    res.json(updatedLevel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLevel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.level.delete({ where: { id_level: Number(id) } });
    res.json({ message: 'Level berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tarif Controllers
export const getTarifs = async (_req: Request, res: Response) => {
  try {
    const tarifs = await prisma.tarif.findMany();
    res.json(tarifs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTarif = async (req: Request, res: Response) => {
  const { daya, tarifperkwh } = req.body;
  try {
    const tarif = await prisma.tarif.create({ data: { daya, tarifperkwh } });
    res.status(201).json(tarif);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTarifById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tarif = await prisma.tarif.findUnique({
      where: { id_tarif: Number(id) },
    });
    if (!tarif) return res.status(404).json({ message: 'Tarif tidak ditemukan' });
    res.json(tarif);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTarif = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { daya, tarifperkwh } = req.body;
  try {
    const updatedTarif = await prisma.tarif.update({
      where: { id_tarif: Number(id) },
      data: { daya, tarifperkwh },
    });
    res.json(updatedTarif);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTarif = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tarif.delete({ where: { id_tarif: Number(id) } });
    res.json({ message: 'Tarif berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Pelanggan Controllers
export const getPelanggans = async (_req: Request, res: Response) => {
  try {
    const pelanggans = await prisma.pelanggan.findMany();
    res.json(pelanggans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPelanggan = async (req: Request, res: Response) => {
  const { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif } = req.body;
  try {
    const pelanggan = await prisma.pelanggan.create({
      data: { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif },
    });
    res.status(201).json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPelangganById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pelanggan = await prisma.pelanggan.findUnique({
      where: { id_pelanggan: Number(id) },
    });
    if (!pelanggan) return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    res.json(pelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePelanggan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif } = req.body;
  try {
    const updatedPelanggan = await prisma.pelanggan.update({
      where: { id_pelanggan: Number(id) },
      data: { username, password, nomer_kwh, nama_pelanggan, alamat, id_tarif },
    });
    res.json(updatedPelanggan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePelanggan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pelanggan.delete({ where: { id_pelanggan: Number(id) } });
    res.json({ message: 'Pelanggan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Controllers
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, password, nama_admin, id_level } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, password, nama_admin, id_level } });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id_user: Number(id) },
    });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, nama_admin, id_level } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id_user: Number(id) },
      data: { username, password, nama_admin, id_level },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id_user: Number(id) } });
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Penggunaan Controllers
export const getPenggunaans = async (_req: Request, res: Response) => {
  try {
    const penggunaans = await prisma.penggunaan.findMany();
    res.json(penggunaans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPenggunaan = async (req: Request, res: Response) => {
  const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = req.body;
  try {
    const penggunaan = await prisma.penggunaan.create({
      data: { id_pelanggan, bulan, tahun, meter_awal, meter_akhir },
    });
    res.status(201).json(penggunaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPenggunaanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const penggunaan = await prisma.penggunaan.findUnique({
      where: { id_penggunaan: Number(id) },
    });
    if (!penggunaan) return res.status(404).json({ message: 'Penggunaan tidak ditemukan' });
    res.json(penggunaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePenggunaan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = req.body;
  try {
    const updatedPenggunaan = await prisma.penggunaan.update({
      where: { id_penggunaan: Number(id) },
      data: { id_pelanggan, bulan, tahun, meter_awal, meter_akhir },
    });
    res.json(updatedPenggunaan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePenggunaan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.penggunaan.delete({ where: { id_penggunaan: Number(id) } });
    res.json({ message: 'Penggunaan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tagihan Controllers
export const getTagihans = async (_req: Request, res: Response) => {
  try {
    const tagihans = await prisma.tagihan.findMany();
    res.json(tagihans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTagihan = async (req: Request, res: Response) => {
  const { id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status } = req.body;
  try {
    const tagihan = await prisma.tagihan.create({
      data: { id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status },
    });
    res.status(201).json(tagihan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTagihanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tagihan = await prisma.tagihan.findUnique({
      where: { id_tagihan: Number(id) },
    });
    if (!tagihan) return res.status(404).json({ message: 'Tagihan tidak ditemukan' });
    res.json(tagihan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTagihan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status } = req.body;
  try {
    const updatedTagihan = await prisma.tagihan.update({
      where: { id_tagihan: Number(id) },
      data: { id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status },
    });
    res.json(updatedTagihan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTagihan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.tagihan.delete({ where: { id_tagihan: Number(id) } });
    res.json({ message: 'Tagihan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Pembayaran Controllers
export const getPembayarans = async (_req: Request, res: Response) => {
  try {
    const pembayarans = await prisma.pembayaran.findMany();
    res.json(pembayarans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPembayaran = async (req: Request, res: Response) => {
  const {
    id_tagihan,
    id_pelanggan,
    tanggal_pembayaran = new Date(),
    bulan_bayar,
    biaya_admin,
    total_bayar,
    id_user,
  } = req.body;
  try {
    const pembayaran = await prisma.pembayaran.create({
      data: { id_tagihan, id_pelanggan, tanggal_pembayaran, bulan_bayar, biaya_admin, total_bayar, id_user },
    });
    res.status(201).json(pembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPembayaranById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pembayaran = await prisma.pembayaran.findUnique({
      where: { id_pembayaran: Number(id) },
    });
    if (!pembayaran) return res.status(404).json({ message: 'Pembayaran tidak ditemukan' });
    res.json(pembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePembayaran = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_tagihan, id_pelanggan, tanggal_pembayaran, bulan_bayar, biaya_admin, total_bayar, id_user } = req.body;
  try {
    const updatedPembayaran = await prisma.pembayaran.update({
      where: { id_pembayaran: Number(id) },
      data: { id_tagihan, id_pelanggan, tanggal_pembayaran, bulan_bayar, biaya_admin, total_bayar, id_user },
    });
    res.json(updatedPembayaran);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePembayaran = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pembayaran.delete({ where: { id_pembayaran: Number(id) } });
    res.json({ message: 'Pembayaran berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
