import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'd89ca066ffe54973b1331ffb2f66e8fb';
const API_URL = 'https://newsapi.org/v2/everything';

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
};

export const fetchArticles = createAsyncThunk('news/fetchArticles', async (query, { getState }) => {
  const cachedArticles = localStorage.getItem(query);
  if (cachedArticles) {
    const { timestamp, articles } = JSON.parse(cachedArticles);
    const oneHour = 60 * 60 * 1000;
    if (Date.now() - timestamp < oneHour) {
      return articles;
    }
  }

  const response = await axios.get(API_URL, {
    params: {
      q: query,
      apiKey: API_KEY,
    },
  });
  const articles = response.data.articles;
  localStorage.setItem(query, JSON.stringify({ articles, timestamp: Date.now() }));
  return articles;
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
