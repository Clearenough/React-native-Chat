import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {userEndpoints} from '../../@constants/apiEndpoint';
import {
  ChatRoomNavigationProp,
  IUser,
  ProfileRoomProps,
} from '../../@types/common';
import BackButton from '../../components/common/BackButton';
import {useAppDispatch, useAppSelector} from '../../hooks/storeHooks';
import {selectUser} from '../../store/slices/user/selectors';
import {logout, userDelete} from '../../store/slices/user/userSlice';

function Profile({route}: ProfileRoomProps) {
  const [user, setUser] = useState<IUser>();
  const navigation = useNavigation<ChatRoomNavigationProp>();
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
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

  function onLogout() {
    dispatch(logout());
  }

  function onDeleteAccount() {
    dispatch(userDelete(userId));
  }

  return user ? (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButton}>
          <BackButton handler={backButtonHandler} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{user.username}</Text>
        </View>
      </View>
      {userId !== currentUser._id ? (
        <Pressable style={styles.button}>
          <View>
            <Text style={styles.addButtonText}>Add to friends</Text>
          </View>
        </Pressable>
      ) : (
        <View style={styles.controlContainer}>
          <Pressable
            style={[styles.button, styles.logoutButton]}
            onPress={onLogout}>
            <View>
              <Text style={[styles.addButtonText, styles.logoutButtonText]}>
                Log out
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={(styles.button, styles.deleteButton)}
            onPress={onDeleteAccount}>
            <View>
              <Text style={[styles.addButtonText, styles.deleteButtonText]}>
                Delete Account
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 167,
  },
  headerContainer: {
    width: '100%',
    height: 375,
    backgroundColor: 'purple',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingTop: 64,
    paddingLeft: 16,
  },
  textContainer: {
    paddingLeft: 20,
    paddingBottom: 8,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Space Grotesk',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 33.6,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#29CCBB',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 52,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#29CCBB',
    backgroundColor: '#050833',
    width: 343,
    height: 52,
  },
  deleteButton: {
    borderRadius: 4,
    backgroundColor: '#FF0B5A',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 52,
  },
  logoutButtonText: {
    color: '#29CCBB',
  },
  deleteButtonText: {
    color: '#fff',
  },
  addButtonText: {
    color: '#000',
    fontFamily: 'Space Grotesk',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
  },
  controlContainer: {
    gap: 8,
  },
});

export default Profile;
