import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const STORAGE_KEY = 'HOTEL_PRICE_COMPARE/CURRENCY';

interface CurrencyState {
    currency?: string;   // array of ids
    setCurrency: (currency: string) => void;
};

export const useCurrencyStore = create(
    persist<CurrencyState>(
      (set) => ({
        currency: 'USD',
        setCurrency: (currency) => set(() => ({currency}))
      }),
      {
        name: STORAGE_KEY
      }
));