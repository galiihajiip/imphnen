# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: With Vercel Postgres (Recommended for Production)

1. **Push to GitHub** ✅ (Already done!)

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository: `galiihajiip/imphnen`

3. **Add Vercel Postgres**
   - In your Vercel project dashboard
   - Go to "Storage" tab
   - Click "Create Database"
   - Select "Postgres"
   - Click "Create"
   - Vercel will automatically add `POSTGRES_URL` to your environment variables

4. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     GEMINI_API_KEY=your-actual-api-key
     GEMINI_MODEL_NAME=gemini-1.5-pro
     DATABASE_URL=${POSTGRES_URL}
     ```

5. **Update Prisma Schema for PostgreSQL**
   
   Edit `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

6. **Commit and Push**
   ```bash
   git add prisma/schema.prisma
   git commit -m "feat: switch to PostgreSQL for Vercel"
   git push
   ```

7. **Deploy**
   - Vercel will auto-deploy
   - Wait for build to complete
   - Your app is live! 🎉

---

### Option 2: Without Database (Demo Only)

If you just want to demo the app without persistence:

1. **Modify the database client** to handle missing database gracefully

2. **Create** `src/db/client.ts`:
   ```typescript
   import { PrismaClient } from "@prisma/client";

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined;
   };

   export const prisma =
     globalForPrisma.prisma ??
     new PrismaClient({
       log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
     });

   if (process.env.NODE_ENV !== "production") {
     globalForPrisma.prisma = prisma;
   }

   // For demo: disable database writes in production if no DB
   export const isDatabaseAvailable = async () => {
     try {
       await prisma.$connect();
       return true;
     } catch {
       return false;
     }
   };
   ```

3. **Update services** to skip database writes:
   ```typescript
   // In financeService.ts
   try {
     await prisma.profitAnalysis.create({ data });
   } catch (error) {
     console.warn("Database write skipped:", error);
     // Continue without saving
   }
   ```

---

### Option 3: Use Vercel KV (Alternative)

1. Add Vercel KV from Storage tab
2. Use KV for simple key-value storage
3. Modify code to use KV instead of Prisma

---

## Troubleshooting

### Build Error: "Prisma Client not generated"

**Solution**: The `postinstall` script should handle this automatically. If not:
```bash
# Locally test the build
npm run build
```

### Runtime Error: "Can't reach database"

**Solution**: 
- Make sure Vercel Postgres is added
- Check `DATABASE_URL` environment variable
- Or use Option 2 (demo without database)

---

## Current Status

✅ Code pushed to GitHub  
⚠️ Needs database setup for Vercel  

**Recommended**: Use Option 1 with Vercel Postgres for full functionality.

---

## Quick Fix for Current Deployment

Since the build is failing, here's the fastest fix:

1. **Add Vercel Postgres** to your project
2. **Redeploy** - Vercel will auto-trigger
3. Done! ✅

Or temporarily disable database writes for demo purposes.
