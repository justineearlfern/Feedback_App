import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Card,
  CardTitle,
  CardAction,
  CardButton,
} from 'react-native-material-cards';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={{margin: 10, borderRadius: 10}}>
          <CardTitle
            title="REACT"
            subtitle="How would you rate our department? Give us your feedback."
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => navigation.navigate('React')}
              title="Start"
            />
          </CardAction>
        </Card>

        <Card style={{margin: 10, borderRadius: 10}}>
          <CardTitle
            title="RECOGNIZE"
            subtitle="Do you wish to commend someone? This is the right place."
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => navigation.navigate('Recognize')}
              title="Start"
            />
          </CardAction>
        </Card>

        <Card style={{margin: 10, borderRadius: 10}}>
          <CardTitle
            title="RECOMMEND"
            subtitle="Any suggestion? We'd like to hear from you!"
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => navigation.navigate('Recommend')}
              title="Start"
            />
          </CardAction>
        </Card>

        <Card style={{margin: 10, borderRadius: 10}}>
          <CardTitle title="REPAIR" subtitle="Broken? We'll fix it for you!" />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => navigation.navigate('Repair')}
              title="Start"
            />
          </CardAction>
        </Card>

        <Card style={{margin: 10, borderRadius: 10}}>
          <CardTitle
            subtitleAbove={false}
            title="REPORT"
            subtitle="Lost and found? Any concerns that needed urgent attention."
          />
          <CardAction separator={true} inColumn={false}>
            <CardButton
              onPress={() => navigation.navigate('Report')}
              title="Start"
            />
          </CardAction>
        </Card>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
