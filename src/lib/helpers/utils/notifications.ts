import * as Notifications from 'expo-notifications';


export const registerForPushNotificationsAsync = async (id: string) => {
  console.log('ça part de la ');
  return Notifications.getExpoPushTokenAsync({
    projectId: 'ccd5a57d-c8df-497e-a827-95ce61145ce8',
   }).then((res)=>{
    console.log(res)
    return res
   })
   .catch((err)=> console.log(err))
};
