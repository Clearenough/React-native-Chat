import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {
  ChatRoomNavigationProp,
  IUser,
  ProfileRoomProps,
} from '../../@types/common';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import DropoutButton from '../../components/common/DropoutButton/DropoutButton';

function Profile({route}: ProfileRoomProps) {
  const [user, setUser] = useState<IUser>();
  const navigation = useNavigation<ChatRoomNavigationProp>();

  const {userId} = route.params;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(userEndpoints.findUser + userId);
      const data: IUser = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [userId]);

  function backButtonHandler() {
    navigation.goBack();
  }

  return user ? (
    <View style={styles.container}>
      <ChatRoomHeader
        user={user}
        backButtonHandler={backButtonHandler}
        additionalButton={<DropoutButton handler={() => null} />}
      />
    </View>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 65,
  },
});

export default Profile;
