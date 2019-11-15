export const decodeURI = (encodedURI) => {
  return encodedURI ? decodeURIComponent(encodedURI) : encodedURI
}

export const randomizeArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
}

export const calulatePercent = (smallValue, largeValue) => {
  return Math.ceil(smallValue / largeValue * 100);
}
