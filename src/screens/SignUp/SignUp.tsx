import auth from '@react-native-firebase/auth';
import {Alert, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Input as BaseInput, Text} from '@rneui/themed';
import {Container} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Colors} from '../../constants/theme';
import {useNavigation} from '@react-navigation/core';
import {AuthNavigationProp} from '../../navigation/auth';

export interface IAuth {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const SignUp = () => {
  const navigation = useNavigation<AuthNavigationProp>();

  const onHandleSubmit = async (values: IAuth) => {
    try {
      await auth().createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      Alert.alert('Welcome', 'You have successfully created your account.');
    } catch (error) {
      Alert.alert('Error', 'failed to sign up user.');
    }
  };

  return (
    <Container>
      <View style={styles.wrapper}>
        <View style={styles.label}>
          <Text style={styles.text}>Register your account</Text>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={onHandleSubmit}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <BaseInput
                placeholder="Email"
                leftIcon={{type: 'font-awesome', name: 'user'}}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                value={values.email}
                renderErrorMessage={!!errors.email}
                errorMessage={touched.email && errors.email ? errors.email : ''}
              />
              <BaseInput
                placeholder="Password"
                leftIcon={{type: 'font-awesome', name: 'lock'}}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
                value={values.password}
                renderErrorMessage={!!errors.password}
                errorMessage={
                  touched.password && errors.password ? errors.password : ''
                }
              />
              <Button
                title="Sign Up"
                onPress={() => handleSubmit()}
                containerStyle={styles.button}
              />
              <Button
                title="Sign back in"
                style={styles.button}
                titleStyle={{color: Colors.secondary}}
                type="clear"
                onPress={() => navigation.goBack()}
              />
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  button: {marginTop: 20},
  label: {marginBottom: 20, marginLeft: 10},
  text: {fontSize: 24, fontWeight: '800', color: Colors.primary},
});

export default SignUp;
