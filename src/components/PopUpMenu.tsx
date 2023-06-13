import * as React from 'react';
import {  Menu, IconButton } from 'react-native-paper';
import { Colors } from '../consts';
import { IconSource } from 'react-native-paper/src/components/Icon';

export interface menuItem{
  title: string, 
  action: () => void,
  leadingIcon?: IconSource
}

export interface menuProps {
    menuItems: menuItem[];
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
        {props.menuItems.map((item: menuItem) => (
          <Menu.Item 
            key ={item.title}
            title={item.title} 
            onPress={() => {
              closeMenu();
              item.action();
            }}  
            leadingIcon={item.leadingIcon}
          />
        ))}
      </Menu>
    )
}