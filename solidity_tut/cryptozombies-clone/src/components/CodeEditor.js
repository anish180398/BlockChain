import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  position: relative;
  height: 100%;
  font-family: 'Fira Code', monospace;
  background-color: #1e1e1e;
`;

const TextareaWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledTextarea = styled.textarea`
  font-family: 'Fira Code', monospace;
  width: 100%;
  height: 100%;
  padding: 12px;
  background-color: transparent;
  color: transparent;
  caret-color: white;
  border: none;
  resize: none;
  outline: none;
  font-size: 14px;
  tab-size: 4;
  line-height: 1.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  white-space: pre;
  overflow: auto;
`;

const SyntaxHighlighterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  
  pre {
    margin: 0 !important;
    background-color: transparent !important;
    padding: 12px !important;
    font-family: 'Fira Code', monospace !important;
    font-size: 14px !important;
    tab-size: 4 !important;
    line-height: 1.5 !important;
    overflow: hidden !important;
    white-space: pre !important;
  }
`;

function CodeEditor({ initialCode, onChange, language = 'solidity' }) {
  const [code, setCode] = useState(initialCode || '');

  useEffect(() => {
    if (initialCode !== undefined && code !== initialCode) {
      setCode(initialCode || '');
    }
  }, [initialCode, code]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleKeyDown = (e) => {
    // Handle tab key to insert 2 spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode = 
        code.substring(0, selectionStart) + 
        '  ' + 
        code.substring(selectionEnd);
      
      setCode(newCode);
      if (onChange) {
        onChange(newCode);
      }
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      }, 0);
    }
  };

  return (
    <EditorWrapper>
      <TextareaWrapper>
        <StyledTextarea 
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          data-gramm="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </TextareaWrapper>
      <SyntaxHighlighterWrapper>
        <SyntaxHighlighter 
          language={language}
          style={vscDarkPlus}
          wrapLines={true}
          customStyle={{ background: 'transparent' }}
        >
          {code || ' '}
        </SyntaxHighlighter>
      </SyntaxHighlighterWrapper>
    </EditorWrapper>
  );
}

export default CodeEditor;