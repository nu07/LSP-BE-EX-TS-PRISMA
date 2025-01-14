import { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUserByEmail = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (foundUserByEmail) {
      return res.status(400).send({
        message: 'Email Sudah Ada Gunakan Email Lain!',
      });
    }

    next();
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Terjadi kesalahan saat memeriksa duplikat email atau nomor telepon.',
    });
  }
};

const checkRoleExisted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await prisma.role.findMany();
    const allRoles = roles.map((role) => role.id);

    if (req.body.roles) {
      if (!allRoles.includes(req.body.roles)) {
        return res.status(400).send({
          message: 'Role Tidak Terdaftar',
        });
      }
    }

    next();
  } catch (error) {
    console.error('Error occurred while checking roles:', error);
    res.status(500).send({
      message: 'Terjadi kesalahan saat memeriksa peran.',
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted,
};

export default verifySignUp;
