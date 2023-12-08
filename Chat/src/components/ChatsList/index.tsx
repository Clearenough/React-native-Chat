import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../hooks/storeHooks';
import {selectChats} from '../../store/slices/chat/selectors';

function ChatsList() {
  const chats = useAppSelector(selectChats);

  return (
    <View style={styles.container}>
      {/* <FlatList
        renderItem={renderItem}
        data={users}
        keyExtractor={item => item._id}
        // ListFooterComponentStyle={styles.container}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={edgeSeparator}
        ListFooterComponent={edgeSeparator}
        horizontal
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
  },
});

export default ChatsList;
