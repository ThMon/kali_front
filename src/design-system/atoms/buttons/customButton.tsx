import React, { ReactElement } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../../styles/global/globalStyles";
import { title2 } from "../../../styles/global/text";

export default function CustomButton({
  onPress,
  title,
  buttonStyle,
}: {
  onPress: () => void;
  title: string;
  buttonStyle?: "basic" | "validation" | "danger" | "success";
}) {
  let colorText = "white";
  let backgroundColor = "black";
  let borderColor = "black";
  let borderWidth = 1;

  if (buttonStyle === "validation") {
    backgroundColor = colors.black;
    colorText = colors.white;
  }

  if (buttonStyle === "basic") {
    backgroundColor = colors.white;
    colorText = colors.black;
    borderColor = colors.black;
  }

  if (buttonStyle === "success") {
    backgroundColor = colors.success;
    colorText = colors.white;
    borderColor = colors.success;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor, borderColor, borderWidth },
      }}
      onPress={onPress}
    >
      <Text style={{ ...title2, ...{ color: colorText } }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 12,
    borderRadius: 12,
    position: "relative",
    zIndex: 10,
  },
});
