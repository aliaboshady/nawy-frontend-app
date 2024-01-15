export function formatAsCurrency(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function binaryImageToURL(Image: any) {
  if (Image === null) return '';

  const data = Image.data;
  const base64ImageData = btoa(String.fromCharCode(...new Uint8Array(data)));
  const dataURL = `data:image/jpeg;base64,${base64ImageData}`;

  return dataURL;
}
