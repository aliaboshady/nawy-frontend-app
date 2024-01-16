import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Apartment } from '../types/index';
import ApartmentCard from './ApartmentCard';

export default function ApartmentsSection() {
  const API_Apartments = 'http://10.0.2.2:5000/apartment';
  const [apartmentsData, setApartmentsData] = useState<Apartment[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function fetchData() {
    try {
      setIsRefreshing((isRefreshingCurrent) => true);
      const response = await fetch(API_Apartments);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: Apartment[] = await response.json();

      setApartmentsData(data);
      setIsRefreshing((isRefreshingCurrent) => false);
    } catch (error) {
      setIsRefreshing((isRefreshingCurrent) => false);
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onPullDown() {
    fetchData();
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullDown} />
      }
    >
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
