import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import userStore, { settingsDialogs } from '../../stores/userStore';
import { Card, Button } from 'react-native-paper';
import LoginHeader from '../../components/LoginHeader';
import { Colors, Pages, Strings } from "../../consts";
import Icon from 'react-native-paper/src/components/Icon'
import EditAccountDialog from '../../dialogs/EditAccountDialog';
import { observer } from 'mobx-react';
import EditPreferencesDialog from '../../dialogs/EditPreferencesDialog';
import ShowHelpDialog from '../../dialogs/ShowHelpDialog';

const SettingsPage = ({ navigation }: any) => {
  const AccountListener = observer(EditAccountDialog);
  const PreferencesListener = observer(EditPreferencesDialog);
  const HelpListener = observer(ShowHelpDialog);

  const handleLogOut = () => {
    userStore.logOut();
    navigation.navigate(Pages.Login);
  }

  const closePage = ()=>{
    navigation.navigate(Pages.NavBar);
  }

  const renderItem = (item: string, icon:string, action: () => void) => {
    return (
      <Card style={styles.listItem}>
          <TouchableOpacity
          onPress={() => { action() }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
              <View style={{ flex: 3, flexDirection: "row" }}>
                  <Icon source={icon} size={24} color={Colors.primary} />
                  <Text style={{ color: "black", fontSize: 18, paddingLeft:10 }}>{item}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                  <Icon source="chevron-right" size={18} color={Colors.basicGrey} />
              </View>
          </View>
          </TouchableOpacity>
      </Card>
    );}

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header={Strings.settings_page_header}/>
      <Card style={styles.card}>
        <Card.Content>
          {renderItem(
            Strings.settings_page_account, 
            'account',
            ()=>{userStore.openDialog(settingsDialogs.AccountDialog);}
          )}
          {renderItem(
            Strings.settings_page_preferences, 
            'account-star',
            ()=>{userStore.openDialog(settingsDialogs.PreferencesDialog);}
          )}
          {renderItem(
            Strings.settings_page_help, 
            'help-circle-outline',
            ()=>{userStore.openDialog(settingsDialogs.HelpDialog);}
          )}
          {renderItem(
            Strings.settings_page_logout, 
            'logout',
            ()=>{handleLogOut();}
          )}
          <View style={{ width: "100%", paddingTop: 30, alignItems: "flex-end" }}>
              <Button
                  style={{}}
                  mode="contained"
                  icon="check"
                  onPress={closePage}>
                  {Strings.done_button}
              </Button>
          </View>
        </Card.Content>
      </Card>
      <AccountListener/>
      <PreferencesListener/>
      <HelpListener/>
    </SafeAreaView>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "100%",
      flex:3
    },
    card_title: {
      fontSize: 30,
      marginTop: 50,
      color: Colors.primary,
    },
    card_button: {
      margin: 7,
    },
    listItem: {
        backgroundColor: "white",
        minHeight: 30,
        height: "auto",
        margin: 5,
        padding: 10,
        textAlignVertical: "center",
      },
  });