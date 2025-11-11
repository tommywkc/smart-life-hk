
# Smart Life HK — Quick Start

This repository contains a simple React application. The following instructions show how to run the project locally.

## Prerequisites

- Node.js >= 14 (Node 16 or 18 recommended)
- npm (comes with Node.js)
- A code editor such as VS Code is recommended

## Run locally (development)

Open a terminal in the project root (zsh):

```bash
npm install
npm start
```

After the dev server starts, open your browser at http://localhost:3000

## Common scripts

- Install dependencies:

```bash
npm install
```

- Start dev server:

```bash
npm start
```

- Run tests:

```bash
npm test
```

- Build for production:

```bash
npm run build
```

## Key files (quick reference)

- `src/components/CheckInPage.js` — Check-in page ("Redeem Reward" button was added)
- `src/styles/CheckInPage.css` — Styles for the check-in page

## Troubleshooting

- If startup fails or you encounter dependency issues, try removing `node_modules` and the lock file, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

- To change the default port (if 3000 is in use):

```bash
# macOS / zsh
export PORT=3001
npm start
```
