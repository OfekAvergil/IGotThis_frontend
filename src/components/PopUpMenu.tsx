import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider, IconButton } from 'react-native-paper';
import { Colors } from '../consts';

export interface menuProps {
    onEdit: () => void;
    onDelete: () => void;
  }

export default function PopUpMenu(props: menuProps){
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
  


    
    return(
        <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
            <IconButton
                icon="dots-vertical"
                onPress={openMenu}
                iconColor={Colors.basicGrey}
                style={{ height: 22, width: 22, margin: 10 }}
            /> 
        }>
        <Menu.Item onPress={() => props.onEdit()} title="Edit" />
        <Menu.Item onPress={() => props.onDelete()} title="Delete" />
      </Menu>
    )
}