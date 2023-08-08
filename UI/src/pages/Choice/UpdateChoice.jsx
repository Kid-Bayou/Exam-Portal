import React, { useState } from 'react';

function YourComponent() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const handleChoiceChange = (choiceId) => {
    setSelectedChoice(choiceId === selectedChoice ? null : choiceId);
  };

  return (
    <div className="container">
      <form>
        <label className="label">
          <input
            type="radio"
            name="choice"
            value="choice1"
            className="radio-input"
            checked={selectedChoice === 'choice1'}
            onChange={() => handleChoiceChange('choice1')}
          />
          <span className={`choice-span ${selectedChoice === 'choice1' ? 'selected' : ''}`}>Choice 1</span>
        </label>
        <label className="label">
          <input
            type="radio"
            name="choice"
            value="choice2"
            className="radio-input"
            checked={selectedChoice === 'choice2'}
            onChange={() => handleChoiceChange('choice2')}
          />
          <span className={`choice-span ${selectedChoice === 'choice2' ? 'selected' : ''}`}>Choice 2</span>
        </label>
        <label className="label">
          <input
            type="radio"
            name="choice"
            value="choice3"
            className="radio-input"
            checked={selectedChoice === 'choice3'}
            onChange={() => handleChoiceChange('choice3')}
          />
          <span className={`choice-span ${selectedChoice === 'choice3' ? 'selected' : ''}`}>Choice 3</span>
        </label>
        {/* Add more label/input pairs for other choices */}
      </form>
    </div>
  );
}

export default YourComponent;
