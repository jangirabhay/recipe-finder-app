import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { addFavorite } from '../src/redux/reducer/favoriteSlicer';
import { useDispatch } from 'react-redux';
const Recomandation = () => {
  const [data, setdata] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getRecipe = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=vegan`,
      );
      const res = await response.json();
      setdata(res.meals || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <View style={styles.mainWrapper}>
      {/* Visual Indicator/Handle for the section */}
      <View style={styles.dragHandle} />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Curated for You</Text>
          <Text style={styles.subHeading}>Healthy & Vegan choices</Text>
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.accentText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data.slice(0, 6)}
        keyExtractor={item => item.idMeal}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
            onPress={() => navigation.navigate('MealInfo', { Recipe: item })}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.image}
                resizeMode="cover"
              />
              {/* Gradient Overlay for the tag */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradientOverlay}
              >
                <View style={styles.timeTag}>
                  <Text style={styles.timeText}>25 MIN</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.infoContainer}>
              <Text numberOfLines={2} style={styles.mealName}>
                {item.strMeal}
              </Text>

              <View style={styles.buttonRow}>
                <View style={styles.recipeBtn}>
                  <Text style={styles.recipeText}>View Details</Text>
                </View>

                <TouchableOpacity style={styles.favBtn} 
                onPress={() => {
                  dispatch(addFavorite(item))
                }}>
                  <Text style={styles.favIcon}>♥</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Recomandation;

const styles = StyleSheet.create({
  mainWrapper: {
    marginTop: -10,
    backgroundColor: '#161616', 
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 15,
    paddingBottom: 70, 
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subHeading: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginTop: 2,
  },
  accentText: {
    color: '#F39C12',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  listPadding: {
    paddingLeft: 25,
    paddingRight: 10,
  },
  container: {
    marginRight: 20,
    width: 260,
    backgroundColor: '#222', 
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  imageWrapper: {
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    padding: 12,
  },
  timeTag: {
    backgroundColor: '#F39C12',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  infoContainer: {
    padding: 18,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 15,
    alignSelf : 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipeBtn: {
    backgroundColor: '#F39C12',
    height: 44,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  recipeText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  favBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favIcon: {
    color: '#E74C3C',
    fontSize: 20,
  },
});