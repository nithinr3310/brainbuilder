# Copilot Instructions for Brain Builders

## Project Overview

Brain Builders is a full-stack educational institute website with a modern UI for CBSE tuition services (Classes 10-12). It features a responsive frontend and a Node.js/Express backend with MongoDB integration for managing contact leads and student reviews.

## Architecture

### Frontend
- **Type**: Static HTML/CSS/JavaScript (no build process)
- **Location**: `frontend/` directory
- **Key Files**:
  - `index.html` - Main landing page with sections for hero, programs, faculty, features, reviews, and contact
  - `css/styles.css` - Core styling with blue/white color scheme
  - `css/responsive.css` - Mobile-responsive breakpoints
  - `js/main.js` - Navigation, scroll behavior, animations
  - `js/contact.js` - Contact form handling and API calls
- **Styling Approach**: Custom CSS with mobile-first responsive design
- **API Base**: Communicates with backend at `http://localhost:3001`

### Backend
- **Type**: Express.js REST API
- **Location**: `backend/` directory
- **Entry Point**: `server.js`
- **Database**: MongoDB (via Mongoose ODM) with fallback to JSON files
- **Core Structure**:
  - `models/` - Mongoose schemas for Contact and Review
  - `routes/` - API endpoint handlers
  - `server.js` - Express app setup with CORS and middleware

### Key Data Models
- **Contact**: Name, class (10/11/12), phone number, timestamp
- **Review**: Name, review text, rating (1-5), timestamp

### API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/reviews` | Fetch latest 10 reviews for display |
| POST | `/api/reviews` | Submit a new review |
| GET | `/api/contact` | Retrieve all contact submissions (admin) |
| POST | `/api/contact` | Submit contact form data |

## Build, Test & Run Commands

### Backend
```bash
cd backend

# Install dependencies
npm install

# Run development server with auto-restart (requires nodemon)
npm run dev

# Run production server
npm start
```
- **Default Port**: 3001
- **Key Dependency**: nodemon for development watch mode

### Frontend
```bash
cd frontend

# Simple HTTP server for local development
python -m http.server 8080

# Alternative: Use Node-based server
npx serve .
```
- **Default Port**: 8080
- **No Build Step**: Static files served directly

### Testing
- No automated test suite exists yet
- Manual testing via API calls:
  ```bash
  curl http://localhost:3001/api/reviews
  curl -X POST http://localhost:3001/api/contact -H "Content-Type: application/json" -d '{"name":"John","class":"11","phone":"9999999999"}'
  ```

## Development Workflow

### Starting the Full Stack
1. Terminal 1: `cd backend && npm install && npm run dev`
2. Terminal 2: `cd frontend && python -m http.server 8080`
3. Visit `http://localhost:8080` in browser
4. Backend API available at `http://localhost:3001`

### Common Tasks

**Adding a new API endpoint:**
1. Create route file in `backend/routes/`
2. Define model in `backend/models/` (if needed)
3. Mount route in `backend/server.js` with `app.use()`
4. Update frontend to call the new endpoint

**Modifying the landing page:**
1. Edit `frontend/index.html` for HTML structure
2. Update `frontend/css/styles.css` for styling
3. Add JavaScript handlers in `frontend/js/main.js` if needed

**Updating reviews/contacts:**
- Contact data stored in MongoDB via Mongoose
- Review data also in MongoDB (with JSON file fallback in `backend/data/reviews.json`)

## Key Conventions & Patterns

### Naming
- Route handlers use singular nouns: `/api/contact`, `/api/reviews`
- Models are uppercase: `Contact`, `Review`
- Environment variables in `.env` file (MONGODB_URI, PORT)

### Validation
- Input validation occurs in route handlers (see `backend/routes/contact.js` and `backend/routes/reviews.js`)
- Check for required fields and return 400 status with error message on failure
- Rating validation enforces 1-5 range

### Error Handling
- Routes use try-catch blocks for async operations
- Errors return appropriate HTTP status codes (201 for creation, 400 for validation, 500 for server errors)
- Error responses include `error` field with message and optional `message` field with details

### CORS
- Enabled globally on backend via `cors()` middleware
- Allows frontend on different port to communicate with backend

### Database Connection
- MongoDB connected via Mongoose on server startup
- Connection string from `MONGODB_URI` env variable
- Timestamps auto-generated with `default: Date.now`

## Configuration

### Environment Variables
Create `backend/.env` with:
```
MONGODB_URI=mongodb://localhost:27017/brain-builders
PORT=3001
```

### Frontend API Configuration
- Base URL hardcoded or can be made dynamic in `frontend/js/contact.js`
- Ensure CORS is enabled on backend for cross-origin requests

## MCP Servers

The following MCP servers are recommended for development in Copilot:

### Enabled MCP Servers
- **Node.js MCP** - Provides enhanced debugging and development support for Node.js backend
- **HTTP Client MCP** - Enables testing API endpoints directly during development

To configure these, add them to the `copilot` environment in your repository settings:
1. Go to **Settings** → **Environments** → **copilot**
2. Under "Environment variables," add or configure MCP server variables as needed

### GitHub Actions Setup
The repository includes a `copilot-setup-steps.yml` workflow that pre-installs all dependencies:
- Node.js 20
- Backend npm dependencies (via `npm ci`)
- Frontend npm dependencies (via `npm ci`)

This means future Copilot sessions will have dependencies pre-cached and ready to use, significantly reducing setup time.

## Directory Structure Reference

```
brain-builders/
├── .github/
│   ├── workflows/
│   │   └── copilot-setup-steps.yml
│   └── copilot-instructions.md
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   └── contact.js
│   └── images/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/
│   │   ├── Contact.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── contact.js
│   │   └── reviews.js
│   └── data/
│       └── reviews.json (fallback)
└── README.md
```
