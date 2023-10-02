import React from 'react';
import RootStack from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {Colors} from './src/constants/theme';

const theme = createTheme({
  lightColors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
  darkColors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
  },
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: 12,
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
