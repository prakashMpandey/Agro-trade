import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPages.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="dbz-page">
      <div className="goku-image">
        <img 
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Z2k4Ynl1ZWF4OWF4OWprNmRxbXMyeGxveWV1dmpxaHBxbG92eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/977YesTjNfQC7vQiph/giphy.gif" 
          alt="Goku Power Up"
        />
      </div>
      <div className="error-content">
        <h1 className="power-text">4😱4</h1>
        <div className="message">
          KAKAROT CAN'T FIND THIS PAGE!
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="kamehameha-btn"
        >
          KAMEHAMEHA BACK! 🔥
        </button>
      </div>
    </div>
  );
} 