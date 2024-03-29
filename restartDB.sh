cd backend || exit
npx prisma generate
npx prisma db push
npx prisma db seed