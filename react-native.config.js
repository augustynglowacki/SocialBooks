module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    // Disable auto linking for `react-native-vector-icons` and link
    // the required fonts manually to avoid duplicate resources issue in iOS.
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: null,
      },
      assets: [],
    },
  },
};
