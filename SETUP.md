# ⚡ Quick Setup Guide

Panduan cepat untuk menjalankan aplikasi dalam 5 menit!

---

## Prerequisites

✅ Node.js 18+ installed  
✅ npm atau yarn installed  
✅ Gemini API Key (gratis dari Google)

---

## Step 1: Get Gemini API Key

1. Buka [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google account
3. Klik "Create API Key"
4. Copy API key Anda

⚠️ **PENTING**: Jangan share API key ke siapapun!

---

## Step 2: Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd ai-financial-copilot-umkm

# Install dependencies
npm install
```

---

## Step 3: Setup Environment

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` file:

```env
GEMINI_API_KEY="paste-your-api-key-here"
GEMINI_MODEL_NAME="gemini-1.5-pro"
DATABASE_URL="file:./dev.db"
```

---

## Step 4: Setup Database

```bash
npm run db:push
```

Output yang benar:
```
✔ Generated Prisma Client
✔ Database synchronized
```

---

## Step 5: Run Development Server

```bash
npm run dev
```

Buka browser: `http://localhost:3000`

---

## ✅ Verification Checklist

Pastikan semuanya berjalan:

- [ ] Landing page muncul dengan benar
- [ ] Bisa navigasi ke Dashboard
- [ ] Form Analisis Profit bisa diisi
- [ ] Form Rekomendasi Harga bisa diisi
- [ ] Klik submit tidak error
- [ ] AI response muncul (butuh internet)

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@prisma/client'"

**Solusi**:
```bash
npm run db:push
```

### Error: "GEMINI_API_KEY is not set"

**Solusi**: Pastikan file `.env` ada dan berisi API key yang valid.

### Error: "Failed to fetch"

**Solusi**: 
1. Pastikan dev server running (`npm run dev`)
2. Pastikan API key valid
3. Pastikan ada koneksi internet

### Port 3000 sudah digunakan

**Solusi**:
```bash
# Gunakan port lain
PORT=3001 npm run dev
```

---

## 🧪 Run Tests

```bash
npm test
```

Expected output:
```
PASS  src/domain/finance/__tests__/profitCalculator.test.ts
PASS  src/domain/finance/__tests__/pricingEngine.test.ts

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🎯 Next Steps

1. ✅ Aplikasi running lokal
2. 📝 Baca [README.md](README.md) untuk dokumentasi lengkap
3. 🏗 Baca [ARCHITECTURE.md](docs/ARCHITECTURE.md) untuk memahami struktur
4. 🚀 Baca [DEPLOYMENT.md](DEPLOYMENT.md) untuk deploy ke production
5. 🎥 Buat video demo menggunakan [VIDEO_SCRIPT.md](docs/VIDEO_SCRIPT.md)

---

## 💡 Tips

- Gunakan **Prisma Studio** untuk lihat database:
  ```bash
  npm run db:studio
  ```

- Gunakan **React DevTools** untuk debug components

- Gunakan **Network tab** di browser untuk debug API calls

---

## 🆘 Need Help?

- Baca [CONTRIBUTING.md](CONTRIBUTING.md)
- Buka issue di GitHub
- Check dokumentasi di `docs/` folder

---

**Happy coding! 🚀**
