import React from 'react';
import { memo } from 'react';

const Article = memo(({ article }) => {
  console.log(article); // Log the article object to check its structure

  const handleImageError = (event) => {
    event.target.src = '/placeholder.png'; // Provide a path to a placeholder image in the public folder
  };

  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      {/* Check if the article has a valid image URL */}
      {article.urlToImage ? (
        <img src={article.urlToImage} alt={article.title} onError={handleImageError} />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
});

export default Article;
