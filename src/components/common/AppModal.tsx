import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {palette} from 'src/styles';

interface Props {
  modalVisible: boolean;
  toggleModal: () => void;
}

export const AppModal: React.FC<Props> = ({modalVisible, toggleModal, children}) => {
  const {
    colors: {background, text},
  } = useTheme();
  return (
    <SafeAreaView edges={['bottom']}>
      <Modal
        isVisible={modalVisible}
        style={styles.modal}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View style={[styles.wrapper, {backgroundColor: background}]}>{children}</View>
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
    height: 200,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
  },
});
