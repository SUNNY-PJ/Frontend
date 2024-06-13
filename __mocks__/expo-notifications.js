export const addNotificationReceivedListener = jest.fn();
export const removeNotificationSubscription = jest.fn();
export const getExpoPushTokenAsync = jest.fn(async () => ({ data: 'expo-push-token' }));
export const getPermissionsAsync = jest.fn(async () => ({ status: 'granted' }));
export const requestPermissionsAsync = jest.fn(async () => ({ status: 'granted' }));
export default {
  addNotificationReceivedListener,
  removeNotificationSubscription,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
};
