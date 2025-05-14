import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLessonContext } from '../context/LessonContext';
import LessonContent from '../components/LessonContent';
import CodeEditor from '../components/CodeEditor';

const LessonContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const LessonSidebar = styled.div`
  width: 50%;
  background-color: var(--sidebar-bg);
  overflow-y: auto;
  border-right: 1px solid var(--border-color);
`;

const EditorContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--secondary-bg);
  border-bottom: 1px solid var(--border-color);
  
  .file-name {
    font-family: monospace;
    color: #aaa;
  }
`;

const EditorArea = styled.div`
  flex: 1;
  position: relative;
  background-color: #1e1e1e;
  overflow: hidden;
`;

const HintsArea = styled.div`
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.3);
  border-top: 1px solid var(--border-color);
  
  .hint-title {
    font-size: 14px;
    color: #aaa;
    margin-bottom: 6px;
  }
  
  .hint-content {
    font-size: 14px;
    color: #fff;
  }
`;

const LessonNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: var(--sidebar-bg);
  border-top: 1px solid var(--border-color);
  
  .lesson-progress {
    color: #aaa;
    display: flex;
    align-items: center;
  }
`;

const CheckAnswerButton = styled.button`
  background-color: ${props => props.isCorrect ? 'var(--success-color)' : 'var(--accent-color)'};
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const NavigationButton = styled.button`
  background-color: ${props => props.primary ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#aaa'};
  border: ${props => props.primary ? 'none' : '1px solid var(--border-color)'};
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'};
    opacity: ${props => props.primary ? '0.9' : '1'};
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const FeedbackMessage = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: var(--danger-color);
  color: white;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #171a21;
  border-top: 1px solid var(--border-color);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ShowAnswerButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const TryAgainButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #c0392b;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const FactoryTitle = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 14px;
  
  svg {
    margin-right: 8px;
  }
`;

function LessonPage() {
  const { chapter } = useParams();
  const navigate = useNavigate();
  const { 
    currentChapter, 
    currentLesson, 
    userCode, 
    updateCode, 
    checkAnswer, 
    isCorrect, 
    goToNextChapter, 
    goToPreviousChapter,
    lessonData 
  } = useLessonContext();
  
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  // Redirect if chapter doesn't match current chapter
  useEffect(() => {
    const chapterNum = parseInt(chapter);
    if (chapterNum !== currentChapter && !isNaN(chapterNum)) {
      navigate(`/lesson/${currentChapter}`);
    }
  }, [chapter, currentChapter, navigate]);
  
  const handleCodeChange = (newCode) => {
    updateCode(newCode);
    setShowFeedback(false);
  };
  
  const handleCheckAnswer = () => {
    const result = checkAnswer();
    setShowFeedback(!result);
    
    if (result && currentChapter < lessonData.length) {
      // If answer is correct and there are more chapters, show success message
      setTimeout(() => {
        goToNextChapter();
        navigate(`/lesson/${currentChapter + 1}`);
      }, 1500);
    }
  };
  
  const handleShowAnswer = () => {
    if (currentLesson && currentLesson.solutionCode) {
      setShowSolution(true);
      updateCode(currentLesson.solutionCode);
    }
  };
  
  const handleTryAgain = () => {
    if (currentLesson && currentLesson.initialCode) {
      setShowSolution(false);
      setShowFeedback(false);
      updateCode(currentLesson.initialCode);
    }
  };
  
  if (!currentLesson) {
    return <div>Loading lesson...</div>;
  }
  
  return (
    <LessonContainer>
      <LessonSidebar>
        <LessonContent 
          content={currentLesson.content} 
          chapter={currentChapter}
        />
      </LessonSidebar>
      
      <EditorContainer>
        <EditorHeader>
          <div className="file-name">Contract.sol</div>
          <button onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </EditorHeader>
        
        <EditorArea>
          <CodeEditor 
            initialCode={userCode[currentChapter]} 
            onChange={handleCodeChange}
            language="solidity"
          />
          {showFeedback && (
            <FeedbackMessage>
              Your code doesn't match the expected solution. Try again!
            </FeedbackMessage>
          )}
        </EditorArea>
        
        {showHint && (
          <HintsArea>
            <div className="hint-title">Hint:</div>
            <div className="hint-content">{currentLesson.hint}</div>
          </HintsArea>
        )}
        
        <LessonNavigation>
          <div className="navigation-buttons">
            <NavigationButton 
              onClick={() => {
                goToPreviousChapter();
                navigate(`/lesson/${currentChapter - 1}`);
              }}
              disabled={currentChapter <= 1}
            >
              Back
            </NavigationButton>
          </div>
          
          <div className="lesson-progress">
            {currentChapter}/{lessonData.length}
          </div>
          
          <div className="action-buttons">
            {isCorrect ? (
              <NavigationButton 
                primary
                onClick={() => {
                  goToNextChapter();
                  navigate(`/lesson/${currentChapter + 1}`);
                }}
                disabled={currentChapter >= lessonData.length}
              >
                Next
              </NavigationButton>
            ) : (
              <CheckAnswerButton 
                onClick={handleCheckAnswer}
                isCorrect={isCorrect}
              >
                {isCorrect ? 'Correct! ✓' : 'Check Answer'}
              </CheckAnswerButton>
            )}
          </div>
        </LessonNavigation>
        
        <ButtonsContainer>
          <FactoryTitle>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M7 15v2"></path>
              <path d="M11 11v6"></path>
              <path d="M15 7v10"></path>
              <path d="M19 3v14"></path>
            </svg>
            Making the Zombie Factory
          </FactoryTitle>
          
          <ActionButtons>
            <ShowAnswerButton onClick={handleShowAnswer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Show me the answer
            </ShowAnswerButton>
            
            <TryAgainButton onClick={handleTryAgain}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v6h6"></path>
                <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
              </svg>
              Try Again
            </TryAgainButton>
          </ActionButtons>
        </ButtonsContainer>
      </EditorContainer>
    </LessonContainer>
  );
}

export default LessonPage; 