// AppLink.js
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

const AppLink = ({ url, children }) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Cannot open URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', paddingVertical: 'auto'}} onPress={handlePress}>
      <AppText style={{color: colors.warning}} >{children}</AppText>
      
    </TouchableOpacity>
  );
};

export default AppLink;
