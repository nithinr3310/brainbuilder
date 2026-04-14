# Brain Builders - Educational Institute Website

A modern, professional full-stack website for Brain Builders educational institute offering CBSE Classes 10, 11, and 12 tuition (Maths, Science, Physics).

## Features

- **Modern UI**: Clean, minimal design with white + blue color scheme
- **Responsive**: Fully responsive for mobile and desktop
- **Backend API**: Node.js + Express with MongoDB/JSON database
- **Contact Forms**: Lead collection with validation
- **Reviews System**: Dynamic testimonial display
- **Chatbot Integration**: Placeholder for chatbot integration
- **Smooth Animations**: Micro-interactions and transitions
- **SEO Friendly**: Semantic HTML structure

## Tech Stack

### Frontend
- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+)
- Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB (or JSON for simplicity)
- CORS
- Environment variables

## Project Structure

```
brain-builders/
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
│   ├── models/
│   │   ├── Contact.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── contact.js
│   │   └── reviews.js
│   ├── package.json
│   ├── .env
│   └── data/
│       └── reviews.json
└── README.md
```

## Setup Instructions

### 1. Clone or Download the Project
```bash
# Clone the repository
git clone <repo-url>
cd brain-builders
```

### 2. Frontend Setup
```bash
cd frontend
# Open index.html in your browser or use a local server
# For local development, you can use:
python -m http.server 8080
# or
npx serve .
```

### 3. Backend Setup
```bash
cd backend
# Install dependencies
npm install

# Create .env file (already created with default values)
# Or copy and modify if needed:
cp .env.example .env

# Start the server
npm start
# For development with auto-restart:
npm run dev
```

### 4. Database Setup

#### Option A: MongoDB (Recommended)
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env` file
- Ensure MongoDB service is running

#### Option B: JSON File (For simplicity)
- The backend is configured to use JSON files by default
- Reviews are stored in `backend/data/reviews.json`
- Contact leads are stored in memory (can be modified to use JSON)

## Running the Application

### Development
1. Start the backend server: `cd backend && npm run dev`
2. Open frontend in browser: `cd frontend && python -m http.server 8080`
3. Access at: `http://localhost:8080`
4. Backend API at: `http://localhost:3001`

### Production
1. Build and deploy frontend to Netlify/Vercel
2. Deploy backend to Render/Railway
3. Update API endpoints in frontend JavaScript

## API Endpoints

### Contact Form
- `POST /api/contact` - Save contact lead
- `GET /api/contact` - Get all contacts (admin)

### Reviews
- `GET /api/reviews` - Fetch reviews for display
- `POST /api/reviews` - Add new review

## Customization

### Colors
- Primary: Blue (`#007bff`)
- Secondary: White (`#ffffff`)
- Text: Dark (`#333333`)

### Typography
- Font: Poppins/Montserrat style
- Sizes: Responsive for mobile/desktop

### Content Updates
- Edit `frontend/index.html` for content changes
- Modify CSS in `frontend/css/styles.css`
- Update images in `frontend/images/`

## Deployment

### Frontend Deployment
1. **Netlify**: Connect to GitHub repository
2. **Vercel**: Import project and deploy
3. **GitHub Pages**: Enable GitHub Pages in settings

### Backend Deployment
1. **Render**: Deploy Node.js application
2. **Railway**: Deploy with MongoDB add-on
3. **Heroku**: Traditional PaaS deployment

## Features Implemented

### Landing Page
- Hero section with CTA
- Programs grid (Classes 10, 11, 12)
- Faculty profiles
- Features section
- Dynamic reviews
- Contact form
- Chatbot placeholder

### Backend Features
- Contact form API
- Reviews API
- Form validation
- Error handling
- Database integration

### UI/UX Features
- Smooth scrolling
- Sticky navigation
- Loading states
- Form validation
- Responsive design
- Micro-interactions

## Troubleshooting

### Common Issues
1. **Backend not starting**: Check MongoDB connection
2. **CORS errors**: Ensure frontend and backend are on different ports
3. **Form not submitting**: Check browser console for errors
4. **Reviews not loading**: Verify API endpoint and CORS settings

### Debug Commands
```bash
# Check backend server status
cd backend && npm run dev

# Check frontend locally
cd frontend && python -m http.server 8080

# Test API endpoints
curl http://localhost:3001/api/reviews
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open-source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the setup instructions

---

**Brain Builders** - Building strong concepts and academic excellence! 🧠🎓