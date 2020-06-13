import React from 'react'
import { View, Text, Button, Linking, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { authSelector, locationSelector } from '../../shared/redux/auth/selector'
import {  unauthorize } from '../../shared/redux/auth/reducer'

function Home() {
  const auth = useSelector(authSelector)
  const locationData = useSelector(locationSelector)
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello {auth.user?.name}</Text>
      <Image style={{ height: 50, width: 50}} source={{ uri: auth.user?.picture }}/>
      <Text
        style={{ color: 'blue' }}
        onPress={() => {
          Linking.openURL(['https://github.com', auth.user?.nickname].join('/'))
        }}
      >Github</Text>
      <Text>{`Latitude: ${locationData?.location?.lat}, Longitude: ${locationData?.location?.lng}`}</Text>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(unauthorize())
        }}
      />
    </View>
  )
}

export default Home