generate prisma ERD = npx prisma generate
generate erd = npx prisma generate
migrasi ke db = npx prisma migrate dev



https://dbdiagram.io/
<!-- generate dbml
pnpm add -g @dbml/cli
dbml2svg ./prisma/dbml/schema.dbml -o ./prisma/dbml/schema.svg -->


<!-- postgres di local : docker-compose -f docker-compose.yml up -d --build -->

push ke db = npx prisma db push

liat db prisma studio = npx prisma studio


# Buat dan jalankan migrasi
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Jalankan server
npx ts-node src/index.ts