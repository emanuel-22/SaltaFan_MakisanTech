import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/general/Navbar';
import Home from './pages/home/Home';
import Contacto from './pages/Contacto';
import EventosInfo from './pages/EventosInfo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EventosGrid from './pages/EventosGrid';
import Footer from './components/general/Footer';
import UserInterests from './components/auth/UserInterests';
import Nosotros from './pages/Nosotros';
import News from './pages/News';
import NewsInfo from './pages/NewsInfo';
import CreateEvent from './pages/CreateEvent';
import MyProfile from './components/general/MyProfile';
import { UserProvider, UserContext } from './context/UserContext';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Main />
      </UserProvider>
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const { name, role } = useContext(UserContext);
  const hideFooter = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/userinterests";
  const isAuthenticated = name !== null;
  const isOrganizer = role === "ORGANIZER";

  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/eventos" element={<EventosGrid />} />
          <Route path="/eventos/:id" element={<EventosInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userinterests" element={<UserInterests />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsInfo />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route
            path="/create-event"
            element={isAuthenticated && isOrganizer ? <CreateEvent /> : <Navigate to="/" />}
          />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
