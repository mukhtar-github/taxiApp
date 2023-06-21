import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { Screen, Text } from "app/components"
// import {AppStackScreenProps } from "app/navigators"
// import { useStores } from "app/models"
// import { ViewStyle } from "react-native"
// import { useHeader } from "../utils/useHeader"


const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps extends NativeStackScreenProps<AppStackParamList, "Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen({ navigation }){

  // Define the handler for navigating to the RegisterScreen
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  // Define the handler for navigating to the LoginScreen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={welcomeLogo} />
      </View>
      <Text style={styles.tagline}>Book from Anywhere</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.tagline2}>
          Already have an account?{' '}
        <Text style={styles.link} onPress={handleLogin}>
          Login
        </Text>
      </Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6F1F6"
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#eaeaea",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tagline2: {
    fontSize: 16,
    marginVertical: 10,
  },
  link: {
    color: '#0000ff',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
});

