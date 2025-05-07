import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  Linking
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { fetchMealDetails } from '../api/mealApi';
import { getMealDetail, storeMealDetail } from '../services/storageService';
import { useNetwork } from '../contexts/NetworkContext';
import { NetworkIndicator } from '../components/NetworkIndicator';
import { Meal } from '../models/Meal';
import { PLACEHOLDER_IMAGE_BASE64 } from '../const/image';

type RootStackParamList = {
  Home: undefined;
  MealDetail: { mealId: string };
};

type MealDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MealDetail'>;
  route: RouteProp<RootStackParamList, 'MealDetail'>;
};

export const MealDetailScreen: React.FC<MealDetailScreenProps> = ({ route, navigation }) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isConnected } = useNetwork();

  useEffect(() => {
    const loadMealDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First try to get from cache
        const cachedMeal = await getMealDetail(mealId);
        if (cachedMeal) {
          setMeal(cachedMeal);
        } else {
          if (isConnected) {
            const freshMeal = await fetchMealDetails(mealId);
            if (freshMeal) {
              setMeal(freshMeal);
              await storeMealDetail(freshMeal);
            }
          } else {
            setError('No meal details available from previous browsing data. Please connect to the internet to get new data.');  
          }
        }
      } catch (err) {
        console.error('Error loading meal details:', err);
        setError('Failed to load meal details');
      } finally {
        setIsLoading(false);
      }
    };

    loadMealDetails();
  }, [mealId]);

  const openYoutubeLink = async () => {
    if (meal?.strYoutube) {
      const canOpen = await Linking.canOpenURL(meal.strYoutube);
      if (canOpen) {
        await Linking.openURL(meal.strYoutube);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffbd33" />
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || "Meal not found"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NetworkIndicator />
      <ScrollView>
        <Image
          source={isConnected ? { uri: meal.strMealThumb } : { uri: PLACEHOLDER_IMAGE_BASE64 }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>{meal.strMeal}</Text>
          
          <View style={styles.infoRow}>
            {meal.strCategory && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{meal.strCategory}</Text>
              </View>
            )}
            {meal.strArea && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{meal.strArea}</Text>
              </View>
            )}
          </View>
          
          {meal.strTags && (
            <Text style={styles.tags}>
              {meal.strTags.split(',').join(' • ')}
            </Text>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
          </View>
          
          {isConnected && meal.strYoutube && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Video Tutorial</Text>
              <Text 
                style={styles.youtubeLink}
                onPress={openYoutubeLink}
              >
                Watch on YouTube
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#ffbd33',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  tagText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  tags: {
    color: '#666',
    marginBottom: 16,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  youtubeLink: {
    color: '#ff0000',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
