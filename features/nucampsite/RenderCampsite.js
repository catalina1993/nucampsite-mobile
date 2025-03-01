import { StyleSheet, Text, View } from "react-native";
import { Card, Icon } from "react-native-elements";

const RenderCampsite = (props) => {
  const { campsite, isFavorite, markFavorite } = props;

  if (!campsite) {
    return <View />;
  }

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Card.Image source={campsite.image} style={styles.image} />
        <View style={styles.textOverlay}>
          <Text style={styles.campsiteName}>{campsite.name}</Text>
        </View>
      </View>
      <Text style={{ margin: 20 }}>{campsite.description}</Text>
      <Icon
        name={isFavorite ? "heart" : "heart-o"}
        type="font-awesome"
        color="#f50" // Orange color for favorite icon
        raised
        reverse
        onPress={markFavorite} // Toggle favorite when clicked
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200, // Adjust as needed
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
});

export default RenderCampsite;
