import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const CreateSetlistScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    // TODO: Implement setlist creation logic
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une nouvelle setlist</Text>
      <TextInput
        label="Nom de la setlist"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        mode="outlined"
        multiline
      />
      <Button
        mode="contained"
        onPress={handleCreate}
        style={styles.button}
      >
        Créer la setlist
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#6200ee',
  },
});

export default CreateSetlistScreen;
