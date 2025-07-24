# leximind-web-app
This is a web app called Leximind, which aims to help students improve their English reading.

## Features

### News sources
Leximind uses [Theconversation](theconversation.com)'s news.

### 📰 News Reading
- Fetches latest articles from The Conversation
- Clean, distraction-free reading interface
- Mobile-responsive design

### 🔤 Interactive Reading Experience
- Click on any paragraph to get instant translation
- Detailed grammar analysis for each sentence
- Vocabulary explanations with context
- Smart sentence-level learning instead of word-by-word translation

### 🎯 Learning Tools
- **Grammar Points**: Comprehensive grammar analysis for each paragraph
- **Vocabulary Highlights**: Key words and phrases with explanations
- **Contextual Translation**: Natural, context-aware translations
- **Progressive Learning**: Build reading skills gradually

## Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React icons
- **Security**: DOMPurify for HTML sanitization
- **API**: Gemini API（model: gemini-2.0-flash-001）

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/zc-0120/leximind-web-app.git
cd leximind-web-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Add the gemini API-KEY to `/api/v1/trans/route.ts`.

4. Run the development server
```bash
npm run dev
# or
bun dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage
1. **Browse Articles**: View the latest articles from The Conversation on the home page
2. **Select Article**: Click on any article to open it in reading mode
3. **Interactive Reading**: Click on any paragraph to see:
   - Chinese translation（中文翻譯）
   - Grammar analysis（句子文法解析）
   - Vocabulary explanations（單字重點整理）
4. **Learn Progressively**: Use the detailed explanations to improve your English comprehension.
