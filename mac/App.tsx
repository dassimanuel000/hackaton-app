import React, { useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, Alert, ActivityIndicator, Modal, TextInput, Image } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import axios from 'axios';
import { User } from '../api/database/User';

NfcManager.start();

const App = () => {
  const [nfcToken, setNfcToken] = useState<string | null>(null);
  const [isReading, setIsReading] = useState<boolean>(false);
  
  const [isReadingUser, setIsReadingUser] = useState<boolean>(false);

  const initialUserState: User = {
    id: '',
    name: '',
    email: '',
    iat: '',
    exp: '',
    role: '',
    token: ''
  };
  const [user, setUser] = useState<User>(initialUserState);

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://51.83.77.248:8090/users', user);
      Alert.alert('Response', response.data.message);
      setIsReadingUser(false);
    } catch (error) {
      console.error(error);
      setUser(initialUserState);
      Alert.alert('Error', 'Failed to add user');
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setUser(prevState => ({ ...prevState, [field]: value }));
  };

  const readNfc = async () => {
    setIsReading(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage) {
        const ndefRecord = tag.ndefMessage[0];
        const decoded = Ndef.text.decodePayload(ndefRecord.payload);
        setNfcToken(decoded);
        console.log(decoded);
        //Alert.alert('NFC Token Read', decoded);
        sendNfcToken(decoded)
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      setIsReading(false);
      NfcManager.cancelTechnologyRequest();
    }
  };

  const sendNfcToken = async (decoded: string) => {
    console.log(decoded)
    try {
      const response = await axios.post('http://51.83.77.248:8090/card', { email: decoded });
      console.log('file job delete')
      Alert.alert('Response', response.data.status);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send NFC token');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://i.ibb.co/pKmQ1Cp/image.png' }} 
        style={styles.modalImage}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>NFC Reader App</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Read NFC Card" onPress={readNfc} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Send NFC Token" />
      </View>
      {nfcToken && <Text style={styles.tokenText}>NFC Token: {nfcToken}</Text>}
      <View style={styles.buttonContainer}>
        <Button title="Add User here" onPress={() => setIsReadingUser(true)} />
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isReading}
        onRequestClose={() => setIsReading(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Image
              source={{ uri: 'https://i.ibb.co/pKmQ1Cp/image.png' }} 
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Please place your NFC card near the device...</Text>
          </View>
        </View>
      </Modal>


      <Modal
        transparent={true}
        animationType="fade"
        visible={isReadingUser}
        onRequestClose={() => setIsReadingUser(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Add User</Text>
            <TextInput
              style={styles.input}
              placeholder="Token NFC CARD"
              onChangeText={value => handleInputChange('id', value)}
              value={user.id}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={value => handleInputChange('name', value)}
              value={user.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={value => handleInputChange('email', value)}
              value={user.email}
            />
            <TextInput
              style={styles.input}
              placeholder="IAT"
              onChangeText={value => handleInputChange('iat', value)}
              value={user.iat}
            />
            <TextInput
              style={styles.input}
              placeholder="EXP"
              onChangeText={value => handleInputChange('exp', value)}
              value={user.exp}
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              onChangeText={value => handleInputChange('role', value)}
              value={user.role}
            />
            <TextInput
              style={styles.input}
              placeholder="Token"
              onChangeText={value => handleInputChange('token', value)}
              value={user.token}
            />
            <Button title="Submit" onPress={handleAddUser} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  tokenText: {
    marginTop: 20,
    fontSize: 18,
    color: '#007bff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default App;