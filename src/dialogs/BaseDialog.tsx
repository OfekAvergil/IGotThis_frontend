import * as React from "react";
import {
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
} from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface props {
  title: string;
  content: JSX.Element;
  isVisible: boolean;
  onOk: Function;
  onCancle: Function;
  onDismiss?: Function;
}

const BasicDialog = (props: props) => {
  return (
    <Portal>
      <Dialog visible={props.isVisible}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Note</Text>
          <View style={styles.closeButton}>
            <Button
              icon="close"
              onPress={() => {
                props.onCancle();
              }}>
              </Button>
          </View>
        </View>
        <Divider style={{ borderColor: "#fff" }}></Divider>
        {props.content}
        <View style={styles.buttonsContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              paddingHorizontal: 15,
            }}>
            <Button
              onPress={() => {
                props.onCancle();
              }}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
              paddingHorizontal: 15,
            }}>
            <Button
              onPress={() => {
                props.onOk();
              }}>
              Ok
            </Button>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default BasicDialog;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    marginTop: 0,
    backgroundColor: "#6029D2",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    flex: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "grey",
  },
  saveButton: {
    paddingVertical: 8,
  },
  closeButton: {
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
