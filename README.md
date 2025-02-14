# Gramify - Grammar Correction Chrome Extension

Gramify is a Chrome extension that helps you fix grammar mistakes in any text on the web with a simple keyboard shortcut.

## Features

- Quick grammar correction with Ctrl+G (Windows/Linux) or ⌘+G (Mac)
- Powered by MistralAI for accurate corrections
- Visual feedback with subtle highlighting
- Works on any webpage
- Simple and intuitive interface

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MistralAI API key:
   ```
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```
4. Build the extension:
   ```bash
   npm run build
   ```
5. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory from this project

## Development

1. Start the development server:
   ```bash
   npm run server
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Deployment

The backend server can be deployed to Vercel:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Update the `API_URL` in `src/background.js` with your Vercel deployment URL

## Usage

1. Select any text on a webpage
2. Press Ctrl+G (Windows/Linux) or ⌘+G (Mac)
3. The text will be automatically corrected with proper grammar

## Tech Stack

- JavaScript
- Express.js
- LangChain
- MistralAI
- Vite
- Vercel (for backend deployment)

## License

MIT