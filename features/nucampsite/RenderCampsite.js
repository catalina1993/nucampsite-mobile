import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-elements";

const RenderCampsite = ({ campsite }) => {
  if (campsite) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={campsite.image} />

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {campsite.name}
          </Text>
        </View>

        <Text style={{ margin: 20 }}>{campsite.description}</Text>
      </Card>
    );
  }
  return <View />;
};

export default RenderCampsite;
