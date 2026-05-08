# 🌍 WanderLust — Airbnb Clone

> A full-stack travel listing web application inspired by Airbnb, built with Node.js, Express, MongoDB & EJS.

---

## 🚀 Live Demo

> _Coming soon — deploying on Render_

---

## 📸 Screenshots

> _Add screenshots of your app here_

---

## ✨ Features

- 🏠 **Browse Listings** — View all available travel stays on the home page
- 🔍 **Search** — Search listings by title, location, or country
- 🗂️ **Category Filters** — Filter by Trending, Rooms, Mountains, Castles, Amazing Pools, Camping, Arctic, Igloo, Dome
- 💰 **GST Toggle** — Toggle to display total price after 18% GST
- 🖼️ **Image Upload** — Upload listing images via Cloudinary
- ➕ **Create Listings** — Authenticated users can add new listings
- ✏️ **Edit & Delete** — Owners can edit or delete their own listings
- ⭐ **Reviews & Ratings** — Users can leave star-rated reviews on listings
- 🔐 **Authentication** — Secure sign up, log in & log out using Passport.js
- 🛡️ **Authorization** — Only listing owners can edit/delete their posts
- ⚡ **Flash Messages** — Success & error notifications throughout the app
- 📱 **Responsive Design** — Mobile-friendly layout using Bootstrap 5

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **Passport.js** | Authentication (Local Strategy) |
| **express-session** | Session management |
| **connect-flash** | Flash messages |
| **Multer** | File/image upload handling |
| **method-override** | PUT & DELETE support in forms |
| **Joi** | Server-side schema validation |

### Frontend
| Technology | Purpose |
|---|---|
| **EJS** | Templating engine |
| **ejs-mate** | Layout support for EJS |
| **Bootstrap 5** | Responsive UI framework |
| **Font Awesome** | Icons |

### Cloud Services
| Service | Purpose |
|---|---|
| **Cloudinary** | Image storage & delivery |
| **MongoDB Atlas** | Cloud database (production) |

---

## 📁 Project Structure

```
WanderLust/
├── controllers/        # Route handler logic
│   ├── listings.js     # Listing CRUD, search, filter
│   ├── reviews.js      # Review create & delete
│   └── users.js        # Sign up, login, logout
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express routers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── layouts/        # Base layout (boilerplate)
│   ├── includes/       # Navbar, footer, flash
│   ├── listings/       # Index, show, new, edit
│   └── users/          # Login, signup
├── public/             # Static assets
│   ├── css/
│   └── js/
├── utils/              # Helper utilities
│   ├── ExpressError.js
│   └── wrapAsync.js
├── middleware.js        # Custom middleware (auth, validation)
├── schema.js           # Joi validation schemas
├── cloudconfig.js      # Cloudinary configuration
├── app.js              # Express app entry point
└── .env                # Environment variables (not committed)


## 🚀 Deployment

This app is configured for deployment on **Render**:

1. Push your code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repo
4. Add all environment variables in the Render dashboard
5. Set build command: `npm install`
6. Set start command: `node app.js`

---

## 🙏 Acknowledgements

- Inspired by [Airbnb](https://www.airbnb.com)
- Icons by [Font Awesome](https://fontawesome.com)
- UI components by [Bootstrap](https://getbootstrap.com)
- Images hosted on [Cloudinary](https://cloudinary.com)

---


<p align="center">Made with ❤️ by <strong>Yash Mayanil</strong></p>
