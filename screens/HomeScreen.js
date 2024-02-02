import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateNickname } from '../reducers/user';

export default function HomeScreen() {
  

  return (
    <View style={styles.container}>
    <Text>Welcome to caniconnect HomeScreen !</Text>
    <StatusBar style="auto" />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2B872',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  