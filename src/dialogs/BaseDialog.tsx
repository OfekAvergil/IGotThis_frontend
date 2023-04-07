import * as React from 'react';
import { Button, Dialog, Divider, Portal } from 'react-native-paper';

interface props{
    title: string,
    content: JSX.Element,
    isVisible: boolean,
    onOk: Function,
    onCancle: Function,
    onDismiss?:Function
}


const BasicDialog = (props: props) => {

  return (
    <Portal>
      <Dialog visible={props.isVisible} style={{height: 600}}>
      <Dialog.Title style={{flex:1,margin:0, fontSize: 10, height:2, backgroundColor: '#612CD4', width: 300}}>New Note</Dialog.Title>
      <Divider style={{margin: 10}}></Divider>
      {props.content}
      <Dialog.Actions style={{flex:1, height: 'auto'}}>
        <Button style={{alignSelf: 'flex-end',justifyContent: 'center', height: 30}} onPress={() => {props.onCancle()}}>Cancel</Button>
        <Button style={{alignSelf: 'flex-end', height: 30}} onPress={() => {props.onOk()}}>Ok</Button>
      </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default BasicDialog;
