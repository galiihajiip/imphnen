# 🎯 FINAL SETUP GUIDE - AI Financial Co-Pilot

## ✅ CORRECT Configuration (December 2024)

### Step 1: Get API Key

1. Visit: **https://makersuite.google.com/app/apikey**
2. Login with Google account
3. Click **"Create API Key"**
4. Copy the API key

### Step 2: Create .env File

```bash
cp .env.example .env
```

### Step 3: Edit .env with CORRECT Model Name

Open `.env` and add:

```env
# Gemini API Configuration
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
GEMINI_MODEL_NAME="gemini-1.5-flash"

# Database
DATABASE_URL="file:./dev.db"
```

### Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Step 5: Test

1. Open: http://localhost:3000
2. Try "Analisis Profit" feature
3. Fill the form
4. Click submit
5. ✅ Should work now!

---

## 🎯 CORRECT Model Names

### ✅ USE THESE:

```env
GEMINI_MODEL_NAME="gemini-1.5-flash"    # Fast (recommended)
```

OR

```env
GEMINI_MODEL_NAME="gemini-1.5-pro"      # More capable
```

### ❌ DO NOT USE:

- `gemini-pro` ← Deprecated, will fail
- `gemini-1.5-flash-latest` ← Not supported in SDK
- `gemini-1.5-pro-latest` ← Not supported in SDK
- Any model with `-latest` suffix

---

## 🔍 Why Previous Models Failed

| Model Name | Status | Error |
|------------|--------|-------|
| `gemini-1.5-pro` (with -latest) | ❌ | Not found in v1beta |
| `gemini-pro` | ❌ | Deprecated, not available |
| `gemini-1.5-flash` | ✅ | **WORKS!** |
| `gemini-1.5-pro` (without -latest) | ✅ | **WORKS!** |

---

## 🧪 Test Your Setup

Run this test to verify:

```bash
# Create test file
cat > test-gemini.js << 'EOF'
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  try {
    console.log("API Key:", process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Not set");
    console.log("Model:", process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash");
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-flash"
    });
    
    console.log("\nTesting AI...");
    const result = await model.generateContent("Say hello in Indonesian");
    
    console.log("\n✅ SUCCESS!");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.log("\nTroubleshooting:");
    console.log("1. Check your API key is valid");
    console.log("2. Make sure GEMINI_MODEL_NAME is 'gemini-1.5-flash' or 'gemini-1.5-pro'");
    console.log("3. Restart your server after editing .env");
  }
}

test();
EOF

# Install dotenv if needed
npm install dotenv

# Run test
node test-gemini.js

# Cleanup
rm test-gemini.js
```

**Expected output**:
```
API Key: ✅ Set
Model: gemini-1.5-flash

Testing AI...

✅ SUCCESS!
Response: Halo! Ada yang bisa saya bantu?
```

---

## 🚀 For Vercel Deployment

1. **Go to Vercel Dashboard**
2. **Your Project → Settings → Environment Variables**
3. **Add these**:
   ```
   GEMINI_API_KEY = your-actual-api-key
   GEMINI_MODEL_NAME = gemini-1.5-flash
   ```
4. **Redeploy**

---

## 📋 Complete Checklist

Before running the app:

- [ ] API key obtained from Google AI Studio
- [ ] `.env` file created (copied from `.env.example`)
- [ ] `GEMINI_API_KEY` set in `.env`
- [ ] `GEMINI_MODEL_NAME` set to `gemini-1.5-flash` or `gemini-1.5-pro`
- [ ] NO `-latest` suffix in model name
- [ ] NOT using deprecated `gemini-pro`
- [ ] Dependencies installed (`npm install`)
- [ ] Database setup (`npm run db:push`)
- [ ] Server restarted after editing `.env`
- [ ] Test script runs successfully

---

## 🎯 Model Comparison

| Model | Speed | Quality | Cost | Recommended For |
|-------|-------|---------|------|-----------------|
| `gemini-1.5-flash` | ⚡⚡⚡ Fast | ⭐⭐⭐ Good | 💰 Cheap | **Hackathon demo** |
| `gemini-1.5-pro` | ⚡ Slower | ⭐⭐⭐⭐⭐ Excellent | 💰💰 More expensive | Production |

**For hackathon**: Use `gemini-1.5-flash` - it's fast enough and works great!

---

## 🆘 Still Getting Errors?

### Error: "API key not configured"
→ Check `.env` file exists and has `GEMINI_API_KEY`

### Error: "Model not found"
→ Make sure you're using `gemini-1.5-flash` (NOT `gemini-pro`)

### Error: "Invalid API key"
→ Generate new API key from Google AI Studio

### Error: "Rate limit"
→ Wait 1 minute and try again

---

## 💡 Pro Tips

1. **Always restart server** after editing `.env`:
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

2. **Use verification script**:
   ```bash
   npm run verify
   ```

3. **Check logs** if something fails:
   - Browser console (F12)
   - Terminal where `npm run dev` is running

4. **For Vercel**, environment variables are separate from local `.env`

---

## 📚 Documentation

- **MODEL_FIX.md** - Detailed explanation of model issues
- **FIX_AI_ERROR.md** - Quick fixes for AI errors
- **TROUBLESHOOTING.md** - Complete troubleshooting guide
- **SETUP.md** - Initial setup guide
- **README.md** - Complete documentation

---

## ✅ Success Indicators

When everything is working:

1. **Terminal shows**:
   ```
   ✓ Ready in 2.5s
   ○ Local: http://localhost:3000
   ```

2. **Browser shows**:
   - Landing page loads
   - Forms work
   - Submit button works
   - AI response appears in 3-5 seconds

3. **No errors in**:
   - Browser console (F12)
   - Terminal logs

---

## 🎉 You're Ready!

Once the test passes:

1. ✅ App is working locally
2. 🎥 Record video demo
3. 🚀 Deploy to Vercel
4. 📝 Submit to hackathon

---

**Last Updated**: December 2024  
**Model**: gemini-1.5-flash (stable)  
**Status**: ✅ WORKING

**Repository**: https://github.com/galiihajiip/imphnen
