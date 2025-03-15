import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("userinfo")
      .then((userdata) => {
        if (userdata) {
          const userinfo = JSON.parse(userdata);
          setUsername(userinfo.username);
          setPassword(userinfo.password);
          setRemember(true);
        }
      })
      .catch((error) => console.log("Could not retrieve user info", error));
  }, []);

  const handleLogin = async () => {
    console.log("username:", username);
    console.log("password:", password);
    console.log("remember:", remember);

    try {
      if (remember) {
        await SecureStore.setItemAsync(
          "userinfo",
          JSON.stringify({ username, password })
        );
      } else {
        await SecureStore.deleteItemAsync("userinfo");
      }
    } catch (error) {
      console.log("Could not save/delete user info", error);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Username"
        leftIcon={{ type: "font-awesome", name: "user-o" }}
        onChangeText={(text) => setUsername(text)}
        value={username}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "key" }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        containerStyle={styles.formInput}
        leftIconContainerStyle={styles.formIcon}
      />
      <CheckBox
        title="Remember Me"
        center
        checked={remember}
        onPress={() => setRemember(!remember)}
        containerStyle={styles.formCheckbox}
      />
      <View style={styles.formButton}>
        <Button onPress={handleLogin} title="Login" color="#5637DD" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formIcon: {
    marginRight: 10,
  },
  formInput: {
    padding: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
  },
});

export default LoginScreen;
