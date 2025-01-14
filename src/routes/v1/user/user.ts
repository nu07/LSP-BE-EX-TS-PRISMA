import { Router, Request, Response } from 'express';
import { signup, signin } from '@controller/v1/user/user';
import verifySignUp from '@middleware/index';
import { uploadUser } from '@config/Multer';

const router: Router = Router();

router.post(
  '/register',
  [
    verifySignUp.verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.verifySignUp.checkRoleExisted,
    uploadUser.single('images'),
  ],
  signup,
);
router.post('/signin', [uploadUser.none()], signin);

export default router;
