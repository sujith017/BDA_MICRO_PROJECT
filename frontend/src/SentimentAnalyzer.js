import React, { useState } from 'react';
import axios from 'axios';
import './app.css';
const SentimentAnalyzer = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://bda-micro-project.onrender.com/chat', { content: text });
            setResult(response.data);
            console.log('Result:', response.data);
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
        }
    };

    return (
        <div className="sentiment-analyzer-container">
            <h1>Sentiment Analysis</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a sentence to analyze sentiment"
                />
                <br />
                <button type="submit">Analyze</button>
            </form>
            {result && (
                <div className="result">
                    <h2>Result:</h2>
                    <p>Sentiment: {result.message}</p>
                </div>
            )}
        </div>
    );
};

export default SentimentAnalyzer;
