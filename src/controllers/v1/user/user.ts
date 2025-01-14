import { Request, Response } from 'express';
import { ValidationUser } from '@middleware/validation/userRegistration';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

export async function signup(req: Request, res: Response) {
  const uploadedFile = req.file;

  await Promise.all(ValidationUser.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!uploadedFile) {
    return res.status(400).json({ message: 'Foto Tidak Boleh Kosong' });
  }

  try {
    const signup = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        alamat: req.body.alamat,
        images: uploadedFile ? uploadedFile.path : null,
        roles: req.body.roles,
      },
    });

    return res.status(200).send({
      data: signup,
      message: 'Data Berhasil Di Daftarkan',
    });
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: 'User Tidak Terdaftar !!!',
      });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(404).send({
        message: 'Password Tidak Valid',
      });
    }

    let fullUrl = req.protocol + '://' + req.get('host') + '/' + user.images;
    user.images = fullUrl;
    delete user.password;

    const expired = 86400; // 24 Jam
    const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const expiryTime = currentTime + expired; // 24 hours from now
    const token = jwt.sign({ data: user }, process.env.jwt_secret_key, {
      expiresIn: expired, // 24 Jam
    });

    return res.status(200).send({
      data: user,
      accessToken: token,
      iat: currentTime,
      exp: expiryTime,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: 'Terjadi Kesalahan!',
      error: e,
    });
  }
}
