import {StyleSheet, View} from 'react-native';
import React, {FC, useMemo} from 'react';
import {Container} from '../../components';
import {Input as BaseInput, Button, CheckBox} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
  AddEditTodoRouteProp,
  TodoListNavigationProp,
} from '../../navigation/main';
import {ITodo, useTodoCollection} from '../../hooks/useTodos';
import {uuidv4} from '../../utils/uuid';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title must not be empty'),
  description: Yup.string().required('Description must not be empty'),
});

const AddTodo: FC = () => {
  const collection = useTodoCollection();
  const navigation = useNavigation<TodoListNavigationProp>();
  const route = useRoute<AddEditTodoRouteProp>();
  const {type, todo} = route.params;

  const todoData = useMemo<ITodo>(() => {
    if (type === 'edit') {
      return todo as ITodo;
    } else {
      return {
        title: '',
        description: '',
        completed: false,
        id: '',
      };
    }
  }, [todo, type]);

  const onSubmitTodo = (values: ITodo) => {
    if (type === 'edit') {
      collection.doc(values.id).set(values);
    } else {
      const todoObj = {
        ...values,
        id: uuidv4(),
      };
      collection.doc(todoObj.id).set(todoObj);
    }
    navigation.goBack();
  };

  const onDeleteTodo = () => {
    collection.doc(todoData.id).delete();
    navigation.goBack();
  };

  return (
    <Container>
      <View style={styles.wrapper}>
        <Formik
          initialValues={todoData}
          onSubmit={onSubmitTodo}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleSubmit,
            values,
            setFieldValue,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          }) => (
            <View>
              <BaseInput
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                renderErrorMessage={!!errors.title}
                containerStyle={styles.containerText}
                errorMessage={touched.title ? errors.title : ''}
              />
              <BaseInput
                placeholder="Description"
                multiline
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                renderErrorMessage={!!errors.description}
                value={values.description}
                errorMessage={
                  touched.description && errors.description
                    ? errors.description
                    : ''
                }
              />
              <CheckBox
                checked={values.completed}
                title="Completed"
                onIconPress={() =>
                  setFieldValue('completed', !values.completed)
                }
                onPress={() => setFieldValue('completed', !values.completed)}
              />
              <Button
                style={styles.addEditbutton}
                title={type === 'edit' ? 'Save' : 'Add'}
                disabled={isSubmitting}
                onPress={() => handleSubmit()}
              />
              {type === 'edit' ? (
                <Button
                  style={styles.deleteBtn}
                  title="Delete"
                  type="clear"
                  titleStyle={styles.deleteText}
                  disabled={isSubmitting}
                  onPress={onDeleteTodo}
                />
              ) : null}
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    margin: 20,
  },
  addEditbutton: {marginTop: 30},
  containerText: {marginBottom: 20},
  deleteBtn: {marginTop: 10},
  deleteText: {color: 'red'},
});

export default AddTodo;
