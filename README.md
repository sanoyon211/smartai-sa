# SmartChat AI

SmartChat AI is a premium, full-stack AI chatbot web application built with Next.js 14, Better Auth, Prisma, and Anthropic's Claude API.

## Features

- **Authentication**: Robust authentication system using Better Auth (Google Social & Email/Password).
- **AI Integration**: Real-time streaming responses from Anthropic Claude (claude-3-5-sonnet).
- **Database**: Conversation history and message persistence with PostgreSQL and Prisma.
- **Modern UI**: Sleek, dark-themed responsive design with Tailwind CSS.
- **Markdown Support**: Rich text rendering for AI responses.
- **Session Management**: Persistent chat sessions organized in a sidebar.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (Pure JS, no TypeScript)
- **Styling**: Tailwind CSS
- **Auth**: Better Auth
- **Database**: PostgreSQL + Prisma ORM
- **AI SDK**: @anthropic-ai/sdk
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
DATABASE_URL="your-postgresql-url"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
ANTHROPIC_API_KEY="your-anthropic-key"
```

### 3. Setup Database
```bash
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```

## Google Cloud Console Setup (OAuth)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Configure the OAuth Consent Screen (External).
4. Create OAuth 2.0 Client IDs (Web application).
5. Add Authorized Redirect URIs: `http://localhost:3000/api/auth/callback/google` (and your production URL).

## Better Auth Schema Generation
The database schema for Better Auth was generated using:
```bash
npx better-auth generate
```
The output was then integrated into `prisma/schema.prisma`.

## Deployment (Vercel)
1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Add a **Vercel Postgres** storage to your project.
4. Set the environment variables in Vercel project settings.
5. Deploy!

---

Built with ❤️ by Antigravity
