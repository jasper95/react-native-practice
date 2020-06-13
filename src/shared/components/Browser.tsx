import React, { useRef } from 'react'
import { WebView } from 'react-native-webview'
import { Linking, View } from 'react-native';

function Browser({ route }: any) {
  const ref = useRef<WebView | null>(null)
  return (
    <View style={{flex:1}}>
      <WebView
        ref={ref}
        source={{ uri: route.params.uri}}
        onNavigationStateChange={(event) => {
          if (event.url !== route.params.uri) {
            Linking.openURL(event.url);
          }
        }}
      />
    </View>
  )
}

export default Browser