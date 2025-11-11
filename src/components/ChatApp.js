import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatApp.css';

function ChatApp({ onNavigateToMain }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nutritionResult, setNutritionResult] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    '提供健康食譜',
    '有什麼健康食物建議',
    '做什麼運動可以減脂',
    '如何烹飪低卡餐食',
    '今晚晚餐建議',
    '居家健身運動建議'
  ];

  const handleQuestionClick = (question) => {
    setShowWelcome(false);
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([userMessage]);
    setIsTyping(true);

    // 根據不同問題提供不同回應
    let aiResponse = '';
    let hasRecipeButton = false;
    let hasCalendarButton = false;
    let calendarTitle = null;
    let recipeTitle = null;

    switch (question) {
      case '提供健康食譜':
        aiResponse = `🍲 健康沙拉三明治

食材 (1人份):
- 全麥麵包 2片
- 雞胸肉 100g
- 生菜葉 適量
- 番茄 1個 (切片)
- 黃瓜 半條 (切片)
- 希臘優格 2湯匙
- 橄欖油 1茶匙
- 黑胡椒 少許

做法:
1. 將雞胸肉用橄欖油煎熟，切片
2. 將蔬菜洗淨切片
3. 在麵包上塗上希臘優格
4. 依次鋪上生菜、番茄、黃瓜和雞肉
5. 撒上黑胡椒調味

營養資訊: 約320卡路里，富含蛋白質和纖維`;
        hasRecipeButton = true;
        recipeTitle = '健康沙拉三明治';
        break;

      case '有什麼健康食物建議':
        aiResponse = `🥗 健康食物建議:

高蛋白食物:
• 雞胸肉、魚類、豆腐、希臘優格

蔬菜類:
• 菠菜、生菜、番茄、胡蘿蔔、青菜

全穀物:
• 藜麥、燕麥、全麥麵包、糙米

健康脂肪:
• 牛油果、堅果、橄欖油

建議每天攝取5-7份蔬菜和水果，適量蛋白質和全穀物！`;
        break;

      case '今晚晚餐建議':
        aiResponse = `[DINNER_SUGGESTION_BOX_START]🍽️ 今晚晚餐建議: 烤雞胸肉沙拉 + 蔬菜湯
[CALENDAR_BUTTON_PLACEHOLDER][DINNER_SUGGESTION_BOX_END]

推薦餐食組合 (約500 kcal):
• 主菜: 烤雞胸肉沙拉 (約350 kcal)
• 湯品: 清燉蔬菜湯 (約150 kcal)

[CHICKEN_SALAD_RECIPE_BOX_START]🍗 烤雞胸肉沙拉食譜 (1人份):

食材:
- 雞胸肉 150g
- 混合蔬菜沙拉葉 100g (生菜、菠菜、火箭菜)
- 聖女番茄 5-6個 (切半)
- 小黃瓜 半條 (切片)
- 橄欖油 1茶匙
- 檸檬汁 1茶匙
- 黑胡椒 少許
- 鹽 少許
- 新鮮香草 (可選: 羅勒或迷迭香)

做法:
1. 雞胸肉用鹽和黑胡椒醃製10分鐘
2. 預熱烤箱至200°C，將雞胸肉烤15-20分鐘至熟
3. 蔬菜洗淨瀝乾，番茄和小黃瓜切好
4. 將蔬菜放入碗中，淋上橄欖油和檸檬汁調味
5. 烤好的雞胸肉切片，放在蔬菜上
6. 撒上黑胡椒和香草裝飾
[CHICKEN_RECIPE_BUTTON_PLACEHOLDER][CHICKEN_SALAD_RECIPE_BOX_END]

[VEGETABLE_SOUP_RECIPE_BOX_START]🥣 蔬菜湯食譜 (1人份):

食材:
- 胡蘿蔔 1根 (切丁)
- 洋蔥 半個 (切丁)
- 芹菜 1根 (切段)
- 高湯 300ml (或清水)
- 番茄 1個 (切丁)
- 蒜頭 1瓣 (切末)
- 橄欖油 1茶匙
- 鹽、黑胡椒 少許

做法:
1. 熱鍋加入橄欖油，炒香洋蔥和蒜頭
2. 加入胡蘿蔔、芹菜和番茄翻炒2-3分鐘
3. 倒入高湯，大火煮沸後轉小火燉15分鐘
4. 調味後熄火，可用攪拌棒打成泥狀
[SOUP_RECIPE_BUTTON_PLACEHOLDER][VEGETABLE_SOUP_RECIPE_BOX_END]

營養分析:
• 總卡路里: 約500 kcal
• 高蛋白質: 約35g (增肌減脂最佳)
• 豐富纖維: 蔬菜提供充足纖維
• 低脂肪: 健康烹調方式
• 維生素豐富: 多種蔬菜提供全面營養


這道餐食營養均衡，蛋白質充足，蔬菜豐富，適合晚餐食用！`;
        hasRecipeButton = true;
        hasCalendarButton = true;
        calendarTitle = '今晚晚餐 - 烤雞胸肉沙拉 + 蔬菜湯 (500 kcal)';
        recipeTitle = '烤雞胸肉沙拉 + 蔬菜湯';
        break;
    }

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        hasRecipeButton: hasRecipeButton,
        recipeTitle: recipeTitle,
        hasCalendarButton: hasCalendarButton,
        calendarTitle: calendarTitle
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模擬AI回應
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: `您說：「${userMessage.text}」\n\n這是一個模擬的回應。在實際應用中，這裡會連接AI API來獲取真實的回應。`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSaveRecipe = (recipeTitle) => {
    if (!savedRecipes.includes(recipeTitle)) {
      setSavedRecipes(prev => [...prev, recipeTitle]);
      // 可以在這裡添加一個臨時的成功消息
      const successMessage = {
        id: Date.now() + 2,
        text: `✅ "${recipeTitle}" 已加入您的食譜收藏！`,
        sender: 'ai',
        timestamp: new Date(),
        isSystemMessage: true
      };
      setMessages(prev => [...prev, successMessage]);
    } else {
      const duplicateMessage = {
        id: Date.now() + 2,
        text: `ℹ️ "${recipeTitle}" 已經在您的食譜收藏中了！`,
        sender: 'ai',
        timestamp: new Date(),
        isSystemMessage: true
      };
      setMessages(prev => [...prev, duplicateMessage]);
    }
  };

  const handleSaveToCalendar = (calendarTitle) => {
    // 在實際應用中，這裡會連接到日曆API
    // 現在模擬保存到日曆的功能
    const successMessage = {
      id: Date.now() + 4,
      text: `📅 "${calendarTitle}" 已加入您的日曆！\n\n您可以在日曆應用中查看這次的營養記錄。`,
      sender: 'ai',
      timestamp: new Date(),
      isSystemMessage: true
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        // 模擬營養分析
        analyzeNutrition(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeNutrition = (fileName) => {
    setIsTyping(true);
    // 模擬AI分析過程
    setTimeout(() => {
      // 根據文件名模擬不同的營養分析結果
      let nutritionData;
      if (fileName.toLowerCase().includes('salad') || fileName.toLowerCase().includes('沙拉')) {
        nutritionData = {
          calories: 285,
          carbs: 25,
          protein: 18,
          fat: 12,
          vitamins: ['維生素C', '維生素K', '葉酸'],
          minerals: ['鉀', '鎂', '鈣'],
          healthScore: 9,
          suggestions: '這是一份營養均衡的沙拉！建議再添加一些堅果來增加健康脂肪。'
        };
      } else if (fileName.toLowerCase().includes('chicken') || fileName.toLowerCase().includes('雞')) {
        nutritionData = {
          calories: 320,
          carbs: 15,
          protein: 35,
          fat: 18,
          vitamins: ['維生素B6', '維生素B12'],
          minerals: ['鋅', '鐵', '磷'],
          healthScore: 8,
          suggestions: '優質蛋白質來源！建議搭配蔬菜一起食用，營養更均衡。'
        };
      } else {
        nutritionData = {
          calories: 450,
          carbs: 45,
          protein: 20,
          fat: 22,
          vitamins: ['維生素A', '維生素C'],
          minerals: ['鈉', '鉀'],
          healthScore: 7,
          suggestions: '這餐看起來不錯！可以考慮減少油炸食物，增加蔬菜攝取。'
        };
      }

      setNutritionResult(nutritionData);
      setShowImageUpload(false);

      const analysisMessage = {
        id: Date.now() + 3,
        text: `[NUTRITION_ANALYSIS_BOX_START]📊 營養分析結果

總卡路里: ${nutritionData.calories} kcal
宏量營養素:
• 碳水化合物: ${nutritionData.carbs}g
• 蛋白質: ${nutritionData.protein}g  
• 脂肪: ${nutritionData.fat}g

微量營養素:
• 維生素: ${nutritionData.vitamins.join('、')}
• 礦物質: ${nutritionData.minerals.join('、')}

健康評分: ${nutritionData.healthScore}/10 ⭐
[CALENDAR_BUTTON_PLACEHOLDER][NUTRITION_ANALYSIS_BOX_END]

💡 建議: ${nutritionData.suggestions}`,
        sender: 'ai',
        timestamp: new Date(),
        image: selectedImage,
        nutritionData: nutritionData,
        hasCalendarButton: true,
        calendarTitle: `餐食營養分析 - ${nutritionData.calories} kcal`
      };

      setMessages(prev => [...prev, analysisMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleNutritionCalculator = () => {
    setShowWelcome(false);
    setShowImageUpload(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageText = (text, message) => {
    const parts = text.split(/(\[CALENDAR_BUTTON_PLACEHOLDER\]|\[CHICKEN_RECIPE_BUTTON_PLACEHOLDER\]|\[SOUP_RECIPE_BUTTON_PLACEHOLDER\]|\[DINNER_SUGGESTION_BOX_START\]|\[DINNER_SUGGESTION_BOX_END\]|\[CHICKEN_SALAD_RECIPE_BOX_START\]|\[CHICKEN_SALAD_RECIPE_BOX_END\]|\[VEGETABLE_SOUP_RECIPE_BOX_START\]|\[VEGETABLE_SOUP_RECIPE_BOX_END\]|\[NUTRITION_ANALYSIS_BOX_START\]|\[NUTRITION_ANALYSIS_BOX_END\])/);
    let inBox = false;
    let currentBoxType = null;
    const result = [];
    let boxContent = [];

    parts.forEach((part, index) => {
      if (part === '[DINNER_SUGGESTION_BOX_START]') {
        inBox = true;
        currentBoxType = 'dinner-suggestion';
        boxContent = [];
      } else if (part === '[CHICKEN_SALAD_RECIPE_BOX_START]') {
        inBox = true;
        currentBoxType = 'chicken-salad-recipe';
        boxContent = [];
      } else if (part === '[VEGETABLE_SOUP_RECIPE_BOX_START]') {
        inBox = true;
        currentBoxType = 'vegetable-soup-recipe';
        boxContent = [];
      } else if (part === '[NUTRITION_ANALYSIS_BOX_START]') {
        inBox = true;
        currentBoxType = 'nutrition-analysis';
        boxContent = [];
      } else if (part === '[DINNER_SUGGESTION_BOX_END]' || part === '[CHICKEN_SALAD_RECIPE_BOX_END]' || part === '[VEGETABLE_SOUP_RECIPE_BOX_END]' || part === '[NUTRITION_ANALYSIS_BOX_END]') {
        inBox = false;
        let boxClassName = '';
        if (currentBoxType === 'dinner-suggestion') {
          boxClassName = 'dinner-suggestion-box';
        } else if (currentBoxType === 'chicken-salad-recipe') {
          boxClassName = 'recipe-box';
        } else if (currentBoxType === 'vegetable-soup-recipe') {
          boxClassName = 'recipe-box';
        } else if (currentBoxType === 'nutrition-analysis') {
          boxClassName = 'nutrition-analysis-box';
        }
        result.push(
          <div key={`box-${index}`} className={boxClassName}>
            {boxContent}
          </div>
        );
        currentBoxType = null;
      } else if (part === '[CALENDAR_BUTTON_PLACEHOLDER]' && message.hasCalendarButton) {
        const button = (
          <button
            key={index}
            className="inline-calendar-save-button"
            onClick={() => handleSaveToCalendar(message.calendarTitle)}
          >
            📅 加入我的日曆
          </button>
        );
        if (inBox) {
          boxContent.push(button);
        } else {
          result.push(button);
        }
      } else if ((part === '[CHICKEN_RECIPE_BUTTON_PLACEHOLDER]' || part === '[SOUP_RECIPE_BUTTON_PLACEHOLDER]') && message.hasRecipeButton) {
        const button = (
          <button
            key={index}
            className="inline-recipe-save-button"
            onClick={() => handleSaveRecipe(message.recipeTitle)}
            disabled={savedRecipes.includes(message.recipeTitle)}
          >
            {savedRecipes.includes(message.recipeTitle) ? '✅ 已收藏' : '+ 加入我的食譜'}
          </button>
        );
        if (inBox) {
          boxContent.push(button);
        } else {
          result.push(button);
        }
      } else if (part.trim()) {
        const span = <span key={index} style={{ whiteSpace: 'pre-line' }}>{part}</span>;
        if (inBox) {
          boxContent.push(span);
        } else {
          result.push(span);
        }
      }
    });

    return result;
  };

  if (showWelcome) {
    return (
      <div className="chat-app">
        <div className="chat-container">
          <div className="chat-header">
            <div className="header-content">
              <button className="back-button" onClick={onNavigateToMain}>
                ←
              </button>
              <div className="header-info">
                <h3>AI健康助手</h3>
              </div>
            </div>
          </div>
          <div className="messages-container">
            <div className="welcome-overlay">
              <div className="welcome-header">
                <h1 className="welcome-title">健康生活助手AI</h1>
                <p className="welcome-subtitle">讓我幫助您吃得健康、動得開心！</p>
              </div>

              <div className="questions-grid">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="question-button"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="input-container">
            <button
              onClick={handleNutritionCalculator}
              className="nutrition-calculator-button"
              title="食物營養計算器"
            >
              🥗 營養計算器
            </button>
            <div className="input-wrapper">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="輸入您的問題..."
                className="message-input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-button"
              >
                {isTyping ? '⏳' : '→'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <button className="back-button" onClick={onNavigateToMain}>
              ←
            </button>
            <div className="header-info">
              <h3>AI 助手</h3>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'} ${message.isSystemMessage ? 'system-message' : ''}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {message.image && (
                  <div className="uploaded-image">
                    <img src={message.image} alt="上傳的餐食" />
                  </div>
                )}
                <div className="message-text">
                  {renderMessageText(message.text, message)}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message ai-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {showImageUpload && (
            <div className="image-upload-container">
              <div className="image-upload-box">
                <div className="upload-icon">📸</div>
                <h3>上傳餐食照片</h3>
                <p>選擇一張清晰的餐食照片，我會幫您分析營養成分</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="upload-button">
                  選擇照片
                </label>
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="cancel-upload"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <button
            onClick={handleNutritionCalculator}
            className="nutrition-calculator-button"
            title="食物營養計算器"
          >
            🥗 營養計算器
          </button>
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入您的問題..."
              className="message-input"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
            >
              {isTyping ? '⏳' : '→'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;