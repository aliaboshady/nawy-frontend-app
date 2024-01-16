import base64 from 'base64-js';

export function formatAsCurrency(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function binaryImageToURL(Image: any) {
  if (!Image) return '';

  const base64Image = base64.fromByteArray(Image.data);
  const imageUrl = `data:image/jpeg;base64,${base64Image}`;

  return imageUrl;
}
