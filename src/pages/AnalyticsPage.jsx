import React from 'react';

const AnalyticsPage = () => {
  const analytics = JSON.parse(localStorage.getItem('analytics')) || [];

  return (
    <div className="analytics-page">
      <h1>User Analytics</h1>
      <ul>
        {analytics.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsPage;
