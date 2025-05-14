import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LessonPage from './pages/LessonPage';
import Homepage from './pages/Homepage';
import { LessonProvider } from './context/LessonContext';
import './App.css';

function App() {
  return (
    <Router>
      <LessonProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/lesson/:chapter" element={<LessonPage />} />
          </Routes>
        </div>
      </LessonProvider>
    </Router>
  );
}

export default App; 