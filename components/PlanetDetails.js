import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import config from '../config';

export default function PlanetDetails({ route, navigation }) {
  const { planet } = route.params;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.name}>{planet.name}</Text>
      <Text style={styles.description}>{planet.description}</Text>
      <Text style={styles.moons}>Lunas: {planet.moons}</Text>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={styles.moonNames}>Lunas:</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {planet.moon_names.map((moon, index) => (
            <Text key={index} style={styles.moonItem}>{moon}</Text>
          ))}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => navigation.navigate('EditPlanet', { planet })} />
        <Button title="Eliminar" onPress={() => {
          fetch(`${config.backendUrl}/planets/${planet.id}`, { method: 'DELETE' })
            .then(() => navigation.navigate('PlanetList'));
        }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  moons: {
    fontSize: 16,
    marginBottom: 10
  },
  moonNames: {
    fontSize: 16,
    marginBottom: 10
  },
  dropdownHeader: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10
  },
  dropdown: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 20
  },
  moonItem: {
    fontSize: 16,
    paddingVertical: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20
  }
});