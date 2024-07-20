import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoutes"
import AboutMe from "./pages/AboutMe";
import NavBar from "./components/Navbar";


function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}
function App() {
  return (
      <div className="App">

          <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />}/>
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />}/>
                <Route path="/aboutMe" element={<AboutMe />}/>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>

      </div>
  );
}

export default App;
