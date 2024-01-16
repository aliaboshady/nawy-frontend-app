import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { binaryImageToURL, formatAsCurrency } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { Apartment, ApartmentImage } from '../types';

type ApartmentDetailsRouteProp = RouteProp<
  RootStackParamList,
  'ApartmentDetailsScreen'
>;

export default function ApartmentDetailsScreen() {
  const route = useRoute<ApartmentDetailsRouteProp>();
  const apartmentId = route.params.apartmentId;

  const API_Apartments = `http://10.0.2.2:5000/apartment/${apartmentId}`;
  const API_ApartmentsImages = `http://10.0.2.2:5000/apartment/images/${apartmentId}`;
  const [apartment, setApartment] = useState<Apartment | undefined>();
  const [apartmentImages, setApartmentImages] = useState<
    ApartmentImage[] | undefined
  >();
  const [imageIndex, setImageIndex] = useState(0);

  async function fetchData() {
    try {
      const responseApartmentDetails = await fetch(API_Apartments);
      const responseApartmentImages = await fetch(API_ApartmentsImages);

      if (responseApartmentDetails.ok && responseApartmentImages.ok) {
        const dataDetails: Apartment[] = await responseApartmentDetails.json();
        const dataImages: ApartmentImage[] =
          await responseApartmentImages.json();

        setApartment(dataDetails[0]);
        setApartmentImages(dataImages);
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

  function changeImage(next: boolean) {
    if (!apartmentImages) return;

    if (next) {
      if (imageIndex < apartmentImages?.length - 1) {
        setImageIndex(imageIndex + 1);
      } else {
        setImageIndex(0);
      }
    } else {
      if (imageIndex > 0) {
        setImageIndex(imageIndex - 1);
      } else {
        setImageIndex(apartmentImages?.length - 1);
      }
    }
  }

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
            {apartmentImages && apartmentImages.length > 0 ? (
              <Image
                style={styles.image}
                source={{
                  uri: binaryImageToURL(apartmentImages[imageIndex].Image),
                }}
              />
            ) : null}

            {apartmentImages && apartmentImages.length > 1 ? (
              <View style={styles.imageButtonsContainer}>
                <Pressable
                  style={styles.previousButton}
                  onPress={() => {
                    changeImage(false);
                  }}
                >
                  <Image
                    style={styles.previousImage}
                    source={require('../../assets/next.png')}
                  />
                </Pressable>
                <Pressable
                  style={styles.nextButton}
                  onPress={() => {
                    changeImage(true);
                  }}
                >
                  <Image
                    style={styles.nextImage}
                    source={require('../../assets/next.png')}
                  />
                </Pressable>
              </View>
            ) : null}
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
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },

  image: {
    flex: 1,
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

  imageButtonsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  nextButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nextImage: {
    width: 40,
    height: 40,
  },

  previousButton: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previousImage: {
    width: 40,
    height: 40,
    transform: [{ rotate: '180deg' }],
  },
});
