# Apollo247 Clone - Doctor Listing Web App

This project is a front-end + back-end clone of the doctor listing page from Apollo247's official website. It includes real-time filters, search, pagination, and responsive doctor profile cards.

##  Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Deployment:** Render (Backend), GitHub Pages or similar (Frontend)

##  Features

- Display doctor profiles dynamically from MongoDB
- Search doctors by name or specialty
- Filter by gender and experience
- Dynamic pagination
- Responsive design
- Real doctor images and ratings
- Book appointment button UI

##  Folder Structure

```
Apollo247clone/
│
├── apollo247-frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── apollo247-backend/
    ├── server.js
    ├── models/
    │   └── Doctor.js
    ├── routes/
    │   └── doctorRoutes.js
    └── .env
```

##  How to Run Locally

### Backend
```bash
cd apollo247-backend
npm install
node server.js
```

### Frontend
Simply open `index.html` in the browser or deploy using GitHub Pages.

##  API Endpoint
```
GET /api/doctors
Query Params: ?gender=male&experience=5&search=cardio
```

##  Screenshot
![Apollo247 UI Screenshot](./screenshot.png)

##  Contact
- Developed by **Sirisha Malla**
- Email: sirishamalla@example.com
- GitHub: [SirishaMalla](https://github.com/SirishaMalla)

---

This is an academic/internship project built for learning purposes.
[README.md](https://github.com/user-attachments/files/22983715/README.md)
