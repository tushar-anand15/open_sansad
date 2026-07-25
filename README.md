# OpenSansad Frontend

Production-grade parliamentary data platform built with Next.js 14, TypeScript, and Material-UI.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev
```

Application runs at `http://localhost:3000`

## Project Structure

```
opensansad-frontend/
├── src/
│   ├── app/                      # Next.js 14 App Router pages
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Landing page
│   │   ├── auth/
│   │   │   ├── login/page.tsx    # Login page
│   │   │   └── signup/page.tsx   # Signup page
│   │   └── dashboard/
│   │       ├── page.tsx              # Dashboard home
│   │       ├── data-explorer/page.tsx # Data Explorer (dummy)
│   │       ├── sansad-buddy/page.tsx  # SansadBuddy chat (dummy)
│   │       ├── profile/page.tsx       # User profile
│   │       └── settings/page.tsx      # Settings
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardLayout.tsx    # Main layout with sidebar
│   │   │   └── DashboardSidebar.tsx   # Navigation sidebar
│   │   ├── shared/
│   │   │   ├── Iconify.tsx            # Icon wrapper
│   │   │   ├── LoadingScreen.tsx      # Loading state
│   │   │   └── EmptyState.tsx         # Empty state
│   │   └── hook-form/
│   │       ├── FormProvider.tsx       # React Hook Form wrapper
│   │       ├── RHFTextField.tsx       # Text field component
│   │       └── index.ts
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx            # Authentication state
│   │
│   ├── services/
│   │   ├── auth.service.ts            # Auth API endpoints
│   │   └── parliament.service.ts      # Parliamentary data endpoints
│   │
│   ├── types/
│   │   ├── auth.types.ts              # Auth interfaces
│   │   ├── api.types.ts               # API response types
│   │   └── parliament.types.ts        # Parliamentary data types
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                 # Authentication hook
│   │   └── useResponsive.ts           # Breakpoint hook
│   │
│   ├── layouts/
│   │   └── auth/
│   │       └── AuthLayout.tsx         # Auth page layout
│   │
│   ├── theme/
│   │   ├── index.tsx                  # Theme provider
│   │   ├── palette.ts                 # OpenSansad colors
│   │   ├── typography.ts              # Typography scale
│   │   └── shadows.ts                 # Shadow definitions
│   │
│   ├── utils/
│   │   ├── axios.ts                   # Axios instance
│   │   ├── jwt.ts                     # JWT utilities
│   │   ├── formatters.ts              # Date/number formatters
│   │   └── localStorageAvailable.ts   # Storage utility
│   │
│   └── config/
│       ├── constants.ts               # App constants
│       └── navigation.tsx             # Navigation items
│
├── .env.local                         # Environment variables
├── .env.example                       # Environment template
├── next.config.ts                     # Next.js config
├── tsconfig.json                      # TypeScript config
└── package.json                       # Dependencies
```

## Technical Stack

**Core Framework:**
- Next.js 14 (App Router)
- React 18
- TypeScript 5

**UI Library:**
- Material-UI v5
- Framer Motion (animations)

**State Management:**
- React Context API
- React Hook Form (forms)

**HTTP & API:**
- Axios with interceptors
- Token-based authentication

**Development:**
- ESLint
- TypeScript strict mode

## Design System

### Color Palette

```typescript
PRIMARY = '#B55A3C'    // Muted brick
SECONDARY = '#E6C07C'  // Soft mustard
BACKGROUND = '#FAF5EE' // Off-white
SUCCESS = '#7A8F6F'    // Sage green
```

### Typography

- Primary: Inter, Source Sans Pro
- Secondary: Merriweather, Lora (headings)

### Component Architecture

All components follow Material-UI theme system. No hardcoded colors or spacing values. Use theme tokens exclusively:
- `theme.palette.*` for colors
- `theme.spacing()` for spacing
- `theme.breakpoints.*` for responsive design

## Authentication

Token-based authentication with Django backend:

1. User authenticates via `/login` or `/signup`
2. Backend returns authentication token
3. Token stored in localStorage (`parliament_token` key)
4. All API requests include header: `Authorization: Token <token>`

### Authentication Flow

```typescript
// Login
const { token } = await authService.login(username, password);
localStorage.setItem('parliament_token', token);

// Logout
await authService.logout();
localStorage.removeItem('parliament_token');

// Protected Routes
<AuthGuard>{children}</AuthGuard>  // Redirects to /login if not authenticated
<GuestGuard>{children}</GuestGuard>  // Redirects to /dashboard if authenticated
```

## API Integration

Backend base URL: `http://localhost:8000/api`

### Core Endpoints

```
POST   /auth/register/              Create new user account
POST   /auth/login/                 Authenticate user
POST   /auth/logout/                Invalidate token
GET    /auth/profile/               Get user profile

GET    /questions/ls/questions/     Lok Sabha questions list
GET    /questions/ls/stats/         LS statistics
GET    /questions/rs/master-data/   Rajya Sabha questions

GET    /debates/                    Parliamentary debates
GET    /debates/statistics/         Debate statistics

GET    /explorer/ls/questions/      LS Questions Explorer (with filters)
GET    /explorer/rs/questions/      RS Questions Explorer
GET    /explorer/ls/debates/        LS Debates Explorer
GET    /explorer/rs/debates/        RS Debates Explorer
GET    /explorer/metadata/questions/ Filter metadata
GET    /explorer/metadata/debates/   Debate metadata
```

See `/docs/FRONTEND_INTEGRATION_GUIDE.md` and `/docs/DATA_EXPLORER_INTEGRATION.md` for complete API documentation.

## Features

**Implemented:**
- Token-based authentication with auto-redirect
- Dashboard with collapsible sidebar navigation
- Data Explorer with advanced filtering and pagination
- User profile and settings pages
- Responsive design (mobile/tablet/desktop)
- Loading states and error handling
- Empty state components

**In Development:**
- SansadBuddy AI chat interface
- Data export functionality
- Advanced search with filters

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## Key Dependencies

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "@mui/material": "^5.14.0",
  "@mui/icons-material": "^5.14.0",
  "react-hook-form": "^7.48.0",
  "yup": "^1.3.0",
  "axios": "^1.6.0",
  "notistack": "^3.0.0",
  "framer-motion": "^10.16.0"
}
```

## Code Organization

### Directory Naming
- `kebab-case` for directories: `data-explorer/`, `sansad-buddy/`
- `PascalCase` for React components: `DataExplorerTable.tsx`
- `camelCase` for utilities: `formatters.ts`, `auth.service.ts`

### Component Guidelines
- Maximum 300 lines per component
- Extract reusable logic into hooks
- Use TypeScript strict mode
- Export types alongside components

### State Management
- Context API for global state (auth, theme)
- React Hook Form for form state
- Local state for component-specific data

### Styling
- Use MUI's `sx` prop for inline styles
- Theme tokens only, no hardcoded values
- Responsive breakpoints: `{ xs, sm, md, lg, xl }`

## Environment Variables

Required environment variables in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_WS_URL=ws://localhost:8000/ws
```

## Type System

### Core Types

```typescript
// Authentication
interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

// API Response
interface PaginatedResponse<T> {
  status: string;
  data: T;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
  };
}

// Parliamentary Data
interface LSQuestion {
  id: number;
  question_number: string;
  subjects: string;
  question_type: 'STARRED' | 'UNSTARRED' | 'SHORT_NOTICE';
  ministry: string;
  date: string;
  lok_sabha: string;
  session: string;
  has_pdf: boolean;
  has_answer: boolean;
}
```

See `/src/types/` for complete type definitions.

## Documentation

Technical documentation in `/docs/`:
- `FRONTEND_INTEGRATION_GUIDE.md` - Complete API reference
- `DATA_EXPLORER_INTEGRATION.md` - Explorer endpoints and usage
- `OPENSANSAD_DESIGN_STYLE_GUIDE.md` - Design system specifications
- `DASHBOARD_DESIGN_PRINCIPLES_GUIDE.md` - Dashboard patterns
- `FORMS_QUALITY_SUMMARY.md` - Form implementation guide

## Deployment

```bash
# Production build
npm run build

# Preview production build locally
npm start

# Build output in `.next/` directory
# Static assets in `.next/static/`
```

Deploy to Vercel, AWS, or any Node.js hosting platform supporting Next.js 14.
