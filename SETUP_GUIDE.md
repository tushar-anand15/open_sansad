# OpenSansad Frontend - Complete Setup Guide

**Production-Ready Parliamentary Data Platform**  
**Date:** October 6, 2025  
**Status:** ✅ Fully Configured

---

## 🎯 What's Been Built

### ✅ Complete Feature List

#### 1. **Theme System**
- OpenSansad color palette (muted brick, soft mustard, sage green)
- Inter/Merriweather typography system
- Custom shadows and component overrides
- Responsive breakpoints

#### 2. **Authentication System**
- Token-based auth with Django backend
- Login page with validation
- Signup page with user types
- AuthContext for global state
- Auth guards for protected routes
- Auto token refresh

#### 3. **Dashboard Infrastructure**
- DashboardLayout with collapsible sidebar
- DashboardSidebar with active states
- Hamburger menu for collapsed state
- Mobile-responsive overlay
- Custom scrollbars
- Profile and Logout in navigation

#### 4. **Pages**
- **Landing Page** - Hero section with features
- **Login Page** - Clean auth form
- **Signup Page** - Multi-field registration
- **Dashboard Home** - Feature cards and stats
- **Profile Page** - User info and usage stats
- **Settings Page** - Placeholder for preferences
- **Data Explorer** - Dummy page (ready for implementation)
- **SansadBuddy** - Dummy page (ready for implementation)

#### 5. **API Integration**
- Axios instance with interceptors
- Auth service (login, register, profile)
- Parliament service (questions, debates, statistics)
- Automatic token injection
- Error handling with 401 redirect

#### 6. **Shared Components**
- LoadingScreen - Full-page loader
- EmptyState - Graceful empty data handling
- Iconify - Icon wrapper
- FormProvider - React Hook Form wrapper
- RHFTextField - Form text field

#### 7. **TypeScript Types**
- Auth types (User, Profile, Credentials)
- API types (Response, Pagination)
- Parliament types (Questions, Debates, Sessions)

---

## 🚀 Installation

### Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Django backend running on `http://localhost:8000`

### Steps

```bash
# 1. Navigate to project
cd opensansad-frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Update .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:8000/api

# 5. Start development server
npm run dev
```

Visit **http://localhost:3000**

---

## 📋 File Structure

### ✅ Created Files (Production-Ready)

```
src/
├── app/
│   ├── layout.tsx                         ✅ Root layout with providers
│   ├── page.tsx                           ✅ Landing page with hero
│   ├── auth/
│   │   ├── login/page.tsx                 ✅ Login form with validation
│   │   └── signup/page.tsx                ✅ Signup form with user types
│   └── dashboard/
│       ├── page.tsx                       ✅ Dashboard home with stats
│       ├── data-explorer/page.tsx         ✅ Data Explorer (dummy)
│       ├── sansad-buddy/page.tsx          ✅ SansadBuddy chat (dummy)
│       ├── profile/page.tsx               ✅ User profile
│       └── settings/page.tsx              ✅ Settings (dummy)
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx            ✅ Grid-based layout
│   │   └── DashboardSidebar.tsx           ✅ Navigation sidebar
│   ├── shared/
│   │   ├── Iconify.tsx                    ✅ Icon wrapper
│   │   ├── LoadingScreen.tsx              ✅ Loading state
│   │   └── EmptyState.tsx                 ✅ Empty state
│   ├── hook-form/
│   │   ├── FormProvider.tsx               ✅ Form wrapper
│   │   ├── RHFTextField.tsx               ✅ Text field
│   │   └── index.ts                       ✅ Exports
│   └── auth/
│       ├── AuthGuard.tsx                  ✅ Protected route wrapper
│       └── GuestGuard.tsx                 ✅ Guest-only wrapper
│
├── contexts/
│   └── AuthContext.tsx                    ✅ Auth state management
│
├── services/
│   ├── auth.service.ts                    ✅ Auth API calls
│   └── parliament.service.ts              ✅ Data API calls
│
├── types/
│   ├── auth.types.ts                      ✅ Auth interfaces
│   ├── api.types.ts                       ✅ API interfaces
│   └── parliament.types.ts                ✅ Data interfaces
│
├── hooks/
│   ├── useAuth.ts                         ✅ Auth hook
│   └── useResponsive.ts                   ✅ Breakpoint hook
│
├── layouts/
│   └── auth/
│       └── AuthLayout.tsx                 ✅ Auth page layout
│
├── theme/
│   ├── index.tsx                          ✅ Theme provider
│   ├── palette.ts                         ✅ OpenSansad colors
│   ├── typography.ts                      ✅ Typography scale
│   └── shadows.ts                         ✅ Shadow system
│
├── utils/
│   ├── axios.ts                           ✅ HTTP client
│   ├── jwt.ts                             ✅ Token utilities
│   ├── formatters.ts                      ✅ Date/number formatters
│   └── localStorageAvailable.ts           ✅ Storage check
│
└── config/
    ├── constants.ts                       ✅ App constants
    └── navigation.tsx                     ✅ Nav configuration
```

---

## 🎨 Design System Usage

### Colors

```typescript
// Primary (Muted Brick) - CTAs, brand elements
sx={{ bgcolor: 'primary.main' }}        // #B55A3C

// Secondary (Soft Mustard) - Highlights
sx={{ bgcolor: 'secondary.main' }}      // #E6C07C

// Background (Off-white) - Main background
sx={{ bgcolor: 'background.default' }}  // #FAF5EE

// Paper (White) - Cards
sx={{ bgcolor: 'background.paper' }}    // #FFFFFF
```

### Typography

```typescript
// Page titles (Serif for gravitas)
<Typography variant="h1" sx={{ fontFamily: 'fontFamilySerif' }}>

// Section headers
<Typography variant="h3">

// Body text
<Typography variant="body1">

// Metadata
<Typography variant="caption" color="text.secondary">
```

---

## 🔐 Authentication Flow

### 1. User Registration

```
1. User visits /auth/signup
2. Fills form (username, email, password, user type)
3. Submit → POST /api/auth/register/
4. Backend returns token
5. Token saved to localStorage
6. User redirected to /dashboard
```

### 2. User Login

```
1. User visits /auth/login
2. Enters credentials
3. Submit → POST /api/auth/login/
4. Backend returns token
5. Token saved to localStorage
6. Fetch profile → GET /api/auth/profile/
7. User redirected to /dashboard
```

### 3. Protected Routes

```
Dashboard pages wrapped with AuthGuard:
- Checks if user is authenticated
- Redirects to login if not
- Shows loading screen while checking
```

---

## 📡 API Integration

### Axios Configuration

```typescript
// Automatic token injection
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('parliament_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Automatic 401 handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('parliament_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
```

### Using Services

```typescript
import { authService } from '../services/auth.service';
import { parliamentService } from '../services/parliament.service';

// Login
const { token } = await authService.login({ username, password });

// Get questions
const { data } = await parliamentService.getQuestions({
  lok_sabha: '18',
  session_number: '5',
  limit: 50,
});
```

---

## 🧪 Testing

### Test User Flow

1. **Register**
   - Navigate to http://localhost:3000/auth/signup
   - Create account
   - Should redirect to dashboard

2. **Login**
   - Navigate to http://localhost:3000/auth/login
   - Enter credentials
   - Should redirect to dashboard

3. **Dashboard Navigation**
   - Sidebar should show all menu items
   - Click items to navigate
   - Active state should highlight current page
   - Click logout to sign out

4. **Responsive**
   - Resize browser window
   - Sidebar should collapse on mobile
   - Hamburger menu should appear
   - Mobile overlay should work

---

## 🎯 Next Implementation Steps

### Phase 1: Data Explorer (Recommended Next)

```typescript
// src/app/dashboard/data-explorer/page.tsx

// 1. Create FilterPanel component
<FilterPanel 
  onFilterChange={handleFilterChange}
  lokSabhaOptions={['15', '16', '17', '18']}
  sessionOptions={availableSessions}
/>

// 2. Create ResultsTable component
<ResultsTable 
  data={questions}
  loading={loading}
  onRowClick={handleRowClick}
/>

// 3. Add pagination
<Pagination 
  page={currentPage}
  total={totalPages}
  onChange={handlePageChange}
/>

// 4. Wire up API
const { data } = await parliamentService.getQuestions({
  lok_sabha: filters.lokSabha,
  session_number: filters.session,
  limit: 50,
  offset: currentPage * 50,
});
```

### Phase 2: SansadBuddy Chat

```typescript
// src/app/dashboard/sansad-buddy/page.tsx

// 1. Create ChatWindow component
<ChatWindow 
  messages={messages}
  onSendMessage={handleSendMessage}
  streaming={streaming}
/>

// 2. Implement message handling
const handleSendMessage = async (text: string) => {
  // Add user message
  setMessages([...messages, { role: 'user', content: text }]);
  
  // Call AI endpoint
  const response = await chatService.sendMessage(text);
  
  // Add bot response with sources
  setMessages([...messages, { role: 'assistant', content: response.answer, sources: response.sources }]);
};
```

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution:** Run `npm install` again

### Issue: TypeScript errors

**Solution:** Run `npx tsc --noEmit` to see all type errors

### Issue: Can't connect to backend

**Check:**
1. Backend is running on http://localhost:8000
2. .env.local has correct URL
3. CORS is configured in Django settings
4. Token is valid (check Network tab)

### Issue: 401 Unauthorized

**Check:**
1. Token exists in localStorage
2. Token is valid (not expired)
3. Backend auth endpoint is working
4. Authorization header format is correct

---

## 📊 Performance

### Bundle Size Optimization

- Material-UI tree-shaking enabled
- Dynamic imports for heavy components
- Image optimization with Next.js
- Font loading optimization

### Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## 🎨 Customization

### Change Colors

Edit `src/theme/palette.ts`:

```typescript
const PRIMARY = {
  main: '#YOUR_COLOR_HERE',  // Change primary color
  // ...
};
```

### Change Fonts

Edit `src/theme/typography.ts`:

```typescript
const FONT_PRIMARY = "'Your Font', sans-serif";
```

### Add Navigation Items

Edit `src/config/navigation.tsx`:

```typescript
export const getOpenSansadNavigation = (onLogout) => [
  // Add your items here
  {
    id: 'your-page',
    label: 'Your Page',
    icon: <YourIcon />,
    path: '/dashboard/your-page',
  },
];
```

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables (Production)

Add these in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_API_WS_URL=wss://your-api-domain.com/ws
```

---

## 📝 Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Format Code (if using Prettier)

```bash
npm run format
```

---

## 🎉 Summary

**You now have a production-grade frontend with:**

✅ Beautiful OpenSansad design system  
✅ Complete authentication flow  
✅ Dashboard with collapsible sidebar  
✅ Responsive mobile design  
✅ TypeScript throughout  
✅ API integration ready  
✅ Error handling  
✅ Loading states  
✅ Empty states  
✅ Profile & settings pages

**Next steps:**
1. Start backend: `python manage.py runserver`
2. Start frontend: `npm run dev`
3. Visit http://localhost:3000
4. Create an account and explore!

---

**Ready to build! 🚀**
