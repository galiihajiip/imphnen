# 🏗 Arsitektur Aplikasi

## Overview

AI Financial Co-Pilot menggunakan **Clean Architecture** dengan pemisahan concerns yang jelas.

## Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                     │
│  - Next.js Pages (App Router)                           │
│  - React Components                                     │
│  - Forms & UI                                           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests
┌────────────────────▼────────────────────────────────────┐
│                     API LAYER                           │
│  - Next.js API Routes                                   │
│  - Request validation (Zod)                             │
│  - Error handling                                       │
└────────────────────┬────────────────────────────────────┘
                     │ Function Calls
┌────────────────────▼────────────────────────────────────┐
│                   SERVICE LAYER                         │
│  - Business orchestration                               │
│  - Coordinates domain, AI, and database                 │
└─────┬──────────────┬──────────────┬─────────────────────┘
      │              │              │
┌─────▼─────┐  ┌────▼─────┐  ┌─────▼──────┐
│  DOMAIN   │  │ AI LAYER │  │  DATABASE  │
│  LOGIC    │  │          │  │   LAYER    │
│           │  │ - Gemini │  │  - Prisma  │
│ Pure TS   │  │ - Prompts│  │  - SQLite  │
│ No deps   │  │          │  │            │
└───────────┘  └──────────┘  └────────────┘
```

## Layer Details

### 1. Presentation Layer

**Location**: `src/app/`, `src/components/`

**Responsibilities**:
- Render UI
- Handle user input
- Display data
- Client-side state management

**Key Files**:
- `app/page.tsx` - Landing page
- `app/dashboard/page.tsx` - Main dashboard
- `components/features/ProfitAnalysisForm.tsx`
- `components/features/PricingDecisionForm.tsx`

**Technologies**:
- Next.js 14 App Router
- React Hook Form
- TanStack Query
- TailwindCSS

---

### 2. API Layer

**Location**: `src/app/api/`

**Responsibilities**:
- Receive HTTP requests
- Validate input (Zod schemas)
- Call service layer
- Return JSON responses
- Handle errors

**Key Files**:
- `api/profit/route.ts` - POST /api/profit
- `api/pricing/route.ts` - POST /api/pricing

**Flow**:
```
Client Request → Validation → Service Call → Response
```

---

### 3. Service Layer

**Location**: `src/services/`

**Responsibilities**:
- Orchestrate business operations
- Coordinate domain logic, AI, and database
- Transaction management
- Error handling

**Key Files**:
- `services/financeService.ts`

**Functions**:
- `analyzeProfitWithAI()` - Orchestrates profit analysis
- `generatePricingAdviceWithAI()` - Orchestrates pricing decision

**Flow**:
```
1. Call domain logic (pure calculation)
2. Generate AI prompt
3. Call AI API
4. Save to database
5. Return result
```

---

### 4. Domain Layer

**Location**: `src/domain/finance/`

**Responsibilities**:
- Pure business logic
- No external dependencies
- Fully testable
- Framework-agnostic

**Key Files**:
- `models.ts` - Type definitions
- `profitCalculator.ts` - Profit calculation logic
- `pricingEngine.ts` - Pricing calculation logic

**Principles**:
- ✅ Pure functions
- ✅ No side effects
- ✅ No framework dependencies
- ✅ 100% test coverage

---

### 5. AI Layer

**Location**: `src/server/ai/`

**Responsibilities**:
- Integrate with Gemini AI
- Build prompts
- Handle AI responses
- Error handling

**Key Files**:
- `llmClient.ts` - Gemini API client
- `prompts/profitInsightPrompt.ts`
- `prompts/pricingAdvicePrompt.ts`

**Security**:
- ✅ Server-side only
- ✅ API key in environment variables
- ✅ Never exposed to client

---

### 6. Database Layer

**Location**: `src/db/`, `prisma/`

**Responsibilities**:
- Data persistence
- Schema management
- Query execution

**Key Files**:
- `db/client.ts` - Prisma client singleton
- `prisma/schema.prisma` - Database schema

**Models**:
- `ProfitAnalysis` - Stores profit analysis results
- `PricingDecision` - Stores pricing decisions

---

## Data Flow

### Profit Analysis Flow

```
User Input (Form)
    ↓
POST /api/profit
    ↓
Validate Input (Zod)
    ↓
financeService.analyzeProfitWithAI()
    ↓
┌─────────────────────────────────┐
│ 1. calculateProfit()            │ ← Domain Logic
│    (Pure calculation)           │
├─────────────────────────────────┤
│ 2. buildProfitInsightPrompt()   │ ← Build Prompt
├─────────────────────────────────┤
│ 3. generateAIResponse()         │ ← Call Gemini
├─────────────────────────────────┤
│ 4. prisma.profitAnalysis.create │ ← Save to DB
└─────────────────────────────────┘
    ↓
Return JSON Response
    ↓
Display in UI
```

### Pricing Decision Flow

```
User Input (Form)
    ↓
POST /api/pricing
    ↓
Validate Input (Zod)
    ↓
financeService.generatePricingAdviceWithAI()
    ↓
┌─────────────────────────────────┐
│ 1. calculatePricing()           │ ← Domain Logic
│    (Generate price options)     │
├─────────────────────────────────┤
│ 2. buildPricingAdvicePrompt()   │ ← Build Prompt
├─────────────────────────────────┤
│ 3. generateAIResponse()         │ ← Call Gemini
├─────────────────────────────────┤
│ 4. prisma.pricingDecision.create│ ← Save to DB
└─────────────────────────────────┘
    ↓
Return JSON Response
    ↓
Display in UI
```

---

## Design Patterns

### 1. Dependency Injection

Service layer receives dependencies (could be mocked for testing):

```typescript
// Could be extended to:
export async function analyzeProfitWithAI(
  input: ProfitInput,
  aiClient = generateAIResponse,
  db = prisma
) {
  // ...
}
```

### 2. Repository Pattern

Database access abstracted through Prisma:

```typescript
await prisma.profitAnalysis.create({ data })
```

### 3. Strategy Pattern

Different pricing strategies (conservative, balanced, aggressive):

```typescript
const strategies = [
  { label: "Konservatif", margin: desiredMarginMin },
  { label: "Seimbang", margin: avgMargin },
  { label: "Agresif", margin: desiredMarginMax },
];
```

---

## Security Architecture

### API Key Protection

```
Environment Variable (.env)
    ↓
Server-side Only (llmClient.ts)
    ↓
Never sent to client
```

### Input Validation

```
User Input
    ↓
Zod Schema Validation
    ↓
Type-safe Processing
```

### Error Handling

```
Try-Catch in API Routes
    ↓
Sanitized Error Messages
    ↓
No sensitive data leaked
```

---

## Scalability Considerations

### Current Architecture

- ✅ Modular and maintainable
- ✅ Easy to test
- ✅ Clear separation of concerns

### Future Enhancements

1. **Caching Layer**
   - Redis for AI response caching
   - Reduce API calls

2. **Queue System**
   - Bull/BullMQ for async processing
   - Handle high load

3. **Microservices**
   - Separate AI service
   - Independent scaling

4. **Database**
   - PostgreSQL for production
   - Better concurrency

---

## Testing Strategy

### Unit Tests

- Domain layer (100% coverage)
- Pure functions
- No mocks needed

### Integration Tests

- API routes
- Service layer
- Mock AI responses

### E2E Tests

- Full user flows
- Cypress/Playwright

---

## Performance Optimization

### Current Optimizations

1. **React Query** - Caching & deduplication
2. **Next.js** - Server-side rendering
3. **TailwindCSS** - Purged CSS
4. **SQLite** - Fast local database

### Future Optimizations

1. **AI Response Caching** - Cache similar queries
2. **Database Indexing** - Faster queries
3. **CDN** - Static asset delivery
4. **Image Optimization** - Next.js Image component

---

## Monitoring & Observability

### Recommended Tools

1. **Sentry** - Error tracking
2. **Vercel Analytics** - Performance monitoring
3. **Prisma Studio** - Database inspection
4. **LogRocket** - Session replay

---

**Architecture designed for: Maintainability, Testability, Scalability**
