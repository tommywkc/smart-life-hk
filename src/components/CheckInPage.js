import React, { useState, useEffect } from 'react';
import '../styles/CheckInPage.css';

function CheckInPage() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalCheckIns, setTotalCheckIns] = useState(23);
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [checkInHistory, setCheckInHistory] = useState([
    // 模擬過去30天的簽到記錄
    true, true, true, true, true, true, true, // 最近7天連續簽到
    false, true, true, false, true, true, true, // 之前的天數
    true, false, true, true, true, false, true,
    true, true, true, false, true, true, true,
    true, true, false, true, true, true, true
  ]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // 獲取當月第一天是星期幾
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // 獲取當月天數
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleCheckIn = () => {
    if (!checkedInToday) {
      setCheckedInToday(true);
      setCurrentStreak(currentStreak + 1);
      setTotalCheckIns(totalCheckIns + 1);
      // 在實際應用中這裡會發送API請求
      alert('🎉 簽到成功！獲得 10 點經驗值！');
    }
  };

  const handleRedeem = () => {
    // 在實際應用中可改為導航到換領頁或開啟 modal
    alert('前往換領獎賞頁面（範例行為）');
  };

  const getDayStatus = (dayIndex) => {
    const actualDay = dayIndex - firstDayOfMonth + 1;
    if (actualDay < 1 || actualDay > daysInMonth) return 'empty';

    const todayIndex = today.getDate();
    if (actualDay === todayIndex && checkedInToday) return 'checked-today';
    if (actualDay === todayIndex) return 'today';

    // 根據日期範圍設定狀態
    if (actualDay >= 1 && actualDay <= 3) {
      return 'future-red-cross';
    } else if (actualDay >= 4 && actualDay <= 10) {
      return 'checked';
    } else if (actualDay >= 12 && actualDay <= 30) {
      return 'unchecked';
    }

    // 對於其他日期，使用原邏輯
    const historyIndex = (actualDay - 1) % checkInHistory.length;
    return checkInHistory[historyIndex] ? 'checked' : 'unchecked';
  };

  const renderCalendar = () => {
    const days = [];
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const status = getDayStatus(i);

      days.push(
        <div key={i} className={`calendar-day ${status}`}>
          {status !== 'empty' && dayNumber}
          {status === 'checked' && <div className="check-mark">✓</div>}
          {status === 'checked-today' && <div className="check-mark">✓</div>}
          {status === 'future-red-cross' && <div className="cross-mark">×</div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="checkin-page">
      <div className="checkin-header">
        <h1 className="checkin-title">健身房打卡</h1>
        <div className="streak-badge">
          🔥 {currentStreak} 天連續
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-number">{totalCheckIns}</div>
          <div className="stat-label">總簽到天數</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{currentStreak}</div>
          <div className="stat-label">連續天數</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">85%</div>
          <div className="stat-label">完成率</div>
        </div>
      </div>

      <div className="calendar-section">
        <h2 className="month-title">
          {currentYear}年{currentMonth + 1}月
        </h2>
        <div className="calendar">
          <div className="weekdays">
            <div>日</div>
            <div>一</div>
            <div>二</div>
            <div>三</div>
            <div>四</div>
            <div>五</div>
            <div>六</div>
          </div>
          <div className="calendar-grid">
            {renderCalendar()}
          </div>
        </div>
      </div>

      <div className="checkin-buttons">
        <button
          className={`checkin-button ${checkedInToday ? 'completed' : ''}`}
          onClick={handleCheckIn}
          disabled={checkedInToday}
        >
          {checkedInToday ? '今日已簽到 ✓' : '立即簽到'}
        </button>

        <button
          className="checkin-button redeem-button"
          onClick={handleRedeem}
        >
          換領獎賞
        </button>
      </div>
    </div>
  );
}

export default CheckInPage;