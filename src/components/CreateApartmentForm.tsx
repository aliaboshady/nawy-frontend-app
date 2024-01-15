import { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import ModalBotton from './ModalBotton';

export default function CreateApartmentForm() {
  const API_CreateApartments = 'http://10.0.2.2:5000/apartment/create';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(10000);
  const [size, setSize] = useState(50);
  const [countBeds, setCountBeds] = useState(1);
  const [countToilets, setCountToilets] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function toggleForm() {
    setIsFormOpen((isFormOpenCurrent) => !isFormOpenCurrent);
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setAddress('');
    setPrice(10000);
    setSize(50);
    setCountBeds(1);
    setCountToilets(1);
    setIsCreating(false);
    setIsFormOpen(false);
  }

  async function handleSubmit() {
    if (
      !title ||
      !description ||
      !address ||
      price < 0 ||
      size < 0 ||
      countBeds < 0 ||
      countToilets < 0
    ) {
      Alert.alert(
        'Add all missing information and put numbers that are more than 0!!!'
      );
      return;
    }

    setIsCreating((isCreatingCurrent) => true);

    const newApartment = {
      Title: title,
      Description: description,
      Address: address,
      Price: price,
      Size: size,
      CountBeds: countBeds,
      CountToilets: countToilets,
    };

    const res = await fetch(API_CreateApartments, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newApartment),
    });

    toggleForm();
    resetForm();

    if (res.ok) {
      setIsCreating((isCreatingCurrent) => false);
      //REFRESH
    }
  }

  return (
    <View>
      <Modal animationType="fade" visible={isFormOpen} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ModalBotton type="closes" onClick={toggleForm} />

            <Text style={styles.modalTitle}>Create a new Apartment</Text>

            <View style={styles.form}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>

              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputText}>Price</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={`${price}`}
                  onChangeText={(text) => setPrice(Number(text))}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputText}>Size</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={`${size}`}
                  onChangeText={(text) => setSize(Number(text))}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputText}>Beds</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={`${countBeds}`}
                  onChangeText={(text) => setCountBeds(Number(text))}
                />
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputText}>Toilets</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={`${countToilets}`}
                  onChangeText={(text) => setCountToilets(Number(text))}
                />
              </View>
            </View>

            <View style={styles.submitButtonContainer}>
              <Pressable
                disabled={isCreating}
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Add Apartment</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {!isFormOpen ? <ModalBotton type="opens" onClick={toggleForm} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: 350,
    height: 700,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },

  form: {
    alignItems: 'center',
  },

  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 4,
    padding: 8,
  },

  inputRow: {
    marginVertical: 12,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputText: {
    width: '20%',
    fontSize: 15,
  },

  submitButtonContainer: {
    alignItems: 'center',
  },

  submitButton: {
    backgroundColor: '#1a2653',
    marginTop: 20,
    width: 220,
    borderRadius: 10,
  },

  submitButtonText: {
    color: 'white',
    fontSize: 25,
    paddingVertical: 12,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});
