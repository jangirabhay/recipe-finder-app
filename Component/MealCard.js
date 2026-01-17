import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
// Adjusted for better spacing in the dark theme
const COLUMN_WIDTH = (width - 50) / 2;

const MealCard = ({ data }) => {
  const navigation = useNavigation();

  {
    (!data || data.length === 0) && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No delicacies found...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.idMeal}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.card}
          onPress={() => navigation.navigate('MealInfo', { Recipe: item })}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            {/* Subtle overlay for better contrast */}
            <View style={styles.overlay} />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.strMeal}
            </Text>
            <View style={styles.footer}>
              <Text style={styles.categoryText}>View Recipe</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default MealCard;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    backgroundColor: '#121212',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#1E1E1E', // Dark Grey card
    width: COLUMN_WIDTH,
    marginVertical: 10,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  imageWrapper: {
    width: '100%',
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 20,
    height: 40, // Keeps grid aligned regardless of text length
    textAlign: 'left',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#F39C12', // Burnt Amber accent
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  arrow: {
    color: '#F39C12',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
