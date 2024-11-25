import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlanetList from './components/PlanetList';
import PlanetDetails from './components/PlanetDetails';
import AddPlanet from './components/AddPlanet';
import EditPlanet from './components/EditPlanet';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlanetList">
        <Stack.Screen name="PlanetList" component={PlanetList} options={{ title: 'Lista de Planetas' }} />
        <Stack.Screen name="PlanetDetails" component={PlanetDetails} options={{ title: 'Detalles del Planeta' }} />
        <Stack.Screen name="AddPlanet" component={AddPlanet} options={{ title: 'Agregar Planeta' }} />
        <Stack.Screen name="EditPlanet" component={EditPlanet} options={{ title: 'Editar Planeta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}