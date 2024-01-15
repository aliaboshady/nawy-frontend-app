import { StyleSheet, View } from 'react-native';
import Hero from './src/components/Hero';
import ApartmentsSection from './src/components/ApartmentsSection';

export default function App() {
  return (
    <View style={styles.container}>
      <Hero />
      <ApartmentsSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
