import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Google from '../assets/Logo/Google.png';
import Foundation from 'react-native-vector-icons/Foundation';
import foods from '../assets/Images/foods.png';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../src/redux/reducer/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [termsIncond, settermsIncond] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email.includes('@gmail.com') && email.length < 10) {
      Alert.alert('Invalid Email', email);
    } else if (password.length < 6 && password.length > 18) {
      if (password.length < 6) {
        Alert.alert('Short password', password);
      } else {
        Alert.alert('Long password', password);
      }
    } else {
      Navigation.navigate('HomePage');
      dispatch(login(true));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.imageHeader}>
        <Image source={foods} style={styles.bannerImage} />
        <LinearGradient
          colors={['transparent', '#121212']}
          style={styles.gradient}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Welcome Back</Text>
        <Text style={styles.subTitle}>Login to your chef account</Text>

        <View style={styles.innerForm}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" style={styles.icon} />
            <TextInput
              placeholder="Email address"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#666'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={showPassword}
              style={[styles.input, { flex: 1 }]}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length > 0 && (
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => settermsIncond(!termsIncond)}
              disabled={loading}
            >
              <View
                style={[styles.checkbox, termsIncond && styles.checkboxActive]}
              >
                {termsIncond && (
                  <Ionicons name="checkmark" size={12} color="black" />
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} disabled={loading}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            disabled={loading}
            onPress={() => handleLogin()}
          >
            <Text style={styles.loginBtnText}>
              {loading ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or connect with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Image source={Google} style={styles.socialIcon} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { gap: 13 }]}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Foundation name="social-apple" color="#FFF" size={24} />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.replace('Sigin')}
              disabled={loading}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageHeader: {
    height: 300,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#121212',
    marginTop: -30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F39C12',
    marginTop: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    color: '#F39C12',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#F39C12',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: '#F39C12',
  },
  rememberText: {
    color: '#8e8e93',
    fontSize: 13,
  },
  forgotText: {
    color: '#F39C12',
    fontWeight: '700',
    fontSize: 13,
  },
  loginBtn: {
    backgroundColor: '#F39C12',
    height: 55,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#F39C12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    width: '47%',
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  socialText: {
    color: '#FFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    color: '#8e8e93',
  },
  signUpLink: {
    color: '#F39C12',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
