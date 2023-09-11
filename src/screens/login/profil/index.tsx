import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hook';
import { logoutUser } from '../../../lib/redux/user/userReducer';
import { storeData } from '../../../lib/helpers/utils/asyncStorage';
import { config } from '../../../../config';
import { removeStoreData } from '../../../lib/helpers/utils/asyncStorage';

export default function Profil() {

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  return (
    <View style={styles.container}>
        <Text>Profil</Text>
        <TouchableOpacity
          onPress={()=>{
            dispatch(logoutUser(null))
            removeStoreData(config.storageTokenKey)
          }}
        >
          <Text>Deconnexion</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
  });