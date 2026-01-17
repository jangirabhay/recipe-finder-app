import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../../src/redux/reducer/userSlice';
const UpdateProfile = () => {
  const userDetails = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [photo, setphoto] = useState(null);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [terms, setterms] = useState(false);

  const userData = {
    photo,
    firstname,
    lastname,
    email,
    phone,
    gender,
    address,
  };

  useEffect(() => {
    if (!userDetails) return;
    setphoto(userDetails.photo ?? null);
    setfirstname(userDetails.firstname ?? '');
    setlastname(userDetails.lastname ?? '');
    setEmail(userDetails.email ?? '');
    setPhone(userDetails.phone ?? '');
    setGender(userDetails.gender ?? '');
    setAddress(userDetails.address ?? '');
  }, [userDetails]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const image = response.assets[0];
          setphoto(image.uri);
        }
      },
    );
  };

  var safe = -1;
  if (userDetails == null) {
    safe = 0;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.heading}>Update Profile</Text>
                <TouchableOpacity style={styles.settingsBtn}>
                  <MaterialIcons name="settings" size={24} color="#F39C12" />
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
                    <TouchableOpacity
                      style={styles.cameraIcon}
                      onPress={() => pickImage()}
                    >
                      <MaterialIcons
                        name="photo-camera"
                        size={18}
                        color="#000"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <DetailItem
                    icon="person"
                    label="First Name"
                    value={
                      <TextInput
                        placeholder="Enter name"
                        value={firstname}
                        onChangeText={setfirstname}
                        keyboardType="ascii-capable"
                        style={styles.input_data}
                      />
                    }
                  />
                  <View style={styles.divider} />
                  <DetailItem
                    icon="badge"
                    label="Last Name"
                    value={
                      <TextInput
                        placeholder="Enter surname"
                        value={lastname}
                        onChangeText={setlastname}
                        keyboardType="ascii-capable"
                        style={styles.input_data}
                      />
                    }
                  />
                  <View style={styles.divider} />
                  <DetailItem
                    icon="email"
                    label="Email"
                    value={
                      <TextInput
                        placeholder="Enter Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={styles.input_data}
                      />
                    }
                  />
                  <View style={styles.divider} />
                  <DetailItem
                    icon="phone"
                    label="Mobile No."
                    value={
                      <TextInput
                        placeholder="Enter Mobile No."
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="numeric"
                        style={styles.input_data}
                      />
                    }
                  />
                  <View style={styles.divider} />
                  <DetailItem
                    icon="wc"
                    label="Gender"
                    value={
                      <TextInput
                        placeholder="Enter Gender"
                        value={gender}
                        onChangeText={setGender}
                        keyboardType="ascii-capable"
                        style={styles.input_data}
                      />
                    }
                  />
                  <View style={styles.divider} />
                  <DetailItem
                    icon="home"
                    label="Address"
                    value={
                      <TextInput
                        placeholder="Enter Address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input_data}
                      />
                    }
                  />
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.upd_button}
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(setUser(userData));
                  navigation.goBack();
                }}
              >
                <Text style={styles.button_txt}>Save Profile</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    bottom: 60,
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
  input_data: {
    color: '#bbbbbbff',
    width: 200,
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
