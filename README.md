# ✍️ BlogSphere — Premium Full-Stack Magazine Platform

A full-stack **Blog Platform** built using the **MERN stack**, allowing users to create, manage, and publish blog posts with rich text content, images, categories, comments, likes, and a draft–publish workflow. 

Recently upgraded to **BlogSphere**, this codebase has been extensively enhanced with a premium, state-of-the-art visual style, true dark mode integration, high-fidelity typography, and serverless-ready cloud storage integration.

---

## 🚀 Key Features

* **Branded Design (BlogSphere)**: A gorgeous modern publication aesthetic featuring clean lines, Plus Jakarta Sans typography, soft shadows, and card-based grid layouts.
* **Persistent Dark & Light Mode Theme**: A class-based theme switcher driven by custom contexts, utilizing a persistent `localStorage` cache. Dark mode uses a highly readable, elegant midnight space palette (`#0b0f19`).
* **Cloudinary Image Integration**: Upgraded from local directory uploads to streaming in-memory file buffers directly to **Cloudinary** cloud storage, making the server architecture 100% serverless-ready (e.g. Vercel).
* **Rich Blog Content Typography (`.blog-content`)**: Custom-tailored typography engine designed to style rich HTML output (headers, lists, blockquotes, code fragments) with premium Medium/Substack-like layouts.
* **User registration and JWT-based authentication** with automatic login/register validation and cross-route protections.
* **Axios Interceptor Safeguards**: High-reliability interceptors that handle token-based autologouts while preventing page reloads on incorrect credentials.
* **Draft and publish workflow**: Authors can write articles, save draft editions, preview in-realtime, and publish when ready.
* **Search & Categorization**: Search posts instantly by title/contents; filter cleanly by categories like Technology, Lifestyle, Business, Health, and others.
* **Threaded Discussions**: Responsive comment system with visual avatar markers and author-only delete actions.
* **Engaging Likes**: Seamless like/unlike capability on published editorial posts.

---

## 🛠 Tech Stack

### Frontend
* **Core**: React.js 18 (Vite)
* **Styling**: Tailwind CSS **v3** (Class-based dark mode)
* **Rich Text**: React Quill
* **API Calls**: Axios (Custom Interceptors)
* **Routing**: React Router v6

### Backend
* **Core**: Node.js **v22+**, Express.js **v5** (Latest Express wildcard routes)
* **Database**: MongoDB (Mongoose ODM)
* **Cloud Storage**: Multer (In-memory Storage) & **Cloudinary SDK**
* **Security**: Bcrypt password hashing & JWT auth authorization

---

## 📦 Prerequisites

Make sure you have the following installed:
* **Node.js v22 or above**
* **MongoDB** (Local instance or MongoDB Atlas account)
* **Cloudinary Developer Account** (for cloud-based file uploads)

Check system versions:
```bash
node -v
npm -v
```

---

## ⚙️ Environment Variables

### Backend (`/server/.env`)
Create a `.env` file inside the `server/` directory and configure the variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=your_jwt_secret_key

# Cloudinary Integration API Keys
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`/client/.env`)
Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📥 Installation Steps

### 1️⃣ Clone the repository
```bash
git clone <your-github-repo-url>
cd blog-platform
```

### 2️⃣ Backend Server Setup
```bash
cd server
npm install
```
Start Express server:
```bash
npm run dev
```
Backend server listens at: `http://localhost:5000`

### 3️⃣ Frontend Client Setup
```bash
cd ../client
npm install
```
Start Vite development server:
```bash
npm run dev
```
Frontend client listens at: `http://localhost:5173`

---

## 🗄 Database Seeding

A database seeding script is provided to pre-populate Mongo collections with sample mock accounts and formatted blog posts.

Run the seed script from the server folder:
```bash
cd server
npm run seed
```
*(Ensure MongoDB service is running on your system before launching).*

---

## 🖼 Cloudinary Upload Handling
* **In-Memory Buffer Stream**: Local file writes are entirely replaced. The server parses file attachments using `multer.memoryStorage()`, streaming the binary content directly to the Cloudinary API.
* **Dynamic URL Delivery**: Database collections store secure HTTPS cloud URLs returned by Cloudinary.
* **Legacy Portability**: The client is equipped with backward compatibility handlers, allowing both static, legacy `/uploads/` URLs and Cloudinary assets to render side-by-side.

---

## 🔍 API Testing References

You can trigger backend tests using Postman, Thunder Client, or cURL.

* **Authentication Routes**:
  * `POST /api/auth/register` (Register a new account)
  * `POST /api/auth/login` (Authenticate and retrieve JWT)

* **Post Operations**:
  * `POST /api/posts` (Create draft post, includes optional `image` payload)
  * `PATCH /api/posts/:id/status` (Toggle status to published)
  * `GET /api/posts` (Fetch published articles)
  * `GET /api/posts/my` (Fetch authenticated user's draft & published posts)
  * `PUT /api/posts/:id` (Edit existing post contents)

* **Comments & Likes**:
  * `GET /api/comments/:postId` (Fetch article comments)
  * `POST /api/comments/:postId` (Post a comment)
  * `DELETE /api/comments/:commentId` (Remove a comment - authorized only)
  * `POST /api/posts/:id/like` (Toggle heart like status)

*Protected routes require passing `Authorization: Bearer <JWT_TOKEN>` headers.*

---

## 🧠 Key Design Decisions

* **Express 5 Support**: Configured wildcard route mappings using Express v5 compliant param capture formats (`/*splat`) to handle Single Page App (SPA) routers correctly without crashes.
* **Axios 401 Interceptor Safeguard**: Enhanced response failure interceptors to exclude `/auth/login` attempts, ensuring wrong passwords display visible warnings instead of triggering loops.
* **Default Theme State**: Pre-loaded the React application to boot into persistent dark mode to give the platform a premium first-impression.
* **Real-time Image Select Previews**: Added automatic object URL generation in editing and creation studios, letting authors preview graphic headers immediately upon picking files.

---

## 👤 Author

**Ritesh Kumar**
*Full Stack Developer (MERN)*
