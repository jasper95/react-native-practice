import React from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { locationSelector } from '../../shared/redux/auth/selector'
import useQuery from '../../shared/hooks/useQuery'
import { ItemResponse, WeatherResponse } from './model'
import RowItem from './RowItem'
import styles from './styles'

const appId='eaa337e7cbe2e3e2961806eeaac157b5'

function GridHeader() {
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
const keyExtractor = (item: ItemResponse) => item.dt.toString()
function Weather() {
  const locationData = useSelector(locationSelector)
  const { location } = locationData
  const [queryState]= useQuery<WeatherResponse>({
    url: `/data/2.5/forecast?lat=${location?.lat}&lon=${location?.lng}&cnt=10&APPID=${appId}`,
    baseURL: 'https://api.openweathermap.org'},
    {
      initialData: { list: [] },
      skip: !Boolean(location?.lng && location?.lng)
    }
  )
  const { data } = queryState
  return (
    <SafeAreaView style={{flex:1}}>
      <GridHeader/>
      <FlatList
        data={data.list}
        renderItem={RowItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  )
}


export default Weather