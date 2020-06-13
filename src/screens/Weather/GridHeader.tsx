import React from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import styles from './styles'

function GridHeader() {
  // const dimensions = useWindowDimensions && useWindowDimensions()
  return (
    <View style={styles.header}>
      <Text style={styles.columnItem}>Date</Text>
      <Text style={styles.columnItem}>Temperature</Text>
      <Text style={styles.columnItem}>Description</Text>
      <Text style={styles.columnItem}>Main</Text>
      <Text style={styles.columnItem}>Pressure</Text>
      <Text style={styles.columnItem}>Humidity</Text>
    </View>
  )
}

export default GridHeader