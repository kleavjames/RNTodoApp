import React, {useCallback} from 'react';
import {
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FAB, Icon, Text} from '@rneui/themed';
import {Container} from '../../components';
import {Colors} from '../../constants/theme';
import {useNavigation} from '@react-navigation/core';
import {TodoListNavigationProp} from '../../navigation/main';
import {FlatList} from 'react-native-gesture-handler';
import {useTodoCollection, ITodo} from '../../hooks/useTodos';
import {useCollectionData} from '@skillnation/react-native-firebase-hooks/firestore';

const EmptyContainer = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Text>No todos added.</Text>
    </View>
  );
};

const TodoList = () => {
  const ccollection = useTodoCollection();
  const navigation = useNavigation<TodoListNavigationProp>();
  const [todoDocs] = useCollectionData(ccollection);

  const onAddTodo = () => {
    navigation.navigate('AddEditTodo', {
      type: 'add',
    });
  };

  const onEditTodo = useCallback(
    (todo: ITodo) => {
      navigation.navigate('AddEditTodo', {
        type: 'edit',
        todo,
      });
    },
    [navigation],
  );

  const onCompleteTask = useCallback(
    (todo: ITodo) => {
      ccollection.doc(todo.id).update({
        completed: !todo.completed,
      });
    },
    [ccollection],
  );

  const renderList = useCallback<ListRenderItem<ITodo>>(
    ({item}) => {
      return (
        <View key={item.id} style={styles.todoWrapper}>
          <View style={styles.todoContainer}>
            <TouchableOpacity
              onPress={() => onEditTodo(item)}
              style={styles.flex}>
              <Text
                style={[
                  styles.todoTitle,
                  item.completed && styles.completedTodo,
                ]}>
                {item.title}
              </Text>
              <Text
                style={[
                  styles.todoDescription,
                  item.completed && styles.completedTodo,
                ]}>
                {item.description}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onCompleteTask(item)}
              style={styles.space}>
              <Icon
                name="check-circle-outline"
                color={item.completed ? Colors.success : Colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [onCompleteTask, onEditTodo],
  );

  return (
    <Container>
      <SafeAreaView style={styles.wrapper}>
        <FlatList
          keyExtractor={todo => todo.id}
          data={todoDocs as ITodo[]}
          renderItem={renderList}
          style={styles.flatList}
          ListEmptyComponent={EmptyContainer}
        />
      </SafeAreaView>
      <FAB
        placement="right"
        icon={{
          name: 'edit',
          type: 'feather',
          color: Colors.white,
          size: 20,
        }}
        onPress={onAddTodo}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {marginHorizontal: 20, flex: 1},
  flatList: {paddingTop: 20},
  todoWrapper: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  todoDescription: {
    marginTop: 4,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
  },
  emptyWrapper: {flex: 1, alignItems: 'center', marginTop: 20},
  space: {
    marginLeft: 20,
  },
});

export default TodoList;
