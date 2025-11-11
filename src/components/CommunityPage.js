import React, { useState } from 'react';
import '../styles/CommunityPage.css';
import backgroundImage from '../assets/background.jpg';

function CommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '分享我的減重心得',
      content: '最近一個月減了5公斤，主要靠控制飲食和每天運動30分鐘...',
      fullContent: '最近一個月減了5公斤，主要靠控制飲食和每天運動30分鐘。早餐通常吃燕麥片加水果，中餐和晚餐都吃蔬菜沙拉配瘦肉，晚上8點後就不吃東西了。運動方面，每天早上跑步30分鐘，晚上做瑜伽放鬆。感覺身體輕盈了很多，精神也更好！',
      author: '小明',
      time: '2025-11-11 10:30',
      replies: 12,
      likes: 25,
      category: '減重分享'
    },
    {
      id: 2,
      title: '健康食譜推薦',
      content: '今天試做了低卡沙拉，超級好吃又健康！分享一下做法...',
      fullContent: '今天試做了低卡沙拉，超級好吃又健康！分享一下做法：\n\n材料：\n- 生菜葉 100g\n- 櫻桃番茄 5-6個\n- 小黃瓜 半條\n- 雞胸肉 80g\n- 橄欖油 1茶匙\n- 檸檬汁 1茶匙\n- 鹽和黑胡椒 少許\n\n做法：\n1. 雞胸肉用鹽和黑胡椒醃10分鐘，然後煎熟切片\n2. 蔬菜洗淨切好\n3. 將橄欖油、檸檬汁、鹽和黑胡椒混合成醬汁\n4. 將所有材料混合，淋上醬汁即可\n\n總熱量約250kcal，營養豐富又美味！',
      author: '小華',
      time: '2025-11-11 09:15',
      replies: 8,
      likes: 18,
      category: '食譜分享'
    },
    {
      id: 3,
      title: '運動新手求建議',
      content: '剛開始健身，有什麼建議嗎？特別是關於飲食方面的...',
      fullContent: '剛開始健身，有什麼建議嗎？特別是關於飲食方面的。我現在每天去健身房，但總覺得效果不顯著，是不是飲食也有問題？',
      author: '新手小白',
      time: '2025-11-10 16:45',
      replies: 15,
      likes: 32,
      category: '運動建議'
    },
    {
      id: 4,
      title: '瑜伽初學者指南',
      content: '整理了一些瑜伽基礎動作和注意事項，希望對新手有幫助...',
      fullContent: '整理了一些瑜伽基礎動作和注意事項，希望對新手有幫助。基礎動作包括：樹式平衡、戰士式、貓牛式等。注意事項：練習前先熱身，呼吸要均勻，不要勉強做高難度動作，聽從身體的感覺。',
      author: '瑜伽愛好者',
      time: '2025-11-10 14:20',
      replies: 6,
      likes: 14,
      category: '瑜伽'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [expandedPost, setExpandedPost] = useState(null);

  const categories = ['全部', '減重分享', '食譜分享', '運動建議', '瑜伽', '健康生活'];

  const filteredPosts = selectedCategory === '全部'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const handlePostClick = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="community-page" style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left top', backgroundSize: '100% 100%' }}>
      <div className="community-header">
        <h1 className="community-title">社群討論區</h1>
        <button className="new-post-btn">
          <span>+</span> 發佈新帖
        </button>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="posts-container">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className={`post-card ${expandedPost === post.id ? 'expanded' : ''}`}
            onClick={() => handlePostClick(post.id)}
          >
            <div className="post-header">
              <div className="post-meta">
                <span className="post-category">{post.category}</span>
                <span className="post-author">{post.author}</span>
                <span className="post-time">{post.time}</span>
              </div>
              <div className="post-stats">
                <span className="stat-item">
                  <span className="stat-icon">💬</span>
                  {post.replies}
                </span>
                <span className="stat-item">
                  <span className="stat-icon">❤️</span>
                  {post.likes}
                </span>
              </div>
            </div>

            <h3 className="post-title">{post.title}</h3>
            <div className="post-content">
              {expandedPost === post.id ? (
                <div className="full-content">
                  {post.fullContent.split('\n').map((line, index) => (
                    <p key={index} className={line.trim() === '' ? 'empty-line' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="preview-content">{post.content}</p>
              )}
            </div>

            <div className="post-actions">
              <div className="expand-indicator">
                {expandedPost === post.id ? '👆 點擊收起' : '👇 點擊展開'}
              </div>
              <div className="action-buttons">
                {post.category === '食譜分享' && (
                  <button
                    className="action-btn recipe-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('已加入我的食譜！');
                    }}
                  >
                    🍽️ 加入我的食譜
                  </button>
                )}
                <button className="action-btn reply-btn">回覆</button>
                <button className="action-btn like-btn">👍 讚</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;