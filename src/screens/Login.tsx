import React from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import Config from '../config'
import { loginRequest } from "../shared/redux/auth/reducer";

WebBrowser.maybeCompleteAuthSession({ skipRedirectCheck: true });

export default function App() {
  const discovery = AuthSession.useAutoDiscovery(Config.auth0Domain);
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Button
        disabled={!discovery}
        title="Log in with Auth0"
        onPress={() => {
          discovery && dispatch(loginRequest(discovery))
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
});