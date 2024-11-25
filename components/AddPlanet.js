import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import config from '../config';

export default function AddPlanet({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [moons, setMoons] = useState('');
  const [moonNames, setMoonNames] = useState('');

  const handleSubmit = () => {
    const newPlanet = {
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(',').map(name => name.trim())
    };

    fetch(`${config.backendUrl}/planets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlanet)
    }).then(() => navigation.navigate('PlanetList'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Lunas</Text>
      <TextInput style={styles.input} placeholder="Lunas" value={moons} onChangeText={setMoons} keyboardType="numeric" />
      <Text style={styles.label}>Nombres de las Lunas (separados por comas)</Text>
      <TextInput style={styles.input} placeholder="Nombres de las Lunas" value={moonNames} onChangeText={setMoonNames} />
      <Button title="Agregar Planeta" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10
  }
});