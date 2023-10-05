import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../Text';

function ListItem({item}) {

 const {title, subTitle} = item;

return <View style={styles.container}   >
 
  <AppText style={ styles.titleText } >{title}</AppText>
  <AppText style={styles.subTitleText} >{subTitle}</AppText>

  </View>;
}

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
  },
  subTitleText: {
    fontSize: 16,
    padding: 2,
    marginBottom: 2
  },
  titleText: {
    fontSize: 16,  
    fontWeight: 'bold', 
    marginRight: 7 , 
    padding:2,
    width: 85,
  }
});

export default ListItem;
