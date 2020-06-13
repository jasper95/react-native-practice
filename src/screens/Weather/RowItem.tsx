import React from 'react'
import { View, Text} from 'react-native'
import { ItemResponse } from './model'
import styles from './styles'
import day from 'dayjs'

function RowItem({ item }: { item: ItemResponse}) {
  return (
    <View style={styles.row}>
      <Text style={styles.columnItem}>{day(item.dt_txt).format('MM/DD/YYYY')}</Text>
      <Text style={styles.columnItem}>{item.main.temp}</Text>
      <Text style={styles.columnItem}>{item.weather[0]?.description}</Text>
      <Text style={styles.columnItem}>{item.weather[0]?.main}</Text>
      <Text style={styles.columnItem}>{item.main.pressure}</Text>
      <Text style={styles.columnItem}>{item.main.humidity}</Text>
    </View>
  )
}
export default RowItem