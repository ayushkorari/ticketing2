# GitTix - Ticketing Platform Frontend

A complete Next.js 14 frontend application for the GitTix microservices ticketing platform.

## 🚀 Features Implemented

### Core Functionality
- **Home Page**: Display all available tickets with responsive card layout
- **User Authentication**: Sign up, sign in, and sign out functionality
- **Ticket Management**: Create new tickets with title and price validation
- **Ticket Details**: View individual ticket details with purchase option
- **Order Management**: Create orders, view order history, and cancel orders
- **Payment Processing**: Stripe integration for secure payments
- **Order Cancellation**: Cancel orders that are in Created or Awaiting Payment status
- **Real-time Updates**: Order expiration countdown and status updates

### Technical Features
- **Server-Side Rendering**: Fast initial page loads with SSR
- **Client-Side Interactions**: Dynamic user interactions with React
- **Responsive Design**: Bootstrap 5 integration for mobile-friendly UI
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error handling and user feedback
- **Success Notifications**: Toast-style success messages
- **Loading States**: User feedback during async operations

## 📁 Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── signin/page.tsx       # Sign in form
│   │   ├── signup/page.tsx       # Sign up form
│   │   └── signout/page.tsx      # Sign out handler
│   ├── orders/                   # Order management
│   │   ├── page.tsx              # Orders list
│   │   └── [id]/                 # Order details
│   │       ├── page.tsx          # Server component
│   │       └── order-details.tsx # Client component with payment
│   ├── tickets/                  # Ticket management
│   │   ├── new/page.tsx          # Create ticket form
│   │   └── [id]/                 # Ticket details
│   │       ├── page.tsx          # Server component
│   │       └── ticket-details.tsx # Client component
│   ├── layout.tsx                # Root layout
│   ├── layout-wrapper.tsx        # Client wrapper with navigation
│   ├── page.tsx                  # Home page with tickets list
│   └── root-server.tsx           # Server component for branding
├── components/                   # Reusable components
│   ├── ticket-card.tsx           # Ticket display card
│   └── success-message.tsx       # Success notification
├── context/                      # React Context
│   └── user-context.tsx          # User state management
├── hooks/                        # Custom hooks
│   └── use-request.ts            # HTTP request handler
├── lib/                          # Utilities
│   └── stripe.ts                 # Stripe configuration
└── types/                        # TypeScript definitions
    └── index.ts                  # Data models and interfaces
```

## 🔌 API Integration

### Backend Services Integration
- **Auth Service**: `/api/users/*` - User authentication and management
- **Tickets Service**: `/api/tickets/*` - Ticket CRUD operations
- **Orders Service**: `/api/orders/*` - Order management and creation
- **Payments Service**: `/api/payments` - Payment processing with Stripe

### API Endpoints Used
```typescript
// Authentication
POST /api/users/signup     // User registration
POST /api/users/signin     // User login
POST /api/users/signout    // User logout
GET  /api/users/currentuser // Get current user

// Tickets
GET  /api/tickets          // List all tickets
GET  /api/tickets/:id      // Get ticket details
POST /api/tickets          // Create new ticket
PUT  /api/tickets/:id      // Update ticket

// Orders
GET  /api/orders           // Get user orders
GET  /api/orders/:id       // Get order details
POST /api/orders           // Create new order
DELETE /api/orders/:id     // Cancel order

// Payments
POST /api/payments         // Process payment
```

## 💳 Payment Integration

### Stripe Configuration
- **Public Key**: `pk_test_51RwnufD9aRCmfruYKeLFKnHg9ads4egqV5rwbEG6Rr5Snr2WNgfuswnXq92u1kR7RABXmAsB7lTczDOFYDKVeDVo00SSjFnXQM`
- **Test Mode**: Uses Stripe test tokens for development
- **Payment Flow**: Order creation → Payment processing → Success redirect

## 🎨 UI/UX Features

### Navigation
- **Dynamic Header**: Shows different links based on authentication status
- **Authenticated Users**: Create Ticket, My Orders, Sign Out
- **Unauthenticated Users**: Sign In, Sign Up

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages for successful actions
- **Form Validation**: Client and server-side validation

### Order Management
- **Order Expiration**: Real-time countdown for order expiration (60 seconds)
- **Order Status**: Visual status indicators (Created, Awaiting Payment, Complete, Cancelled)
- **Order Cancellation**: Cancel orders from both orders list and order details pages
- **Payment Processing**: Secure Stripe integration with test cards
- **Conditional Actions**: Cancel button only appears for orders that can be cancelled

## 🛠 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend microservices running

### Installation
```bash
cd client
npm install
```

### Development Server
```bash
npm run dev
```
Runs on http://localhost:4300

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
The application uses the following configuration:
- **Port**: 4300 (configured in package.json)
- **Stripe Public Key**: Hardcoded in `/lib/stripe.ts`
- **API Base URL**: Uses relative paths for client-side, Kubernetes internal DNS for SSR

## 🔄 Data Flow

### User Journey
1. **Landing**: User sees all available tickets
2. **Authentication**: Sign up/in to access features
3. **Ticket Creation**: Authenticated users can create tickets
4. **Ticket Purchase**: Users can view details and purchase tickets
5. **Order Management**: Track orders and complete payments
6. **Payment Processing**: Secure payment with Stripe

### State Management
- **User Context**: Global user authentication state
- **Local State**: Component-level state for forms and UI
- **Server State**: Fresh data from APIs via SSR and client-side fetching

## 🚀 Deployment

### Docker Support
The application includes:
- `Dockerfile` for containerization
- `.dockerignore` for optimized builds
- Kubernetes deployment configuration

### Production Considerations
- **Static Generation**: Some pages are statically generated for performance
- **Server-Side Rendering**: Dynamic pages use SSR for fresh data
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized bundle size and loading

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads with tickets
- [ ] User can sign up/sign in/sign out
- [ ] Authenticated users can create tickets
- [ ] Users can view ticket details
- [ ] Users can purchase tickets (create orders)
- [ ] Order expiration countdown works
- [ ] Payment processing completes successfully
- [ ] Success messages display correctly
- [ ] Error handling works for invalid requests
- [ ] Responsive design works on mobile

## 📝 Notes

### Implementation Decisions
- **Next.js 14 App Router**: Modern React patterns with server components
- **Bootstrap 5**: Rapid UI development with responsive design
- **TypeScript**: Type safety and better developer experience
- **Stripe Test Mode**: Safe payment testing without real transactions
- **Microservices Integration**: Seamless communication with backend services

### Future Enhancements
- Real-time updates with WebSockets
- Advanced search and filtering
- User profiles and preferences
- Order history with detailed analytics
- Mobile app with React Native
- Advanced payment options

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for all new files
3. Implement proper error handling
4. Add loading states for async operations
5. Ensure responsive design
6. Test all user flows manually

---

**GitTix Frontend** - A complete ticketing platform built with Next.js 14, TypeScript, and modern web technologies.