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

export default function ProfileScreen() {
  

  return (
    <View style={styles.container}>
    <Text>Welcome to caniconnect ProfileScreen !</Text>
    <StatusBar style="auto" />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ADD8E6',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  