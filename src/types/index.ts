// export interface Apartment {
//   ApartmentID: number;
//   Title: string;
//   Description: string;
//   Address: string;
//   Price: number;
//   Size: number;
//   CountBeds: number;
//   CountToilets: number;
//   Images?: ApartmentImage[];
// }

export interface Apartment {
  ApartmentID: number;
  Title: string;
  Description: string;
  Address: string;
  Price: number;
  Size: number;
  CountBeds: number;
  CountToilets: number;
  Image: ApartmentImage;
}

export interface ApartmentImage {
  ImageID: number;
  ApartmentID: number;
  ImagePath: string;
}
