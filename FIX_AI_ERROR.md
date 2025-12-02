# ⚡ Fix: "Gagal menghasilkan respons AI"

## 🔍 Diagnosa Cepat

Error ini muncul karena salah satu dari:
1. ❌ API key belum diset
2. ❌ API key tidak valid
3. ❌ Model name salah
4. ❌ Rate limit exceeded
5. ❌ Koneksi internet bermasalah

---

## ✅ Solusi Cepat (5 Menit)

### Step 1: Cek File .env

```bash
# Pastikan file .env ada
ls .env

# Jika tidak ada, buat dari template
cp .env.example .env
```

### Step 2: Dapatkan API Key

1. Buka: **https://makersuite.google.com/app/apikey**
2. Login dengan Google account
3. Klik **"Create API Key"**
4. Copy API key yang muncul

### Step 3: Edit File .env

Buka file `.env` dan paste API key Anda:

```env
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
GEMINI_MODEL_NAME="gemini-1.5-pro"
DATABASE_URL="file:./dev.db"
```

⚠️ **PENTING**: 
- Gunakan quotes ("...")
- Tidak ada spasi sebelum/sesudah =
- Ganti dengan API key Anda yang sebenarnya

### Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
# Kemudian start lagi
npm run dev
```

### Step 5: Test

1. Buka: http://localhost:3000
2. Klik "Mulai Analisis" atau "Tentukan Harga"
3. Isi form
4. Klik submit
5. Tunggu beberapa detik
6. ✅ Harusnya berhasil!

---

## 🧪 Test API Key

Untuk memastikan API key bekerja:

```bash
# Buat file test
echo 'const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent("Say hello in Indonesian");
  console.log("✅ Success:", result.response.text());
}

test().catch(err => console.error("❌ Error:", err.message));' > test-api.js

# Install dotenv jika belum
npm install dotenv

# Run test
node test-api.js

# Cleanup
rm test-api.js
```

**Expected output**:
```
✅ Success: Halo! Ada yang bisa saya bantu?
```

**Jika error**:
```
❌ Error: API_KEY_INVALID
```
→ API key salah, generate yang baru

---

## 🔧 Troubleshooting Lanjutan

### Error: "API key Gemini belum dikonfigurasi"

**Penyebab**: File .env tidak ada atau tidak terbaca

**Solusi**:
```bash
# 1. Pastikan .env ada di root folder (bukan di src/)
pwd  # Harus di root project
ls -la .env

# 2. Pastikan format benar
cat .env

# 3. Restart server
npm run dev
```

---

### Error: "API key Gemini tidak valid"

**Penyebab**: API key salah atau expired

**Solusi**:
1. Generate API key baru di https://makersuite.google.com/app/apikey
2. Replace di file .env
3. Restart server

---

### Error: "Model AI tidak ditemukan"

**Penyebab**: Model name salah

**Solusi**: Edit .env, gunakan salah satu:
```env
GEMINI_MODEL_NAME="gemini-1.5-pro"      # Recommended
# atau
GEMINI_MODEL_NAME="gemini-1.5-flash"    # Lebih cepat
# atau
GEMINI_MODEL_NAME="gemini-pro"          # Legacy
```

---

### Error: "Terlalu banyak permintaan"

**Penyebab**: Rate limit exceeded (60 requests/minute)

**Solusi**:
1. Tunggu 1 menit
2. Coba lagi
3. Jika sering terjadi, pertimbangkan upgrade ke paid plan

---

## 📋 Checklist

Sebelum submit issue, pastikan:

- [ ] File `.env` ada di root folder
- [ ] `GEMINI_API_KEY` terisi dengan API key valid
- [ ] API key dalam quotes ("...")
- [ ] Tidak ada spasi di sekitar =
- [ ] Server sudah di-restart setelah edit .env
- [ ] Test API key berhasil (lihat section Test API Key)
- [ ] Internet connection working
- [ ] Tidak ada firewall/VPN yang memblokir Google APIs

---

## 🎯 Verifikasi Setup

Gunakan script verifikasi otomatis:

```bash
npm run verify
```

Ini akan check semua requirement dan memberitahu apa yang perlu diperbaiki.

---

## 💡 Tips

### Untuk Development Lokal

1. **Jangan commit .env ke git**
   - .env sudah ada di .gitignore ✅
   - Jangan pernah `git add .env`

2. **Restart server setelah edit .env**
   - Environment variables hanya dibaca saat server start
   - Ctrl+C → npm run dev

3. **Gunakan .env.example sebagai template**
   - Jangan edit .env.example
   - Copy ke .env, lalu edit .env

### Untuk Vercel Deployment

1. **Jangan push .env ke GitHub**
   - Environment variables diset di Vercel dashboard
   - Settings → Environment Variables

2. **Add GEMINI_API_KEY di Vercel**
   - Key: `GEMINI_API_KEY`
   - Value: your-actual-api-key
   - Environment: Production, Preview, Development

3. **Redeploy setelah add env vars**
   - Deployments → Redeploy

---

## 🆘 Masih Error?

1. **Check logs**:
   - Browser console (F12)
   - Terminal (tempat npm run dev)
   - Vercel logs (untuk deployment)

2. **Baca dokumentasi lengkap**:
   - `TROUBLESHOOTING.md` - Troubleshooting detail
   - `SETUP.md` - Setup guide
   - `README.md` - Complete docs

3. **Open issue**:
   - https://github.com/galiihajiip/imphnen/issues
   - Include: error message, screenshot, steps to reproduce

---

## ✅ Success Indicators

Jika setup benar, Anda akan lihat:

1. **Di terminal**:
   ```
   ✓ Ready in 2.5s
   ○ Local: http://localhost:3000
   ```

2. **Di browser**:
   - Landing page muncul
   - Form bisa diisi
   - Submit berhasil
   - AI response muncul dalam 3-5 detik

3. **Di console** (F12):
   - Tidak ada error merah
   - API calls berhasil (status 200)

---

**Selamat coding! 🚀**

Jika masih ada masalah, jangan ragu untuk open issue atau contact support.
