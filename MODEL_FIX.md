# 🔧 Fix: Model Not Found Error

## ❌ Error Message

```
[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent: [404 Not Found] models/gemini-1.5-pro is not found for API version v1beta
```

## ✅ Solution

The model name `gemini-1.5-pro` is not available in the v1beta API version. Use `gemini-pro` instead.

### Quick Fix

1. **Edit your `.env` file**:
   ```env
   GEMINI_MODEL_NAME="gemini-pro"
   ```

2. **Restart your development server**:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

3. **Test again** - Should work now! ✅

---

## 📋 Correct Model Names

Use one of these stable model names:

### Recommended (Most Compatible)
```env
GEMINI_MODEL_NAME="gemini-pro"
```

### Alternative (If Available in Your Region)
```env
GEMINI_MODEL_NAME="gemini-1.5-flash-latest"
```

---

## 🔍 Why This Happens

- Different API versions support different models
- Model availability varies by region
- Some models are in preview/beta
- `gemini-pro` is the most stable and widely available

---

## ✅ Complete .env Configuration

Your `.env` file should look like this:

```env
# Gemini API Configuration
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
GEMINI_MODEL_NAME="gemini-pro"

# Database
DATABASE_URL="file:./dev.db"
```

---

## 🧪 Test Your Configuration

After updating, test with this command:

```bash
# Create test file
cat > test-model.js << 'EOF'
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL_NAME || "gemini-pro" 
    });
    
    console.log("Testing model:", process.env.GEMINI_MODEL_NAME);
    const result = await model.generateContent("Say hello in Indonesian");
    console.log("✅ Success!");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

test();
EOF

# Install dotenv if needed
npm install dotenv

# Run test
node test-model.js

# Cleanup
rm test-model.js
```

**Expected output**:
```
Testing model: gemini-pro
✅ Success!
Response: Halo! Ada yang bisa saya bantu?
```

---

## 🌍 Regional Availability

Model availability depends on your location:

| Model | Availability |
|-------|-------------|
| `gemini-pro` | ✅ Global (most stable) |
| `gemini-1.5-flash-latest` | ⚠️ Limited regions |
| `gemini-1.5-pro` | ❌ Not in v1beta API |

**Recommendation**: Always use `gemini-pro` for maximum compatibility.

---

## 🚀 For Vercel Deployment

When deploying to Vercel:

1. **Go to Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Add**:
   - Key: `GEMINI_MODEL_NAME`
   - Value: `gemini-pro`
   - Environment: All (Production, Preview, Development)
4. **Redeploy**

---

## 📚 Related Documentation

- `FIX_AI_ERROR.md` - General AI error fixes
- `TROUBLESHOOTING.md` - Complete troubleshooting guide
- `SETUP.md` - Initial setup guide

---

## ✅ Verification Checklist

After applying the fix:

- [ ] `.env` file has `GEMINI_MODEL_NAME="gemini-pro"`
- [ ] Development server restarted
- [ ] Test script runs successfully
- [ ] App works in browser
- [ ] AI responses generate correctly

---

## 💡 Pro Tips

1. **Don't use model names with version numbers** in v1beta API
   - ❌ `gemini-1.5-pro`
   - ✅ `gemini-pro`

2. **Check Google AI Studio** for available models:
   - Visit: https://makersuite.google.com/
   - Check model availability in your region

3. **Use environment variables** for easy switching:
   ```typescript
   const model = process.env.GEMINI_MODEL_NAME || "gemini-pro";
   ```

---

## 🆘 Still Not Working?

If you still get errors after using `gemini-pro`:

1. **Check your API key** is valid
2. **Verify internet connection**
3. **Check API quota** at Google AI Studio
4. **Try regenerating** your API key
5. **Check regional restrictions**

---

**This fix has been applied to the codebase and all documentation has been updated.**

**Default model is now: `gemini-pro`** ✅
