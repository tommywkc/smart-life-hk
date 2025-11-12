import React, { useState } from 'react';
import '../styles/OrderPage.css';

function OrderPage() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [availableRestaurants, setAvailableRestaurants] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 合作餐廳的餐點數據
  const meals = [
    { id: 1, name: '雞胸飯', description: '健康雞胸肉配米飯', calories: 450, protein: 35, carbs: 50, fat: 10 },
    { id: 2, name: '純牛扒', description: '優質牛扒，無添加', calories: 350, protein: 40, carbs: 0, fat: 20 },
    { id: 3, name: '鮭魚沙拉', description: '新鮮鮭魚配蔬菜', calories: 300, protein: 25, carbs: 15, fat: 18 },
    { id: 4, name: '蔬菜炒飯', description: '營養蔬菜配糙米飯', calories: 380, protein: 12, carbs: 60, fat: 8 }
  ];

  // 餐廳數據
  const restaurants = [
    { id: 1, name: '健康餐廳A', meals: [1, 2], distance: '0.5km', rating: 4.5 },
    { id: 2, name: '健身餐廳B', meals: [1, 3, 4], distance: '1.2km', rating: 4.2 },
    { id: 3, name: '營養餐廳C', meals: [2, 3], distance: '2.0km', rating: 4.0 },
    { id: 4, name: '健康快餐D', meals: [1, 4], distance: '0.8km', rating: 4.3 }
  ];

  const selectMeal = (meal) => {
    setSelectedMeal(meal);
    // 找到提供這個餐點的餐廳
    const available = restaurants.filter(restaurant => restaurant.meals.includes(meal.id));
    setAvailableRestaurants(available);
  };

  const placeOrder = (restaurant) => {
    alert(`已為您在 ${restaurant.name} 下單 ${selectedMeal.name}，請前往自取！`);
    setOrderPlaced(true);
  };

  const resetOrder = () => {
    setSelectedMeal(null);
    setAvailableRestaurants([]);
    setOrderPlaced(false);
  };

  return (
    <div className="order-page">
      <div className="order-header">
        {selectedMeal && (
          <button className="back-button" onClick={resetOrder}>←</button>
        )}
        <h1 className="order-title">
          {selectedMeal ? `選擇餐廳 - ${selectedMeal.name}` : '點餐頁面'}
        </h1>
      </div>

      <div className="meals-container">
        {!selectedMeal && !orderPlaced && meals.map((meal, index) => (
          <div key={meal.id} className={`meal-card ${index === 0 ? 'ai-recommended' : ''}`} onClick={() => selectMeal(meal)}>
            {index === 0 && <div className="ai-badge">AI推介</div>}
            <h3 className="meal-title">{meal.name}</h3>
            <p className="meal-description">{meal.description}</p>
            <div className="meal-nutrition">
              <span>卡路里: {meal.calories}kcal</span>
              <span>蛋白質: {meal.protein}g</span>
              <span>碳水: {meal.carbs}g</span>
              <span>脂肪: {meal.fat}g</span>
            </div>
          </div>
        ))}

        {selectedMeal && availableRestaurants.length > 0 && !orderPlaced && availableRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <h4 className="restaurant-name">{restaurant.name}</h4>
            <p className="restaurant-info">距離: {restaurant.distance} | 評分: {restaurant.rating}⭐</p>
            <button onClick={() => placeOrder(restaurant)}>在此下單自取</button>
          </div>
        ))}

        {orderPlaced && (
          <div className="order-card">
            <h3 className="order-title">訂單已確認！</h3>
            <p className="order-message">請前往餐廳自取您的食物。</p>
            <button onClick={resetOrder}>重新點餐</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderPage;