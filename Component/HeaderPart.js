import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
const HeaderPart = () => {
  const navigation = useNavigation();
  const [time, settime] = useState(new Date().getHours());
  const userDetails = useSelector(state => state.user.user);
  const favorite_item = useSelector(state => state.favorites.items);
  
  useEffect(() => {
    const timer = setInterval(() => {
      settime(new Date().getHours());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);
  var safe = -1;
  if (userDetails == null) {
    safe = 0;
  }

  const content = [
    [
      'Start your day with something warm and healthy.',
      'Light breakfasts make energetic mornings.',
      'Fuel your morning with a tasty meal.',
      'Healthy mornings lead to productive days.',
    ],
    [
      'Refuel your day with a balanced lunch.',
      'Midday meals keep you going strong.',
      'Comfort food to power your day.',
      'Delicious lunches to keep you going.',
    ],
    [
      'Light bites for a calm evening.',
      'Evening snacks without the guilt.',
      'Quick recipes for relaxed evenings.',
      'Something tasty to unwind your day.',
    ],
    [
      'Light bites for a peaceful night.',
      'Night snacks that won’t weigh you down.',
      'Simple recipes for cozy nights.',
      'Easy fixes for night-time cravings.',
    ],
  ];

  let greeting = '';
  let messages = [];

  if (time >= 4 && time < 12) {
    greeting = 'Good Morning';
    messages = content[0];
  } else if (time >= 12 && time < 18) {
    greeting = 'Good Afternoon';
    messages = content[1];
  } else if (time >= 18 && time < 22) {
    greeting = 'Good Evening';
    messages = content[2];
  } else {
    greeting = 'Good Night';
    messages = content[3];
  }

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.imageBorder}>
            {safe !== 0 ? (
              <Image source={{ uri: userDetails.photo }} style={styles.Image} />
            ) : (
              <Image
                source={{
                  uri: 'https://imgs.search.brave.com/ZbjZtAm18qGVKzDBv2E_sTnUEhlh7O3Lzu0cmzRX43g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDAv/MTgzLzYxOC9zbWFs/bC90cm9sbHMyX1JG/X1JNUEwtMDEuanBn',
                }}
                style={styles.Image}
              />
            )}
          </TouchableOpacity>
          <View style={{ marginLeft: 5 }}>
            <Text style={styles.greeting}>{greeting},</Text>
            {safe !== 0 ? (
              <Text style={styles.name}>
                {userDetails.firstname} {userDetails.lastname}
              </Text>
            ) : (
              <Text style={styles.name}>Guest</Text>
            )}
          </View>
        </View>

           
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Favorite')} // Changed to search for better UX
        >
           <View style={{left : -19, top : -8}}>
            <Text style={{fontSize : 17,fontWeight : '800',color : '#F39C12'}}>{favorite_item.length}</Text>
          </View>
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color="#F39C12"
            style={{top : -12}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.message}>Feeling hungry? 😋 </Text>
        <Text style={styles.random}>{randomMessage}</Text>
      </View>
    </View>
  );
};

export default HeaderPart;

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'ios' ? 20 : 25,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageBorder: {
    padding: 2,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F39C12', // Gold/Amber glow
  },
  Image: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#333',
  },
  greeting: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8e8e93',
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: -2,
    letterSpacing: -0.5,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  textContainer: {
    marginTop: 30,
  },
  message: {
    fontSize: 34,
    fontWeight: '900',
    color: '#F39C12',
    letterSpacing: -1,
  },
  random: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 28,
    marginTop: 8,
    opacity: 0.8,
  },
});
