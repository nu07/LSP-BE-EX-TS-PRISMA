import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import RouteV1 from '@routes/v1/index';
import { PrismaClient, Prisma } from '@prisma/client';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const Port = process.env.PORT || 3000;
const prisma = new PrismaClient();
const publicFolderPath = path.resolve(__dirname, '../public');
const folder = ['./public', './public/images', './public/images/user'];
let corsOptions = {
  origin: '*',
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(publicFolderPath));

for (let index = 0; index < RouteV1.length; index++) {
  app.use('/v1', RouteV1[index]);
}

app.use(cors<Request>(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const CheckFolder = (data) => {
  if (!fs.existsSync(data)) {
    fs.mkdirSync(data);
  }
};

// async function init() {
//   folder.map((data) => {
//     CheckFolder(data);
//   });
//   try {
//     const checkRoles = await prisma.role.count();
//     console.log(checkRoles);
//     if (checkRoles === 0) {
//       await prisma.role.createMany({
//         data: [{ roles: 'Admin' }, { roles: 'User' }],
//       });
//     } else {
//       console.info('Admin And User Already Added');
//     }
//   } catch (e) {
//     console.error('error: ', e);
//   }
// }

app.listen(Port, () => {
  console.log('express run at port: ', Port);
  // init();
});
