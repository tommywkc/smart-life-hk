import React, { useState } from 'react';
import '../styles/MainPage.css';
import backgroundImage from '../assets/background.jpg';

function MainPage({ onNavigateToChat }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  // 今天的數據
  const todaySteps = 8547;
  const todayNutrition = 1250;
  const todayExercise = 320;

  // 假設昨天的數據（可以用真實數據替換）
  const yesterdaySteps = 6500;
  const yesterdayNutrition = 1800;
  const yesterdayExercise = 150;

  // 生成AI建議
  const generateAISuggestion = () => {
    let yesterdayIssues = [];
    let todaySuggestions = [];

    if (yesterdaySteps < 8000) yesterdayIssues.push('步行數低');
    if (yesterdayNutrition < 1600) yesterdayIssues.push('營養不足');
    if (yesterdayExercise < 300) yesterdayIssues.push('冇運動');

    if (todaySteps < 10000) todaySuggestions.push('今日目標10,000步');
    if (todayNutrition < 1500) todaySuggestions.push('多食蔬菜水果');
    if (todayExercise < 500) todaySuggestions.push('做啲簡單運動');

    if (yesterdayIssues.length === 0 && todaySuggestions.length === 0) {
      return '你嘅表現超棒！繼續保持！💪';
    }

    let message = '';
    if (yesterdayIssues.length > 0) {
      message += '琴日' + yesterdayIssues.join('、') + '喎。\n';
    }
    if (todaySuggestions.length > 0) {
      message += '今日建議：' + todaySuggestions.join('、') + '。\n';
    }
    message += '記住飲多啲水，保持好心情！😊';

    return message;
  };

  // 模擬的事件數據 - 可以替換為真實的數據源
  const generateEvents = () => {
    const events = {};
    const currentYear = 2025;
    const currentMonth = 10; // November (0-indexed)

    // 1-10日：隨機放置tick和橙色點
    for (let day = 1; day <= 10; day++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = Math.random() > 0.5; // 約50%機會有事件
      if (hasEvent) {
        const isCompleted = Math.random() > 0.5; // 隨機選擇completed或scheduled
        events[dateKey] = [{
          type: isCompleted ? 'completed' : 'scheduled',
          time: isCompleted ? '上午' : '下午 3:00',
          title: isCompleted ? '營養攝取' : '健身房訓練',
          description: isCompleted ? '650 kcal 午餐' : '247健身房',
          location: isCompleted ? '' : '247 Gym'
        }];
      }
    }

    // 11日：橙色點，營養攝取放在最上面並設為completed
    events[`${currentYear}-11-11`] = [
      { 
        type: 'completed',  // 營養攝取放在最上面，設為completed（綠色tick）
        time: '上午', 
        title: '營養攝取', 
        description: '650 kcal 午餐',
        location: ''
      },
      { 
        type: 'scheduled',  // 健身房訓練
        time: '下午 3:00', 
        title: '健身房訓練', 
        description: '247健身房',
        location: '247 Gym'
      },
      { 
        type: 'scheduled',  // 晚餐建議
        time: '晚上 7:00', 
        title: '晚餐建議', 
        description: '建議: 烤雞胸肉沙拉 + 蔬菜湯 (約500 kcal)',
        location: '',
        actions: ['recipe', 'order']
      }
    ];

    // 12-30日：全部橙色點，但有些空
    for (let day = 12; day <= 30; day++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = Math.random() > 0.3; // 約70%機會有事件
      if (hasEvent) {
        events[dateKey] = [{
          type: 'scheduled',
          time: '下午 3:00',
          title: '健身房訓練',
          description: '247健身房',
          location: '247 Gym'
        }];
      }
    }

    return events;
  };

  const events = generateEvents();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setViewMode('list');
  };

  const handleBackToCalendar = () => {
    setViewMode('calendar');
    setSelectedDate(null);
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return events[dateKey] || [];
  };

  const renderCalendar = () => {
    const days = [];
    const today = new Date();

    // 填充月初的空白天數
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // 填充月份的天數
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events[dateKey];
      const hasEvents = dayEvents && dayEvents.length > 0;
      // 決定指示器類型：如果有scheduled事件，顯示橙色點；否則顯示第一個事件的類型
      const hasScheduled = dayEvents && dayEvents.some(event => event.type === 'scheduled');
      const indicatorType = hasScheduled ? 'scheduled' : (dayEvents ? dayEvents[0].type : 'scheduled');
      
      const isToday = today.getDate() === day &&
                     today.getMonth() === currentDate.getMonth() &&
                     today.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-event' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {hasEvents && (
            <div className={`event-indicator ${indicatorType}`}>
              {indicatorType === 'completed' ? '✓' : '•'}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="main-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: '100% 100%' }}>
      <div className="main-container">
        <header className="main-header">
          <div className="main-page-header-content">
            <button className="header-button">
              換領獎賞　 |　 我的食譜
            </button>
          </div>
          <button className="ai-assistant-button" onClick={onNavigateToChat}>
            AI健康助手
          </button>
        </header>        <div className="content-grid">
          <div className="calendar-banner">
            <div className="banner-left">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">今天步行數</span>
                  <span className="stat-value">8,547 步</span>
                </div>
              </div>
            </div>
            <div className="banner-center">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">今天營養</span>
                  <span className="stat-value">1,250 kcal</span>
                </div>
              </div>
            </div>
            <div className="banner-right">
              <div className="stat-item">
                <div className="stat-content">
                  <span className="stat-label">今天運動量</span>
                  <span className="stat-value">320 kcal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ai-suggestions">
            <h3>AI健康小助手 💡</h3>
            <p>{generateAISuggestion()}</p>
          </div>
          <div className="calendar-section">
            {viewMode === 'calendar' && (
              <div className="calendar-header">
                <button className="calendar-nav" onClick={prevMonth}>‹</button>
                <h2 className="calendar-title">
                  {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                </h2>
                <button className="calendar-nav" onClick={nextMonth}>›</button>
              </div>
            )}

            {viewMode === 'calendar' ? (
              <div className="calendar">
                <div className="calendar-weekdays">
                  {dayNames.map(day => (
                    <div key={day} className="weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-days">
                  {renderCalendar()}
                </div>
              </div>
            ) : (
              <div className="event-list-view">
                <div className="list-view-header">
                  <button 
                    className="back-to-calendar-button"
                    onClick={handleBackToCalendar}
                  >
                    ← 返回日曆
                  </button>
                  <h3 className="list-view-title">
                    {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                  </h3>
                </div>
                <div className="event-list">
                  {getSelectedDateEvents().length > 0 ? (
                    getSelectedDateEvents().map((event, index) => (
                      <div key={index} className={`event-item ${event.type}`}>
                        <div className="event-time">
                          {event.time.split(' ').map((part, index) => (
                            <div key={index}>{part}</div>
                          ))}
                        </div>
                        <div className="event-main">
                          <div className="event-title">{event.title}</div>
                          <div className="event-description">{event.description}</div>
                          {event.location && (
                            <div className="event-location">📍 {event.location}</div>
                          )}
                          {event.actions && event.actions.length > 0 && (
                            <div className="event-buttons">
                              {event.actions.map(action => (
                                <button 
                                  key={action}
                                  className={`action-button ${action}`}
                                  onClick={() => {
                                    if (action === 'recipe') alert('食譜功能即將推出！');
                                    if (action === 'order') alert('點餐功能即將推出！');
                                  }}
                                >
                                  {action === 'recipe' ? '食譜' : '點餐'}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="event-status">
                          {event.type === 'completed' ? '✓' : '•'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-events">這天沒有活動</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;