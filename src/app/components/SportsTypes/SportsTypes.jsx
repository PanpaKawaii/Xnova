import React from 'react';
import './SportsTypes.css';

const sportsData = [
    { name: 'Cầu lông', imageUrl: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', description: 'Một môn thể thao vợt có nhịp độ nhanh giúp tăng cường sự nhanh nhẹn và phản xạ.' },
    { name: 'Bóng đá', imageUrl: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', description: 'Môn thể thao đồng đội phổ biến nhất thế giới, được chơi với niềm đam mê và tinh thần đồng đội.' },
    { name: 'Pickleball', imageUrl: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', description: 'Môn thể thao vợt vui nhộn, kết hợp giữa quần vợt, cầu lông và bóng bàn.' },
    { name: 'Quần vợt', imageUrl: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', description: 'Một môn thể thao vợt cổ điển và chiến lược, đòi hỏi kỹ năng và sự chính xác.' },
    { name: 'Bóng bàn', imageUrl: 'https://i.pinimg.com/736x/42/70/ff/4270ff28e1b44556e288abae3aec2196.jpg', description: 'Hành động tốc độ cao và phản xạ nhanh như chớp trên một chiếc bàn nhỏ gọn.' },
];

const SportsTypes = () => {
  return (
    <section className="sports-types-container">
      <h2 className="sports-types-title">Môn thể thao</h2>
      <div className="sports-types-grid">
        {sportsData.map((sport) => (
          <div key={sport.name} className="sport-card">
            {sport.imageUrl ? (
              <img src={sport.imageUrl} alt={sport.name} className="sport-image" />
            ) : (
              <div 
                className="sport-image-placeholder" 
                aria-label={sport.name}
              ></div>
            )}
            <div className="sport-name-overlay">
              <span className="sport-name">{sport.name}</span>
            </div>
            <div className="sport-popup">
              <h3 className="popup-title">{sport.name}</h3>
              <p className="popup-description">{sport.description}</p>
              <button className="popup-button">Tìm sân</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SportsTypes; 