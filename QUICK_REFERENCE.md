# ⚡ Quick Reference Guide

## 🚀 Common Commands

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio (database GUI)
npm run db:studio

# Verify setup
npm run verify
```

---

## 📁 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page |
| `src/app/dashboard/page.tsx` | Main dashboard |
| `src/app/api/profit/route.ts` | Profit analysis API |
| `src/app/api/pricing/route.ts` | Pricing decision API |
| `src/domain/finance/profitCalculator.ts` | Profit calculation logic |
| `src/domain/finance/pricingEngine.ts` | Pricing calculation logic |
| `src/server/ai/llmClient.ts` | Gemini AI client |
| `src/services/financeService.ts` | Service orchestration |
| `prisma/schema.prisma` | Database schema |
| `.env` | Environment variables (SECRET!) |

---

## 🔧 Environment Variables

```env
GEMINI_API_KEY="your-api-key-here"
GEMINI_MODEL_NAME="gemini-pro"
DATABASE_URL="file:./dev.db"
```

**Get API Key**: https://makersuite.google.com/app/apikey

---

## 🏗 Architecture Quick View

```
Client (React)
    ↓
API Routes (/api/profit, /api/pricing)
    ↓
Service Layer (financeService.ts)
    ↓
┌─────────────┬──────────────┬──────────────┐
│   Domain    │   AI Layer   │   Database   │
│   Logic     │   (Gemini)   │   (Prisma)   │
└─────────────┴──────────────┴──────────────┘
```

---

## 🎯 API Endpoints

### POST /api/profit
**Request**:
```json
{
  "salesTotal": 5000000,
  "cogsTotal": 3000000,
  "operationalCost": 1000000
}
```

**Response**:
```json
{
  "profit": 1000000,
  "profitMargin": 20,
  "status": "profit",
  "insightText": "AI generated insight..."
}
```

### POST /api/pricing
**Request**:
```json
{
  "productName": "Kue Brownies",
  "costPerUnit": 15000,
  "currentPrice": 25000,
  "desiredMarginMin": 20,
  "desiredMarginMax": 40
}
```

**Response**:
```json
{
  "currentMargin": 40,
  "suggestedPrices": [
    {
      "price": 19000,
      "margin": 20,
      "label": "Konservatif",
      "description": "..."
    }
  ],
  "adviceText": "AI generated advice..."
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@prisma/client'"
**Solution**:
```bash
npm run db:push
```

### Issue: "GEMINI_API_KEY is not set"
**Solution**:
1. Create `.env` file: `cp .env.example .env`
2. Add your API key to `.env`

### Issue: "Port 3000 already in use"
**Solution**:
```bash
PORT=3001 npm run dev
```

### Issue: Build fails
**Solution**:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Issue: Database locked
**Solution**:
```bash
rm prisma/dev.db
npm run db:push
```

---

## 📊 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Test Files**:
- `src/domain/finance/__tests__/profitCalculator.test.ts`
- `src/domain/finance/__tests__/pricingEngine.test.ts`

---

## 🎨 Design System

### Colors
```css
--background: #0B1120
--surface: #111827
--input: #1F2937
--primary: #22C55E (green)
--warning: #F59E0B (orange)
--danger: #EF4444 (red)
--border: #374151
```

### Font
- **Family**: Plus Jakarta Sans
- **Base**: text-gray-200

### Components
- **Cards**: rounded-2xl, border, shadow
- **Buttons**: rounded-full, pill-shaped
- **Inputs**: rounded-xl, border

---

## 📦 Dependencies

### Production
- `next` - Framework
- `react` - UI library
- `@prisma/client` - Database ORM
- `@google/generative-ai` - Gemini AI SDK
- `@tanstack/react-query` - Async state
- `react-hook-form` - Form management
- `zod` - Validation

### Development
- `typescript` - Type safety
- `tailwindcss` - Styling
- `prisma` - Database toolkit
- `jest` - Testing

---

## 🚀 Deployment URLs

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

### Netlify
```bash
netlify deploy --prod
```

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Main documentation |
| `SETUP.md` | Quick setup guide |
| `ARCHITECTURE.md` | Architecture details |
| `DEPLOYMENT.md` | Deployment guide |
| `CONTRIBUTING.md` | Contribution guide |
| `HACKATHON_CHECKLIST.md` | Submission checklist |
| `PROJECT_SUMMARY.md` | Project overview |
| `docs/VIDEO_SCRIPT.md` | Video demo script |

---

## 🎥 Video Demo Structure

1. **Intro** (30s) - Problem & solution
2. **Profit Analysis** (90s) - Demo feature 1
3. **Pricing Decision** (90s) - Demo feature 2
4. **Architecture** (60s) - Tech explanation
5. **Deployment** (30s) - Live demo
6. **Closing** (30s) - Summary

**Total**: 3-5 minutes

---

## 🔒 Security Checklist

- [x] API key in `.env` (not hardcoded)
- [x] `.env` in `.gitignore`
- [x] Server-side AI calls only
- [x] Input validation with Zod
- [x] Error messages sanitized
- [x] No sensitive data in logs

---

## 📈 Performance Tips

1. **Use React Query** - Automatic caching
2. **Optimize images** - Use Next.js Image
3. **Lazy load** - Code splitting
4. **Cache AI responses** - Reduce API calls
5. **Database indexes** - Faster queries

---

## 🎯 Feature Roadmap

### Phase 1 (Current)
- ✅ Profit Analysis
- ✅ Pricing Decision

### Phase 2 (Future)
- [ ] Historical data tracking
- [ ] Export to PDF
- [ ] Multi-language support

### Phase 3 (Future)
- [ ] WhatsApp integration
- [ ] Voice input
- [ ] Inventory management

---

## 💡 Pro Tips

1. **Use Prisma Studio** to inspect database:
   ```bash
   npm run db:studio
   ```

2. **Use React DevTools** for debugging components

3. **Use Network tab** in browser to debug API calls

4. **Use TypeScript** - Catch errors early

5. **Write tests** - Confidence in refactoring

---

## 📞 Quick Links

- **Gemini API**: https://makersuite.google.com/app/apikey
- **Vercel**: https://vercel.com
- **Railway**: https://railway.app
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 Success Metrics

- ✅ Both features working
- ✅ AI responses meaningful
- ✅ UI responsive
- ✅ No errors in console
- ✅ Tests passing
- ✅ Build succeeds
- ✅ Deployed successfully

---

**Keep this file handy during development! 📌**
