import React, { FC, useState, useEffect } from "react";
import { MyDropDownPicker } from "../components/MyDropDownPicker";
import { AppStackParamList } from "app/navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react-lite";
import { onSnapshot, applySnapshot } from "mobx-state-tree";
import { bookingStore } from "../models/BookingStore";
// import { useStores } from "app/models";
// import { useNavigation } from "@react-navigation/native";

// Define a validation schema for the form
const PickerSchema = Yup.object().shape({
  fromCity: Yup.string().required("Select From City"),
  fromLocation: Yup.string().required("Select From Location"),
  toCity: Yup.string().required("Select To City"),
  toLocation: Yup.string().required("Select To Location"),
  vehicleType: Yup.string().required("Select Vehicle Type"),
  seatNumber: Yup.number().min(1).max(4).required("Select Seat Number"),
  departureDate: Yup.date().required("Select Departure Date"),
  departureTime: Yup.string().required("Select Departure Time"),
});

export const HomeScreen: FC<NativeStackScreenProps<
  AppStackParamList,
  "Home"
>> = observer(({ navigation }) => {
  // Create a local observable copy of the booking store
  const localStore = useLocalObservable(() => bookingStore);

  // Sync the local store with the original store using snapshots
  useEffect(() => {
    // Subscribe to changes in the original store and apply them to the local store
    const disposer = onSnapshot(bookingStore, (snapshot) => {
      applySnapshot(localStore, snapshot);
    });
    // Unsubscribe when component unmounts
    return () => disposer();
  }, []);

  // Get the booking object from the local store
  const { booking } = localStore;

  // Use formik to create a form with the booking object as initial values
  const formik = useFormik({
    initialValues: {
      fromCity: "New York", // Set the initial value for fromCity as an array of values
      fromLocation: "",
      toCity: "",
      toLocation: "",
      vehicleType: "",
      seatNumber: 0,
      departureDate: new Date(),
      departureTime: "",
    },
    validationSchema: PickerSchema,
    onSubmit: async (values) => {
      // Save the values to Firestore using the local store action
      const result = await localStore.saveBooking();
      // Navigate to the confirmation screen if successful
      if (result) {
        navigation.navigate("Confirmation");
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Ride</Text>
      <View style={styles.form}>
        {/* Apply the formControl style to each View component that wraps a label and a dropdown */}
        <View style={styles.formControl}>
          <Text style={styles.label}>From City</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={["New York", "Boston", "Chicago", "Los Angeles"].map((item) => ({
              label: item,
              value: item,
            }))}
            value={formik.values.fromCity} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.fromCity;
              const newValue = callback(currentValue);
              formik.setFieldValue("fromCity", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.fromCity && (
          <Text style={styles.error}>{formik.errors.fromCity}</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>From Location</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={[
              "Times Square",
              "Central Park",
              "Empire State Building",
              "Brooklyn Bridge",
            ].map((item) => ({
              label: item,
              value: item,
            }))}
            value={formik.values.fromLocation} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.fromLocation;
              const newValue = callback(currentValue);
              formik.setFieldValue("fromLocation", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.fromLocation && (
          <Text style={styles.error}>{formik.errors.fromLocation}</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>To City</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={["New York", "Boston", "Chicago", "Los Angeles"].map(
              (item) => ({
                label: item,
                value: item,
              })
            )}
            value={formik.values.toCity} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.toCity;
              const newValue = callback(currentValue);
              formik.setFieldValue("toCity", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.toCity && (
          <Text style={styles.error}>{formik.errors.toCity}</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>To Location</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={[
              "Harvard Square",
              "Fenway Park",
              "Freedom Trail",
              "Boston Common",
            ].map((item) => ({
              label: item,
              value: item,
            }))}
            value={formik.values.toLocation} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.toLocation;
              const newValue = callback(currentValue);
              formik.setFieldValue("toLocation", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.toLocation && (
          <Text style={styles.error}>{formik.errors.toLocation}</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Vehicle Type</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={["Car", "Bus", "Train"].map((item) => ({
              label: item,
              value: item,
            }))}
            value={formik.values.vehicleType} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.vehicleType;
              const newValue = callback(currentValue);
              formik.setFieldValue("vehicleType", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.vehicleType && (
          <Text style={styles.error}>{formik.errors.vehicleType}</Text>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Seat Number</Text>
          {/* Replace Picker component with DropDownPicker component and pass appropriate props */}
          <MyDropDownPicker
            items={[1, 2, 3, 4].map((item) => ({
              label: item.toString(),
              value: item,
            }))}
            value={formik.values.seatNumber} // No need to wrap in square brackets
            setValue={(callback) => {
              const currentValue = formik.values.seatNumber;
              const newValue = callback(currentValue);
              formik.setFieldValue("seatNumber", newValue);
            }}
            containerStyle={{ height: 40 }}
            style={styles.picker}
            multiple={true} // Set multiple prop to true
          />
        </View>
        {formik.errors.seatNumber && (
          <Text style={styles.error}>{formik.errors.seatNumber}</Text>
        )}
      </View>
      <Button
        title="Book Now"
        onPress={() => formik.handleSubmit()}
        disabled={!formik.isValid || !formik.dirty}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  form: {
    flex: 1,
  },
  // Add a formControl style to wrap each form element
  formControl: {
    flexDirection: "row", // Use row direction to align label and dropdown horizontally
    alignItems: "center", // Use center alignment to align label and dropdown vertically
    marginVertical: 8, // Add some vertical margin for spacing
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    flex: 2, // Use flex to make the picker take up twice as much space as the label
  },
  error: {
    fontSize: 16,
    color: "red",
    marginVertical: 8,
  },
});
