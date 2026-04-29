import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  };

  const toggleTheme = async (newTheme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const getColors = () => ({
    light: {
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#1C1E21',
      primary: '#0095F6',
      secondary: '#58595B'
    },
    dark: {
      background: '#000000',
      surface: '#1C1E21',
      text: '#FFFFFF',
      primary: '#0095F6',
      secondary: '#A9AAAC'
    }
  });

  const currentColors = theme === 'system' 
    ? getColors()[Appearance.getColorScheme() === 'dark' ? 'dark' : 'light']
    : getColors()[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
      
