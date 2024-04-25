import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/login/home';
import Profil from '../screens/login/profil';
import { colors } from '../styles/global/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';


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
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            //@ts-ignores
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