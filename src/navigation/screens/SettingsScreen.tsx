import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import userStore from '../../stores/userStore';
import { Card, Button } from 'react-native-paper';
import LoginHeader from '../../components/LoginHeader';
import { Colors } from "../../consts";
import Icon from 'react-native-paper/src/components/Icon'



const SettingsPage = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [supervisorEmail, setSupervisorEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [helpPhones, setHelpPhones] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSave = () => {
    // Save the settings data or perform any desired actions
    // For example, you could make an API call to update the user's settings
    // You can access the entered values via the state variables (name, userType, email, etc.)
    // You may also want to validate the inputs before saving the data
  };

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogOut = () => {
    userStore.user_name = null;
    userStore.user_password = null;
    console.log(navigation);
    navigation.navigate('Login');
  }

  const closePage = ()=>{
    navigation.navigate("NavBar");
  }

  enum Icons {
    Account = 'account',
    Notifications = 'bell',
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
      <LoginHeader header="Settings"/>
      <Card style={styles.card}>
        <Card.Content>
            <FlatList
            renderItem={({ item }) => renderItem(item, item as keyof typeof Icons)}
            data={["Account", "Notifications", "Preferences", "Help", "Logout"]}>
            </FlatList>
            <View style={{ width: "100%", paddingTop: 30, alignItems: "flex-end" }}>
                <Button
                    style={{}}
                    mode="contained"
                    icon="check"
                    onPress={closePage}>
                    Done
                </Button>
            </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

/**
 * <Modal visible={isModalVisible} onRequestClose={closeModal}>
        <View>
          <Text>{selectedOption}</Text>
          // Render different content based on the selected option 
          {selectedOption === 'account' && (
            <>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                placeholder="User Type"
                value={userType}
                onChangeText={setUserType}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                placeholder="Supervisor Email"
                value={supervisorEmail}
                onChangeText={setSupervisorEmail}
              />
            </>
          )}

          {selectedOption === 'notifications' && (
            <>
              // Render notification settings 
            </>
          )}

          {selectedOption === 'preferences' && (
            <>
              // Render preferences settings 
            </>
          )}

          {selectedOption === 'help' && (
            <>
               //Render help and support options 
            </>
          )}

          {selectedOption === 'logout' && (
            <>
              <Text>Are you sure you want to log out?</Text>
              <Button title="Log Out" onPress={handleLogOut} />
            </>
          )}

          <Button title="Close" onPress={closeModal} />
        </View>
      </Modal>
 */

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