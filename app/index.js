import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import HomeScreen from '../src/screens/HomeScreen';

export default function Index() {
  return (
    <PaperProvider>
      <Stack.Screen 
        options={{
          title: 'Setlist Manager Pro',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <Badge style={{ marginRight: 10, backgroundColor: '#4CAF50' }}>
              v1.0
            </Badge>
          ),
        }} 
      />
      <HomeScreen />
    </PaperProvider>
  );
}
