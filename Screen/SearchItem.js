import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MealCard from '../Component/MealCard';
import LinearGradient from 'react-native-linear-gradient';

const SearchItem = () => {
  const [search, setSearch] = useState('');
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const hangleInput = recipe => {
    setSearch(recipe);
  };
  {
    search.toLowerCase().includes('beef') && setSearch('');
  }
  const getRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`,
      );
      const res = await response.json();
      setdata(res.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#121212', '#1E1E1E']} style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Explore Recipes</Text>
        <Text style={styles.subTitle}>Find the perfect meal for tonight</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by ingredient or name..."
          placeholderTextColor={'#666'}
          value={search}
          onChangeText={hangleInput}
          onSubmitEditing={getRecipe} // Triggers search on keyboard enter
          style={styles.input}
          returnKeyType="search"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={getRecipe}
          style={styles.searchIconBg}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#F39C12" />
          ) : (
            <Octicons name="search" color="#F39C12" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mealCardContainer}>
        {data.length === 0 && !loading && search.length > 0 ? (
          <View style={styles.noResult}>
            <Octicons name="info" color="#333" size={40} />
            <Text style={styles.noResultText}>
              No recipes found for "{search}"
            </Text>
          </View>
        ) : (
          <MealCard data={data} />
        )}
      </View>
    </LinearGradient>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    width: '90%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#333',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // Android Elevation
    elevation: 8,
  },
  input: {
    color: '#FFF',
    fontSize: 15,
    paddingLeft: 15,
    flex: 1,
    height: '100%',
  },
  searchIconBg: {
    backgroundColor: '#2A2A2A',
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
  },
  mealCardContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
  },
  noResult: {
    marginTop: 100,
    alignItems: 'center',
    opacity: 0.5,
  },
  noResultText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 14,
  },
});
