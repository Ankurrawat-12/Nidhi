# Nidhi File Manager

A simple file management system built using **Next.js (React)** for the frontend and **Node.js (Express, Nest.js) with MongoDB** for the backend.

The Sanskrit word nidhi (निधि) means "treasure". It can also refer to a store or hoard. 

## 🚀 Live Demo
🔗 [Nidhi File Manager](https://nidhi-blue.vercel.app/)

---

## 📌 Features
✅ Create, rename, and delete files & folders  
✅ Drag and drop files into folders  
✅ Persistent storage with MongoDB  
✅ Breadcrumb navigation for easy folder navigation  

---

## 🛠 Installation & Setup

### **🔹 1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/nidhi-file-manager.git
cd nidhi-file-manager
```

### **🔹 2️⃣ Backend Setup**
Navigate to the backend folder:
```sh
cd backend
```

Install dependencies:
```sh
npm install
```

Create a `.env` file and add:
```env
MONGO_URI=your-mongodb-connection-string
PORT=8080
```

Start the backend server:
```sh
npm start
```

---

### **🔹 3️⃣ Frontend Setup**
Navigate to the frontend folder:
```sh
cd frontend
```

Install dependencies:
```sh
npm install
```

Create a `.env.local` file and add:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

Start the frontend server:
```sh
npm run dev
```

Open in browser:  
[http://localhost:3000](http://localhost:3000)

---

## 📜 API Endpoints

| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| GET    | /files             | Get all files & folders      |
| POST   | /files             | Create a new file/folder     |
| PUT    | /files/:id         | Rename a file/folder        |
| DELETE | /files/:id         | Delete a file/folder        |
| PUT    | /files/move/:id    | Move file to a folder       |

---

## 🔮 Future Enhancements

- 🔍 Search functionality  
- 🔑 User authentication (Login/Signup)  
- 📁 File upload support  
- 🌙 Dark mode UI  

---

## 👨‍💻 Author
👤 **Ankur**  
📩 Contact: ankurrawat620@gmail.com

---

## 🌟 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📜 License
This project is licensed under the MIT License.
