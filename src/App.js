import React, { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import ChatApp from './components/ChatApp';
import CommunityPage from './components/CommunityPage';
import CheckInPage from './components/CheckInPage';
import OrderPage from './components/OrderPage';
import homeIcon from './assets/home.png';
import checkinIcon from './assets/checkin.png';
import orderIcon from './assets/order.png';
import communityIcon from './assets/community.png';

function App() {
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'chat', 'rewards', 'orders', 'community'
  const [activeTab, setActiveTab] = useState('main');

  const navigateToChat = () => {
    setCurrentPage('chat');
  };

  const navigateToMain = () => {
    setCurrentPage('main');
    setActiveTab('main');
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setActiveTab(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigateToChat={navigateToChat} />;
      case 'chat':
        return <ChatApp onNavigateToMain={navigateToMain} />;
      case 'rewards':
        return <CheckInPage />;
      case 'orders':
        return <OrderPage />;
      case 'community':
        return <CommunityPage />;
      default:
        return <MainPage onNavigateToChat={navigateToChat} />;
    }
  };

  return (
    <div className={`App ${currentPage === 'chat' ? 'chat-page' : ''}`}>
      <div className="app-content">
        {renderCurrentPage()}
      </div>
      {currentPage !== 'chat' && (
        <nav className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'main' ? 'active' : ''}`} 
            onClick={() => navigateToPage('main')}
          >
            <img src={homeIcon} alt="主頁" className="nav-icon" />
            <div className="nav-label">主頁</div>
          </button>
          <button 
            className={`nav-item ${activeTab === 'rewards' ? 'active' : ''}`} 
            onClick={() => navigateToPage('rewards')}
          >
            <img src={checkinIcon} alt="打卡" className="nav-icon" />
            <div className="nav-label">打卡</div>
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} 
            onClick={() => navigateToPage('orders')}
          >
            <img src={orderIcon} alt="點餐" className="nav-icon" />
            <div className="nav-label">點餐</div>
          </button>
          <button 
            className={`nav-item ${activeTab === 'community' ? 'active' : ''}`} 
            onClick={() => navigateToPage('community')}
          >
            <img src={communityIcon} alt="社群" className="nav-icon" />
            <div className="nav-label">社群</div>
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
