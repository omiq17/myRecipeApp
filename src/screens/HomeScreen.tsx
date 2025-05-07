import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useMeals } from '../hooks/useMeals';
import { MealCard } from '../components/MealCard';
import { NetworkIndicator } from '../components/NetworkIndicator';
import { Meal } from '../models/Meal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  MealDetail: { mealId: string };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { 
    meals, 
    categories, 
    selectedCategory, 
    isLoading, 
    error, 
    isConnected,
    changeCategory 
  } = useMeals();

  // console.log('meals', meals);

  const handleMealPress = (meal: Meal) => {
    navigation.navigate('MealDetail', { mealId: meal.idMeal });
  };

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory
      ]}
      onPress={() => changeCategory(category)}
    >
      <Text 
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.selectedCategoryText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NetworkIndicator />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Recipes</Text>
      </View>
      
      {/* Categories Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollView}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>
      
      {/* Meals Grid */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#ffbd33" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          {!isConnected && (
            <Text style={styles.offlineText}>
              You're offline. Please turn on the internet for first time data loading.
            </Text>
          )}
        </View>
      ) : meals.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noMealsText}>No meals found for this category</Text>
        </View>
      ) : (
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => handleMealPress(item)}
              style={styles.mealCard}
            />
          )}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.mealRow}
          contentContainerStyle={styles.mealList}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => changeCategory(selectedCategory)}
              enabled={isConnected}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffbd33',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  categoriesScrollView: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#ffbd33',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 10,
  },
  offlineText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  noMealsText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  mealList: {
    padding: 8,
  },
  mealRow: {
    justifyContent: 'space-between',
  },
  mealCard: {
    flex: 1,
    maxWidth: '48%',
  },
});
