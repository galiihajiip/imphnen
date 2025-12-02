# 🚀 Panduan Deployment

## Deploy ke Vercel (Recommended)

Vercel adalah platform terbaik untuk deploy aplikasi Next.js.

### Langkah-langkah:

1. **Push code ke GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Import ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "New Project"
   - Import repository GitHub Anda
   - Vercel akan otomatis detect Next.js

3. **Setup Environment Variables**
   
   Di Vercel dashboard, tambahkan:
   ```
   GEMINI_API_KEY=your-actual-api-key
   GEMINI_MODEL_NAME=gemini-1.5-pro
   DATABASE_URL=file:./prod.db
   ```

4. **Deploy!**
   - Klik "Deploy"
   - Tunggu beberapa menit
   - Aplikasi Anda live! 🎉

### Auto-Deploy

Setiap push ke branch `main` akan otomatis trigger deployment baru.

---

## Deploy ke Railway

Railway cocok untuk aplikasi dengan database.

### Langkah-langkah:

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize Project**
```bash
railway init
```

4. **Add Environment Variables**
```bash
railway variables set GEMINI_API_KEY=your-key
railway variables set GEMINI_MODEL_NAME=gemini-1.5-pro
railway variables set DATABASE_URL=file:./prod.db
```

5. **Deploy**
```bash
railway up
```

---

## Deploy ke Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

4. **Set Environment Variables**
   - Buka Netlify dashboard
   - Site settings → Environment variables
   - Tambahkan `GEMINI_API_KEY` dan `GEMINI_MODEL_NAME`

---

## Checklist Sebelum Deploy

- [ ] API key sudah di environment variables (bukan hardcoded)
- [ ] `.env` ada di `.gitignore`
- [ ] `node_modules` tidak di-commit
- [ ] Database sudah di-push (`npm run db:push`)
- [ ] Build berhasil lokal (`npm run build`)
- [ ] Test sudah pass (`npm test`)

---

## Troubleshooting

### Error: "GEMINI_API_KEY is not set"

**Solusi**: Pastikan environment variable sudah di-set di platform deployment.

### Error: Database connection failed

**Solusi**: Untuk production, pertimbangkan menggunakan PostgreSQL atau MySQL instead of SQLite.

### Build timeout

**Solusi**: Increase build timeout di platform settings atau optimize dependencies.

---

## Production Checklist

- [ ] Enable HTTPS
- [ ] Setup custom domain (optional)
- [ ] Enable error monitoring (Sentry)
- [ ] Setup analytics (Google Analytics / Vercel Analytics)
- [ ] Add rate limiting untuk API routes
- [ ] Setup backup database

---

## Monitoring

### Vercel Analytics

Aktifkan di Vercel dashboard untuk monitoring:
- Page views
- Performance metrics
- Error tracking

### Custom Monitoring

Tambahkan Sentry untuk error tracking:

```bash
npm install @sentry/nextjs
```

---

**Happy Deploying! 🚀**
