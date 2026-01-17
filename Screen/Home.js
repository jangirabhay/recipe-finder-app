import { View, StyleSheet, ScrollView, StatusBar, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderPart from '../Component/HeaderPart';
import LinearGradient from 'react-native-linear-gradient';
import Recomandation from '../Component/Recomandation';
import Week_p from '../Component/Week_p';
import Fun_Activity from '../Component/Fun_Activity';

const Home = () => {
  return (
    <LinearGradient
      // Deep Charcoal to Pitch Black gradient
      colors={['#1a1a1a', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Ensures clock/battery icons are white */}
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Top Section */}
          <View style={styles.headerSection}>
            <HeaderPart />
          </View>

          {/* Featured Activity Section */}
          <View style={styles.sectionMargin}>
            <Week_p />
          </View>

          {/* Gamified Section */}
          <View style={styles.sectionMargin}>
            <Fun_Activity />
          </View>

          {/* Recommendation Section */}
          <View style={[styles.sectionMargin,]}>
            <Recomandation />
          </View>
        </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
  },
  headerSection: {
    marginBottom: 5,
  },
  sectionMargin: {
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 20,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
});