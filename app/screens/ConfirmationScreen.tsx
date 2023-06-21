import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AppStackParamList } from "app/navigators";
import { useStores } from "app/models";
import { View, Text, Button, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ConfirmationScreenProps extends NativeStackScreenProps<AppStackParamList, "Confirmation"> {}

export const ConfirmationScreen: FC<ConfirmationScreenProps> = observer(function ConfirmationScreen({ navigation }) {
  const { bookingStore } = useStores();

  // Get the booking object from the booking store
  const { booking } = bookingStore;

  // Define a function to handle confirmation
  const handleConfirmation = () => {
    // Navigate to the home screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation Details</Text>
      <View style={styles.row}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{booking.fromCity}</Text>
        <Text style={styles.value}>{booking.fromLocation}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>{booking.toCity}</Text>
        <Text style={styles.value}>{booking.toLocation}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Vehicle Type:</Text>
        <Text style={styles.value}>{booking.vehicleType}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Departure Date:</Text>
        <Text style={styles.value}>{booking.departureDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Departure Time:</Text>
        <Text style={styles.value}>{booking.departureTime}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price per Seat:</Text>
        <Text style={styles.value}>${booking.price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Number of Seats:</Text>
        <Text style={styles.value}>{booking.seatNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.value}>${booking.price * booking.seatNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Details:</Text>
        {/* Display the account details as a text */}
        <View style={styles.account}>
          <Text>Account Name: Mukhtar Tanimu Garba</Text>
          <Text>Account Number: 2175741056</Text>
          <Text>Bank: Zenith Bank</Text>
        </View>
      </View>
      {/* Ask the user to confirm their payment by clicking a button */}
      <View style={{ backgroundColor: "#3498db" }}>
      <Button
        title="Confirm Payment"
        onPress={handleConfirmation}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    width: 120,
  },
  value: {
    fontSize: 18,
    marginLeft: 8,
  },
  account: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#3498db",
  },
});


