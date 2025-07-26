import React, { useState, useEffect } from 'react';

const MemoryCardGame = ({ onGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');

  const cardSymbols = {
    easy: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'],
    medium: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    hard: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐔', '🐧', '🦉']
  };

  const getDifficultySettings = () => {
    switch (difficulty) {
      case 'easy': return { pairs: 6, cols: 4 };
      case 'medium': return { pairs: 10, cols: 5 };
      case 'hard': return { pairs: 16, cols: 8 };
      default: return { pairs: 6, cols: 4 };
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const { pairs } = getDifficultySettings();
    const symbols = cardSymbols[difficulty].slice(0, pairs);
    const cardPairs = symbols.flatMap((symbol, index) => [
      { id: index * 2, symbol, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
    ]);
    
    setCards(shuffleArray(cardPairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStarted(true);
    setGameWon(false);
    setStartTime(Date.now());
  };

  const handleCardClick = (clickedCard) => {
    if (!gameStarted || gameWon || clickedCard.isMatched || clickedCard.isFlipped || flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, clickedCard]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      
      if (flippedCards[0].symbol === flippedCards[1].symbol) {
        // Match found
        const newMatchedCards = [...matchedCards, flippedCards[0].id, flippedCards[1].id];
        setMatchedCards(newMatchedCards);
        
        const newCards = cards.map(card =>
          newMatchedCards.includes(card.id) ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        setFlippedCards([]);

        // Check if game is won
        const { pairs } = getDifficultySettings();
        if (newMatchedCards.length === pairs * 2) {
          setGameWon(true);
          const endTime = Date.now();
          const gameTime = Math.floor((endTime - startTime) / 1000);
          const score = Math.max(1000 - moves * 10 - gameTime, 100);
          onGameEnd(score, gameTime);
        }
      } else {
        // No match, flip cards back after delay
        setTimeout(() => {
          const newCards = cards.map(card =>
            flippedCards.includes(card) ? { ...card, isFlipped: false } : card
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matchedCards, moves, startTime, onGameEnd]);

  const resetGame = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
    setStartTime(null);
  };

  const renderCard = (card) => {
    const { cols } = getDifficultySettings();
    const cardSize = cols > 6 ? '60px' : cols > 4 ? '70px' : '80px';
    
    return (
      <div
        key={card.id}
        className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
        onClick={() => handleCardClick(card)}
        style={{ width: cardSize, height: cardSize }}
      >
        <div className="card-inner">
          <div className="card-front">❓</div>
          <div className="card-back">{card.symbol}</div>
        </div>
      </div>
    );
  };

  const { cols } = getDifficultySettings();

  return (
    <div className="memory-card-game">
      <div className="game-header">
        <h3>🧠 Memory Card Game</h3>
        <div className="game-info">
          <span>Moves: {moves}</span>
          {gameStarted && !gameWon && (
            <span>Time: {Math.floor((Date.now() - startTime) / 1000)}s</span>
          )}
        </div>
      </div>

      <div className="difficulty-section">
        <label>Difficulty: </label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={gameStarted && !gameWon}
        >
          <option value="easy">Easy (6 pairs)</option>
          <option value="medium">Medium (10 pairs)</option>
          <option value="hard">Hard (16 pairs)</option>
        </select>
      </div>

      <div className="game-controls">
        <button 
          className="game-button" 
          onClick={initializeGame}
          disabled={gameStarted && !gameWon}
        >
          {gameStarted ? 'Game in Progress' : 'Start Game'}
        </button>
        <button className="game-button secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      {gameStarted && (
        <div 
          className="cards-grid" 
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            maxWidth: cols > 6 ? '500px' : cols > 4 ? '400px' : '350px'
          }}
        >
          {cards.map(renderCard)}
        </div>
      )}

      {gameWon && (
        <div className="game-won">
          <h3>🎉 Congratulations!</h3>
          <p>You completed the game in {moves} moves!</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)} seconds</p>
        </div>
      )}

      <div className="game-instructions">
        <p>🎯 Click cards to flip them and find matching pairs</p>
        <p>🧠 Remember the positions of cards you've seen</p>
        <p>🏆 Complete with fewer moves for a higher score!</p>
      </div>

      <style jsx>{`
        .memory-card-game {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .game-header h3 {
          color: #1f2937;
          margin-bottom: 10px;
        }

        .game-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
          font-weight: 600;
          color: #374151;
        }

        .difficulty-section {
          margin-bottom: 15px;
        }

        .difficulty-section label {
          margin-right: 10px;
          font-weight: 600;
          color: #374151;
        }

        .difficulty-section select {
          padding: 5px 10px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }

        .game-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .cards-grid {
          display: grid;
          gap: 8px;
          margin: 0 auto 20px;
          padding: 15px;
          background: #f8fafc;
          border-radius: 12px;
        }

        .memory-card {
          aspect-ratio: 1;
          cursor: pointer;
          perspective: 1000px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.3s;
          transform-style: preserve-3d;
        }

        .memory-card.flipped .card-inner {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
        }

        .card-front {
          background: #3b82f6;
          color: white;
        }

        .card-back {
          background: white;
          transform: rotateY(180deg);
        }

        .memory-card.matched .card-back {
          background: #d1fae5;
          border-color: #10b981;
        }

        .game-won {
          background: #d1fae5;
          color: #065f46;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }

        .game-instructions {
          background: #f0fdf4;
          padding: 15px;
          border-radius: 8px;
          color: #166534;
        }

        .game-instructions p {
          margin: 5px 0;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default MemoryCardGame;
