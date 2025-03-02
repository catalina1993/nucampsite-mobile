import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderCampsite = ({
  campsite,
  isFavorite,
  markFavorite,
  onShowModal,
}) => {
  if (!campsite) {
    return <View />;
  }

  return (
    <Card containerStyle={styles.cardContainer}>
      <Card.Image
        source={{ uri: baseUrl + campsite.image }}
        style={styles.image}
      />
      <View style={styles.textOverlay}>
        <Text style={styles.campsiteName}>{campsite.name}</Text>
      </View>
      <Text style={{ margin: 20 }}>{campsite.description}</Text>
      <View style={styles.cardRow}>
        <Icon
          name={isFavorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          raised
          reverse
          onPress={markFavorite}
        />
        <Icon
          name="pencil"
          type="font-awesome"
          color="#5637DD"
          raised
          reverse
          onPress={onShowModal}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  campsiteName: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
});

export default RenderCampsite;
