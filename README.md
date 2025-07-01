# NestJS Todo Backend with PostgreSQL and Swagger

Ushbu loyiha NestJS, Prisma va PostgreSQL yordamida yaratilgan TODO backend ilovasi. Swagger API dokumentatsiyasi bilan.

## Xususiyatlari

- ✅ RESTful API endpoints
- ✅ PostgreSQL ma'lumotlar bazasi
- ✅ Prisma ORM bilan PostgreSQL integratsiyasi
- ✅ Swagger API dokumentatsiyasi
- ✅ To'liq validatsiya va xato qayta ishlash
- ✅ TypeScript support
- ✅ Modular arxitektura
- ✅ Global exception handling

## Talablar

- Node.js (v16 yoki yuqori)
- PostgreSQL (v12 yoki yuqori)
- npm yoki yarn

## API Endpoints

### Tasks

- `GET /tasks` - Barcha tasklarni olish
- `GET /task/:id` - Bitta taskni olish
- `POST /task` - Yangi task yaratish
- `PUT /task/:id` - Taskni yangilash
- `PUT /task/:id/complete` - Taskni complete qilish
- `DELETE /task/:id` - Taskni o'chirish

## Ishga tushirish

1. Dependencies o'rnatish:
```bash
npm install
```

2. PostgreSQL'ni ishga tushiring va ma'lumotlar bazasi yarating:
```sql
CREATE DATABASE todo_db;
```

3. `.env` faylida PostgreSQL connection string'ini sozlang:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db?schema=public"
```

4. Prisma generate va migrate:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Development server ishga tushirish:
```bash
npm run start:dev
```

## PostgreSQL Connection

`.env` faylida PostgreSQL connection string'ini sozlang:

```env
# Mahalliy PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"

# Docker PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"

# Cloud PostgreSQL (Heroku, AWS RDS, etc.)
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

## Swagger API Dokumentatsiyasi

Server ishga tushgandan keyin Swagger dokumentatsiyasini ko'rish uchun:
- URL: http://localhost:3000/api/docs
- Interactive API testing
- Request/Response schemas
- Authentication support

## API Misollari

### Task yaratish
```bash
POST /task
Content-Type: application/json

{
  "title": "Yangi task",
  "description": "Task tavsifi",
  "priority": "HIGH"
}
```

### Response format
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Yangi task",
    "description": "Task tavsifi",
    "completed": false,
    "priority": "HIGH",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "completedAt": null
  },
  "message": "Task created successfully"
}
```

### Task complete qilish
```bash
PUT /task/1/complete
```

### Taskni o'chirish
```bash
DELETE /task/1
```

## Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Reset database
npm run prisma:reset

# Open Prisma Studio
npm run prisma:studio
```

## Docker bilan PostgreSQL

```bash
# PostgreSQL container ishga tushirish
docker run --name postgres-todo \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=todo_db \
  -p 5432:5432 \
  -d postgres:15

# Connection string
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo_db"
```

Server http://localhost:3000 da ishga tushadi.
Swagger dokumentatsiya: http://localhost:3000/api/docs