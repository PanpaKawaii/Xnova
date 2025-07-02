import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useScrollAnimation } from '../../hooks/useAnimation';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Star,
  Filter,
  Search,
  MessageCircle,
  Trophy,
  Target,
  Zap,
  Crown,
  UserPlus,
  Heart,
  Award,
  Globe,
  TrendingUp
} from 'lucide-react';
import './FindTeammatePage.css';

export const FindTeammatePage = () => {
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPlayerProfile, setShowPlayerProfile] = useState(null);

  const heroRef = useScrollAnimation();
  const filtersRef = useScrollAnimation();
  const matchesRef = useScrollAnimation();
  const playersRef = useScrollAnimation();
  const communityRef = useScrollAnimation();

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', icon: Target, color: 'skill-green' },
    { value: 'intermediate', label: 'Intermediate', icon: Zap, color: 'skill-blue' },
    { value: 'advanced', label: 'Advanced', icon: Trophy, color: 'skill-purple' },
    { value: 'pro', label: 'Professional', icon: Crown, color: 'skill-yellow' }
  ];

  const locations = [
    'District 1, Ho Chi Minh City',
    'District 3, Ho Chi Minh City',
    'District 7, Ho Chi Minh City',
    'Binh Thanh District, Ho Chi Minh City',
    'Thu Duc City, Ho Chi Minh City'
  ];

  const timeSlots = [
    'Morning (6:00 - 12:00)',
    'Afternoon (12:00 - 18:00)',
    'Evening (18:00 - 22:00)'
  ];

  const matches = [
    {
      id: '1',
      title: 'Sunday League Match',
      date: '2025-01-15',
      time: '16:00',
      location: 'District 1, Ho Chi Minh City',
      playersNeeded: 3,
      currentPlayers: 8,
      skillLevel: 'intermediate',
      price: 100000,
      organizer: {
        id: '1',
        name: 'Alex Johnson',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        skillLevel: 'intermediate',
        location: 'District 1',
        bio: 'Passionate footballer, playing for 8 years',
        rating: 4.8
      }
    },
    {
      id: '2',
      title: 'Friendly 7v7 Game',
      date: '2025-01-16',
      time: '18:30',
      location: 'District 7, Ho Chi Minh City',
      playersNeeded: 2,
      currentPlayers: 12,
      skillLevel: 'beginner',
      price: 75000,
      organizer: {
        id: '2',
        name: 'Maria Santos',
        avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        skillLevel: 'beginner',
        location: 'District 7',
        bio: 'Just started playing, love the game!',
        rating: 4.5
      }
    },
    {
      id: '3',
      title: 'Competitive Match',
      date: '2025-01-17',
      time: '20:00',
      location: 'Thu Duc City, Ho Chi Minh City',
      playersNeeded: 1,
      currentPlayers: 21,
      skillLevel: 'advanced',
      price: 150000,
      organizer: {
        id: '3',
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        skillLevel: 'advanced',
        location: 'Thu Duc',
        bio: 'Former semi-pro player, tactical minded',
        rating: 4.9
      }
    }
  ];

  const players = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'intermediate',
      location: 'District 1, Ho Chi Minh City',
      bio: 'Passionate midfielder with 8 years of experience. Love tactical play and team coordination.',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'beginner',
      location: 'District 7, Ho Chi Minh City',
      bio: 'New to football but eager to learn! Looking for friendly matches and patient teammates.',
      rating: 4.5
    },
    {
      id: '3',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'advanced',
      location: 'Thu Duc City, Ho Chi Minh City',
      bio: 'Former semi-professional striker. Excellent finishing and pace. Looking for competitive matches.',
      rating: 4.9
    },
    {
      id: '4',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'pro',
      location: 'District 3, Ho Chi Minh City',
      bio: 'Professional defender with national team experience. Technical skills and leadership qualities.',
      rating: 5.0
    },
    {
      id: '5',
      name: 'Michael Torres',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'intermediate',
      location: 'Binh Thanh District, Ho Chi Minh City',
      bio: 'Versatile player who can play multiple positions. Great team player with positive attitude.',
      rating: 4.7
    },
    {
      id: '6',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      skillLevel: 'advanced',
      location: 'District 1, Ho Chi Minh City',
      bio: 'Creative midfielder with excellent passing range. Love organizing plays and creating chances.',
      rating: 4.8
    }
  ];

  const filteredMatches = matches.filter(match => {
    const skillMatch = !selectedSkillLevel || match.skillLevel === selectedSkillLevel;
    const locationMatch = !selectedLocation || match.location.includes(selectedLocation);
    const searchMatch = !searchQuery || match.title.toLowerCase().includes(searchQuery.toLowerCase());
    return skillMatch && locationMatch && searchMatch;
  });

  const filteredPlayers = players.filter(player => {
    const skillMatch = !selectedSkillLevel || player.skillLevel === selectedSkillLevel;
    const locationMatch = !selectedLocation || player.location.includes(selectedLocation);
    const searchMatch = !searchQuery || player.name.toLowerCase().includes(searchQuery.toLowerCase());
    return skillMatch && locationMatch && searchMatch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND' 
    }).format(price);
  };

  const getSkillColor = (level) => {
    const skill = skillLevels.find(s => s.value === level);
    return skill ? skill.color : 'skill-gray';
  };

  const getSkillIcon = (level) => {
    const skill = skillLevels.find(s => s.value === level);
    return skill ? skill.icon : Target;
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="hero-section"
      >
        <div className="hero-background" />
        
        <div className="hero-content">
          <div className="animate-hero">
            <h1 className="hero-title">
              Find Your Perfect
              <span className="hero-highlight">Football Team</span>
            </h1>
            <p className="hero-description">
              Connect with players at your skill level, join exciting matches, and build lasting friendships through the beautiful game.
            </p>
            <div className="hero-buttons">
              <Button size="lg" glow className="button-join">
                <Users className="button-icon" size={20} />
                Join Community
              </Button>
              <Button variant="outline" size="lg" className="button-create">
                <Heart className="button-icon" size={20} />
                Create Match
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="main-content">
        {/* Search and Filters */}
        <Card ref={filtersRef} className="filter-card">
          <div className="filter-header">
            <div className="filter-icon-container">
              <Filter size={24} className="filter-icon" />
            </div>
            <h2 className="filter-title">Find Your Match</h2>
          </div>

          <div className="filter-grid">
            {/* Search */}
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search matches or players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Skill Level */}
            <select
              value={selectedSkillLevel}
              onChange={(e) => setSelectedSkillLevel(e.target.value)}
              className="select-input"
            >
              <option value="">All Skill Levels</option>
              {skillLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            {/* Location */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="select-input"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Time */}
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="select-input"
            >
              <option value="">Any Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </Card>

        <div className="content-grid">
          {/* Matches Section */}
          <div className="matches-section">
            <div ref={matchesRef} className="matches-container">
              <h2 className="section-title">
                <div className="title-icon-container">
                  <Trophy size={24} className="title-icon" />
                </div>
                Available Matches ({filteredMatches.length})
              </h2>

              <div className="matches-list">
                {filteredMatches.map((match, index) => {
                  const SkillIcon = getSkillIcon(match.skillLevel);
                  return (
                    <Card 
                      key={match.id} 
                      hover 
                      glow 
                      className={`match-card animate-match-${index}`}
                      onClick={() => setSelectedMatch(match)}
                    >
                      <div className="match-content">
                        <div className="match-info">
                          <h3 className="match-title">{match.title}</h3>
                          <div className="match-details">
                            <div className="detail-item">
                              <Calendar size={16} />
                              <span>{new Date(match.date).toLocaleDateString()}</span>
                            </div>
                            <div className="detail-item">
                              <Clock size={16} />
                              <span>{match.time}</span>
                            </div>
                            <div className="detail-item">
                              <MapPin size={16} />
                              <span>{match.location}</span>
                            </div>
                            <div className="detail-item">
                              <Users size={16} />
                              <span>{match.currentPlayers}/22 players</span>
                            </div>
                          </div>
                        </div>
                        <div className="match-meta">
                          <div className={`skill-badge ${getSkillColor(match.skillLevel)}`}>
                            <SkillIcon size={16} />
                            {match.skillLevel}
                          </div>
                          <div className="match-price">
                            {formatPrice(match.price)}
                          </div>
                        </div>
                      </div>

                      <div className="match-footer">
                        <div className="organizer-info">
                          <img
                            src={match.organizer.avatar}
                            alt={match.organizer.name}
                            className="organizer-avatar"
                          />
                          <div>
                            <div className="organizer-name">{match.organizer.name}</div>
                            <div className="organizer-rating">
                              <Star size={14} className="rating-star" fill="currentColor" />
                              <span>{match.organizer.rating} rating</span>
                            </div>
                          </div>
                        </div>

                        <div className="match-actions">
                          <div className={`status-badge ${match.playersNeeded === 0 ? 'status-full' : 'status-open'}`}>
                            {match.playersNeeded === 0 ? 'Full' : `${match.playersNeeded} spots left`}
                          </div>
                          <Button 
                            size="sm" 
                            disabled={match.playersNeeded === 0}
                            className="join-button"
                          >
                            Join Match
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Players Section */}
          <div className="players-section">
            <div ref={playersRef} className="players-container">
              <h2 className="section-title">
                <div className="title-icon-container">
                  <UserPlus size={24} className="title-icon" />
                </div>
                Top Players
              </h2>

              <div className="players-list">
                {filteredPlayers.slice(0, 6).map((player, index) => {
                  const SkillIcon = getSkillIcon(player.skillLevel);
                  return (
                    <Card 
                      key={player.id} 
                      hover 
                      className={`player-card animate-player-${index}`}
                      onClick={() => setShowPlayerProfile(player)}
                    >
                      <div className="player-content">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="player-avatar"
                        />
                        <div className="player-info">
                          <h3 className="player-name">{player.name}</h3>
                          <div className="player-location">
                            <MapPin size={12} />
                            <span>{player.location.split(',')[0]}</span>
                          </div>
                        </div>
                        <div className="player-meta">
                          <div className={`skill-badge ${getSkillColor(player.skillLevel)}`}>
                            <SkillIcon size={12} />
                            {player.skillLevel}
                          </div>
                          <div className="player-rating">
                            <Star size={12} className="rating-star" fill="currentColor" />
                            <span>{player.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Community CTA */}
        <section ref={communityRef} className="community-section">
          <Card className="community-card">
            <div className="community-background" />
            <div className="community-content">
              <div className="community-icon">
                <Globe size={48} className="globe-icon" />
              </div>
              <h2 className="community-title">
                Join the Xnova Player Community
              </h2>
              <p className="community-description">
                Connect with over 10,000+ football enthusiasts, organize matches, and take your game to the next level.
              </p>
              <div className="community-buttons">
                <Button size="lg" variant="secondary" glow>
                  <TrendingUp className="button-icon" size={20} />
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="create-match-button">
                  <Award className="button-icon" size={20} />
                  Create Match
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Match Details Modal */}
      <Modal 
        isOpen={!!selectedMatch} 
        onClose={() => setSelectedMatch(null)}
        size="lg"
      >
        {selectedMatch && (
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{selectedMatch.title}</h2>
              <div className={`skill-badge ${getSkillColor(selectedMatch.skillLevel)}`}>
                {React.createElement(getSkillIcon(selectedMatch.skillLevel), { size: 20 })}
                {selectedMatch.skillLevel.charAt(0).toUpperCase() + selectedMatch.skillLevel.slice(1)} Level
              </div>
            </div>

            <div className="modal-details">
              <div className="modal-info">
                <div className="info-item">
                  <Calendar className="info-icon" size={20} />
                  <div>
                    <div className="info-label">Date</div>
                    <div className="info-value">{new Date(selectedMatch.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" size={20} />
                  <div>
                    <div className="info-label">Time</div>
                    <div className="info-value">{selectedMatch.time}</div>
                  </div>
                </div>
              </div>
              <div className="modal-info">
                <div className="info-item">
                  <MapPin className="info-icon" size={20} />
                  <div>
                    <div className="info-label">Location</div>
                    <div className="info-value">{selectedMatch.location}</div>
                  </div>
                </div>
                <div className="info-item">
                  <Users className="info-icon" size={20} />
                  <div>
                    <div className="info-label">Players</div>
                    <div className="info-value">{selectedMatch.currentPlayers}/22</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="organizer-section">
              <h3 className="organizer-title">Match Organizer</h3>
              <div className="organizer-content">
                <img
                  src={selectedMatch.organizer.avatar}
                  alt={selectedMatch.organizer.name}
                  className="organizer-avatar"
                />
                <div className="organizer-details">
                  <div className="organizer-name">{selectedMatch.organizer.name}</div>
                  <div className="organizer-rating">
                    <Star size={14} className="rating-star" fill="currentColor" />
                    <span>{selectedMatch.organizer.rating} rating</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <MessageCircle size={16} className="button-icon" />
                  Chat
                </Button>
              </div>
            </div>

            <div className="price-section">
              <div className="price-info">
                <span className="price-label">Entry Fee:</span>
                <span className="price-value">{formatPrice(selectedMatch.price)}</span>
              </div>
            </div>

            <div className="modal-actions">
              <Button 
                className="join-match-button" 
                size="lg" 
                glow
                disabled={selectedMatch.playersNeeded === 0}
              >
                {selectedMatch.playersNeeded === 0 ? 'Match Full' : 'Join Match'}
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle size={20} />
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Player Profile Modal */}
      <Modal 
        isOpen={!!showPlayerProfile} 
        onClose={() => setShowPlayerProfile(null)}
        size="md"
      >
        {showPlayerProfile && (
          <div className="modal-content">
            <div className="modal-header">
              <img
                src={showPlayerProfile.avatar}
                alt={showPlayerProfile.name}
                className="player-modal-avatar"
              />
              <h2 className="modal-title">{showPlayerProfile.name}</h2>
              <div className={`skill-badge ${getSkillColor(showPlayerProfile.skillLevel)}`}>
                {React.createElement(getSkillIcon(showPlayerProfile.skillLevel), { size: 20 })}
                {showPlayerProfile.skillLevel.charAt(0).toUpperCase() + showPlayerProfile.skillLevel.slice(1)} Player
              </div>
            </div>

            <div className="player-stats">
              <div className="stat-item">
                <div className="stat-value">
                  <Star className="rating-star" size={20} fill="currentColor" />
                  <span>{showPlayerProfile.rating}</span>
                </div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  <MapPin className="location-icon" size={20} />
                </div>
                <div className="stat-label">{showPlayerProfile.location}</div>
              </div>
            </div>

            <div className="bio-section">
              <h3 className="bio-title">About</h3>
              <p className="bio-text">{showPlayerProfile.bio}</p>
            </div>

            <div className="modal-actions">
              <Button className="invite-button" size="lg" glow>
                <UserPlus size={20} className="button-icon" />
                Invite to Match
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle size={20} />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};