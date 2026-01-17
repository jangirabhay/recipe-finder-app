import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Google from '../assets/Logo/Google.png';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native';
import CupFood from '../assets/Images/CupFood.png';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../src/redux/reducer/authSlice';


const Sigin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [userInfo, setuserInfo] = useState(null);
  
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />

      <View style={styles.imageHeader}>
        <Image source={CupFood} style={styles.bannerImage} />
        <LinearGradient
          colors={['transparent', '#121212']}
          style={styles.gradient}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Create Account</Text>
        <Text style={styles.subTitle}>
          Join the community of Midnight Chefs
        </Text>

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
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length > 0 && (
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="shield-checkmark-outline" style={styles.icon} />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'#666'}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={showConfirmPassword}
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {confirmPassword.length > 0 && (
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or sign up with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              activeOpacity={0.7}
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
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => Navigation.replace('Login')}
              disabled={loading}
            >
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Sigin;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  imageHeader: {
    height: 320,
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
    marginTop: -40,
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
    marginBottom: 25,
  },
  innerForm: {
    marginTop: 10,
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
  loginBtn: {
    backgroundColor: '#F39C12',
    height: 55,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
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
    marginVertical: 25,
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
    marginTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    color: '#8e8e93',
    fontWeight: '500',
  },
  signUpLink: {
    color: '#F39C12',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
