#!/usr/bin/env node

/**
 * Test script to find available Gemini models
 * Run: node test-available-models.js
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env file");
  console.log("\n1. Create .env file: cp .env.example .env");
  console.log("2. Add your API key to .env");
  console.log("3. Run this script again");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Models to test (including Gemini 2.0 and experimental models)
const modelsToTest = [
  // Gemini 2.0 (Latest - December 2024)
  "gemini-2.0-flash-exp",
  "gemini-exp-1206",
  "gemini-exp-1121",
  
  // Gemini 1.5 (Stable)
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  
  // Legacy
  "gemini-pro",
  
  // With models/ prefix
  "models/gemini-2.0-flash-exp",
  "models/gemini-1.5-flash-latest",
  "models/gemini-1.5-pro-latest",
];

async function testModel(modelName) {
  try {
    console.log(`\nTesting: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say hello");
    const text = result.response.text();
    console.log(`✅ WORKS! Response: ${text.substring(0, 50)}...`);
    return true;
  } catch (error) {
    console.log(`❌ Failed: ${error.message.substring(0, 100)}`);
    return false;
  }
}

async function main() {
  console.log("🔍 Testing available Gemini models...\n");
  console.log("API Key:", API_KEY.substring(0, 10) + "..." + API_KEY.substring(API_KEY.length - 5));
  console.log("SDK Version: @google/generative-ai@0.21.0\n");
  console.log("=" .repeat(60));

  const workingModels = [];

  for (const modelName of modelsToTest) {
    const works = await testModel(modelName);
    if (works) {
      workingModels.push(modelName);
    }
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("\n" + "=".repeat(60));
  console.log("\n📊 RESULTS:\n");

  if (workingModels.length > 0) {
    console.log("✅ Working models:");
    workingModels.forEach(model => {
      console.log(`   - ${model}`);
    });
    console.log("\n💡 Update your .env file:");
    console.log(`   GEMINI_MODEL_NAME="${workingModels[0]}"`);
  } else {
    console.log("❌ No working models found!");
    console.log("\nPossible issues:");
    console.log("1. API key is invalid or expired");
    console.log("2. API key doesn't have access to Gemini models");
    console.log("3. Regional restrictions");
    console.log("\nTry:");
    console.log("1. Generate a new API key at: https://makersuite.google.com/app/apikey");
    console.log("2. Make sure you're using a Google account with Gemini access");
    console.log("3. Check if Gemini is available in your region");
  }

  console.log("\n" + "=".repeat(60));
}

main().catch(console.error);
