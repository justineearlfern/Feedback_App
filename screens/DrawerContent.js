import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';

export function DrawerContent(props) {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={require('../assets/logo.png')} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Justine Earl F.</Title>
                <Caption style={styles.caption}>
                  fernandez1234567@ceu.edu.ph
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection} />
          <Drawer.Section title="About Us">
            <View style={styles.preference}>
              <Text>
                CEU 5R'S Application aims to provide a more convenient way of
                giving feedback for the whole Centro Escolar University
                Community, in the comfort of your hand.
              </Text>
              <View style={styles.preference} />
            </View>
          </Drawer.Section>
          <Drawer.Section title="Developers">
            <View style={styles.preference}>
              <Text>
                Justine Earl Fernandez, Winnie Joyce Ong, Earl James Santos,
                Joshua Estrella
              </Text>
              <View style={styles.preference} />
            </View>
          </Drawer.Section>
          <Drawer.Section title="Adviser">
            <View style={styles.preference}>
              <Text>Engr. Jennifer L. Santos</Text>
              <View style={styles.preference} />
            </View>
          </Drawer.Section>
          <Drawer.Section title="Consultant">
            <View style={styles.preference}>
              <Text>Dr. Carlito B. Olaer</Text>
              <View style={styles.preference} />
            </View>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Log Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
