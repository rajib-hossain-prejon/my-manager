import React from "react";
import { Image, StyleSheet, TouchableHighlight, View } from "react-native";


import colors from "../../config/colors";
import Text from "../Text";

function TouchableListItem({
  color,
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    
      <TouchableHighlight underlayColor={colors.light} onPress={onPress} style={styles.touchableContainer} >
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={[styles.title, {color}]} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
            
          </View>
          
          
        
        </View>
        
      </TouchableHighlight>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    
   
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
   fontSize: 17,
    fontWeight: 'bold',
  },
   touchableContainer: {
    paddingVertical: 0, // Remove vertical padding
  },
});

export default TouchableListItem;
