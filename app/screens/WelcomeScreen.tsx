import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const welcomeLogo = require("../../assets/images/logo.png")

interface WelcomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Welcome">> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  props:WelcomeScreenProps, { navigation }
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={styles.container}>
//       <View style={styles.logoContainer}>
//         <Image source={welcomeLogo} />
//       </View>
//       <Text style={styles.tagline}>Book from Anywhere</Text>
//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.buttonText}>Already have an account? Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
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


{/* <Screen style={$root} preset="scroll">
      <Text text="welcome" />
    </Screen> */}

// const $root: ViewStyle = {
//   flex: 1,
// }

