import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

// import * as React from "react"
// import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
// import { observer } from "mobx-react-lite"
// import { colors, typography } from "app/theme"
// import { Text } from "app/components/Text"

// export interface HomeScreenProps {
//   /**
//    * An optional style override useful for padding & margin.
//    */
//   style?: StyleProp<ViewStyle>
// }

// /**
//  * Describe your component here
//  */
// export const HomeScreen = observer((props: HomeScreenProps) => {
//   const { style } = props
//   const $styles = [$container, style]

//   return (
//     <View style={$styles}>
//       <Text style={$text}>Hello</Text>
//     </View>
//   )
// })

// const $container: ViewStyle = {
//   justifyContent: "center",
// }

// const $text: TextStyle = {
//   fontFamily: typography.primary.normal,
//   fontSize: 14,
//   color: colors.palette.primary500,
// }

