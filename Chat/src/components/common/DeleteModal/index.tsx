import React from 'react';
import {Pressable} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native';

interface Props {
  deleteHandler: () => void;
  setIsVisible: (param: boolean) => void;
  isVisible: boolean;
  text: string;
}

function DeleteModal({deleteHandler, setIsVisible, text, isVisible}: Props) {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Delete {text}</Text>
            <Text style={styles.subheaderText}>
              Do you want to delete {text}?
            </Text>
          </View>
          <View style={styles.controles}>
            <Pressable
              onPress={() => setIsVisible(!isVisible)}
              style={styles.buttonBackground}>
              <Text style={styles.button}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={deleteHandler}
              style={[styles.buttonBackground, styles.deleteButtonBackground]}>
              <Text style={[styles.button, styles.deleteButton]}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 343,
    gap: 16,
    backgroundColor: '#2E2E38',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    gap: 4,
  },
  headerText: {
    fontFamily: 'Space Grotesk',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 28,
    color: '#fff',
  },
  subheaderText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.024,
    color: '#fff',
  },
  controles: {
    gap: 8,
  },
  buttonBackground: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  button: {
    fontFamily: 'Space Grotesk',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.032,
    color: '#fff',
  },
  deleteButtonBackground: {
    borderRadius: 4,
    backgroundColor: '#FF0B5A',
  },
  deleteButton: {},
});

export default DeleteModal;
