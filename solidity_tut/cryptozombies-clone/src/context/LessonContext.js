import React, { createContext, useState, useEffect, useContext } from 'react';
import lessonData from '../data/lessonData';

const LessonContext = createContext();

export function useLessonContext() {
  return useContext(LessonContext);
}

export function LessonProvider({ children }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [userCode, setUserCode] = useState({});
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem('cryptoZombiesUserCode');
    const savedProgress = localStorage.getItem('cryptoZombiesProgress');
    
    if (savedCode) {
      setUserCode(JSON.parse(savedCode));
    }
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentChapter(progress.currentChapter || 1);
    }
  }, []);

  // Update localStorage when code or progress changes
  useEffect(() => {
    if (Object.keys(userCode).length > 0) {
      localStorage.setItem('cryptoZombiesUserCode', JSON.stringify(userCode));
    }
    
    localStorage.setItem('cryptoZombiesProgress', JSON.stringify({
      currentChapter,
    }));
  }, [userCode, currentChapter]);

  // Update current lesson when chapter changes
  useEffect(() => {
    const lesson = lessonData.find(lesson => lesson.chapter === currentChapter);
    if (lesson) {
      setCurrentLesson(lesson);
      setIsCorrect(false);
      
      // Initialize code for this chapter if it doesn't exist
      if (!userCode[currentChapter] && lesson.initialCode !== undefined) {
        setUserCode(prev => ({
          ...prev,
          [currentChapter]: lesson.initialCode
        }));
      }
    }
  }, [currentChapter, userCode]);

  // Handle code changes
  const updateCode = (code) => {
    setUserCode(prev => ({
      ...prev,
      [currentChapter]: code
    }));
  };

  // Check if code is correct
  const checkAnswer = () => {
    const lesson = lessonData.find(lesson => lesson.chapter === currentChapter);
    if (!lesson) return false;
    
    // Skip check for lesson 1 which doesn't require coding
    if (currentChapter === 1) {
      setIsCorrect(true);
      return true;
    }
    
    // Normalize both codes for comparison (remove whitespace, make lowercase for case insensitivity)
    const normalizedUserCode = userCode[currentChapter].replace(/\s+/g, '').toLowerCase();
    const normalizedSolutionCode = lesson.solutionCode.replace(/\s+/g, '').toLowerCase();
    
    // Compare user code with solution code
    const isValid = normalizedUserCode === normalizedSolutionCode;
    
    setIsCorrect(isValid);
    
    // If not valid, give a console log for debugging
    if (!isValid) {
      console.log('Your answer does not match the expected solution. Try again!');
      // You could check for specific patterns here to give hints
      alert('Your code doesn\'t match the expected solution. Please check your code carefully.');
    }
    
    return isValid;
  };

  // Navigate to next chapter
  const goToNextChapter = () => {
    if (currentChapter < lessonData.length) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  // Navigate to previous chapter
  const goToPreviousChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const value = {
    lessonData,
    currentChapter,
    currentLesson,
    userCode,
    isCorrect,
    updateCode,
    checkAnswer,
    goToNextChapter,
    goToPreviousChapter,
    setCurrentChapter
  };

  return (
    <LessonContext.Provider value={value}>
      {children}
    </LessonContext.Provider>
  );
}

export default LessonContext; 