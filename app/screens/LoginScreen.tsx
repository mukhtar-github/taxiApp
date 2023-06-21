import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import { useStores } from "app/models"
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

interface LoginScreenProps extends NativeStackScreenProps<AppStackParamList, "Login"> {}

type ReactNode = /*unresolved*/ any;

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {

  // Destructure the authenticationStore object from useStores
  const { authenticationStore } = useStores()

  // Define the validation schema for the login form using Yup
  const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters'),
}) as Yup.Schema<{ email: string; password: string }>; // Use Schema instead of SchemaOf and specify the generic parameter



  // Define the handler for logging in the user
  const handleLogin = async (values) => {
    try {
      // Use the login action from the authentication store
      await authenticationStore.login(values.email, values.password);

      // Navigate to the home screen if successful
      navigation.navigate("Home");
    } catch (error) {
      // Show an alert if there is an error
      alert(error.message);
    }
  };

  // Define the handler for navigating to the register screen
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      {/* Wrap the form elements inside a <Formik> component */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {/* Display the inputs for email */}
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {/* Display the error message for email */}
            {errors.email && <Text style={styles.error}>{errors.email as ReactNode}</Text>}
            {/* Display the inputs for password */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {/* Display the error message for password */}
            {errors.password && <Text style={styles.error}>{errors.password as ReactNode}</Text>}
            {/* Display the login button */}
            <Button title="Login" color="#32cd32" onPress={(event) => handleSubmit()} />

          </>
        )}
      </Formik>
      <Text style={styles.tagline}>
        New to Taxi App?{' '}
        <Text style={styles.link} onPress={handleRegister}>
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
    borderColor: "#000",
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
    marginVertical: 10,
  },
  error: {
    color: '#ff0000',
    fontSize: 14,
    marginVertical: 5,
  },
})



// import React, { FC, useState } from "react"
// import { observer } from "mobx-react-lite"
// import { NativeStackScreenProps } from "@react-navigation/native-stack"
// import { AppStackParamList } from "app/navigators"
// import { useStores } from "app/models"
// import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
// // import { AppStackScreenProps } from "app/navigators"
// // import { ViewStyle } from "react-native"
// // import { Screen, Text } from "app/components"
// // import { useNavigation } from "@react-navigation/native"
// // import { useNavigation } from "@react-navigation/native";
// // import { observer } from "mobx-react-lite";
// // import { useStores } from "app/models";

// interface LoginScreenProps extends NativeStackScreenProps<AppStackParamList, "Login"> {}

// export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {

//   // const navigation = useNavigation()

//   // Destructure the authenticationStore object from useStores
//   const { authenticationStore } = useStores()

//   // Define the state variables for email and password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Define the handler for updating email
//   const handleEmailChange = (text) => {
//     setEmail(text);
//   };

//   // Define the handler for updating password
//   const handlePasswordChange = (text) => {
//     setPassword(text);
//   };

//   // Define the handler for logging in the user
//   const handleLogin = async () => {
//     try {
//       // Use the login action from the authentication store
//       await authenticationStore.login(email, password);

//       // Navigate to the home screen if successful
//       navigation.navigate("Home");
//     } catch (error) {
//       // Show an alert if there is an error
//       alert(error.message);
//     }
//   };

//   // Define the handler for navigating to the register screen
//   const handleRegister = () => {
//     navigation.navigate("Register");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Display the inputs for email */}
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={handleEmailChange}
//       />
//       {/* Display the inputs for password */}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={handlePasswordChange}
//         secureTextEntry={true}
//       />
//       {/* Display the login button */}
//       <Button title="Login" color="#32cd32" onPress={handleLogin} />
//       {/* Display the tagline for sign up */}
//       <Text style={styles.tagline}>
//         New to Taxi App?{' '}
//         {/* Use navigation.navigate to go to register screen */}
//         <Text style={styles.link} onPress={handleRegister}>
//           Sign Up
//         </Text>
//       </Text>
//     </View>
//   )
// })

// // Define the styles for the screen
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#000",
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//   },
//   tagline: {
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   link: {
//     color: '#0000ff',
//     textDecorationLine: 'underline',
//     marginVertical: 10,
//   },
// })
