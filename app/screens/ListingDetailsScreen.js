import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppScrollView from "../components/AppScrollView";
import AppText from "../components/AppText";
import colors from "../config/colors";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <AppScrollView>
      <Image style={styles.image} source={{ uri: listing.images[0]}} />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.name}</AppText>
        <AppText style={styles.infoText}>Phone:</AppText>
        <AppText style={styles.infoDescription}>{listing.phone}</AppText>
        {listing.height && (
          <>
            <AppText style={styles.infoText}>Height:</AppText>
            <AppText style={styles.infoDescription}>{listing.height}</AppText>
          </>
        )}
        {listing.weight && (
          <>
            <AppText style={styles.infoText}>Weight:</AppText>
            <AppText style={styles.infoDescription}>{listing.weight}</AppText>
          </>
        )}
        {listing.email && (
          <>
            <AppText style={styles.infoText}>Email:</AppText>
            <AppText style={styles.infoDescription}>{listing.email}</AppText>
          </>
        )}
        {listing.address && (
          <>
            <AppText style={styles.infoText}>Address:</AppText>
            <AppText style={styles.infoDescription}>{listing.address}</AppText>
          </>
        )}
        {listing.description && (
          <>
            <AppText style={styles.infoText}>Description:</AppText>
            <AppText style={styles.infoDescription}>{listing.description}</AppText>
          </>
        )}
      </View>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
    color: colors.secondary,
  },
  infoDescription: {
    fontSize: 18,
    paddingLeft: 5,
    textAlign: 'justify',
    marginBottom: 10,
    color: colors.dark,
  }
});

export default ListingDetailsScreen;
