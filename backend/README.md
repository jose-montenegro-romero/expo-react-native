# Video tutorial

https://www.youtube.com/watch?v=fLIl6jypzkI

# Instalar paquetes
npm install express postgres cors dotenv drizzle-orm cron

# Instalar nodemon
npm install nodemon drizzle-kit -D

# Correr drizzle

npx drizzle-kit generate
npx drizzle-kit migrate

# Leventar docker-compose 

docker compose up -d

# Ver logs docker compose

docker compose logs -f postgres
