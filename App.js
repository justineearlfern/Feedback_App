import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './screens/DrawerContent';
import MainTabScreen from './screens/MainTabScreen';
import HistoryScreen from './screens/HistoryScreen';
import NotificationScreen from './screens/NotificationScreen';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();

const App = () => {
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [token, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    token: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          token: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        //  setUserToken('fgkj');
        // setIsLoading(false);
        const token = String(foundUser[0].token);
        const email = foundUser[0].email;

        try {
          // await AsyncStorage.setItem('token', token);
        } catch (e) {
          console.log(e);
        }
        //  console.log('user token: ', token);
        dispatch({ type: 'LOGIN', id: email, token: token });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('token');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let token;
      token = null;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e);
      }
      //  console.log('user token: ', token);
      dispatch({ type: 'RETRIEVE_TOKEN', token: token });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.token !== null ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeStack" component={MainTabScreen} />
            <Drawer.Screen name="NotificationScreen" component={NotificationScreen} />
            <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
          </Drawer.Navigator>
        ) : (
            <RootStackScreen />
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
