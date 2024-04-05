import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useTranslate } from '../../../services/translate/useTranslate';
import { useAppSelector } from '../../../lib/redux/hook';

export default function Home() {
  const user = useAppSelector(state => state.user);
  const translate = useTranslate()

  return (
    <View style={styles.container}>
        <Text>{translate('home_page.title', {
          name: user.infos?.firstname ?? ''
        })}</Text>
        <Text>{translate('home_page.description')}</Text>
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