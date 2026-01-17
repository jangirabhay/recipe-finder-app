import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addFavorite } from '../src/redux/reducer/favoriteSlicer';
import { useDispatch, useSelector } from 'react-redux';
const Week_p = () => {
  const [weekRecipe, setWeekRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getWeek_Recipe = async () => {
    setLoading(true);
    try {
      const requests = Array(12).fill(
        'https://www.themealdb.com/api/json/v1/1/random.php',
      );

      const responses = await Promise.all(requests.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));

      const allMeals = data.map(item => item.meals[0]);

      const filteredMeals = allMeals.filter(meal => {
        const isBeefCategory = meal.strCategory === 'Beef';
        const hasBeefInName = meal.strMeal.toLowerCase().includes('beef');

        return !isBeefCategory && !hasBeefInName;
      });

      setWeekRecipe(filteredMeals.slice(0, 7));
    } catch (error) {
      console.log('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeek_Recipe();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.topInfo}>
        <View>
          <Text style={styles.sectionHeading}>Chef's Challenge 👨‍🍳</Text>
          <Text style={styles.subText}>Roll the dice for today's mission!</Text>
        </View>
        <TouchableOpacity
          style={styles.shuffleBtn}
          onPress={getWeek_Recipe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <MaterialIcons name="auto-fix-high" size={22} color="#F39C12" />
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={weekRecipe}
        keyExtractor={(item, index) => item.idMeal + index}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 10,
          paddingBottom: 25,
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.container}>
              {/* Challenge Number Badge */}
              <View style={styles.challengeBadge}>
                <Text style={styles.challengeText}>GOAL #{index + 1}</Text>
              </View>

              <Image source={{ uri: item.strMealThumb }} style={styles.image} />

              <View style={styles.textWrapper}>
                <Text style={styles.mealTitle} numberOfLines={2}>
                  {item.strMeal}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.acceptBtn}
                  onPress={() =>
                    navigation.navigate('MealInfo', { Recipe: item })
                  }
                >
                  <Text style={styles.acceptText}>I'll Cook This! 🚀</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => dispatch(addFavorite(item))}
                >
                  <Text style={styles.saveText}>Save for later</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Week_p;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: -25,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF', // High contrast white
  },
  subText: {
    fontSize: 13,
    color: '#8e8e93',
    fontWeight: '500',
  },
  shuffleBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  container: {
    marginRight: 18,
    width: 210,
    backgroundColor: '#1E1E1E', // Dark Grey card
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  challengeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(243, 156, 18, 0.9)', // Amber badge for visibility
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 2,
  },
  challengeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  image: {
    width: '100%',
    height: 200,
    opacity: 0.9,
  },
  textWrapper: {
    padding: 15,
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 7,
    textAlign: 'center',
    height: 40,
  },
  acceptBtn: {
    backgroundColor: '#F39C12',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 8,
  },
  acceptText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 14,
  },
  saveBtn: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  saveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textDecorationLine: 'underline',
  },
});
