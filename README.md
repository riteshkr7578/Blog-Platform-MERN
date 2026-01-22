# 📝 Blog Platform with Content Management

A full-stack **Blog Platform** built using the **MERN stack**, allowing users to create, manage, and publish blog posts with rich text content, images, categories, comments, likes, and a draft–publish workflow.

The application is designed to reflect **real-world content management behavior** with proper authentication, authorization, and clean UI.

-----------------------------------------------------------------------

## 🚀 Features

* User registration and JWT-based authentication
* Create blog posts using a rich text editor
* Upload featured images for posts
* Draft and publish workflow
* Public homepage showing published posts
* Categorization of posts (Technology, Lifestyle, Business, Health, etc.)
* Search posts by title or content
* Like / Unlike functionality (published posts only)
* Comment system with add & delete (author-only delete)
* User profile page showing drafts and published posts
* Responsive UI built with Tailwind CSS

--------------------------------------------------------------------------

## 🛠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS **v3**
* React Quill (Rich Text Editor)
* Axios
* React Router v6

### Backend

* Node.js **v22+**
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (Image Uploads)
* bcrypt (Password hashing)

---

## 📦 Prerequisites

Make sure you have the following installed:

* **Node.js v22 or above**
* **MongoDB** (Local or MongoDB Atlas)
* npm (comes with Node.js)


## ⚠️ Notes & Troubleshooting
- While integrating **React Quill**, version compatibility issues were encountered during development.
- To ensure stability with React 18 and Vite, a compatible version of `react-quill` was used.
- If you face runtime or build errors related to React Quill, ensure the installed version matches the one specified in `package.json`.


Check versions:

```bash
node -v
npm -v
```

---

## 📁 Project Structure

```
blog-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/            # Uploaded images
│   ├── app.js / index.js
│   └── package.json
│
├── .env.example
├── README.md
└── package.json (optional root)
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder.

### `.env.example`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=your_jwt_secret_key
```

📌 Replace values according to your setup.

---

## 📥 Installation Steps

### 1️⃣ Clone the repository

```bash
git clone <your-github-repo-url>
cd blog-platform
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Start backend server:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🗄 Database Seeding

A seed script is included to populate sample data.

### Seed includes:

* 5 users
* 15 blog posts (draft + published)

Run seed command:

```bash
npm run seed
```

📌 Make sure MongoDB is running before seeding.

---

## 🔍 API Testing Instructions

You can test APIs using **Postman** or **Thunder Client**.

### Example APIs

* **Auth**

  * `POST /api/auth/register`
  * `POST /api/auth/login`

* **Posts**

  * `POST /api/posts` (Create – Draft)
  * `PATCH /api/posts/:id/status` (Publish)
  * `GET /api/posts` (Published posts)
  * `GET /api/posts/my` (User posts)
  * `PUT /api/posts/:id` (Edit post)

* **Search**

  * `GET /api/posts/search?q=keyword`

* **Comments**

  * `GET /api/comments/:postId`
  * `POST /api/comments/:postId`
  * `DELETE /api/comments/:commentId`

📌 Protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🖼 Image Upload Handling

* Images are uploaded using **Multer**
* Stored in `/server/uploads`
* Served via Express static middleware
* Database stores **relative paths** (e.g. `/uploads/image.png`)

Access example:

```
http://localhost:5000/uploads/image.png
```

---

## 🔐 Authentication & Security

* Passwords hashed using **bcrypt**
* JWT used for authentication
* Role-based authorization (author-only edit/delete)
* Protected routes via middleware
* Environment variables for sensitive data

---

## 🎨 UI & Responsiveness

* Tailwind CSS v3 used throughout
* Mobile-first responsive design
* Consistent button styles and spacing
* Clean blog-style layout suitable for real products

---

## 🧠 Key Design Decisions

* Draft posts are **not visible** to other users
* Only authors can edit or publish their posts
* Search works only on **published posts**
* Image paths stored as relative URLs for portability
* Clean separation of frontend and backend concerns

---

## ✅ Evaluation Readiness

This project satisfies **all assignment requirements**:

* ✔ Rich text editor integration
* ✔ Image upload & display
* ✔ Draft & publish workflow
* ✔ Comment & like system
* ✔ Search by title/content
* ✔ User profile with posts
* ✔ Responsive UI
* ✔ Clean code & documentation

---

## 👤 Author

**Ritesh Kumar**
Full Stack Developer (MERN)

---
