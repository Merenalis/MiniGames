import {BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./firebase/Auth";
import GamePage from "./pages/GamePage";

function App() {

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/game/:gameId" element={<GamePage/>}/>
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
