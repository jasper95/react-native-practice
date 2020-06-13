import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Login from './screens/Login'
import Weather from './screens/Weather'
import Home from './screens/Home'
import { useDispatch, useSelector } from 'react-redux';
import { sessionRequest, getLocation } from './shared/redux/auth/reducer';
import { authSelector } from './shared/redux/auth/selector';

const Tab = createBottomTabNavigator()

const SplashScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
    </View>
  );
};

function Root() {
  const dispatch = useDispatch()
  const auth = useSelector(authSelector)
  useEffect(triggerSessionRequests, [])
  if (auth.sessionLoading || !auth.sessionRequested) {
    return (
      <SplashScreen />
    )
  }
  return (
    <View style={styles.main}>
      <NavigationContainer
      >
        <Tab.Navigator>
          {!auth.user && <Tab.Screen name='Login' component={Login}/>}
          {auth.user && <Tab.Screen name='Home' component={Home}/>}
          <Tab.Screen name='Weather' component={Weather}/>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )

  function triggerSessionRequests() {
    dispatch(sessionRequest())
    dispatch(getLocation())
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default Root