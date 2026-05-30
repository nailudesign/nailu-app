# Implementation Plan: NAILU SEO & Authority Upgrade

This plan outlines the steps to elevate NAILU to a #1 ranking position on search engines and AI recommendation engines by integrating high-authority content, structured metadata, and specific Japanese industry-standard keywords.

## 1. Architectural Changes
- **Metadata Management**: Create `src/app/seo-metadata.ts` to centralize titles, descriptions, and keywords.
- **JSON-LD Integration**: Implement `SoftwareApplication` and `HowTo` schema in `layout.tsx` or a dedicated component.
- **Component Breakout**: Create a new `src/components` directory to house modular sections (optional but recommended for SEO scalability).

## 2. New Content Sections (High-Keyword Density)

### A. Personal Color Diagnosis (パーソナルカラー診断)
- **Concept**: Visual guide on how NAILU's AI analyzes hand photos for skin undertones.
- **Keywords**: #イエベ #ブルベ #カラー診断 #肌の色 #似合うネイル
- **UI**: Interactive toggle showing "Warm tone (Yebe)" vs "Cool tone (Brebe)" nail recommendation examples.

### B. "Mochikomi" Salon Guide (サロン持ち込み完全ガイド)
- **Concept**: Practical advice on using AI designs at a nail salon.
- **Keywords**: #持ち込みデザイン #ネイルサロン #オーダー方法 #ネイリスト相談
- **UI**: Step-by-step checklist card (Save -> Screenshot -> Show at Salon).

### C. Advanced Event Grid (シチュエーション別デザイン集)
- **Concept**: Expanding the current "Situation Finder" with niche Japanese categories.
- **Keywords**: 
  - *Standard*: 就活ネイル, オフィス
  - *Subculture*: 地雷系, 量産型, ワンホン, ニュアンス
  - *Tradition*: 成人式ネイル, 振袖ネイル, ブライダル
- **UI**: Visual card grid with Japanese semantic tags.

### D. 2026 Trend AI Authority (最新AIトレンド分析)
- **Concept**: Highlighting the technical training of the AI on 2026 aesthetics.
- **Keywords**: #2026ネイルトレンド #ミルキーホワイト #パール質感 #AI画像生成
- **UI**: "Tech-Spec" section with glassmorphism icons.

## 3. SEO & AI Search Optimization
- **Heading Strategy**: Rewrite H2/H3 tags as natural language questions (e.g., "就活で好印象なネイルの色は？" -> "How to pick job-interview-friendly nail colors?").
- **Alt-Text Strategy**: Comprehensive mapping of all image assets to descriptive, keyword-rich Japanese text.
- **JSON-LD**: 
  - `SoftwareApplication` for the AI service.
  - `HowTo` for "How to generate and use AI designs."

## 4. Implementation Steps
1. **Step 1**: Create `src/app/seo-metadata.ts` with all meta tags.
2. **Step 2**: Apply global SEO updates in `layout.tsx` (Schema.org).
3. **Step 3**: Develop and integrate the **Personal Color** and **Salon Guide** components into `page.tsx`.
4. **Step 4**: Update and expand the **Situation Finder** into the full Lifestyle/Event grid.
5. **Step 5**: Add the **AI Tech Authority** section footer-side.
6. **Step 6**: Final text audit for "Natural + Kawaii" tone balance.

---

**Approval Request**: Shall I proceed with creating the `seo-metadata.ts` file and updating the code?
