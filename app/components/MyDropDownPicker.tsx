import * as React from "react"
import DropDownPicker, { ValueType } from "react-native-dropdown-picker"
//import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
// import { observer } from "mobx-react-lite"
// import { colors, typography } from "app/theme"
// import { Text } from "app/components/Text"

type SetStateCallback<T> = (prevState: T) => T;

export interface MyDropDownPickerProps<T extends ValueType> {
  items: { label: string; value: T }[];
  value: T | T[];
  setValue: (callback: SetStateCallback<any>) => void;
  containerStyle: { height: number };
  style: { height: number; borderWidth: number; borderColor: string; flex: number };
  multiple?: boolean;
}

export const MyDropDownPicker: React.FC<MyDropDownPickerProps<ValueType>> = ({
  items,
  value,
  setValue,
  containerStyle,
  style,
  multiple,
}) => {
  return (
    <MyDropDownPicker
      items={items}
      value={value}
      setValue={setValue}
      containerStyle={containerStyle}
      style={style}
      multiple={true}
    />
  );
};

