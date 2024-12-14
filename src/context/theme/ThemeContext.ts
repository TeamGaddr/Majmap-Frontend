import { createContext } from 'react';

// Define the shape of the context
export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the context with the correct type
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
