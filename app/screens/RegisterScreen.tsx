import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native"
import { useStores } from "app/models"
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps, AppStackParamList } from "app/navigators"
//import { Screen, Text } from "app/components"

//interface RegisterScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Register">> {}

interface RegisterScreenProps extends NativeStackScreenProps<AppStackParamList, "Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen({ navigation }) {
  // Pull in one of our MST stores
  // Destructure the authenticationStore object from useStores
  const { authenticationStore } = useStores()

  // Pull in navigation via hook
  //const navigation = useNavigation<AppStackScreenProps<"Register">>()

  // Use state variables to store the user's input
  const [mobileNumber, setMobileNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  // Define a function to handle the register button press
  const handleRegister = () => {
    // Call the register action from authenticationStore with mobile number, user name, password and email
    authenticationStore.register(mobileNumber, userName, password, email)
    // If register is successful, navigate to home screen
    if (authenticationStore.isAuthenticated) {
      navigation.navigate('Home')
    }
  }

  return (
    <View style={styles.container}>
      {/* Display the inputs for mobile number, user name and password */}
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter user name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Set password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {/* Display the input for email */}
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      {/* Display the tagline for terms and conditions */}
      <Text style={styles.tagline}>
        By signing up you agree to the{' '}
        {/* Use navigation.navigate to go to terms and conditions screen */}
        <Text style={styles.link} onPress={() => navigation.navigate('TermsAndConditions')}>
          Terms & Conditions
        </Text>
      </Text>
      {/* Display the register button */}
      <Button title="Submit and Continue" color="#32cd32" onPress={handleRegister} />
      {/* Display the tagline for login */}
      <Text style={styles.tagline}>
        Already have an account?{' '}
        {/* Use navigation.navigate to go to login screen */}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
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
