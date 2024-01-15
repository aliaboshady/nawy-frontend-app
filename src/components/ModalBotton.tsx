import { StyleSheet, Image, Pressable } from 'react-native';

export default function ModalBotton({
  type,
  isFormOpen,
  onClick,
}: {
  type: string;
  isFormOpen: boolean;
  onClick: any;
}) {
  return (
    <Pressable style={styles.modalButton} onPress={onClick}>
      <Image
        source={require('../../assets/add_icon.png')}
        style={[
          styles.modalButtonImage,
          type === 'opens'
            ? styles.modalButtonImagePos_Closed
            : styles.modalButtonImagePos_Opened,
          type === 'opens'
            ? styles.modalButtonImage_Closed
            : styles.modalButtonImage_Opened,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalButton: {
    position: 'relative',
  },

  modalButtonImage: {
    position: 'absolute',
    width: 60,
    height: 60,
  },

  modalButtonImagePos_Closed: {
    right: 40,
    bottom: 50,
  },

  modalButtonImagePos_Opened: {
    right: 15,
    bottom: -50,
    width: 35,
    height: 35,
  },

  modalButtonImage_Opened: {
    transform: [{ rotate: '45deg' }],
  },

  modalButtonImage_Closed: {
    transform: [{ rotate: '0deg' }],
  },
});
