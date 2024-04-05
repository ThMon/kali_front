import React, {ReactElement} from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../styles/global/globalStyles';
import { title2 } from '../../../styles/global/text';

export default function ErrorMessage({
    message
}:{
    message: string,
}) {


  return (

        <Text style={styles.text}>
            {message}
        </Text>

  )
}


const styles = StyleSheet.create({
    text: {
        color: 'red'
    },
    
});
  