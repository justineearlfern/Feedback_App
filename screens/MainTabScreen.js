import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import ReactScreen from './ReactScreen';
import RecognizeScreen from './RecognizeScreen';
import RecommendScreen from './RecommendScreen';
import RepairScreen from './RepairScreen';
import ReportScreen from './ReportScreen';

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#191970',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Dashboard',
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#191970"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
    <HomeStack.Screen name="React" component={ReactScreen} />
    <HomeStack.Screen name="Recognize" component={RecognizeScreen} />
    <HomeStack.Screen name="Recommend" component={RecommendScreen} />
    <HomeStack.Screen name="Repair" component={RepairScreen} />
    <HomeStack.Screen name="Report" component={ReportScreen} />
  </HomeStack.Navigator>
);
export default HomeStackScreen;
