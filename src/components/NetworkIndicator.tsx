import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from '../contexts/NetworkContext';

export const NetworkIndicator: React.FC = () => {
  const { isConnected } = useNetwork();
  
  if (isConnected) return null;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offline Mode</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8d7da',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#721c24',
    fontWeight: 'bold',
  },
});

