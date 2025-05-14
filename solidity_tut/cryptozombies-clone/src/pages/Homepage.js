import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLessonContext } from '../context/LessonContext';

const HomepageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #fff;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  margin-bottom: 40px;
`;

const LessonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const LessonCard = styled.div`
  background-color: var(--secondary-bg);
  border-radius: 8px;
  padding: 20px;
  text-align: left;
  transition: transform 0.2s;
  cursor: pointer;
  border: 1px solid var(--border-color);
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-color);
  }
  
  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #fff;
  }
  
  p {
    color: #aaa;
    font-size: 0.9rem;
  }
  
  .progress {
    font-size: 0.8rem;
    color: var(--accent-color);
    margin-top: 15px;
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: var(--accent-color);
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  
  .completed {
    color: var(--success-color);
    
    &::before {
      background-color: var(--success-color);
    }
  }
`;

function Homepage() {
  const { lessonData, currentChapter, setCurrentChapter } = useLessonContext();
  const navigate = useNavigate();
  
  const handleLessonClick = (chapter) => {
    setCurrentChapter(chapter);
    navigate(`/lesson/${chapter}`);
  };
  
  return (
    <HomepageContainer>
      <Title>CryptoZombies</Title>
      <Subtitle>Learn Solidity by Building Your Own Zombie Army</Subtitle>
      
      <p>
        Welcome to our Solidity learning platform! In this interactive tutorial, 
        you'll build a "Zombie Factory" to create your own army of zombies. Along the way, 
        you'll learn the fundamentals of Solidity and smart contract development.
      </p>
      
      <LessonsGrid>
        {lessonData.map((lesson) => (
          <LessonCard 
            key={lesson.chapter} 
            onClick={() => handleLessonClick(lesson.chapter)}
          >
            <h2>Chapter {lesson.chapter}: {lesson.title}</h2>
            <p>{lesson.description}</p>
            
            {lesson.chapter < currentChapter ? (
              <div className="progress completed">Completed</div>
            ) : lesson.chapter === currentChapter ? (
              <div className="progress">In Progress</div>
            ) : (
              <div className="progress" style={{ color: '#aaa' }}>Not Started</div>
            )}
          </LessonCard>
        ))}
      </LessonsGrid>
    </HomepageContainer>
  );
}

export default Homepage; 