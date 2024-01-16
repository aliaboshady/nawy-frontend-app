import { StyleSheet, View } from 'react-native';
import ApartmentsSection from '../components/ApartmentsSection';
import CreateApartmentForm from '../components/CreateApartmentForm';
import Hero from '../components/Hero';

export default function MainScreen() {
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
