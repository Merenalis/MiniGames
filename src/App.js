import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFoundPage from "./components/NotFoundPage";
import AuthProvider from "./firebase/Auth";

function App() {

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/login" element={<Login />}/>
                        <Route exact path="/signup" element={<SignUp />}/>
                        <Route exact path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </Router>

        </AuthProvider>

    );
}

export default App;
