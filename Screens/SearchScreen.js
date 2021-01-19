import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
    };
  }
  componentDidMount = async () => {
    const query = await db.collection('transactions').get();
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions],
      });
    });
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.inputbox}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
        />
        <TouchableOpacity style={styles.issueReturnButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      <FlatList 
      data = {this.state.allTransactions}
      renderItem = {({item}) =>(
        <View style={{borderWidth: 4}}>
         <Text>{"bookID"+item.bookID}</Text>
         <Text>{"studentID"+item.studenID}</Text>
         <Text>{"transactionType"+item.transactionType}</Text>
         <Text>{"date"+item.date.toDate()}</Text>
        </View>
      )} 
      keyExtractor = {(item, index)=>index.toString()}
      onEndReached = {this.fetchMoreTransactions}
      onEndReachedThreshold = {0.1} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    alignSelf: 'center',
  },
  issueReturnButton: {
    marginTop: 100,
    textAlign: 'center',
    width: '50%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbox: {
    marginTop: 150,
    textAlign: 'center',
    width: '60%',
    height: 40,
    borderWidth: 4,
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
  },
});
