import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '@models/index';

const { user, role } = db;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: 'Unauthorized',
    });
  }

  jwt.verify(token, process.env.jwt_secret_key, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    req.userId = decoded.id;
    console.log(decoded);
    next();
  });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundUser = await user.findById(req.userId).exec();
    if (!foundUser) {
      return res.status(403).send({
        message: 'User tidak ditemukan',
      });
    }

    const roles = await role.find({ _id: { $in: foundUser.roles } }).exec();
    if (!roles || roles.length === 0) {
      return res.status(403).send({
        message: 'User tidak memiliki Akses',
      });
    }

    let isAdmin = false;
    roles.forEach((role: any) => {
      if (role.name === 'admin') {
        isAdmin = true;
      }
    });

    if (!isAdmin) {
      return res.status(403).send({
        message: 'Hak Akses Anda Tidak cukup',
      });
    }

    next();
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Terjadi kesalahan saat memeriksa status admin.',
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};

export default authJwt;
