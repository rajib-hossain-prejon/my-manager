import React from "react";
import { Button, Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import * as Clipboard from 'expo-clipboard';
import colors from "../config/colors";
import Text from "./Text";

function Card({ title, subTitle, imageUrl, onPress, style, children}) {

   const copyToClipboard = async () => {
    await Clipboard.setStringAsync(subTitle);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, style]}>
       {
        imageUrl &&  <Image
          style={styles.image}
          // tint="light"
          // preview={{ uri: thumbnailUrl }}
          // uri={imageUrl}
          source={{uri: imageUrl}}
        />
       }
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {
            subTitle && <View style={{flexDirection: 'row'}}>
            <Text style={styles.infoText}>ID:</Text>
            
            <Text style={styles.infoDescription} selectable={true}>{subTitle}</Text>
            <Button title="Copy" onPress={copyToClipboard} />
          </View>
          }
          {
            children
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.secondary,
  },
  infoDescription: {
    fontSize: 16,
    paddingLeft: 5,
    textAlign: 'justify',
    marginBottom: 10,
    marginRight: 6,
    color: colors.medium,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
