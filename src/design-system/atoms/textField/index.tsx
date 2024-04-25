import React, { ReactElement } from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default function TextField( 
    {
        value,
        onChangeText,
        placeholder = '',
        style = {},
        secureTextEntry=false,
    }
     : 
    {
        value: string,
        onChangeText: (value: string)=>void,
        placeholder?: string,
        style?: any,
        secureTextEntry?: boolean
    }
    ) {
  return (
    <TextInput
        style={{...styles.inputStyle, ...style}}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
    />
  )
}


const styles = StyleSheet.create({
    inputStyle: {
        width: 280,
        height: 50,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 12,
        margin: 12,
        padding: 12
    }
  });