import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Platform } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CreateSetlistScreen from './src/screens/CreateSetlistScreen';

const Stack = createNativeStackNavigator();

// Configuration spécifique pour le web
const linking = {
  prefixes: ['http://localhost:3000', 'myapp://'],
  config: {
    screens: {
      Home: '',
      CreateSetlist: 'create',
    },
  },
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            animation: Platform.select({
              web: 'none',
              default: 'default',
            }),
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Setlist Manager' }}
          />
          <Stack.Screen 
            name="CreateSetlist" 
            component={CreateSetlistScreen}
            options={{ title: 'Nouvelle Setlist' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
