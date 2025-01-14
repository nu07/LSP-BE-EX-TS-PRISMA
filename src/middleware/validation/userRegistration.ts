const { body } = require('express-validator');

export const ValidationUser = [
  body('firstName').notEmpty().withMessage('First Name tidak boleh kosong').trim().escape(),
  body('lastName').notEmpty().withMessage('Last Name tidak boleh kosong').trim().escape(),
  body('password').notEmpty().withMessage('Password tidak boleh kosong').trim().escape(),
  body('email').notEmpty().withMessage('Email tidak boleh kosong').trim().escape(),
  body('alamat').notEmpty().withMessage('Alamat tidak boleh kosong').trim().escape(),
];
