# OpenSansad Frontend

**Production-Grade Parliamentary Data Platform**

Built with Next.js 14, TypeScript, Material-UI, and following OpenSansad design principles.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend URL

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

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

---

## 🎨 Design System

### Color Palette

**Primary:** Muted Brick (`#B55A3C`) - Authority and heritage  
**Secondary:** Soft Mustard (`#E6C07C`) - Warmth and accessibility  
**Background:** Off-white (`#FAF5EE`) - Warm, approachable feel

### Typography

**Primary Font:** Inter / Source Sans Pro (sans-serif)  
**Secondary Font:** Merriweather / Lora (serif for gravitas)

### Design Principles

- **Minimalism with Purpose** - Every element serves a function
- **Gravitas with Warmth** - Authoritative yet approachable
- **Consistency & Modularity** - Reusable components
- **Performance & Accessibility** - WCAG AA compliant

---

## 🔐 Authentication

The app uses token-based authentication with Django backend:

1. Users register/login via `/auth/signup` or `/auth/login`
2. Backend returns a token
3. Token stored in localStorage
4. Token sent in `Authorization: Token <token>` header for all API requests

---

## 📡 API Integration

The app connects to a Django backend at `http://localhost:8000/api`

**Key Endpoints:**
- `POST /auth/register/` - Create account
- `POST /auth/login/` - Login
- `GET /auth/profile/` - Get user profile
- `GET /questions/ls/questions/` - Lok Sabha questions
- `GET /debates/` - Parliamentary debates
- See `FRONTEND_INTEGRATION_GUIDE.md` for complete API docs

---

## 🧩 Key Features

### ✅ Implemented

- **Authentication** - Login, signup, logout with token management
- **Dashboard** - Collapsible sidebar navigation with hamburger menu
- **Profile Page** - User information and usage statistics
- **Responsive Design** - Mobile, tablet, and desktop layouts
- **Theme System** - OpenSansad color palette with warm, earthy tones
- **Loading States** - Skeletons and progress indicators
- **Empty States** - Graceful handling of missing data
- **Error Handling** - Comprehensive error management

### 🚧 Placeholder Pages (Ready for Implementation)

- **Data Explorer** - Parliamentary data browser
- **SansadBuddy** - AI chatbot interface
- **Settings** - User preferences

---

## 🛠️ Development

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

---

## 📦 Dependencies

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Material-UI v5** - Component library

### Forms & Validation
- **React Hook Form** - Form state management
- **Yup** - Schema validation

### HTTP & State
- **Axios** - HTTP client
- **Notistack** - Toast notifications

### Utilities
- **date-fns** - Date formatting
- **lodash** - Utility functions
- **framer-motion** - Animations

---

## 🎯 Next Steps

### Phase 1: Data Explorer (Week 1-2)
- [ ] Create filter panel (Lok Sabha, Session, Date range)
- [ ] Build results table with pagination
- [ ] Add search functionality
- [ ] Implement detail view for questions/debates
- [ ] Add export to CSV

### Phase 2: SansadBuddy Chat (Week 2-3)
- [ ] Create chat interface
- [ ] Implement message bubbles (user/bot)
- [ ] Add streaming support (WebSocket)
- [ ] Display source citations
- [ ] Add chat history

### Phase 3: Polish & Deploy (Week 3-4)
- [ ] Add loading skeletons everywhere
- [ ] Implement error boundaries
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Deploy to Vercel/AWS

---

## 🎨 Design Guidelines

Refer to these docs in the `docs/` folder:
- `OPENSANSAD_DESIGN_STYLE_GUIDE.md` - Complete design system
- `DASHBOARD_DESIGN_PRINCIPLES_GUIDE.md` - Dashboard patterns
- `SIDEBAR_NAVIGATION_PATTERN_GUIDE.md` - Navigation patterns
- `FORMS_QUALITY_SUMMARY.md` - Form best practices

---

## 📝 Environment Variables

Create `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_WS_URL=ws://localhost:8000/ws
```

---

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use MUI theme system (no hardcoded colors)
3. Follow file naming conventions
4. Add proper types for all functions
5. Keep components under 300 lines
6. Write descriptive commit messages

---

## 📄 License

[Your License Here]

---

**Built with ❤️ for democracy**