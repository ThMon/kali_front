import React, {ReactElement} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native';

type selectType = { 
    data: string[] | {title: string, value: string}[],
    defaultValue: string,
    onSelect: (selectedItem: string, index?: number)=>void,
    buttonTextAfterSelection: (selectedItem: string, index?: number) =>string,
    rowTextForSelection: (item:string, index?: number) => string,
    renderDropdownIcon: (isOpened:boolean) => ReactElement,
    dropdownIconPosition: 'left' | 'right' | undefined
}

export default function Select({
    data,
    defaultValue,
    onSelect,
    buttonTextAfterSelection,
    rowTextForSelection,
    renderDropdownIcon,
    dropdownIconPosition
}: selectType) {


  return (

    <SelectDropdown
    data={data}
    defaultValue={defaultValue}
    onSelect={onSelect}
    // (selectedItem, index) => {
    //   // text represented after item is selected
    //   // if data array is an array of objects then return selectedItem.property to render after item is selected
    //   return selectedItem
    // }
    buttonTextAfterSelection={buttonTextAfterSelection}
    // (item, index) => {
    //   // text represented for each item in dropdown
    //   // if data array is an array of objects then return item.property to represent item in dropdown
    //   return item
    // }
    rowTextForSelection={rowTextForSelection}
    // isOpened => {
    //   return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
    // }
    renderDropdownIcon={renderDropdownIcon}
    dropdownIconPosition={dropdownIconPosition}
    buttonStyle={styles.dropdown2BtnStyle}
    buttonTextStyle={styles.dropdown2BtnTxtStyle}
  />

  )
}


const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    margin: 12,
    width: 280,
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
});
  