import React from 'react';

const ReviewCard = ({ reviewer, feedback }) => {
  return (
    <div className="review">
      <strong>{reviewer}</strong>
      <p>{feedback}</p>
    </div>
  );
};

export default ReviewCard;