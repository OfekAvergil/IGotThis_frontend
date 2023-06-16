import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Pages, Strings } from '../../consts';

interface Slide {
  key: string;
  image: number;
}

const slides: Slide[] = [
  {
    key: 'slide1',
    image: require('../../../assets/save-event-walkthrough.png'),
  },
  {
    key: 'slide2',
    image: require('../../../assets/reminder-walkthrough.png'),
  },
  {
    key: 'slide3',
    image: require('../../../assets/getting-ready-walkthrough.png'),
  },
  {
    key: 'slide4',
    image: require('../../../assets/current-event-walkthrough.png'),
  },
];

const Walkthrough= ({ navigation }: any) => {

  const renderSlide = ({ item }: { item: Slide }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <Button 
        mode="contained" 
        style={styles.button}>
          Next
      </Button>
    );
  };

  const renderDoneButton = () => {
    return (
      <Button 
        mode="contained" 
        style={styles.button}>
        {Strings.done_button}
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <AppIntroSlider 
      renderItem={renderSlide} 
      data={slides} 
      onDone={()=>{navigation.navigate(Pages.NavBar)}}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    marginTop:40
  },
  image: {
    width: 400,
    height:650,
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default Walkthrough;
