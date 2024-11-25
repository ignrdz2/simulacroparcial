import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import config from '../config';

export default function EditPlanet({ route, navigation }) {
  const { planet } = route.params;
  const [name, setName] = useState(planet.name);
  const [description, setDescription] = useState(planet.description);
  const [moons, setMoons] = useState(planet.moons.toString());
  const [moonNames, setMoonNames] = useState(planet.moon_names.join(', '));

  const handleSubmit = () => {
    const updatedPlanet = {
      ...planet,
      name,
      description,
      moons: parseInt(moons),
      moon_names: moonNames.split(',').map(name => name.trim())
    };

    fetch(`${config.backendUrl}/planets/${planet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPlanet)
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
      <Button title="Guardar Cambios" onPress={handleSubmit} />
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