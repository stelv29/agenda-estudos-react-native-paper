import { MD3LightTheme } from 'react-native-paper';

export const tema = {
  ...MD3LightTheme,
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#5B3FD9',
    primaryContainer: '#E7E0FF',
    secondary: '#00A389',
    secondaryContainer: '#C8F5EA',
    background: '#F7F5FF',
  },
};

export const corPrioridade = {
  alta: '#E5484D',
  media: '#F2994A',
  baixa: '#00A389',
};
