# Description


## Development
|steps| syntax|
|-----|-----|
| 1 - Clone repo | ```git clone -- https://github.com/mejialaguna/shopWithMe.git``` |
| 2 - rename .envTemplate to .env and  change the env variables to your own | ```npm install``` |
| 3 - install dependencies | ```npm install``` |
| 4 - start DB with docker | ```docker-compose up -d``` |
| 5 - prisma migration | ```npx prisma migrate dev``` |
| 6 - prisma migration | ```npm run seed`` |
| 7 - start dev server | ```npm run dev``` |

# Production