import React, { useState, useEffect } from 'react';
import MemoryCard from '../MemoryCard/MemoryCard';
import './MemoryGrid.css';

// מערך של תמונות כרטיסים (נתיבים נכונים עבור הפרויקט שלך)
const images = [
  'images/pic1.jpg',
  'images/pic2.jpg',
  'images/pic3.jpg',
  'images/pic4.jpg',
  'images/pic5.jpg',
  'images/pic6.jpg',
  'images/pic7.jpg',
  'images/pic8.jpg',
  'images/pic9.jpg',
  'images/pic10.jpg',
];

// סוג כרטיס
type Card = {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

// פונקציה לערבוב אקראי של מערך
function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const MemoryGrid: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState('medium'); // הגדרת רמת קושי

  // אתחול משחק מחדש
  const initializeGame = () => {
    const levelImages = level === 'easy' ? images.slice(0, 2) 
      : level === 'medium' ? images.slice(0, 4) 
      : images.slice(0, 5);

    // בדיקה אם יש כמות זוגית של תמונות
    if (levelImages.length % 2 !== 0) {
      console.error("Number of images must be even for the level:", level);
    }

    const shuffledCards = shuffle([...levelImages, ...levelImages]).map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setLives(5); // מאתחל חיים מחדש
  };

  useEffect(() => {
    initializeGame();
    const best = localStorage.getItem('bestScore');
    if (best) setBestScore(parseInt(best));
  }, [level]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        checkForMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkForMatch = (newFlippedCards: number[]) => {
    const [first, second] = newFlippedCards;
    const newCards = [...cards];
    setMoves(moves + 1);

    if (cards[first].image === cards[second].image) {
      newCards[first].isMatched = true;
      newCards[second].isMatched = true;
    } else {
      newCards[first].isFlipped = false;
      newCards[second].isFlipped = false;
      setLives(l => {
        if (l - 1 === 0) alert('Game Over! Try again.');
        return l - 1;
      });
    }
    setCards(newCards);
    setFlippedCards([]);
  };

  const resetGame = () => initializeGame();

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };

  useEffect(() => {
    if (cards.every(card => card.isMatched) && cards.length > 0) {
      alert(`Congratulations! You won in ${moves} moves.`);
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('bestScore', moves.toString());
      }
    }
  }, [cards, moves, bestScore]);

  return (
    <div className="memory-grid">
      <h1>Memory Game</h1>
      <button onClick={resetGame}>New Game</button>
      <div>
        <label>Choose Level:</label>
        <select value={level} onChange={handleLevelChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="scoreboard">
        <p>Moves: {moves}</p>
        <p>Lives: {lives}</p>
        <p>Best Score: {bestScore !== null ? bestScore : 'N/A'}</p>
      </div>
      <div className="memory-game">
        {cards.map((card, index) => (
          <MemoryCard
            key={card.id}
            image={card.image}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MemoryGrid;
