import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps, AppStackParamList } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { View, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native'

// interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {
//   Home: undefined
// }
interface LoginScreenProps extends NativeStackScreenProps<AppStackParamList, "Login"> {}


export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  // Use state variables to store the user's input
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigation = useNavigation()

  // Destructure the authenticationStore object from useStores
  const { authenticationStore } = useStores()

  // Define a function to handle the login button press
  const handleLogin = () => {
    // Call the login action from authenticationStore with username and password
    authenticationStore.login(username, password)
    // If login is successful, navigate to home screen
    if (authenticationStore.isAuthenticated) {
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container}>
      {/* Display the inputs for username and password */}
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {/* Display the login button */}
      <Button title="Login" color="#32cd32" onPress={handleLogin} />
      {/* Display the tagline for sign up */}
      <Text style={styles.tagline}>
        New to Taxi App?{' '}
        // Use navigation.navigate to go to register screen
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Sign Up
        </Text>
      </Text>
    </View>
  )
})

// Define the styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  tagline: {
    fontSize: 16,
    marginVertical: 10,
  },
  link: {
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
})



{/* <Screen style={$root} preset="scroll">
      <Text text="login" />
    </Screen> */}

// const $root: ViewStyle = {
//   flex: 1,
// }
