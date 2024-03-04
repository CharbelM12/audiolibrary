module.exports = {
  geoLocation: {
    point: "Point",
    index: "2dsphere",
    longitude: {
      minValue: -180,
      maxValue: 180,
    },
    latitude: {
      minValue: -90,
      maxValue: 90,
    },
    coordinatesLength: 2,
  },
};
