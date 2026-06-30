import { useState, useEffect } from 'react';

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('original');

  useEffect(() => {
    const original = document.getElementById('tab-original');
    const ai = document.getElementById('tab-ai');
    if (!original || !ai) return;

    if (activeTab === 'original') {
      original.classList.add('active');
      ai.classList.remove('active');
    } else {
      ai.classList.add('active');
      original.classList.remove('active');
    }
  }, [activeTab]);

  return (
    <div className="tab-bar">
      <button
        className={`tab-btn ${activeTab === 'original' ? 'active' : ''}`}
        onClick={() => setActiveTab('original')}
      >
        原文
      </button>
      <button
        className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
        onClick={() => setActiveTab('ai')}
      >
        AI 摘要
      </button>
    </div>
  );
}
