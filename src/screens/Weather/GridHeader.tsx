import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { WidthContext } from './context'

function GridHeader() {
  const width = useContext(WidthContext)
  return (
    <View style={styles.header}>
      <Text style={{flex: 4}}>Date</Text>
      <Text style={{ flex: 4}}>Temperature</Text>
      {width !== 0 && (width < 320) && (
        <>
          <Text style={{ flex: 3}}>Description</Text>
          <Text style={{ flex: 1}}>Main</Text>
          <Text style={{ flex: 2}}>Pressure</Text>
          <Text style={{ flex: 2}}>Humidity</Text>
        </>
      )}
    </View>
  )
}

export default GridHeader