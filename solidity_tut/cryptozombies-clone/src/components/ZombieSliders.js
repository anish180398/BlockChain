import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  margin: 20px 0;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SliderLabel = styled.div`
  width: 120px;
  color: ${props => props.color || '#fff'};
  font-weight: 500;
  margin-right: 10px;
`;

const SliderInput = styled.input`
  flex: 1;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #2c3e50;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.color || '#3498db'};
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.color || '#3498db'};
    cursor: pointer;
  }
`;

const SliderValue = styled.div`
  width: 40px;
  text-align: center;
  margin-left: 10px;
  color: white;
  font-family: monospace;
`;

const ZombieSliders = ({ geneValues, onChange }) => {
  const geneLabels = [
    { name: 'Head Gene', color: '#AD26AD' },
    { name: 'Eye Gene', color: '#1E88E5' },
    { name: 'Shirt Gene', color: '#43A047' },
    { name: 'Skin Color Gene', color: '#FB8C00' },
    { name: 'Eye Color Gene', color: '#E53935' },
    { name: 'Clothes Color Gene', color: '#8E24AA' }
  ];

  const handleChange = (index, value) => {
    const newValues = [...geneValues];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <SliderContainer>
      {geneLabels.map((gene, index) => (
        <SliderRow key={index}>
          <SliderLabel color={gene.color}>{gene.name}:</SliderLabel>
          <SliderInput
            type="range"
            min="0"
            max="98"
            value={geneValues[index] || 0}
            color={gene.color}
            onChange={(e) => handleChange(index, parseInt(e.target.value))}
          />
          <SliderValue>{geneValues[index] || 0}</SliderValue>
        </SliderRow>
      ))}
    </SliderContainer>
  );
};

export default ZombieSliders; 