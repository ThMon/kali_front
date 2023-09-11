import React, { useState, useEffect, ReactElement } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';
  

export default function Card({
    children, 
    toggleBottomNavigationView, 
    visible,
    closeBottomView,
    height
}: {
    children: ReactElement, 
    toggleBottomNavigationView: ()=>void, 
    visible: boolean,
    closeBottomView: ()=>void,
    height: number
}) {
    
    return (
        <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
            >
               <GestureHandlerRootView>
                <PanGestureHandler onGestureEvent={(event)=>{
                    if(event.nativeEvent.translationY > 100) {
                        closeBottomView()
                    }
                }}>
                    <Animated.View style={[styles.bottomNavigationView, {height}]}>
                        <View
                            style={styles.blackPill}
                        >

                        </View>
                        {children}
                    </Animated.View>
                </PanGestureHandler>
                </GestureHandlerRootView>
            </BottomSheet>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    bottomNavigationView: {
      backgroundColor: 'white',
      width: '100%',
      padding: 24,
      alignItems: 'center',
    },
    blackPill: {
        width: 40,
        height: 10,
        backgroundColor: "black",
        borderRadius: 10,
        marginBottom: 24
    }
  });