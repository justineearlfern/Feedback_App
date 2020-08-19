import React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {AsyncStorage} from 'react-native';
import Connection from '../common/Connection';
import {useState} from 'react';
import {useEffect} from 'react';
import {set} from 'react-native-reanimated';
const connection = new Connection();

const HistoryScreen = () => {
  const [user, setUserData] = useState();
  const [react, setReact] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [recognize, setRecognize] = useState([]);
  const [report, setReport] = useState([]);
  const [repair, setRepair] = useState([]);

  const [loaded, setLoaded] = useState(false);

  getUser = async () => {
    setUserData(JSON.parse(await AsyncStorage.getItem('userData')));
  };

  getHistory = async () => {
    const result = await connection.get(`api/v1/history/${user.data._id}`);

    setReact(result.data.data[0]);
    setRecommend(result.data.data[1]);
    setRecognize(result.data.data[2]);
    setRepair(result.data.data[3]);
    setReport(result.data.data[4]);
  };

  useEffect(() => {
    async function load() {
      await getUser();
      await getHistory();
      setLoaded(true);
    }
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 36}}>React</Text>
      {react.map(i => {
        return <Text>{i.description}</Text>;
      })}

      <Text style={{fontSize: 36}}>Recommend</Text>
      {recommend.map(i => {
        return <Text>{i.description}</Text>;
      })}

      <Text style={{fontSize: 36}}>Recognize</Text>
      {recognize.map(i => {
        return <Text>{i.description}</Text>;
      })}

      <Text style={{fontSize: 36}}>Repair</Text>
      {repair.map(i => {
        return <Text>{i.description}</Text>;
      })}

      <Text style={{fontSize: 36}}>Report</Text>
      {report.map(i => {
        return <Text>{i.description}</Text>;
      })}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 5,
  },
});
