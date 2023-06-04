import React from 'react'
import { observer } from "mobx-react-lite"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"

const welcomeLogo = require("../../assets/images/touring-logo.png")

 export interface WelcomeScreenProps {
  // Define any additional props you need
}

export const WelcomeScreen = observer((props:WelcomeScreenProps, { navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={welcomeLogo} />
      </View>
      <Text style={styles.tagline}>Book from Anywhere</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Already have an account? Login</Text>
        </TouchableOpacity>
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
});
