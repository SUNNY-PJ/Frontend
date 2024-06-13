module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/async-storage.js',
    '^expo-notifications$': '<rootDir>/__mocks__/expo-notifications.js',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-.*|@react-navigation|expo-.*|@react-native-community/.*)/)"
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
};
