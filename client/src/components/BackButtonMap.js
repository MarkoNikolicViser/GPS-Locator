import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    top: 15 + getStatusBarHeight(),
    left: 30,
    width: 24,
    height: 24,
    // margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
})
