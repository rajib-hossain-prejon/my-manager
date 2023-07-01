import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import defaultStyles from "../config/styles";

const SearchBar = ({  onSearch, width = "90%", ...otherProps  }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
   
    <View style={[styles.container, { width }]}>
     
    
        <MaterialCommunityIcons
          name='magnify'
          size={20}
          color={defaultStyles.colors.secondary}
          style={styles.icon}
        />
     
     <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    borderColor: defaultStyles.colors.secondary,
    borderWidth: 0.8,
    padding: 12,
    marginLeft: 'auto', 
    marginRight: 'auto',
    marginTop: 1,
    marginBottom: 20,
    
     
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;
