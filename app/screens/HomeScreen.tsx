import React, { FC, useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { AppStackParamList } from "app/navigators"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useStores } from "app/models"
import { View, Text, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react-lite";
import { onSnapshot, applySnapshot } from "mobx-state-tree";
import { bookingStore } from "../models/BookingStore";
import { useNavigation } from "@react-navigation/native";

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

export const HomeScreen: FC<NativeStackScreenProps<AppStackParamList, "Home">> = observer(({ navigation }) => {
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
    initialValues: booking,
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
        <Text style={styles.label}>From City</Text>
        <Picker
          selectedValue={formik.values.fromCity}
          onValueChange={(itemValue) =>
            formik.setFieldValue("fromCity", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["New York", "Boston", "Chicago", "Los Angeles"].map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {formik.errors.fromCity && (
          <Text style={styles.error}>{formik.errors.fromCity}</Text>
        )}
        <Text style={styles.label}>From Location</Text>
        <Picker
          selectedValue={formik.values.fromLocation}
          onValueChange={(itemValue) =>
            formik.setFieldValue("fromLocation", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["Times Square", "Central Park", "Empire State Building", "Brooklyn Bridge"].map(
            (item) => (
              <Picker.Item key={item} label={item} value={item} />
            )
          )}
        </Picker>
        {formik.errors.fromLocation && (
          <Text style={styles.error}>{formik.errors.fromLocation}</Text>
        )}
        <Text style={styles.label}>To City</Text>
        <Picker
          selectedValue={formik.values.toCity}
          onValueChange={(itemValue) =>
            formik.setFieldValue("toCity", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["New York", "Boston", "Chicago", "Los Angeles"].map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {formik.errors.toCity && (
          <Text style={styles.error}>{formik.errors.toCity}</Text>
        )}
        <Text style={styles.label}>To Location</Text>
        <Picker
          selectedValue={formik.values.toLocation}
          onValueChange={(itemValue) =>
            formik.setFieldValue("toLocation", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["Harvard Square", "Fenway Park", "Freedom Trail", "Boston Common"].map(
            (item) => (
              <Picker.Item key={item} label={item} value={item} />
            )
          )}
        </Picker>
        {formik.errors.toLocation && (
          <Text style={styles.error}>{formik.errors.toLocation}</Text>
        )}
        <Text style={styles.label}>Vehicle Type</Text>
        <Picker
          selectedValue={formik.values.vehicleType}
          onValueChange={(itemValue) =>
            formik.setFieldValue("vehicleType", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["Car", "Bus", "Train"].map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {formik.errors.vehicleType && (
          <Text style={styles.error}>{formik.errors.vehicleType}</Text>
        )}
        <Text style={styles.label}>Seat Number</Text>
        <Picker
          selectedValue={formik.values.seatNumber}
          onValueChange={(itemValue) =>
            formik.setFieldValue("seatNumber", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {[1, 2, 3, 4].map((item) => (
            <Picker.Item key={item} label={`${item}`} value={item} />
          ))}
        </Picker>
        {formik.errors.seatNumber && (
          <Text style={styles.error}>{formik.errors.seatNumber}</Text>
        )}
        <Text style={styles.label}>Departure Date</Text>
        <Picker
          selectedValue={formik.values.departureDate}
          onValueChange={(itemValue) =>
            formik.setFieldValue("departureDate", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["2022-01-31", "2022-02-01", "2022-02-02", "2022-02-03"].map(
            (item) => (
              <Picker.Item key={item} label={item} value={item} />
            )
          )}
        </Picker>
        {formik.errors.departureDate && (
          <Text style={styles.error}>{formik.errors.departureDate}</Text>
        )}
        <Text style={styles.label}>Departure Time</Text>
        <Picker
          selectedValue={formik.values.departureTime}
          onValueChange={(itemValue) =>
            formik.setFieldValue("departureTime", itemValue)
          }
          mode="dropdown"
          style={styles.picker}
        >
          {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"].map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
        {formik.errors.departureTime && (
          <Text style={styles.error}>{formik.errors.departureTime}</Text>
        )}
      </View>
      <View style={{ backgroundColor: "#3498db" }}>
      <Button
        title="Book Now"
        onPress={(event) => formik.handleSubmit()}
      />
      </View>
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#3498db",
  },
});


