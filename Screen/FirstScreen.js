import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ImageBackground, 
  Text, 
  useWindowDimensions, 
  StatusBar,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Home from '../assets/Icon/two.png';

const FirstScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ImageBackground
        source={Home}
        resizeMode="cover"
        style={{ width: width, height: height/1.5 }}
      >
        {/* Dark gradient overlay for readability */}
        <View style={styles.darkOverlay}>
          
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <Text style={styles.brandTag}>🍳 Your Personal Chef</Text>
            
            <Text style={styles.title}>
              Cook Like a <Text style={styles.highlight}>Pro</Text> at Home
            </Text>
            
            <Text style={styles.description}>
              Discover over 10,000+ hand-picked recipes. Turn your simple ingredients into extraordinary meals.
            </Text>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.replace('Login')}
            >
              <Text style={styles.buttonText}>Start Cooking</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Explore • Cook • Savor</Text>
          </Animated.View>

        </View>
      </ImageBackground>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#121212'
  },
  darkOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    top : '45%'
  },
  contentContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  brandTag: {
    color: '#FFD700', // Gold color
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 15,
  },
  highlight: {
    color: '#F39C12', // Fresh Green
  },
  description: {
    fontSize: 17,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#F39C12',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    marginTop: 25,
    fontSize: 12,
    letterSpacing: 3,
  }
});