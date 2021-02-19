import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';

const {width, height} = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
const BG_IMG = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
export default () => {
  console.log({DATA});
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{padding: SPACING, marginTop: StatusBar.currentHeight || 42}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
          });
          return (
            <Animated.View style={{
              padding: SPACING,
              flexDirection: 'row',
              shadowOpacity: 0.3,
              backgroundColor: '#FFF',
              elevation: 8,
              marginBottom: SPACING,
              borderRadius: 12,
              opacity,
              transform: [{scale}]
            }}>
              <Image source={{uri: item.image}} style={{height: AVATAR_SIZE, width: AVATAR_SIZE, borderRadius: AVATAR_SIZE}}/>
              <View style={{marginLeft: SPACING / 2}}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
                <Text style={{fontSize: 18, opacity: 0.7}}>{item.jobTitle}</Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: '#0099cc'}}>{item.email}</Text>
              </View>
            </Animated.View>
          )
        }}
      />
    </View>
  );
}
