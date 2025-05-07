import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkProvider } from './contexts/NetworkContext';
import { HomeScreen } from './screens/HomeScreen';
import { MealDetailScreen } from './screens/MealDetailScreen';

type RootStackParamList = {
  Home: undefined;
  MealDetail: { mealId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NetworkProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" backgroundColor="#ffbd33" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ffbd33',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="MealDetail" 
              component={MealDetailScreen}
              options={{ title: 'Recipe Details' }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </NetworkProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;