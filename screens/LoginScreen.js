import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateNickname } from "../reducers/user";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

 
  const [signUpUsername, setSignUpUsername]= useState("");
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleRegister = () => {
    fetch('https://backend-lyart-mu.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signUpUsername, email: signUpEmail, password: signUpPassword }),
    }).then(response => {
      console.log(response)
      return response.json()
      })
      .then(data => {
        console.log(data)
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername('');
          setSignUpEmail('')
          setSignUpPassword('');
         navigation.navigate('TabNavigator')
        }
      });
  };

  const handleConnection = () => {
    fetch('/https://backend-lyart-mu.vercel.app/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: signInUsername, password: signInPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername('');
          setSignInPassword('');
         
        }
      });
  };
 
  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Caniconnect Login </Text>

      <TextInput placeholder="Username" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input} />
      <TouchableOpacity onPress={() => handleRegister()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>s'inscrire</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#f2B872',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#f2B872',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});

