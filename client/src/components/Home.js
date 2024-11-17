import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../styles/Home.css'; 
import Profile from './Profile';
import { useAuth } from './Auth';
function Home(){


    const { auth, user } = useAuth(); // Access auth and user state

    return (
        <div className="front-page-container">
          <header className="hero-section">
            <nav className="top-nav">
                <Link to="/contest" className="nav-link">Contest</Link>
                {auth &&
                    <>
                        <p>Welcome back, {user?.name}!</p>
                        <Link to={`/profile/${user?.name}`}>Profile</Link> 
                    </>
                }
                {!auth &&
                    <>
                        <Link to="/register" className="btn btn-primary">Register Now</Link>
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                        <p>You are not logged in.</p>
                    </>
                    
                    
                }
                
            </nav>
            <div className="hero-content">
              <h1>Welcome to MathForces</h1>
              <p>The premier platform for challenging and exciting math competitions. Test your skills, compete with others, and enhance your mathematical thinking!</p>
              <div className="hero-buttons">
                
                
              </div>
            </div>
          </header>
          
          <section className="how-it-works">
            <h2>How It Works</h2>
            <p>Compete in math contests of varying difficulty levels. Each contest consists of a set of problems designed to test your problem-solving skills, logic, and speed. Gain points for each correct answer and see how you rank against others on the global leaderboard!</p>
            <ul className="features-list">
              <li><strong>Interactive Problems:</strong> Solve problems and submit answers in real-time.</li>
              <li><strong>Timed Contests:</strong> Complete as many problems as possible within the contest duration.</li>
              <li><strong>Leaderboard:</strong> Check your ranking and compare with other participants worldwide.</li>
            </ul>
          </section>
    
          <footer className="footer-section">
            <p>&copy; 2024 MathForces. All rights reserved.</p>
          </footer>
        </div>
      );
}

export default Home;