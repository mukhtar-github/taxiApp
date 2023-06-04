import * as React from "react"
import { Image, StyleSheet, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from '../navigators/AppNavigator'
import { useStores } from '../models'
// import { colors, typography } from "app/theme"

const LoadingLogo = require("../../assets/images/touring-logo.png")

export interface LoadingScreenProps extends AppStackScreenProps<"Loading"> {
  /**
   * An optional style override useful for padding & margin.
   */
  //style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const LoadingScreen = observer(function LoadingScreen(
  props: LoadingScreenProps,
  { navigation }) {

  //const { style } = props
  //const $styles = [$container, style]
  const { authenticationStore: { authToken } } = useStores();

  React.useEffect(() => {
    // Check if the user has a valid token
    // If yes, navigate to the home screen
    // If no, navigate to the welcome screen
    // We'll mock this with a timeout
    setTimeout(() => {
      if (authToken) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('welcome');
      }
    }, 2000);
  }, [authToken, navigation]);


  return (
    <View style={styles.container}>
      <Image source={LoadingLogo} style={styles.logo} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6F1F6", // Replace with your desired pale blue color code
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
});


//<Text style={$text}>Hello</Text> removed from View
//View preset="auto" style={$styles} removed from View also
//const $container: ViewStyle = {
  //justifyContent: "center",
//}

//const $text: TextStyle = {
  //fontFamily: typography.primary.normal,
  //fontSize: 14,
  //color: colors.palette.primary500,
//}
