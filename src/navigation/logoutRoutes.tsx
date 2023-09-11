import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from '../screens/logout/signin';
import Signup from '../screens/logout/signup';
import { colors } from '../styles/global/globalStyles';

const Tab = createBottomTabNavigator();

function SigninScreen() {
    return (
      <Signin/>
    );
  }
  
  function SignupScreen() {
    return (
      <Signup/>
    );
  }
export default function LogoutRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
              backgroundColor: "#F2D7FF",
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";

            if (route.name === 'Signin') {
              iconName = focused
                ? 'ios-log-in'
                : 'ios-log-in-outline';
            } else if (route.name === 'Signup') {
              iconName = focused ? 'ios-save' : 'ios-save-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: 'white',
        })}
      >
        <Tab.Screen 
          name="Signin" 
          component={SigninScreen}
          options={{
            tabBarLabel: 'Se connecter',
          }}
        />
        <Tab.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{
            tabBarLabel: "S'enregistrer", // Le label que vous souhaitez afficher
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}