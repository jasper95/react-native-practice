import { StyleSheet } from 'react-native'
const WeatherStyles = StyleSheet.create({
  header: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  columnItem: {
    flex: 1,
    // padding: 15
  },
  row: {
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
})

export default WeatherStyles