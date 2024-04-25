import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'

export default function WhiteOpacity({children}: {children: ReactElement}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
  });