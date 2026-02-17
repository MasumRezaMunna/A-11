
Live Site Link: https://a-11-teal.vercel.app

GitHub Repository (Client): https://github.com/MasumRezaMunna/A-11.git

GitHub Repository (Server): https://github.com/MasumRezaMunna/A-11-Server.git

TutorLink | Full-Stack Tutor Booking Platform 
A comprehensive platform designed to connect students with professional tutors. This project implements a robust Role-Based Access Control (RBAC) system using Firebase Admin SDK for authentication and MongoDB for data persistence.

Key Features ::
Dual Authentication: Secure login using Firebase (Email/Password & Google Social Login).
Role Management: Automatic synchronization between Firebase Auth and MongoDB (Student, Tutor, Admin).
Dynamic Search: Filter tutors based on categories, price, and availability.
Secure API: Custom Axios interceptors to handle JWT/Firebase Bearer tokens.
Protected Routes: Frontend and Backend protection for Admin and Private dashboards.
Responsive UI: Fully optimized for mobile, tablet, and desktop using Tailwind CSS.

Tech Stack ::
Frontend Framework: React.js (Vite)
Styling: Tailwind CSS, DaisyUI 
State Management: Context API
Auth: Firebase Client SDK
HTTP Client: Axios
Backend Runtime: Node.js
Framework: Express.js
Database: MongoDB (via Mongoose)
Auth: Firebase Admin SDK
Security: Helmet, CORS, Dotenv



Challenges & Solutions ::
1. The Auth Sync Loop
Challenge: Syncing Firebase users with MongoDB roles caused an infinite redirect loop when the backend route was misplaced.
Solution: Implemented a /users/me route placed strictly above dynamic ID routes in Express. Used an Axios Interceptor to ensure the Firebase token is attached to the very first request before the UI renders.

3. Private Key Formatting on Vercel ::
Challenge: Vercel often misinterprets the newline characters (\n) in the Firebase Private Key.
Solution: Used .replace(/\\n/g, '\n') during the Firebase Admin initialization to ensure the key is read correctly across all environments.



Contributing ::
Contributions are welcome! Please feel free to submit a Pull Request.
