import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Buat data dummy untuk Level
  const levelAdmin = await prisma.level.create({
    data: {
      nama_level: 'Admin',
    },
  });

  // Buat data dummy untuk Tarif
  const tarif1 = await prisma.tarif.create({
    data: {
      daya: 1300,
      tarifperkwh: 1500,
    },
  });

  const tarif2 = await prisma.tarif.create({
    data: {
      daya: 2200,
      tarifperkwh: 2000,
    },
  });

  // Buat data dummy untuk User
  const userAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin123', // pastikan untuk mengenkripsi password di aplikasi nyata
      nama_admin: 'Admin Sistem',
      id_level: levelAdmin.id_level,
    },
  });

  // Buat data dummy untuk Pelanggan
  const pelanggan1 = await prisma.pelanggan.create({
    data: {
      username: 'pelanggan1',
      password: 'password1', // pastikan untuk mengenkripsi password di aplikasi nyata
      nomer_kwh: '1234567890',
      nama_pelanggan: 'Pelanggan 1',
      alamat: 'Jl. Raya No. 1',
      id_tarif: tarif1.id_tarif,
    },
  });

  const pelanggan2 = await prisma.pelanggan.create({
    data: {
      username: 'pelanggan2',
      password: 'password2', // pastikan untuk mengenkripsi password di aplikasi nyata
      nomer_kwh: '9876543210',
      nama_pelanggan: 'Pelanggan 2',
      alamat: 'Jl. Raya No. 2',
      id_tarif: tarif2.id_tarif,
    },
  });

  // Buat data dummy untuk Penggunaan
  const penggunaan1 = await prisma.penggunaan.create({
    data: {
      id_pelanggan: pelanggan1.id_pelanggan,
      bulan: 1,
      tahun: 2025,
      meter_awal: 1000,
      meter_akhir: 1500,
    },
  });

  const penggunaan2 = await prisma.penggunaan.create({
    data: {
      id_pelanggan: pelanggan2.id_pelanggan,
      bulan: 1,
      tahun: 2025,
      meter_awal: 500,
      meter_akhir: 800,
    },
  });

  // Buat data dummy untuk Tagihan
  const tagihan1 = await prisma.tagihan.create({
    data: {
      id_penggunaan: penggunaan1.id_penggunaan,
      id_pelanggan: pelanggan1.id_pelanggan,
      bulan: 1,
      tahun: 2025,
      jumlah_meter: penggunaan1.meter_akhir - penggunaan1.meter_awal,
      status: 'Belum Dibayar',
    },
  });

  const tagihan2 = await prisma.tagihan.create({
    data: {
      id_penggunaan: penggunaan2.id_penggunaan,
      id_pelanggan: pelanggan2.id_pelanggan,
      bulan: 1,
      tahun: 2025,
      jumlah_meter: penggunaan2.meter_akhir - penggunaan2.meter_awal,
      status: 'Belum Dibayar',
    },
  });

  // Buat data dummy untuk Pembayaran
  await prisma.pembayaran.create({
    data: {
      id_tagihan: tagihan1.id_tagihan,
      id_pelanggan: pelanggan1.id_pelanggan,
      tanggal_pembayaran: new Date(),
      bulan_bayar: 1,
      biaya_admin: 5000,
      total_bayar: tagihan1.jumlah_meter * tarif1.tarifperkwh + 5000,
      id_user: userAdmin.id_user,
    },
  });

  await prisma.pembayaran.create({
    data: {
      id_tagihan: tagihan2.id_tagihan,
      id_pelanggan: pelanggan2.id_pelanggan,
      tanggal_pembayaran: new Date(),
      bulan_bayar: 1,
      biaya_admin: 5000,
      total_bayar: tagihan2.jumlah_meter * tarif2.tarifperkwh + 5000,
      id_user: userAdmin.id_user,
    },
  });

  console.log('Data dummy berhasil diinisialisasi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
