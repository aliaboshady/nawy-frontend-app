import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { binaryImageToURL, formatAsCurrency } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { Apartment } from '../types';

type ApartmentDetailsRouteProp = RouteProp<
  RootStackParamList,
  'ApartmentDetailsScreen'
>;

export default function ApartmentDetailsScreen() {
  const route = useRoute<ApartmentDetailsRouteProp>();
  const apartmentId = route.params.apartmentId;

  const API_Apartments = `http://10.0.2.2:5000/apartment/${apartmentId}`;
  const [apartment, setApartment] = useState<Apartment | undefined>();

  async function fetchData() {
    try {
      const response = await fetch(API_Apartments);
      if (response.ok) {
        const data: Apartment[] = await response.json();
        setApartment(data[0]);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.outerMargin}>
      {!apartment ? (
        <ActivityIndicator
          style={styles.loadingSpinner}
          size="large"
          color="#212121"
        />
      ) : (
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: binaryImageToURL(apartment?.Image) }}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{apartment?.Title}</Text>
            <Text style={styles.address}>{apartment?.Address}</Text>
            <Text style={styles.description}>{apartment?.Description}</Text>

            <View style={styles.amenities}>
              <View>
                <Image
                  source={require('../../assets/bed.png')}
                  style={styles.leftAmenitiesImage}
                />
                <Text style={styles.leftAmenitiesText}>
                  {apartment?.CountBeds}
                </Text>
              </View>

              <View>
                <Image
                  source={require('../../assets/toilet.png')}
                  style={styles.leftAmenitiesImage}
                />
                <Text style={styles.leftAmenitiesText}>
                  {apartment?.CountToilets}
                </Text>
              </View>

              <View style={styles.rightAmenities}>
                <Text style={styles.separator}>|</Text>
                <Image
                  source={require('../../assets/size.png')}
                  style={styles.rightAmenitiesImage}
                />
                <Text style={styles.rightAmenitiesText}>
                  {apartment?.Size + ' m'}
                  <View>
                    <Text style={styles.superscriptText}>2</Text>
                    <View></View>
                  </View>
                </Text>
              </View>
            </View>

            <Text style={styles.price}>
              {formatAsCurrency(Number(apartment?.Price)) + '  EGP'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerMargin: {
    alignItems: 'center',
  },

  main: {
    width: '90%',
    height: '97%',
    marginVertical: 10,
    borderWidth: 0.2,
    borderRadius: 4,
    backgroundColor: 'white',
  },

  imageContainer: {
    width: '100%',
    height: '70%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    alignItems: 'center',
  },

  image: {
    height: '100%',
    aspectRatio: 1,
  },

  info: {
    marginHorizontal: 14,
    marginVertical: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },

  address: {
    fontSize: 14,
    color: '#999999',
  },

  description: {
    marginTop: 2,
    fontSize: 15,
    color: '#646464',
  },

  amenities: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  rightAmenities: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftAmenitiesText: {
    position: 'absolute',
    top: 1,
    left: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },

  leftAmenitiesImage: {
    width: 50,
    height: 40,
    position: 'relative',
  },

  rightAmenitiesText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#111827',
  },

  rightAmenitiesImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  separator: {
    marginRight: 15,
    fontSize: 50,
    color: '#dedede',
    textAlign: 'center',
    width: 2,
    top: -5,
  },

  superscriptText: {
    fontSize: 14,
  },

  price: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
  },

  loadingSpinner: {
    marginTop: '50%',
  },
});
