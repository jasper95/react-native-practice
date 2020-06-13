import React from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import Config from '../../config'
import { locationSelector } from '../../shared/redux/auth/selector'
import useQuery from '../../shared/hooks/useQuery'
import { ItemResponse, WeatherResponse } from './model'
import RowItem from './RowItem'
import GridHeader from './GridHeader'

const keyExtractor = (item: ItemResponse) => item.dt.toString()
function Weather() {
  const locationData = useSelector(locationSelector)
  const { location } = locationData
  const [queryState]= useQuery<WeatherResponse>({
    url: `/data/2.5/forecast?lat=${location?.lat}&lon=${location?.lng}&cnt=10&APPID=${Config.openWeatherAppId}`,
    baseURL: Config.openWeatherApiUrl},
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