import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import ZombieSliders from './ZombieSliders';

const ContentContainer = styled.div`
  padding: 20px;
  color: #fff;
  line-height: 1.6;
  font-size: 16px;
  
  h1 {
    color: #fff;
    font-size: 26px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
  }
  
  h2 {
    color: #fff;
    font-size: 22px;
    margin-top: 30px;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 15px;
  }
  
  ul, ol {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  pre {
    margin: 15px 0;
    border-radius: 4px;
    overflow: auto;
  }
  
  code {
    font-family: 'Fira Code', monospace;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  .note {
    background-color: rgba(0, 0, 0, 0.3);
    border-left: 4px solid #3498db;
    padding: 15px;
    margin: 15px 0;
    border-radius: 0 4px 4px 0;
  }
  
  .task {
    margin-top: 30px;
  }
  
  .task-item {
    background-color: rgba(52, 152, 219, 0.1);
    border-left: 4px solid #3498db;
    padding: 15px;
    margin: 10px 0;
    border-radius: 0 4px 4px 0;
  }
`;

function LessonContent({ content, chapter }) {
  const [geneValues, setGeneValues] = useState([83, 14, 35, 67, 22, 45]);

  // Helper function to render code blocks with syntax highlighting
  const renderCodeBlock = (code, language = 'solidity') => {
    return (
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>
    );
  };

  // Process content to replace code block placeholders with actual syntax-highlighted code
  const renderContent = () => {
    if (!content) return null;

    // Replace markdown-style code blocks with syntax highlighted blocks
    const contentWithCodeBlocks = content.map((section, index) => {
      if (typeof section === 'string') {
        // Process inline code and other formatting
        return <div key={index} dangerouslySetInnerHTML={{ __html: section }} />;
      } else if (section.type === 'code') {
        return (
          <div key={index} className="code-block">
            {section.label && <div className="code-label">{section.label}</div>}
            {renderCodeBlock(section.code, section.language)}
          </div>
        );
      } else if (section.type === 'task') {
        return (
          <div key={index} className="task">
            <h3>{section.title || 'Put it to the test'}</h3>
            <ol>
              {section.items.map((item, i) => (
                <li key={i} className="task-item">{item}</li>
              ))}
            </ol>
          </div>
        );
      } else if (section.type === 'note') {
        return (
          <div key={index} className="note">
            {section.content}
          </div>
        );
      }
      return null;
    });

    return contentWithCodeBlocks;
  };

  // Show sliders only for the first chapter
  const showSliders = chapter === 1;

  return (
    <ContentContainer>
      {renderContent()}
      
      {showSliders && (
        <div className="zombie-preview">
          <h3>Zombie DNA Editor</h3>
          <p>Adjust the sliders to see how DNA values affect your zombie's appearance</p>
          <ZombieSliders 
            geneValues={geneValues} 
            onChange={setGeneValues} 
          />
        </div>
      )}
    </ContentContainer>
  );
}

export default LessonContent; 