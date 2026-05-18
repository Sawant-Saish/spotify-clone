# Spotify Clone — Backend API

A RESTful backend for a Spotify-like music streaming application. Built with Node.js, Express, MongoDB, and ImageKit for file storage.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **File Upload**: Multer + ImageKit
- **Environment**: dotenv

---

### Installation

```bash
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000`

---
