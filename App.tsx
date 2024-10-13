import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedScrollHeader from './AnimatedScrollHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

  useEffect(() => {
  }, [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({})

      {/* <AnimatedScrollHeader headerImage='https://picsum.photos/800/450' title='Gallery'/> */}
