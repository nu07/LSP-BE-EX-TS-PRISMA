import { Router, Request, Response } from 'express';
import { createPelanggan } from '@controller/v1/LSP/SQL_3';
import { getPelanggan, updatePelanggan, deletePelanggan } from '../../../controllers/v1/LSP/SQL_3';

const router: Router = Router();

// part 3
// router.post('/lsp');
router.post('/pelanggan', createPelanggan);
router.get('/pelanggan', getPelanggan);
router.put('/pelanggan/:id', updatePelanggan);
router.delete('/pelanggan/:id', deletePelanggan);

export default router;
