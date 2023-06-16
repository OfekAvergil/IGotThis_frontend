import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import userStore, { settingsDialogs } from '../../stores/userStore';
import { Card, Button } from 'react-native-paper';
import LoginHeader from '../../components/LoginHeader';
import { Colors, Pages, SettingsPages, Strings } from "../../consts";
import Icon from 'react-native-paper/src/components/Icon'
import EditAccountDialog from '../../dialogs/EditAccountDialog';
import { observer } from 'mobx-react';
import EditPreferencesDialog from '../../dialogs/EditPreferencesDialog';



const SettingsPage = ({ navigation }: any) => {
  const [selectedOption, setSelectedOption] = useState('');
  const AccountListener = observer(EditAccountDialog);
  const PreferencesListener = observer(EditPreferencesDialog);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    switch(selectedOption){
      case SettingsPages[0]:{
        userStore.openDialog(settingsDialogs.AccountDialog);
        break; 
      }
      case SettingsPages[1]:{
        userStore.openDialog(settingsDialogs.PreferencesDialog);
        break; 
      }
      case SettingsPages[2]:{
        break; 
      }
      case SettingsPages[3]:{
        handleLogOut();
        break; 
      }
    }
  };

  const handleLogOut = () => {
    userStore.logOut();
    navigation.navigate(Pages.Login);
  }

  const closePage = ()=>{
    navigation.navigate(Pages.NavBar);
  }

  enum Icons {
    Account = 'account',
    Preferences = 'account-star',
    Help= 'help-circle-outline',
    Logout = 'logout'
  }

  const renderItem = (item: string, icon:keyof typeof Icons) => {
    const iconName = Icons[icon];
    return (
      <Card style={styles.listItem}>
          <TouchableOpacity
          onPress={() => { handleOptionPress(item) }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
              <View style={{ flex: 3, flexDirection: "row" }}>
                  <Icon source={iconName} size={24} color={Colors.primary} />
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
            <FlatList
            renderItem={({ item }) => renderItem(item, item as keyof typeof Icons)}
            data={SettingsPages}>
            </FlatList>
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