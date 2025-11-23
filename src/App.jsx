import { useState, useRef } from 'react'
import './App.css'

const GUESTS = [
  { name: "Aaron", image: "https://images.lumacdn.com/avatars/aq/f5184df7-516b-4152-bada-f9bfee3b0099.jpg" },
  { name: "Adam Zvada", image: "https://images.lumacdn.com/avatars/7o/675a4dbd-a253-4514-824b-cc43dfda843c.jpg" },
  { name: "Akiho Nagao", image: "https://images.lumacdn.com/avatars/nf/5e2d15dc-8deb-4911-ab2e-5f3f2c6f3010.jpg" },
  { name: "Akshobhya Gupta", image: "https://images.lumacdn.com/avatars/c0/b48adeb7-e5cf-4770-9e0e-fd58407fb350.jpg" },
  { name: "AMAN MOGAL", image: "https://images.lumacdn.com/avatars/se/891ebf60-c1c8-495e-a8f2-30ff46094433.jpg" },
  { name: "Ananta Verma", image: "https://images.lumacdn.com/avatars/sx/faa7358f-79f8-4aa6-979b-8beeb7174818" },
  { name: "Andres Niño", image: "https://images.lumacdn.com/avatars/6s/124e5ce2-c594-4514-a2bd-84105818eb64.jpg" },
  { name: "Angelo C", image: "https://images.lumacdn.com/avatars/kr/786b0994-d502-4249-8ab3-f3521ebf38ad" },
  { name: "Ariq Heritsa Maalik", image: "https://images.lumacdn.com/avatars/yp/ca708a16-4929-4759-a92d-b3b3effed14f.jpg" },
  { name: "Ashish Soni", image: "https://images.lumacdn.com/avatars/at/77c44742-54cd-4ba8-9f8f-30c483dc7a47" },
  { name: "Axel J", image: "https://images.lumacdn.com/avatars/oc/3de04bb7-ee58-452d-ad4f-0891353c074c.jpg" },
  { name: "Ayush Jasuja", image: "https://images.lumacdn.com/avatars/zj/b6cab09e-7ba3-4856-8a3a-618ab78405e4" },
  { name: "Bek Hamit", image: "https://images.lumacdn.com/avatars/wu/72702cd0-40d3-483c-b24c-5bef756b6768.jpg" },
  { name: "Ben Fornefeld", image: "https://images.lumacdn.com/avatars/cb/d9edc2ca-237a-4c47-9042-af7bac042bca.jpg" },
  { name: "Bharat Bhavnasi", image: "https://images.lumacdn.com/avatars/bm/da3d0865-a30c-425c-ab37-f9274b6ea58f.png" },
  { name: "Bhavani Ravi", image: "https://images.lumacdn.com/avatars/s7/7ece08ba-19ad-4675-888f-620587d8c49a" },
  { name: "Boris Kiška", image: "https://images.lumacdn.com/avatars/uj/01f061fb-4097-4bda-a6f7-b2ef2c3833eb.jpg" },
  { name: "Brett Beutell", image: "https://images.lumacdn.com/avatars/iq/463323df-ab12-4909-892b-e4bbfbb85037" },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleSwipe = (direction) => {
    if (currentIndex >= GUESTS.length) return;

    if (direction === 'right') {
      setMatches([...matches, GUESTS[currentIndex]]);
    }

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 100px, trigger swipe
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    setDragStart(null);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !dragStart) return;

    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'right' : 'left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
    setDragStart(null);
  };

  const currentGuest = GUESTS[currentIndex];
  const rotation = dragOffset.x / 20;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div className="app">
      <header className="header">
        <h1>🤝 Co-Founder Match</h1>
        <p>Find your perfect co-founder!</p>
      </header>

      <div className="card-container">
        {currentIndex >= GUESTS.length ? (
          <div className="complete-message">
            <h2>🎉 All Done!</h2>
            <p>You matched with {matches.length} potential co-founders!</p>
            {matches.length > 0 && (
              <div className="matches-list">
                <h3>Your Matches:</h3>
                <div className="matches-grid">
                  {matches.map((match, idx) => (
                    <div key={idx} className="match-card">
                      <img src={match.image} alt={match.name} />
                      <p>{match.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button 
              className="reset-button"
              onClick={() => {
                setCurrentIndex(0);
                setMatches([]);
              }}
            >
              Start Over
            </button>
          </div>
        ) : (
          <>
            <div
              ref={cardRef}
              className={`profile-card ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
                opacity: opacity,
                transition: isDragging ? 'none' : 'all 0.3s ease',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={currentGuest.image} 
                alt={currentGuest.name}
                className="profile-image"
                draggable="false"
              />
              <div className="profile-info">
                <h2>{currentGuest.name}</h2>
                <p>Potential Co-Founder</p>
              </div>
              
              {isDragging && Math.abs(dragOffset.x) > 50 && (
                <div className={`swipe-indicator ${dragOffset.x > 0 ? 'like' : 'nope'}`}>
                  {dragOffset.x > 0 ? '✓ MATCH' : '✗ PASS'}
                </div>
              )}
            </div>

            <div className="card-counter">
              {currentIndex + 1} / {GUESTS.length}
            </div>

            <div className="buttons">
              <button 
                className="button nope-button"
                onClick={() => handleSwipe('left')}
              >
                ✗
              </button>
              <button 
                className="button like-button"
                onClick={() => handleSwipe('right')}
              >
                ✓
              </button>
            </div>
          </>
        )}
      </div>

      <div className="matches-counter">
        💚 {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
      </div>
    </div>
  );
}

export default App
