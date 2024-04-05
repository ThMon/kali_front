import React, {ReactElement} from 'react'
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { title2 } from '../../../styles/global/text';

export default function googleButton({
    onPress,
    title,
}:{
    onPress: ()=>void,
    title: string,
}) {


  return (
    <TouchableOpacity 
        style={{...styles.button}}
        onPress={onPress}
    >
        <Image source={require('../../../../assets/google_logo.png')} style={styles.img}/>
        <Text style={{...{color: "black", marginLeft: 10}, ...title2}}>
            
            {title}
        </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button: {
      width: 280,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      margin: 12,
      borderRadius: 12,
      borderColor: "black",
      borderWidth: 2,
      flexDirection: "row",
      backgroundColor: "white"

    },
    img: {
        width: 20,
        height: 20,
    }
});
