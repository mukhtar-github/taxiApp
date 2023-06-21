import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackParamList } from "app/navigators"
import { useStores } from "app/models"
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

interface RegisterScreenProps extends NativeStackScreenProps<AppStackParamList, "Register"> {}

type ReactNode = /*unresolved*/ any

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen({ navigation }) {

  // Destructure the authenticationStore object from useStores
  const { authenticationStore } = useStores()

  // Define the validation schema for the register form using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is not valid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password must match password'),
  });

  // Define the handler for registering the user
  const handleRegister = async (values) => {
    try {
      // Use the register action from the authentication store
      await authenticationStore.register(values.name, values.email, values.password);

      // Navigate to the home screen if successful
      navigation.navigate("Home");
    } catch (error) {
      // Show an alert if there is an error
      alert(error.message);
    }
  };

  // Define the handler for navigating to the login screen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Wrap the form elements inside a <Formik> component */}
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            {/* Display the inputs for name */}
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {/* Display the error message for name */}
            {errors.name && <Text style={styles.error}>{errors.name as ReactNode}</Text>}
            {/* Display the inputs for email */}
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
            {/* Display the inputs for confirm password */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            {/* Display the error message for confirm password */}
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword as ReactNode}</Text>}
            {/* Display the register button */}
            <Button title="Register" color="#32cd32" onPress={(event) => handleSubmit()} />
          </>
        )}
      </Formik>
      {/* Display the tagline for login */}
      <Text style={styles.tagline}>
        Already have an account?{' '}
        {/* Use navigation.navigate to go to login screen */}
        <Text style={styles.link} onPress={handleLogin}>
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
