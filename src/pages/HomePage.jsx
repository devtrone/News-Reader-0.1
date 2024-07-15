import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/newsSlice';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    dispatch(fetchArticles('latest'));
  }, [dispatch]);

  return (
    <div className="homepage">
      <SearchBar />
      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <div>Error: {error}</div>}
      <ErrorBoundary>
        <ArticleList />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
