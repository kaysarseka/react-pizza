import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type PizzaT } from './card.types';

const API: string = import.meta.env.VITE_SOME_KEY;

export const fetchPizzas = createAsyncThunk('data/pizza', async () => {
  const response = await axios.get(`${API}`);
  return response.data as PizzaT[];
});
