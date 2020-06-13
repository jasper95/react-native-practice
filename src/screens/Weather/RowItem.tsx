import React, { useContext } from 'react'
import { View, Text} from 'react-native'
import { ItemResponse } from './model'
import styles from './styles'
import day from 'dayjs'
import { WidthContext } from './context'

function RowItem({ item }: { item: ItemResponse}) {
  const width = useContext(WidthContext)
  return (
    <View style={styles.row}>
      <Text style={{ flex: 4 }}>{day(item.dt_txt).format('MM/DD/YYYY')}</Text>
      <Text style={{ flex: 4 }}>{item.main.temp}</Text>
      {width !== 0 && (width < 320) && (
        <>
          <Text style={{ flex: 3 }}>{item.weather[0]?.description}</Text>
          <Text style={{ flex: 1 }}>{item.weather[0]?.main}</Text>
          <Text style={{ flex: 2 }}>{item.main.pressure}</Text>
          <Text style={{ flex: 2}}>{item.main.humidity}</Text>
        </>
      )}
    </View>
  )
}
export default RowItem