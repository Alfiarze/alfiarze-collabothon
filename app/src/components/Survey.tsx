import React, { useState } from 'react';

function Survey() {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Survey responses:", { name, rating, comment });
        // Here you would typically send the responses to your backend
    };

    return (
        <div>
            <h1>Quick Survey</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Your Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rate our service (1-5):</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="comment">Additional Comments:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Survey;
