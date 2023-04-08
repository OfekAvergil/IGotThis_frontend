import * as React from "react";
import { Button, Dialog, Divider, Portal, Text, IconButton } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface props {
  title: string;
  content: JSX.Element;
  isVisible: boolean;
  enableActions: boolean;
  onOk?: Function;
  onCancle?: Function;
  onDismiss: ()=>void;
}

const BasicDialog = (props: props) => {
  return (
    <Portal>
      <Dialog visible={props.isVisible} onDismiss={props.onDismiss}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{props.title}</Text>
          <View style={styles.closeButton}>
            <IconButton
              icon="close"
              onPress={() => {
                props.onDismiss();
              }}
              style={{ height:22, width:22 }}/>
          </View>
        </View>
        <Divider style={{ borderColor: "#fff" }}></Divider>
        {props.content}
        {props.enableActions && (
          <View style={styles.buttonsContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
                paddingHorizontal: 15,
              }}
            >
              <Button
                onPress={() => {
                  props.onCancle && props.onCancle();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingHorizontal: 15,
              }}
            >
              <Button
                onPress={() => {
                  props.onOk && props.onOk();
                }}
              >
                Ok
              </Button>
            </View>
          </View>
        )}
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
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerTitle: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
    flexDirection: "row",
  },
});
