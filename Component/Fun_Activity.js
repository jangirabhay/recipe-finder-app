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
import { useDispatch } from 'react-redux';
import { addFavorite } from '../src/redux/reducer/favoriteSlicer';

const Fun_Activity = () => {
  const [weekRecipe, setWeekRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const distatch = useDispatch();
  const currentDayIndex = (new Date().getDay() + 6) % 7;

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

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionHeading}>Weekly Challenge 🏆</Text>
          <Text style={styles.subHeading}>Master a new flavors every day</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshCircle}
          onPress={getWeek_Recipe}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#F39C12" />
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
          paddingBottom: 20,
        }}
        renderItem={({ item, index }) => {
          const isToday = index === currentDayIndex;

          return (
            <View style={[styles.container, isToday && styles.todayContainer]}>
              {/* Day Badge */}
              <View style={[styles.dayBadge, isToday && styles.todayBadge]}>
                <Text style={[styles.dayText, isToday && styles.todayDayText]}>
                  {isToday ? `🔥 ACTIVE NOW` : days[index]}
                </Text>
              </View>

              <Image source={{ uri: item.strMealThumb }} style={styles.image} />

              <View style={styles.textWrapper}>
                <Text style={styles.mealTitle} numberOfLines={1}>
                  {item.strMeal}
                </Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.recipeBtn,
                      isToday && styles.todayBtn,
                      { backgroundColor: '#F39C12' },
                    ]}
                    onPress={() =>
                      navigation.navigate('MealInfo', { Recipe: item })
                    }
                  >
                    <Text
                      style={[
                        styles.recipeText,
                        isToday && styles.todayBtnText,
                      ]}
                    >
                      Start Challenge
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.favBtn}
                    onPress={() => {
                      distatch(addFavorite(item));
                    }}
                  >
                    <Text style={styles.favText}>❤</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Fun_Activity;

const styles = StyleSheet.create({
  sectionContainer: { marginTop: -5 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF', // White for dark theme
  },
  subHeading: {
    fontSize: 13,
    color: '#8e8e93',
    fontWeight: '500',
  },
  refreshCircle: {
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
    marginRight: 15,
    width: 240,
    backgroundColor: '#1E1E1E', // Dark Card
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
      android: { elevation: 6 },
    }),
  },
  todayContainer: {
    borderColor: '#F39C12', // Amber border for today
    borderWidth: 2,
  },
  dayBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 2,
  },
  todayBadge: {
    backgroundColor: '#F39C12',
  },
  dayText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  todayDayText: {
    color: '#000',
  },
  image: { width: '100%', height: 150, opacity: 0.9 },
  textWrapper: { padding: 15 },
  mealTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeBtn: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    borderRadius: 15,
    flex: 4,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  todayBtn: {
    backgroundColor: '#F39C12',
    borderColor: '#F39C12',
  },
  recipeText: { color: '#2b2b2bff', fontWeight: '700', fontSize: 13 },
  todayBtnText: { color: '#000' },
  favBtn: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
  },
  favText: { fontSize: 18, color: '#E74C3C' },
});
