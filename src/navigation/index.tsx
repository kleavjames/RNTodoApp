import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AuthStack from './auth';
import MainStack from './main';

const RootStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState();

  const onAuthStateChanged = useCallback(
    (user: any) => {
      setUserLoggedIn(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [onAuthStateChanged]);

  return <>{userLoggedIn ? <MainStack /> : <AuthStack />}</>;
};

export default RootStack;
