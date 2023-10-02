import {StyleSheet, View} from 'react-native';
import React, {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Container;
