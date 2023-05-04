import * as React from "react";
import { Button, Dialog, Divider, Portal, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Colors } from "../consts";

interface props {
  title: string;
  content: JSX.Element;
  isVisible: boolean;
  enableActions: boolean;
  onOk?: Function;
  onCancle?: Function;
  onDismiss: ()=>void;
  editAction?: Function;
}

const BasicDialog = (props: props) => {
  return (
    <Portal>
      <Dialog visible={props.isVisible} onDismiss={props.onDismiss}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{props.title}</Text>
          <View style={styles.closeButton}>
          {props.editAction && <IconButton
                icon="lead-pencil"
                onPress={() => {
                  props.editAction?.();
                }}
                iconColor={Colors.basicGrey}
                style={{ height: 22, width: 22, margin: 10 }}
              />}
            <IconButton
              icon="close"
              iconColor={Colors.basicGrey}
              onPress={() => {
                props.onDismiss();
              }}
              style={{ height:22, width:22 }}/>
          </View>
        </View>
        <Divider style={{ borderColor: "white" }}></Divider>
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
                  props.onCancle?.();
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
                  props.onOk?.();
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
    backgroundColor: Colors.secondary,
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
    alignItems:"center"
  },
});
