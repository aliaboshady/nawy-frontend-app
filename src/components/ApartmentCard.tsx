import { StyleSheet, View, Image, Text } from 'react-native';
import { Apartment } from '../types/index';
import { formatAsCurrency, binaryImageToURL } from '../utils/helpers';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const imageURL = binaryImageToURL(apartment.Image);

  return (
    <View style={styles.outerMargin}>
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageURL }} />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{apartment?.Title}</Text>
          <Text style={styles.address}>{apartment?.Address}</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  outerMargin: {
    alignItems: 'center',
  },

  main: {
    width: '90%',
    height: 330,
    marginVertical: 10,
    borderWidth: 0.2,
    borderRadius: 4,
    backgroundColor: 'white',
  },

  imageContainer: {
    width: '100%',
    height: '50%',
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
    color: '#6b7280',
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
});
