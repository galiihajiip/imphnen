# 🔧 Troubleshooting Guide

## Error: "Gagal menghasilkan respons AI"

### Kemungkinan Penyebab & Solusi

#### 1. API Key Belum Diset

**Error**: "API key Gemini belum dikonfigurasi"

**Solusi**:
```bash
# 1. Copy .env.example ke .env
cp .env.example .env

# 2. Edit .env dan tambahkan API key Anda
# GEMINI_API_KEY="your-actual-api-key-here"

# 3. Restart development server
npm run dev
```

**Cara mendapatkan API key**:
1. Buka: https://makersuite.google.com/app/apikey
2. Login dengan Google account
3. Klik "Create API Key"
4. Copy API key
5. Paste ke file `.env`

---

#### 2. API Key Tidak Valid

**Error**: "API key Gemini tidak valid"

**Solusi**:
1. Periksa API key di file `.env`
2. Pastikan tidak ada spasi atau karakter tambahan
3. Pastikan API key masih aktif di Google AI Studio
4. Generate API key baru jika perlu

**Format yang benar**:
```env
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

**Format yang salah**:
```env
GEMINI_API_KEY= AIzaSy...  # ❌ Ada spasi
GEMINI_API_KEY=AIzaSy...   # ❌ Tidak ada quotes
```

---

#### 3. Model Name Salah

**Error**: "Model AI tidak ditemukan"

**Solusi**:

Edit `.env` dan gunakan model name yang benar:

```env
# Gunakan salah satu dari ini:
GEMINI_MODEL_NAME="gemini-1.5-pro"
# atau
GEMINI_MODEL_NAME="gemini-1.5-flash"
# atau
GEMINI_MODEL_NAME="gemini-pro"
```

**Model yang tersedia**:
- `gemini-pro` - Stable, recommended
- `gemini-1.5-flash-latest` - Faster (if available in your region)

**Note**: Model availability depends on your API version and region. Use `gemini-pro` for maximum compatibility.

---

#### 4. Rate Limit / Quota Exceeded

**Error**: "Terlalu banyak permintaan"

**Solusi**:
1. Tunggu beberapa menit
2. Coba lagi
3. Jika masih error, cek quota di Google AI Studio

**Free tier limits**:
- 60 requests per minute
- 1,500 requests per day

**Jika butuh lebih**:
- Upgrade ke paid plan
- Atau gunakan API key berbeda

---

#### 5. Network / Connection Error

**Error**: "Failed to fetch" atau timeout

**Solusi**:
1. Periksa koneksi internet
2. Coba lagi
3. Periksa firewall/proxy settings
4. Pastikan tidak ada VPN yang memblokir Google APIs

---

#### 6. Environment Variables Tidak Terbaca

**Solusi**:

**Untuk development lokal**:
```bash
# 1. Pastikan file .env ada di root project
ls -la .env

# 2. Restart dev server
npm run dev
```

**Untuk Vercel deployment**:
1. Buka Vercel dashboard
2. Go to Settings → Environment Variables
3. Tambahkan:
   - `GEMINI_API_KEY` = your-api-key
   - `GEMINI_MODEL_NAME` = gemini-1.5-pro
4. Redeploy

---

## Error: Build Failures

### "Cannot find module '@prisma/client'"

**Solusi**:
```bash
npm run db:push
```

### "Prisma Client not generated"

**Solusi**:
```bash
npx prisma generate
npm run build
```

---

## Error: Database Issues

### "Can't reach database server"

**Solusi untuk development**:
```bash
# Reset database
rm prisma/dev.db
npm run db:push
```

**Solusi untuk Vercel**:
- App akan tetap berjalan tanpa database (demo mode)
- Atau tambahkan Vercel Postgres (lihat VERCEL_DEPLOYMENT.md)

---

## Error: Port Already in Use

**Error**: "Port 3000 is already in use"

**Solusi**:
```bash
# Gunakan port lain
PORT=3001 npm run dev
```

Atau kill process yang menggunakan port 3000:

**Windows**:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
lsof -ti:3000 | xargs kill -9
```

---

## Testing API Key

Untuk test apakah API key bekerja:

```bash
# 1. Buat file test.js
cat > test.js << 'EOF'
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Say hello");
    console.log("✅ API key works!");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("❌ API key error:", error.message);
  }
}

test();
EOF

# 2. Install dotenv
npm install dotenv

# 3. Run test
node test.js

# 4. Cleanup
rm test.js
```

---

## Verifikasi Setup

Gunakan script verifikasi:

```bash
npm run verify
```

Ini akan check:
- ✅ Dependencies installed
- ✅ .env file configured
- ✅ Prisma client generated
- ✅ All required files present

---

## Debug Mode

Untuk melihat error detail:

1. **Check browser console** (F12)
2. **Check terminal logs** (tempat npm run dev berjalan)
3. **Check Vercel logs** (untuk deployment)

---

## Masih Error?

### Langkah Terakhir:

1. **Reset everything**:
```bash
rm -rf node_modules
rm -rf .next
rm prisma/dev.db
rm package-lock.json
npm install
npm run db:push
npm run dev
```

2. **Check GitHub Issues**: https://github.com/galiihajiip/imphnen/issues

3. **Contact Support**: Buka issue baru dengan:
   - Error message lengkap
   - Screenshot
   - Steps to reproduce

---

## Quick Checklist

Sebelum submit issue, pastikan:

- [ ] File `.env` ada dan berisi API key
- [ ] API key valid (test di Google AI Studio)
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma client generated (`npm run db:push`)
- [ ] Dev server running (`npm run dev`)
- [ ] No other process using port 3000
- [ ] Internet connection working
- [ ] Browser console checked for errors

---

## Common Mistakes

❌ **Salah**: Menaruh API key di code
```typescript
const apiKey = "AIzaSy..."; // ❌ JANGAN!
```

✅ **Benar**: Menggunakan environment variable
```typescript
const apiKey = process.env.GEMINI_API_KEY; // ✅
```

---

❌ **Salah**: File .env di-commit ke git
```bash
git add .env  # ❌ JANGAN!
```

✅ **Benar**: .env ada di .gitignore
```bash
# .gitignore already includes .env ✅
```

---

❌ **Salah**: Lupa restart server setelah edit .env
```bash
# Edit .env
# Langsung test ❌ (masih pakai env lama)
```

✅ **Benar**: Restart server
```bash
# Edit .env
# Ctrl+C untuk stop server
npm run dev  # ✅ Start dengan env baru
```

---

**Need more help?** Check other documentation files:
- `SETUP.md` - Setup guide
- `QUICK_REFERENCE.md` - Quick commands
- `VERCEL_DEPLOYMENT.md` - Deployment issues
- `README.md` - Complete documentation
