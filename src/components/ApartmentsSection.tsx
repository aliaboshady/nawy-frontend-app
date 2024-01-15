import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Apartment } from '../types/index';
import ApartmentCard from './ApartmentCard';

export default function ApartmentsSection() {
  const API_Apartments = 'http://10.0.2.2:5000/apartment';
  const [apartmentsData, setApartmentsData] = useState<Apartment[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_Apartments);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: Apartment[] = await response.json();

        setApartmentsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {apartmentsData.map((apartment) => (
        <ApartmentCard key={apartment.ApartmentID} apartment={apartment} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignContent: 'center',
  },
});
