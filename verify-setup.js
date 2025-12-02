#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if all required files and configurations are in place
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✓ ${description}`, colors.green);
    return true;
  } else {
    log(`✗ ${description} - MISSING`, colors.red);
    return false;
  }
}

function checkEnvFile() {
  const envExists = fs.existsSync('.env');
  if (!envExists) {
    log('✗ .env file not found', colors.red);
    log('  → Run: cp .env.example .env', colors.yellow);
    return false;
  }

  const envContent = fs.readFileSync('.env', 'utf8');
  
  if (!envContent.includes('GEMINI_API_KEY=') || envContent.includes('your-gemini-api-key-here')) {
    log('✗ GEMINI_API_KEY not configured in .env', colors.red);
    log('  → Get your API key from: https://makersuite.google.com/app/apikey', colors.yellow);
    return false;
  }

  log('✓ .env file configured', colors.green);
  return true;
}

function checkNodeModules() {
  const exists = fs.existsSync('node_modules');
  if (!exists) {
    log('✗ node_modules not found', colors.red);
    log('  → Run: npm install', colors.yellow);
    return false;
  }
  log('✓ Dependencies installed', colors.green);
  return true;
}

function checkPrismaClient() {
  const exists = fs.existsSync('node_modules/.prisma/client');
  if (!exists) {
    log('✗ Prisma client not generated', colors.red);
    log('  → Run: npm run db:push', colors.yellow);
    return false;
  }
  log('✓ Prisma client generated', colors.green);
  return true;
}

async function main() {
  log('\n🔍 Verifying AI Financial Co-Pilot Setup...\n', colors.blue);

  let allChecks = true;

  // Check critical files
  log('📁 Checking project structure...', colors.blue);
  allChecks &= checkFile('package.json', 'package.json');
  allChecks &= checkFile('tsconfig.json', 'tsconfig.json');
  allChecks &= checkFile('next.config.mjs', 'next.config.mjs');
  allChecks &= checkFile('tailwind.config.ts', 'tailwind.config.ts');
  allChecks &= checkFile('prisma/schema.prisma', 'Prisma schema');
  
  console.log();
  log('📦 Checking dependencies...', colors.blue);
  allChecks &= checkNodeModules();
  
  console.log();
  log('🔐 Checking environment configuration...', colors.blue);
  allChecks &= checkEnvFile();
  
  console.log();
  log('🗄️  Checking database setup...', colors.blue);
  allChecks &= checkPrismaClient();
  
  console.log();
  log('📄 Checking source files...', colors.blue);
  allChecks &= checkFile('src/app/page.tsx', 'Landing page');
  allChecks &= checkFile('src/app/dashboard/page.tsx', 'Dashboard page');
  allChecks &= checkFile('src/app/api/profit/route.ts', 'Profit API route');
  allChecks &= checkFile('src/app/api/pricing/route.ts', 'Pricing API route');
  allChecks &= checkFile('src/domain/finance/profitCalculator.ts', 'Profit calculator');
  allChecks &= checkFile('src/domain/finance/pricingEngine.ts', 'Pricing engine');
  allChecks &= checkFile('src/server/ai/llmClient.ts', 'AI client');
  allChecks &= checkFile('src/services/financeService.ts', 'Finance service');
  
  console.log();
  log('📚 Checking documentation...', colors.blue);
  allChecks &= checkFile('README.md', 'README');
  allChecks &= checkFile('SETUP.md', 'Setup guide');
  allChecks &= checkFile('DEPLOYMENT.md', 'Deployment guide');
  
  console.log();
  
  if (allChecks) {
    log('✅ All checks passed! You\'re ready to go!', colors.green);
    log('\n🚀 Next steps:', colors.blue);
    log('   1. Run: npm run dev', colors.yellow);
    log('   2. Open: http://localhost:3000', colors.yellow);
    log('   3. Test both features', colors.yellow);
    console.log();
  } else {
    log('❌ Some checks failed. Please fix the issues above.', colors.red);
    console.log();
    process.exit(1);
  }
}

main().catch(console.error);
