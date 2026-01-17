import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { logout } from '../../src/redux/reducer/authSlice';
import { useDispatch } from 'react-redux';
const Profile = () => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.user.user);
  const favorite_item = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();
  const {
    firstname: name = 'No Name',
    lastname: surname = 'No Surname',
    email = 'No Email',
    phone = 'No Phone',
    gender = 'No Gender',
    address = 'No Address',
    photo = null,
  } = userDetails || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chef Profile</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => {
            dispatch(logout(false));
            navigation.navigate('Login');
          }}
        >
          <Text style={{ color: '#F39C12', fontWeight: '800', fontSize: 18 }}>
            LogOut
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <View>
              {photo !== null ? (
                <Image source={{ uri: photo }} style={styles.image} />
              ) : (
                <Entypo
                  name="user"
                  color="#F39C12"
                  size={44}
                  style={styles.person_icon}
                />
              )}
            </View>
          </View>

          <Text style={styles.userName}>
            {name} {surname}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <DetailItem icon="person" label="First Name" value={`${name}`} />
          <View style={styles.divider} />
          <DetailItem icon="badge" label="Last Name" value={`${surname}`} />
          <View style={styles.divider} />
          <DetailItem icon="email" label="Email" value={`${email}`} />
          <View style={styles.divider} />
          <DetailItem icon="phone" label="Mobile No." value={`+91 ${phone}`} />
          <View style={styles.divider} />
          <DetailItem icon="wc" label="Gender" value={`${gender}`} />
          <View style={styles.divider} />
          <DetailItem icon="home" label="Address" value={`${address}`} />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favorite_item.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.upd_button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('UpdateProfile')}
      >
        <Text style={styles.button_txt}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.det_subbox}>
    <View style={styles.iconBackground}>
      <MaterialIcons name={icon} size={20} color="#F39C12" />
    </View>
    <View style={styles.textData}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={20} color="#444" />
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  no_data: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212', // Pure Midnight Dark
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },
  settingsBtn: {
    padding: 8,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
  },
  scrollContent: {
    paddingBottom: 150,
  },
  imageSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageWrapper: {
    position: 'relative',
    padding: 4,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#F39C12',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#333',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F39C12',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#121212',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 15,
    fontVariant: 'small-caps',
  },
  userTag: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: '600',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  det_subbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  iconBackground: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textData: {
    flex: 1,
    marginLeft: 15,
  },
  label: {
    fontSize: 12,
    color: '#8e8e93',
    fontWeight: '600',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginLeft: 55,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statBox: {
    width: '47%',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 4,
  },
  upd_button: {
    backgroundColor: '#F39C12',
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    elevation: 8,
    shadowColor: '#F39C12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button_txt: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase',
  },

  person_icon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#333',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
