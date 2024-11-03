import React from 'react';
import './MemoryCard.css';

interface MemoryCardProps {
  image: string;
  isFlipped: boolean;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ image, isFlipped, onClick }) => {
  return (
    <div className={`memory-card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
      {isFlipped ? <img src={image} alt="Memory card" /> : <div className="card-back"></div>}
    </div>
  );
};

export default MemoryCard;
