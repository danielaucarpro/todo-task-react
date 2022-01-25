import "./App.css";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import { useEffect } from "react";

// Functional Component
function App() {
  useEffect(() => {
    const admin = {
      userName: "admin123",
      email: "admin@gmail.com",
      password: "admin123",
      // Math.random to give any random ID to the created User
      id: Math.random(),
      role: 'admin'
    };

    const userList = JSON.parse(localStorage.getItem("users")); // null
    if (userList) {
      const findAdmin = userList.find(({ email }) => email === admin.email);
      if (!findAdmin) {
        userList.push(admin);
        localStorage.setItem('users', JSON.stringify(userList));
      }
    } else {
      localStorage.setItem('users', JSON.stringify([admin]));
    }
   
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
