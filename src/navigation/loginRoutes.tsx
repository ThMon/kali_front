import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/login/home';
import Profil from '../screens/login/profil';
import { colors } from '../styles/global/globalStyles';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <Home/>
    );
  }
  
  function ProfilScreen() {
    return (
      <Profil/>
    );
  }
export default function LoginRoutes() {
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

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: 'white',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Accueil',
          }}
        />
        <Tab.Screen 
          name="Profil" 
          component={ProfilScreen} 
          options={{
            tabBarLabel: "Profil", // Le label que vous souhaitez afficher
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}