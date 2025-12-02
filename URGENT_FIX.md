# 🚨 URGENT FIX - SDK Version Issue

## Problem

The SDK version 0.21.0 uses v1beta API endpoint where NO models are available.

## ✅ SOLUTION: Upgrade SDK

### Step 1: Update SDK

```bash
npm install @google/generative-ai@latest
```

### Step 2: Update .env

```env
GEMINI_API_KEY="your-api-key-here"
GEMINI_MODEL_NAME="gemini-1.5-flash-latest"
DATABASE_URL="file:./dev.db"
```

### Step 3: Test

```bash
npm run test:models
```

### Step 4: Run

```bash
npm run dev
```

## 🎯 Expected Result

After upgrading SDK, the models should be available.

## 📊 SDK Versions

| Version | API Endpoint | Models Available |
|---------|-------------|------------------|
| 0.21.0 | v1beta | ❌ None |
| 0.22.0+ | v1 | ✅ gemini-1.5-flash-latest, etc |

## 🔧 If Still Fails

Try these models in order:

1. `gemini-1.5-flash-latest`
2. `gemini-1.5-pro-latest`  
3. `gemini-1.5-flash`
4. `gemini-1.5-pro`

Update `.env` with whichever works.

## 💡 Quick Test

```bash
cat > test-sdk.js << 'EOF'
const { GoogleGenerativeAI } = require("@google/generative-ai");
const pkg = require("./package.json");

console.log("SDK Version:", pkg.dependencies["@google/generative-ai"]);

require("dotenv").config();

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  
  try {
    const result = await model.generateContent("Hello");
    console.log("✅ WORKS!");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.log("❌ FAILED:", error.message);
  }
}

test();
EOF

node test-sdk.js
rm test-sdk.js
```

---

**Run `npm install @google/generative-ai@latest` NOW!**
