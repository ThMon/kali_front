import * as Location from 'expo-location';

export async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return 'Permission to access location was denied'
      }

      let location = await Location.getCurrentPositionAsync({});
      return location;
}