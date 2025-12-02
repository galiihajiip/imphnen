# 🚨 CRITICAL: Model Availability Issue

## Problem

The Gemini API models are not available in the v1beta endpoint that the SDK is using.

## 🔍 Find Available Models

Run this command to test which models work with your API key:

```bash
npm run test:models
```

This will test all possible model names and tell you which one works.

## ✅ Quick Fix

### Step 1: Test Models

```bash
# Make sure you have .env file with your API key
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Test which models are available
npm run test:models
```

### Step 2: Update .env

The script will tell you which model works. Update your `.env`:

```env
GEMINI_API_KEY="your-api-key"
GEMINI_MODEL_NAME="gemini-1.5-flash-latest"  # Or whatever the script says works
```

### Step 3: Restart

```bash
npm run dev
```

## 🎯 Models to Try (in order)

1. `gemini-1.5-flash-latest` ← Try this first
2. `gemini-1.5-pro-latest`
3. `models/gemini-1.5-flash-latest`
4. `models/gemini-1.5-pro-latest`

## 🔧 Manual Test

If the script doesn't work, test manually:

```bash
cat > manual-test.js << 'EOF'
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Try this model name
  const modelName = "gemini-1.5-flash-latest";
  console.log("Testing:", modelName);
  
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say hello");
    console.log("✅ WORKS!");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.log("❌ FAILED:", error.message);
  }
}

test();
EOF

node manual-test.js
rm manual-test.js
```

## 🆘 If Nothing Works

### Option 1: Check API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Generate a NEW API key
3. Make sure it's for "Gemini API" (not other Google APIs)
4. Update .env with new key

### Option 2: Check Region

Gemini might not be available in your region. Try:
1. Using a VPN
2. Using a different Google account
3. Checking Google AI Studio for availability

### Option 3: Use Different SDK Version

Try updating the SDK:

```bash
npm install @google/generative-ai@latest
```

Then test again:
```bash
npm run test:models
```

## 📊 Expected Output

When the test script works, you should see:

```
🔍 Testing available Gemini models...

Testing: gemini-1.5-flash-latest
✅ WORKS! Response: Hello! How can I help you today?...

📊 RESULTS:

✅ Working models:
   - gemini-1.5-flash-latest

💡 Update your .env file:
   GEMINI_MODEL_NAME="gemini-1.5-flash-latest"
```

## 🎯 After Finding Working Model

1. Update `.env` with the working model name
2. Restart dev server: `npm run dev`
3. Test the app in browser
4. Should work now! ✅

## 📝 Common Issues

### Issue: "API key not found"
→ Make sure `.env` file exists and has `GEMINI_API_KEY`

### Issue: "All models failed"
→ API key might be invalid or region-restricted

### Issue: "Rate limit"
→ Wait 1 minute between tests

### Issue: "Network error"
→ Check internet connection and firewall

## 💡 Pro Tip

Once you find a working model, add it to your documentation and share with your team so they don't have to test again.

## 🚀 For Vercel

Once you find the working model locally, use the same model name in Vercel environment variables:

```
GEMINI_MODEL_NAME=gemini-1.5-flash-latest
```

---

**Run `npm run test:models` now to find your working model!**
