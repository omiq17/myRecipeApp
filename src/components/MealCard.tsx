import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, ViewStyle } from 'react-native';
import { Meal } from '../models/Meal';
import { useNetwork } from '../contexts/NetworkContext';
import { PLACEHOLDER_IMAGE_BASE64 } from '../const/image';

interface MealCardProps {
  meal: Meal;
  onPress: () => void;
  style?: ViewStyle;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress, style }) => {
  const { isConnected } = useNetwork();
  
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image
        source={ isConnected ? { uri: meal.strMealThumb } : {uri: PLACEHOLDER_IMAGE_BASE64} }
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {meal.strMeal}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    margin: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
