import { Router } from 'express';
import * as controllers from '@controller/v1/LSP/SQL_3';

const router: Router = Router();

// Level Routes
router.get('/levels', controllers.getLevels);
router.post('/levels', controllers.createLevel);
router.get('/levels/:id', controllers.getLevelById);
router.put('/levels/:id', controllers.updateLevel);
router.delete('/levels/:id', controllers.deleteLevel);

// Tarif Routes
router.get('/tarifs', controllers.getTarifs);
router.post('/tarifs', controllers.createTarif);
router.get('/tarifs/:id', controllers.getTarifById);
router.put('/tarifs/:id', controllers.updateTarif);
router.delete('/tarifs/:id', controllers.deleteTarif);

// Pelanggan Routes
router.get('/pelanggans', controllers.getPelanggans);
router.post('/pelanggans', controllers.createPelanggan);
router.get('/pelanggans/:id', controllers.getPelangganById);
router.put('/pelanggans/:id', controllers.updatePelanggan);
router.delete('/pelanggans/:id', controllers.deletePelanggan);

// User Routes
router.get('/users', controllers.getUsers);
router.post('/users', controllers.createUser);
router.get('/users/:id', controllers.getUserById);
router.put('/users/:id', controllers.updateUser);
router.delete('/users/:id', controllers.deleteUser);

// Penggunaan Routes
router.get('/penggunaans', controllers.getPenggunaans);
router.post('/penggunaans', controllers.createPenggunaan);
router.get('/penggunaans/:id', controllers.getPenggunaanById);
router.put('/penggunaans/:id', controllers.updatePenggunaan);
router.delete('/penggunaans/:id', controllers.deletePenggunaan);

// Tagihan Routes
router.get('/tagihans', controllers.getTagihans);
router.post('/tagihans', controllers.createTagihan);
router.get('/tagihans/:id', controllers.getTagihanById);
router.put('/tagihans/:id', controllers.updateTagihan);
router.delete('/tagihans/:id', controllers.deleteTagihan);

// Pembayaran Routes
router.get('/pembayarans', controllers.getPembayarans);
router.post('/pembayarans', controllers.createPembayaran);
router.get('/pembayarans/:id', controllers.getPembayaranById);
router.put('/pembayarans/:id', controllers.updatePembayaran);
router.delete('/pembayarans/:id', controllers.deletePembayaran);

export default router;
