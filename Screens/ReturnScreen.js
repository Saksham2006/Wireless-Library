import * as React from 'react';
import {
  ToastAndroid,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeSanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config';

export default class IssueScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      dataScanned: '',
      buttonState: 'normal',
      scannedBookID: '',
      scannedStudentID: '',
    };
  }
  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status == 'granted',
      buttonState: id,
      scanned: false,
    });
  };
  handleBarCodeScan = async ({ type, data }) => {
    const { buttonState } = this.state;
    if (buttonState == 'bookID') {
      this.setState({
        scanned: true,
        scannedBookID: data,
        buttonState: 'normal',
      });
    } else if (buttonState == 'studentID') {
      this.setState({
        scanned: true,
        scannedStudentID: data,
        buttonState: 'normal',
      });
    }
  };

  bookReturn = async () => {
    db.collection('transaction').add({
      studentID: this.state.scannedStudentID,
      bookID: this.state.scannedStudentID,
      date: firebase.firestore.Timestamp.now().toDate(),
      transactionType: 'return',
    });
    db.collection('books').doc(this.state.scannedBookID).update({
      bookAvailability: true,
    });
    db.collection('students')
      .doc(this.state.scannedStudentID)
      .update({
        numberOfBooksIssued: firebase.firestore.FieldValue.increment(-1),
      });
  };

  handleTransaction = async () => {
    var transactionMessage;
    db.collection('books').doc(this.state.scannedBookID).get().then((doc) => {
        var book = doc.data();
        if (book.bookAvailability) {
          this.bookIssue();
          transactionMessage = 'The book is issued';
          ToastAndroid.show(transactionMessage, ToastAndroid.short);
        }
      });
    this.setState({
      transactionMessage: transactionMessage,
    });
  };

  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState == 'clicked' && hasCameraPermission) {
      return (
        <BarCodeSanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState == 'normal') {
      return (
        <View>
          <Text style={styles.requestText}>
            {hasCameraPermission == true
              ? this.state.dataScanned
              : 'Request camera permission'}
          </Text>
          <View>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter your book ID"
              value={this.state.scannedBookID}></TextInput>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermissions('bookID');
              }}>
              <Text>Scan For Returning</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter your student ID"
              value={this.state.scannedStudentID}></TextInput>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermissions('studentID');
              }}>
              <Text>Scan For Returning</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submitButton}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  requestText: {
    textAlign: 'center',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 20,
  },
  scanButton: {
    marginTop: 30,
    textAlign: 'center',
    width: '50%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#16ff12',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 50,
    textAlign: 'center',
    width: '70%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#12deb8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputbox: {
    marginTop: 50,
    textAlign: 'center',
    width: '60%',
    height: 40,
    borderWidth: 4,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    borderRadius: 20,
  },
});
