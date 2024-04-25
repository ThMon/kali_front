import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WhiteOpacity from '../../atoms/opacity/white';

export default function Loader() {
 return  (
    <View style={[styles.container, styles.horizontal]}>
      <WhiteOpacity>
        <ActivityIndicator size="large" color="#00ff00" />
      </WhiteOpacity> 
    </View>
  );
}  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
