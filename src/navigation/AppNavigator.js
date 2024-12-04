import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../styles/theme';

// Import des écrans
import SetlistList from '../screens/SetlistList';
import SetlistDetail from '../screens/SetlistDetail';
import CreateSetlist from '../screens/CreateSetlist';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="SetlistList"
          component={SetlistList}
          options={{ title: 'Mes Setlists' }}
        />
        <Stack.Screen
          name="SetlistDetail"
          component={SetlistDetail}
          options={{ title: 'Détails de la Setlist' }}
        />
        <Stack.Screen
          name="CreateSetlist"
          component={CreateSetlist}
          options={{ title: 'Nouvelle Setlist' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
