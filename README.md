# 🛒 Maktarisia | Full-Stack eCommerce Platform

Maktarisia is a modern, full-stack eCommerce solution built with the **MERN** stack (MongoDB, Express, React, Node.js). This project features a robust authentication system, a responsive user interface, and a professional admin dashboard for inventory management.

🚀 **Live Demo:** [https://maktarisia.netlify.app](https://maktarisia.netlify.app)  
⚙️ **Backend API:** [https://maktarisia-backend.onrender.com](https://maktarisia-backend.onrender.com)

---

## 🌟 Key Features

### 👤 User Experience
- **Full Authentication:** Secure User Sign-up/Login using **JWT (JSON Web Tokens)**.
- **Persistent Sessions:** Uses HTTP-Only Cookies to keep users logged in securely.
- **Product Discovery:** Search, filter by category, and view top-rated products.
- **Shopping Cart:** Fully functional cart system powered by **Redux Toolkit**.
- **Checkout Process:** Integrated PayPal payment gateway for real-world transactions.

### 🛠 Admin Features (The "Management Suite")
- **Product Management:** Create, Update, and Delete products with image upload support.
- **Category Control:** Dynamic category creation and management.
- **Order Tracking:** Overview of all customer orders and delivery status.
- **User Management:** Ability to manage user roles and permissions.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Redux Toolkit (RTK Query) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) |
| **Authentication** | JWT, Bcrypt.js, Cookie-Parser |
| **File Handling** | Multer, Path Resolution |
| **Deployment** | Netlify (Frontend), Render (Backend) |

---

## 📐 Architecture & Deployment

The project follows a **Decoupled Architecture**:
1. **Frontend:** Hosted on Netlify for optimized global delivery.
2. **Backend:** Hosted on Render as a managed web service.
3. **Database:** MongoDB Atlas cloud instance.



### Technical Challenge Solved:
One of the most significant challenges in this project was managing **Cross-Origin Resource Sharing (CORS)** and **Static File Paths** in a production environment. I implemented dynamic path resolution to ensure that product images stored in the `backend/uploads` directory remain accessible to the Netlify-hosted frontend across different cloud platforms.

---

## 🚀 Getting Started (Local Development)

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/maktarisia.git](https://github.com/YOUR_USERNAME/maktarisia.git)
Install Backend Dependencies

Bash
cd backend
npm install
Install Frontend Dependencies

Bash
cd ../frontend
npm install
Setup Environment Variables
Create a .env file in the root and add:

MONGO_URI, JWT_SECRET, PAYPAL_CLIENT_ID

Run the App

Bash
# From root
npm run dev
🤝 Contact
Developed by acef laatiri - LinkedIn: www.linkedin.com/in/acef-laatiri-3134b2381

Email: acef.laatiri.dev@gmail.com
