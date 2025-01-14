-- CreateTable
CREATE TABLE "Penggunaan" (
    "id_penggunaan" SERIAL NOT NULL,
    "id_pelanggan" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "meter_awal" INTEGER NOT NULL,
    "meter_akhir" INTEGER NOT NULL,

    CONSTRAINT "Penggunaan_pkey" PRIMARY KEY ("id_penggunaan")
);

-- CreateTable
CREATE TABLE "Pelanggan" (
    "id_pelanggan" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nomer_kwh" TEXT NOT NULL,
    "nama_pelanggan" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "id_tarif" INTEGER NOT NULL,

    CONSTRAINT "Pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "Tagihan" (
    "id_tagihan" SERIAL NOT NULL,
    "id_penggunaan" INTEGER NOT NULL,
    "id_pelanggan" INTEGER NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "jumlah_meter" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Tagihan_pkey" PRIMARY KEY ("id_tagihan")
);

-- CreateTable
CREATE TABLE "Tarif" (
    "id_tarif" SERIAL NOT NULL,
    "daya" INTEGER NOT NULL,
    "tarifperkwh" INTEGER NOT NULL,

    CONSTRAINT "Tarif_pkey" PRIMARY KEY ("id_tarif")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama_admin" TEXT NOT NULL,
    "id_level" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Level" (
    "id_level" SERIAL NOT NULL,
    "nama_level" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id_level")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "id_pembayaran" SERIAL NOT NULL,
    "id_tagihan" INTEGER NOT NULL,
    "id_pelanggan" INTEGER NOT NULL,
    "tanggal_pembayaran" TIMESTAMP(3) NOT NULL,
    "bulan_bayar" INTEGER NOT NULL,
    "biaya_admin" INTEGER NOT NULL,
    "total_bayar" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("id_pembayaran")
);

-- AddForeignKey
ALTER TABLE "Penggunaan" ADD CONSTRAINT "Penggunaan_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pelanggan" ADD CONSTRAINT "Pelanggan_id_tarif_fkey" FOREIGN KEY ("id_tarif") REFERENCES "Tarif"("id_tarif") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_id_penggunaan_fkey" FOREIGN KEY ("id_penggunaan") REFERENCES "Penggunaan"("id_penggunaan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tagihan" ADD CONSTRAINT "Tagihan_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_level_fkey" FOREIGN KEY ("id_level") REFERENCES "Level"("id_level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_id_tagihan_fkey" FOREIGN KEY ("id_tagihan") REFERENCES "Tagihan"("id_tagihan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
