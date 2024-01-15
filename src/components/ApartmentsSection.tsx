import { StyleSheet, View, ScrollView } from 'react-native';
import ApartmentCard from './ApartmentCard';

export default function ApartmentsSection() {
  return (
    <ScrollView style={styles.scrollView}>
      <ApartmentCard />
      <ApartmentCard />
      <ApartmentCard />
      <ApartmentCard />
      <ApartmentCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignContent: 'center',
  },
});
