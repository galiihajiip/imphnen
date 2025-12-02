# 🤝 Panduan Kontribusi

Terima kasih ingin berkontribusi ke AI Financial Co-Pilot!

## Cara Berkontribusi

### 1. Fork & Clone

```bash
git clone https://github.com/your-username/ai-financial-copilot-umkm.git
cd ai-financial-copilot-umkm
```

### 2. Create Branch

```bash
git checkout -b feature/nama-fitur-anda
```

### 3. Make Changes

- Ikuti code style yang ada
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika perlu

### 4. Test

```bash
npm test
npm run build
```

### 5. Commit

Gunakan conventional commits:

```bash
git commit -m "feat: tambah fitur X"
git commit -m "fix: perbaiki bug Y"
git commit -m "docs: update README"
```

### 6. Push & Pull Request

```bash
git push origin feature/nama-fitur-anda
```

Buat Pull Request di GitHub dengan deskripsi yang jelas.

---

## Code Style

### TypeScript

- Gunakan TypeScript strict mode
- Hindari `any`, gunakan proper types
- Export types dari `models.ts`

### React Components

- Functional components dengan hooks
- Props interface di atas component
- Gunakan `"use client"` directive jika perlu client-side

### Naming Conventions

- Components: `PascalCase` (e.g., `ProfitAnalysisForm`)
- Functions: `camelCase` (e.g., `calculateProfit`)
- Files: `camelCase.tsx` atau `kebab-case.ts`
- Constants: `UPPER_SNAKE_CASE`

---

## Struktur Commit

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Fitur baru
- `fix`: Bug fix
- `docs`: Dokumentasi
- `style`: Formatting
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

---

## Testing Guidelines

### Unit Tests

Semua domain logic harus punya tests:

```typescript
describe("calculateProfit", () => {
  it("should calculate profit correctly", () => {
    // Test implementation
  });
});
```

### Integration Tests

API routes harus di-test dengan mock data.

---

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.logs in production code
- [ ] No hardcoded values
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)

---

## Ide Kontribusi

### Fitur yang Bisa Ditambahkan

1. **Export PDF** - Export hasil analisis ke PDF
2. **Historical Data** - Lihat riwayat analisis
3. **Multi-language** - Support bahasa daerah
4. **Voice Input** - Input dengan suara
5. **WhatsApp Integration** - Kirim hasil via WhatsApp
6. **Inventory Management** - Kelola stok barang
7. **Cash Flow Prediction** - Prediksi arus kas
8. **Competitor Analysis** - Analisis harga kompetitor

### Bug Fixes

Cek [Issues](https://github.com/your-repo/issues) untuk bug yang perlu diperbaiki.

---

## Questions?

Buka issue atau hubungi maintainer.

**Terima kasih atas kontribusinya! 🙏**
