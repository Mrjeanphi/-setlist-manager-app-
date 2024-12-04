import { Stack } from 'expo-router';
import CreateSetlistScreen from '../src/screens/CreateSetlistScreen';

export default function CreateSetlist() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Nouvelle Setlist',
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
        }}
      />
      <CreateSetlistScreen />
    </>
  );
}
