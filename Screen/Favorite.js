import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import {removeFavorite} from '../src/redux/reducer/favoriteSlicer'
const { width } = Dimensions.get('screen');
const Favorite = () => {
  const favorite_item = useSelector(state => state.favorites.items);
  // console.log(favorite_item);
  const naviagtion = useNavigation();
  const distpatch = useDispatch();
  const column_Width = (width - 50) / 2;
  if (!favorite_item || favorite_item.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No delicacies favorite...</Text>
      </View>
    );
  }

  return (
    <View
      style={[styles.listContainer, { flex : 1 }]}
      pointerEvents="box-none"
    >
      <Text
        style={{
          color: '#F39C12',
          alignSelf: 'center',
          marginTop: 52,
          top: -12,
          fontSize: 20,
          fontWeight: '800',
          fontVariant: 'small-caps',
        }}
      >
        Favorite Recipe
      </Text>
      <FlatList
        data={favorite_item}
        keyExtractor={item => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: column_Width }]}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />

              <View style={styles.overlay} />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.strMeal}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={styles.footer}
                  activeOpacity={0.3}
                  onPress={() =>
                    naviagtion.navigate('MealInfo', { Recipe: item })
                  }
                >
                  <Text style={styles.categoryText}>View Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.hearticon}
                  activeOpacity={0.3}
                  onPress={() => {
                    distpatch(removeFavorite(item))
                  }}
                >
                  <Entypo name="heart" color="#ff0000ff" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;

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
    backgroundColor: '#121212',
  },
  emptyText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#1E1E1E',
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

  hearticon: {
    top: 10,
  },
});
