import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView, View, FlatList, Platform, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import Config from '../../config'
import { locationSelector } from '../../shared/redux/auth/selector'
import useQuery from '../../shared/hooks/useQuery'
import { ItemResponse, WeatherResponse } from './model'
import RowItem from './RowItem'
import GridHeader from './GridHeader'
import {Dimensions } from "react-native";
import { WidthContext } from './context'

const keyExtractor = (item: ItemResponse) => item.dt.toString()
function Weather() {
  const locationData = useSelector(locationSelector)
  const { location } = locationData
  const [width, setWidth]= useState<number>(0)
  useEffect(() => {
    const screenWidth = Dimensions.get('window').width
    setWidth(screenWidth)
  }, [])
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
    <SafeAreaView style={{flex:1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
      <WidthContext.Provider value={width}>
        <GridHeader/>
        <FlatList
          style={{ flex: 1}}
          data={data.list}
          renderItem={({item}) => (<RowItem item={item}/>)}
          keyExtractor={keyExtractor}
        />
      </WidthContext.Provider>
    </SafeAreaView>
  )
}


export default Weather