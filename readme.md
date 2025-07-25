# StudentTools - MERN Stack Application

A comprehensive MERN stack website for students featuring text sharing, resume building, link shortening, and helpful study tools.

## 🚀 Features

### 1. Text Sharing (like qtext.io or protectedtext.com)
- Share plain text via unique 4-digit codes
- Auto-delete after 10 minutes
- One-time or unlimited views
- No registration required
- View count tracking

### 2. Resume Builder
- Professional resume templates
- Real-time preview
- PDF download functionality
- Form-based input system
- Multiple template styles

### 3. Link Shortener
- Convert long URLs to short links
- Custom slug support
- Click tracking and analytics
- Optional expiry dates
- Redirect functionality

### 4. Student Tools
- **GPA/CGPA Calculator**: Calculate semester and cumulative GPA
- **Pomodoro Timer**: 25/5 minute work/break cycles
- **To-Do List**: Task management with localStorage
- **Document Templates**: Pre-filled templates for common documents
- **Resume Writing Tips**: Professional guidance

### 5. Admin Panel
- View and manage text shares
- Monitor short links
- Usage statistics
- Cleanup expired entries
- Password-protected access

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Rate Limiting** - Spam protection
- **TTL Indexing** - Automatic data cleanup

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Custom CSS** - Responsive design with CSS variables
- **html2pdf.js** - PDF generation
- **Local Storage** - Client-side data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "text share"
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Create environment file
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and admin password

# Start MongoDB (if running locally)
mongod

# Start the backend server
npm run server
```

### 3. Frontend Setup
```bash
# Install frontend dependencies
npm run install-client

# Start the frontend development server
npm run client
```

### 4. Run Both (Development)
```bash
# Run both backend and frontend concurrently
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-tools
ADMIN_PASSWORD=admin123
```

### Frontend (.env)
```env
REACT_APP_API_BASE=http://localhost:5000
```

## 📊 API Endpoints

### Text Sharing
- `POST /api/text` - Create new text share
- `GET /api/text/:code` - Retrieve text by code

### Link Shortening
- `POST /api/link` - Create short link
- `GET /api/link/:slug/stats` - Get link statistics
- `GET /l/:slug` - Redirect to original URL

### Admin
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/texts` - Get all text shares
- `GET /api/admin/links` - Get all short links
- `DELETE /api/admin/texts/:id` - Delete specific text
- `DELETE /api/admin/links/:id` - Delete specific link
- `DELETE /api/admin/cleanup` - Clean expired entries

## 🎨 Theming

The application supports light and dark themes using CSS variables:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --accent-primary: #007bff;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --accent-primary: #4dabf7;
  /* ... dark theme overrides */
}
```

## 📱 Responsive Design

- Mobile-first approach
- Flexbox and CSS Grid layouts
- Adaptive navigation
- Touch-friendly interfaces

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS configuration
- No sensitive data storage
- Automatic data expiration

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB provider
2. Deploy to Heroku, Vercel, or your preferred platform
3. Set production environment variables
4. Configure CORS for your frontend domain

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or serve static files
3. Update API base URL for production

### Production Considerations
- Change default admin password
- Use environment variables for sensitive data
- Enable HTTPS
- Set up proper logging
- Configure backup strategies

## 📁 Project Structure

```
text share/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── App.css        # Global styles
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── package.json          # Root package.json
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Live Demo

- Frontend: [Your deployed frontend URL]
- API: [Your deployed backend URL]
- Admin Panel: [Your deployed frontend URL]/admin

## 📞 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🚨 Important Notes

- **Security**: Change the default admin password before deploying to production
- **Database**: MongoDB TTL indexes automatically delete expired texts
- **Rate Limiting**: Configured to prevent spam and abuse
- **Privacy**: No user registration required, data auto-expires
- **Browser Support**: Modern browsers with ES6+ support

## ⚡ Quick Start Commands

```bash
# Install all dependencies
npm run install-all

# Development mode (both frontend and backend)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

**Note**: This application is designed for educational and productivity purposes. Ensure proper security measures are in place before deploying to production.