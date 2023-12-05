import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChatRoomNavigationProp} from '../../@types/common';
import {useAppSelector} from '../../hooks/storeHooks';
import {selectUser} from '../../store/slices/user/selectors';
import ProfileButton from '../common/ProfileButton';

function MainScreenHeader() {
  const navigation = useNavigation<ChatRoomNavigationProp>();
  const {_id: id} = useAppSelector(selectUser);

  function onPress() {
    navigation.navigate('Profile', {
      userId: id,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chats</Text>
      <ProfileButton handler={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFF',
    fontFamily: 'Space Grotesk',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 33.6,
  },
});

export default MainScreenHeader;
