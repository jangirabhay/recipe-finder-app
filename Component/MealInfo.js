import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addFavorite } from '../src/redux/reducer/favoriteSlicer';
import { useDispatch } from 'react-redux';
const MealInfo = () => {
  const route = useRoute();
  const { Recipe } = route.params;
  const [favorite, setfavorite] = useState(false);
  const dispatch = useDispatch();
  // Function to handle opening YouTube
  const watchVideo = link => {
    if (Recipe.strYoutube) {
      Linking.openURL(Recipe.strYoutube);
    } else {
      Alert.alert(
        'Video Unavailable',
        'Sorry, there is no video tutorial for this recipe.',
      );
    }
  };

  if (!Recipe) {
    return (
      <View
        style={[
          styles.conatiner,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text style={{ color: '#fff' }}>No recipe data found</Text>
        <View style={{}}>
          <MaterialIcons name="favorite" color="#ffffffff" size={24} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.conatiner}>
      <StatusBar barStyle="light-content" />

      <View style={styles.fixedHeader}>
        <Text style={styles.headerTitle}>Recipe Details</Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 30,
            bottom: 10,
            padding: 4,
            borderRadius: 50,
            backgroundColor: favorite ? 'white' : 'red',
          }}
          onPress={() => {
            setfavorite(true)
            dispatch(addFavorite(Recipe))
          }}
        >
          <MaterialIcons name="favorite" color={favorite ? 'red' : 'white'} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: Recipe.strMealThumb }} style={styles.image} />
            <View style={styles.imageOverlay} />

            {Recipe.strYoutube && (
              <TouchableOpacity
                style={styles.youtubeFab}
                onPress={watchVideo}
                activeOpacity={0.8}
              >
                <FontAwesome name="youtube-play" size={30} color="#FF0000" />
                <Text style={styles.youtubeText}>Watch Tutorial</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.mealTitle}>{Recipe.strMeal}</Text>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="alarm" color="#F39C12" size={20} />
              <Text style={styles.statText}>30 min</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <AntDesign name="barschart" color="#F39C12" size={20} />
              <Text style={styles.statText}>Medium</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" color="#F39C12" size={20} />
              <Text style={styles.statText}>450 Cal</Text>
            </View>
          </View>

          <View style={styles.contentPadding}>
            <View style={styles.infoRow}>
              <View style={styles.smallCard}>
                <Text style={styles.cardLabel}>Origin</Text>
                <Text style={styles.cardValue}>{Recipe.strArea}</Text>
              </View>
              <View style={styles.smallCard}>
                <Text style={styles.cardLabel}>Category</Text>
                <Text style={styles.cardValue}>{Recipe.strCategory}</Text>
              </View>
            </View>

            {Recipe.strTags && (
              <View style={styles.body_1}>
                <Text style={styles.heading}>Tags</Text>
                <View style={styles.tagContainer}>
                  {Recipe.strTags.split(',').map((tag, i) => (
                    <View key={i} style={styles.tagBadge}>
                      <Text style={styles.tagText}>#{tag.trim()}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View style={[styles.body_1, { marginBottom: 100 }]}>
              <Text style={styles.heading}>Instructions</Text>
              <Text style={styles.instructionsText}>
                {Recipe.strInstructions}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MealInfo;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#121212',
  },
  fixedHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  body: {
    marginTop: 10,
  },
  imageContainer: {
    width: '92%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  youtubeFab: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    gap: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  youtubeText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 14,
  },
  mealTitle: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  statItem: {
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },
  contentPadding: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardLabel: {
    color: '#8e8e93',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 5,
  },
  cardValue: {
    color: '#F39C12',
    fontSize: 16,
    fontWeight: '700',
  },
  body_1: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 25,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 15,
  },
  instructionsText: {
    color: '#B0B0B0',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    color: '#F39C12',
    fontSize: 12,
    fontWeight: '700',
  },
});
