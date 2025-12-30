# Alynthe - Digital Growth & Automation Agency

## Overview

Alynthe is a production-ready landing page and lead generation platform for a digital growth and automation consultancy based in Indianapolis. The application features a premium, minimalist design inspired by Swiss typography principles with an Awwwards/Linear.app aesthetic.

The platform includes:
- Multi-page marketing website (Home, About, Services, Use Cases, Blog, Contact)
- AI-powered chatbot ("Sarah") for lead qualification and booking
- Lead capture system with email notifications
- Blog with thought leadership content

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animations**: Framer Motion for smooth, performant animations
- **UI Components**: shadcn/ui (Radix primitives) with New York style variant
- **State Management**: TanStack React Query for server state
- **Code Splitting**: Lazy loading with React Suspense for all pages

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/*`
- **Build System**: Vite for client, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with Zod schema validation
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Tables**: users, leads, conversations, messages

### Deployment Architecture
- **Platform**: Vercel with serverless functions
- **API Routes**: Separate function files in `/api` directory
- **Static Assets**: Built to `dist/public`
- **Environment Variables**: DATABASE_URL, OPENAI_API_KEY, RESEND_API_KEY

### Key Design Patterns
- Shared schema types between frontend and backend via `@shared/*` alias
- Path aliases: `@/*` for client, `@shared/*` for shared code
- Mobile-first responsive design with `useIsMobile` hook
- SEO optimization with dynamic meta tags via `useSEO` hook
- Schema.org structured data for local business SEO

## External Dependencies

### AI Integration
- **OpenAI API**: Powers the "Sarah" chatbot for lead qualification
- **Endpoint**: `POST /api/chat`
- **Model**: GPT for conversational AI with booking intent detection

### Email Service
- **Resend**: Transactional email delivery
- **Use Case**: Welcome emails to leads, admin notifications
- **From Address**: `no-reply@alynthe.com`

### Database
- **Neon**: Serverless PostgreSQL
- **Connection**: Via `DATABASE_URL` environment variable
- **Driver**: `@neondatabase/serverless` for Vercel edge compatibility

### Third-Party Services
- **Calendly**: Booking integration (linked from chatbot)
- **Google Fonts**: Inter typeface

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod`: Database ORM with type-safe schema
- `framer-motion`: Animation library
- `@tanstack/react-query`: Async state management
- `resend`: Email delivery
- `openai`: AI chat completions