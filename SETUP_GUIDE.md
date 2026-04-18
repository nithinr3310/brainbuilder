# Brain Builders - Complete Setup Guide

## 🎯 Project Overview

Brain Builders is a modern, fully-functional full-stack website for CBSE tuition classes. The website features:

- ✨ Premium landing page with hero section
- 📚 Programs section (Class 10, 11, 12)
- 👨‍🏫 Faculty profiles
- ⭐ Dynamic reviews system
- 📞 Contact form with validation
- 🤖 Chatbot placeholder
- 📱 Fully responsive design
- 🎨 Smooth animations and micro-interactions

## 📦 Project Structure

```
brain-builders/
├── frontend/
│   ├── index.html                 # Main landing page
│   ├── css/
│   │   ├── styles.css            # Premium styling with animations
│   │   └── responsive.css        # Mobile-responsive breakpoints
│   ├── js/
│   │   ├── main.js               # Core interactions and animations
│   │   └── contact.js            # API integration and forms
│   ├── images/                   # Placeholder for images
│   └── package.json
│
├── backend/
│   ├── server.js                 # Express server
│   ├── package.json
│   ├── .env                      # Environment variables
│   ├── models/
│   │   ├── Contact.js            # Contact form schema
│   │   └── Review.js             # Review schema
│   ├── routes/
│   │   ├── contact.js            # Contact endpoints
│   │   └── reviews.js            # Review endpoints
│   └── data/
│       └── reviews.json          # Fallback JSON storage
│
└── README.md
```

## 🚀 Quick Start (5 minutes)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create/check .env file (should already exist)
# MONGODB_URI=mongodb://localhost:27017/brain-builders
# PORT=3001

# Start development server
npm run dev

# Should output: "Server running on port 3001"
```

### 2. Frontend Setup

Open in **another terminal**:

```bash
cd frontend

# Option 1: Python HTTP Server (Recommended)
python -m http.server 8080

# Option 2: Node.js Server
npx serve .

# Option 3: Direct file access
# Open index.html in your browser
```

### 3. Access the Website

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## 🔌 API Endpoints

### Contact Form
```bash
# Submit contact form
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "class": "11",
  "phone": "9876543210"
}

# Get all contacts (admin)
GET /api/contact
```

### Reviews
```bash
# Get all reviews
GET /api/reviews

# Submit a review
POST /api/reviews
Content-Type: application/json

{
  "name": "Parent Name",
  "review": "Great teaching methods...",
  "rating": 5
}
```

## 💻 Testing

### Test Contact Form
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","class":"11","phone":"9876543210"}'
```

### Test Reviews
```bash
# Get reviews
curl http://localhost:3001/api/reviews

# Add review
curl -X POST http://localhost:3001/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya","review":"Excellent classes!","rating":5}'
```

## 🎨 Key Features

### Frontend Features
- **Hero Section**: Animated gradient text, floating illustrations
- **Smooth Animations**: Fade-in, slide-in, float effects
- **Sticky Navigation**: Auto-scrolling navbar highlight
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Form Validation**: Real-time error checking
- **Reviews System**: Dynamic loading from backend
- **Mobile Menu**: Hamburger menu for small screens
- **Micro-interactions**: Hover effects, button ripples

### Backend Features
- **Express.js Server**: RESTful API
- **MongoDB/Mongoose**: Database with schemas
- **CORS Enabled**: Allow frontend requests
- **Input Validation**: Form data validation
- **Error Handling**: Proper HTTP status codes
- **Timestamps**: Auto-generated for records

## 🔧 Customization

### Change Colors
Edit `/frontend/css/styles.css`:

```css
:root {
    --primary-color: #007bff;      /* Change blue */
    --secondary-color: #0056b3;
    --text-dark: #1a1a1a;          /* Change text */
}
```

### Update Contact Info
Edit `/frontend/index.html`:

```html
<!-- Find and update phone numbers -->
<p>+91 98765 43210</p>

<!-- Update location -->
<p>123 Education Street, Mumbai</p>
```

### Add Faculty Members
Edit `/frontend/index.html` (Faculty Section):

```html
<div class="faculty-card">
    <!-- Copy existing card and update details -->
</div>
```

### Change API URL
Edit `/frontend/js/contact.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001'; // Change this
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **1400px+**: Large desktop (4-column faculty grid)
- **1024px+**: Desktop (normal view)
- **768px**: Tablet (1-column programs)
- **480px**: Mobile (hamburger menu, stacked layout)
- **360px**: Small mobile (optimized text sizes)

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub repository
4. Build command: None (static files)
5. Publish directory: `brain-builders/frontend`
6. Deploy!

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project
4. Select `brain-builders/frontend` as root
5. Deploy!

### Backend Deployment (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect GitHub repo
5. Select `brain-builders/backend` as root directory
6. Build command: `npm install`
7. Start command: `npm start`
8. Add environment variable: `MONGODB_URI`
9. Deploy!

### Backend Deployment (Railway)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. New Project → GitHub Repo
4. Select repository
5. Configure build & start commands
6. Set `MONGODB_URI` environment variable
7. Deploy!

### Database Setup

#### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create cluster
3. Create database user
4. Get connection string
5. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/brain-builders
   ```

#### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service: `mongod`
3. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/brain-builders
   ```

## 🔐 Environment Variables

Create `.env` in `backend/` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/brain-builders

# Server
PORT=3001

# (Optional) Add more as needed
NODE_ENV=development
```

## 🐛 Troubleshooting

### "Cannot GET /api/reviews"
- Backend server not running on port 3001
- Check backend is started: `npm run dev`

### Form submission fails
- Check browser console for CORS errors
- Ensure backend is running
- Verify API_BASE_URL in `frontend/js/contact.js`

### Reviews not loading
- Check MongoDB connection in backend console
- Try restarting backend server
- Check browser Network tab in DevTools

### Mobile menu not working
- Check JavaScript is enabled
- Clear browser cache
- Open in incognito mode

### Styling looks broken
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check CSS file paths in HTML
- Verify responsive.css is loaded

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Considerations

- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Add input sanitization
- [ ] Use HTTPS in production
- [ ] Implement authentication for admin routes
- [ ] Add captcha to contact form
- [ ] Validate file uploads

## 📈 Performance

- Optimized CSS with no unused styles
- Minimal JavaScript bundle
- Lazy loading ready
- SEO-friendly structure
- Fast animations with GPU acceleration
- Optimized images (use WebP when possible)

## 🚀 Next Steps

1. **Add authentication** for admin panel
2. **Connect email service** (SendGrid, Mailgun)
3. **Add student dashboard** with progress tracking
4. **Implement real chatbot** (Dialogflow, Rasa)
5. **Add blog section** for educational content
6. **Enable payment processing** (Razorpay, Stripe)
7. **Create admin panel** for content management

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review browser console for errors
3. Check terminal output for backend errors
4. Verify all ports are correct
5. Check GitHub issues in repository

## 📄 License

This project is open-source and available under the MIT License.

---

**Made with ❤️ by Brain Builders Team**

Building strong concepts and academic excellence! 🧠🎓
