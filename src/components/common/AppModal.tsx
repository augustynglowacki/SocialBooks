import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {palette} from 'src/styles';

interface Props {
  modalVisible: boolean;
  toggleModal: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AppModal: React.FC<Props> = ({modalVisible, toggleModal, children, style}) => {
  const {
    colors: {background},
  } = useTheme();
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <Modal
        isVisible={modalVisible}
        style={styles.modal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View style={[styles.wrapper, {backgroundColor: background}, style]}>{children}</View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  wrapper: {
    position: 'absolute',
    bottom: 0,
    height: 'auto',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
  },
});
