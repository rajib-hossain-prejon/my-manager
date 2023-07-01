import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

function AppScrollView({children}) {
// return <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>;
return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
container: {
 flexGrow: 1
},
});

export default AppScrollView;
