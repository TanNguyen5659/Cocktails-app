import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Header";
import BootstrapBody from "../components/bootstrap";
import Nav1 from "../components/nav";
import Footer from "../components/footer";
import Agecounter from "../components/agecounter";
import useFetchDataAndTable from "../components/useFetchDataAndTable";
import ExploreMessi from "../pages/more";
import MessiStats from "../pages/MessiStats"; // Import MessiStats
import Car from "../pages/car"; // Import Car
import RegisterPage from './forms.jsx/register';
import AccountDetailsPage from '../pages/userdetails';
import Navbar from '../components/Navbar';
import About from '../pages/About';
import Home from '../pages/Home';
import SingleCocktail from '../pages/SingleCocktail';
import UserAuth from '../components/UserAuth';
import LoginForm from './forms.jsx/LoginForm';
import SingleUser from '../pages/SingleUser';
import FavoriteCocktails from '../pages/FavoriteCocktail';
import Nearby from '../pages/Nearby';
import UserPosts from '../pages/UserPosts';

export default function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  // const DataTable = useFetchDataAndTable(`http://127.0.0.1:5001/post/`);
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/messi' element={
          <>
            <Header/>
            <BootstrapBody/>
            <Agecounter/>
            <div className="data-container">
              <h2>Data from Flask Backend:</h2>
              {DataTable}
            </div>
            
          </>
        } />
        <Route path='/more' element={<ExploreMessi />} />
        <Route path='/messi-stats' element={<MessiStats />} /> {/* Add new route */}
        <Route path='/forum' element={<Car />} />
        <Route path='/register' element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path='/accdetails' element={<AccountDetailsPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cocktail/:id' element={<SingleCocktail />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} isLoggedIn={isLoggedIn} />} />        <Route path='/user' element={<SingleUser />} />
        <Route path='/favorite' element={<FavoriteCocktails />} />
        <Route path='/nearby' element={<Nearby />} />
        <Route path='/userposts' element={<UserPosts />} />
        
      </Routes>
      <Footer/>
    </Router>
    
  )
}