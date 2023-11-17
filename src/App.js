import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProvider from "./firebase/Auth";
import GamePage from "./pages/GamePage";
import LocationProvider from "./context/LocationProvider";

function App() {

    return (
        <LocationProvider>
        <AuthProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route exact path="/" element={<HomePage/>}/>
                            <Route exact path="/game/:gameId" element={<GamePage/>}/>
                            <Route exact path="/login" element={<Login />}/>
                            <Route exact path="/signup" element={<SignUp />}/>
                            <Route exact path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </div>
                </Router>
        </AuthProvider>
        </LocationProvider>
    );
}

export default App;
