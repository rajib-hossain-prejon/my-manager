import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

const AppAlertToast = ({ visible, message, success=false, failed=false, custom=false, customIcon='logout', customIconColor='danger', iconSize=60 }) => {
  const [modalVisible, setModalVisible] = React.useState(visible);

  React.useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.messageText}>{message}</Text>
          {success &&  <MaterialCommunityIcons name='check-circle' color={colors.bootstrap_success} size={iconSize} />}
          {failed && <MaterialCommunityIcons name='close-circle' color={colors.danger} size={iconSize} />}
          {custom && <MaterialCommunityIcons name={customIcon} color={colors[customIconColor]} size={iconSize} />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '70%',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppAlertToast;
