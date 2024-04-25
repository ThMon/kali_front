import React from 'react'
import { StyleSheet } from 'react-native';
import MaskInput , { Masks }from 'react-native-mask-input';

export default function DateField( 
    {
        value,
        onChangeText,
        placeholder = 'dd/mm/yyyy',
        style = {},
        onFocus=()=>{},
        onBlur=()=>{}
    }
     : 
    {
        value: string,
        onChangeText: (value: string)=>void,
        placeholder?: string,
        style?: any,
        onFocus?: ()=>void,
        onBlur?: ()=>void
    }
    ) {
    let myMask = Masks.DATE_DDMMYYYY;
    
    switch(placeholder) {
        case 'dd/mm/yyyy':
            myMask = Masks.DATE_DDMMYYYY
        break;
        
        case 'yyyy/mm/dd':
            myMask = Masks.DATE_YYYYMMDD
        break;
    }

    return (
        <MaskInput
            placeholder={placeholder}
            mask={myMask}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            style={{...styles.inputStyle, ...style}}
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