import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSelector } from 'react-redux';
import Article from './Article';

const ArticleList = () => {
  const articles = useSelector((state) => state.news.articles);

  const Row = ({ index, style }) => (
    <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Article article={articles[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={articles.length}
      itemSize={250} /* Increased item size to accommodate image height */
      width={'100%'}
    >
      {Row}
    </List>
  );
};

export default ArticleList;
