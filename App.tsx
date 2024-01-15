import { StyleSheet, View } from 'react-native';
import Hero from './src/components/Hero';
import ApartmentsSection from './src/components/ApartmentsSection';
import CreateApartmentForm from './src/components/CreateApartmentForm';

export default function App() {
  return (
    <View style={styles.container}>
      <Hero />
      <ApartmentsSection />
      <CreateApartmentForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
