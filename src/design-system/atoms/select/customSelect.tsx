import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function CustomSelect({selected, list, onSelectValue}: {selected: {name: string, value: string | number}, list: {name: string, value: string | number}[], onSelectValue: (item:{name: string, value: string | number})=>void}) {
  const [visible, setVisible] = useState(false)
  return (
    <View style={styles.container}>
        <TouchableOpacity 
          style={styles.selected}
          onPress={()=>{
            setVisible(!visible)
          }}
        >
            <Text>{selected.name}</Text>
        </TouchableOpacity>
        {visible && <View style={styles.listing}>
            {list.map((item)=>{
              return (
                <TouchableOpacity
                  onPress={()=>{
                    onSelectValue(item)
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )
            })}
        </View>}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: 280,
      maxHeight: 60,
      margin: 12,
      position: 'relative',

    },
    selected: {
      width: 280,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 12,
      padding: 12,
  
    },
    listing: {
      width: 280,
      borderWidth: 1,
      borderColor: "gray",
      padding: 12,
      position: "absolute",
      top: 45,
      zIndex: 20
    }
  });