import React, { useState, useEffect } from 'react';
import uploadLogo from './uploadIndicator.png'; //src directory

const App = () => {
  const [image, setImage] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedImage = localStorage.getItem('image');
    if (savedImage) {
      setImage(savedImage);
    }

    const savedText1 = localStorage.getItem('text1');
    if (savedText1) {
      setText1(savedText1);
    }

    const savedText2 = localStorage.getItem('text2');
    if (savedText2) {
      setText2(savedText2);
    }
  }, []);

  // Using localStorage as a robost way to save images.
  useEffect(() => {
    localStorage.setItem('image', image);
  }, [image]);

  useEffect(() => {
    localStorage.setItem('text1', text1);
  }, [text1]);

  useEffect(() => {
    localStorage.setItem('text2', text2);
  }, [text2]);

  //Clears text upon refresh
  useEffect(() => {
    localStorage.removeItem('text1');
    localStorage.removeItem('text2');
  }, []);

  // Event handler for img 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

// Event handler for word limit

  const handleTextChange = (e, setText, text, limits, index) => {
    const newValue = e.target.value;
    const lines = newValue.split('\n');
    const updatedLines = lines.map((line, i) => {
      const words = line.trim().split(/\s+/); // Helps retrieve words from current linee
      const limit = limits[i] || 0;
      if (limit && words.length > limit) {
        return words.slice(0, limit).join(' '); // Try to stop the line if it exceeds the limit
      }
      return line;
    });
    setText(updatedLines.join('\n')); // Update the text with all lines processed
  };

// Functionally wise, the word limit does work. However, I wasn't able to incorporate a way to not type anything after the limit is reached.
// Using seperate text boxes would be a cheap way to solve it. 


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        <label htmlFor="imageUpload" style={{ cursor: 'pointer' }}>
          <div style={{ border: '1px dashed #ccc', width: '300px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={uploadLogo} alt="Upload Logo" style={{ marginBottom: '10px' }} />
            PNG and JPEG files ONLY
          </div>
        </label>
        <input
          type="file"
          accept="image/jpeg, image/png"
          id="imageUpload"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <div>Text Box</div>
          <textarea
            value={text1} // Value from state
            onChange={(e) => handleTextChange(e, setText1, text1, [20, 25, 10], 0)} //20,25, and 10 word limits for each line. 
            placeholder="Paragraph One (20 words)           Paragraph Two (25 Words)           Paragraph Three (10 Words)"
            style={{ width: '300px', height: '100px' }}
          />
        </div>
        <div>
          <div>Text Box</div>
          <textarea
            value={text2} // Value from state
            onChange={(e) => handleTextChange(e, setText2, text2, [20, 25, 10], 1)} //20,25, and 10 word limits for each line. 
            placeholder="Paragraph One (20 words)           Paragraph Two (25 Words)           Paragraph Three (10 Words)"
            style={{ width: '300px', height: '100px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;