# Constitutional AI Demo Tool

A sales enablement tool that demonstrates the differences between generic LLMs and Anthropic's Constitutional AI (Claude) through live, side-by-side API comparisons.

## Features

- 🏢 **Industry-specific scenarios**: Finance, Healthcare, Education, E-commerce, Legal, and HR
- ✏️ **Editable prompts**: Modify any scenario or create custom tests
- 🔄 **Live API calls**: Real-time responses from both GPT-4 and Claude
- 📊 **Side-by-side comparison**: Visual comparison of model outputs
- 🎯 **Sales-ready**: Built for live demos with prospects

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Get your API keys:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

### 3. Run Locally
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Build for Production
```bash
npm run build
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in project settings:
   - `VITE_OPENAI_API_KEY`
   - `VITE_ANTHROPIC_API_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Add environment variables in Site Settings → Environment Variables
4. Deploy!

## Usage

1. **Select an industry** or create a custom test
2. **Review or edit the prompt** to match your demo needs
3. **Run live comparison** to call both APIs
4. **Analyze differences** with your prospect in real-time

## Security

⚠️ **Never commit API keys to version control**

Always use environment variables for API keys. The `.gitignore` file is configured to exclude `.env` and `.env.local` files.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
- OpenAI API
- Anthropic API

## License

Proprietary - Internal Anthropic Sales Tool

RetryClaude does not have the ability to run the code it generates yet.KContinueQuick Start Commands
After creating all the files above, run these commands in your terminal:
```bash
# Navigate to your project directory
cd constitutional-ai-demo

# Install dependencies
npm install

# Create a .env.local file for local development (optional)
"VITE_OPENAI_API_KEY=your_key_here" > .env.local
"VITE_ANTHROPIC_API_KEY=your_key_here" >> .env.local

# Run locally (will show error until you add real API keys)
npm run dev
```
