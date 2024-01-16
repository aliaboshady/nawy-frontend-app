import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import ApartmentDetailsScreen from './src/screens/ApartmentDetailsScreen';

export type RootStackParamList = {
  MainScreen: undefined;
  ApartmentDetailsScreen: { apartmentId: Number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ApartmentDetailsScreen"
        component={ApartmentDetailsScreen}
        options={{ title: 'Apartment Details' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
