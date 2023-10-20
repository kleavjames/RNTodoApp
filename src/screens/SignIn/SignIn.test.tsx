import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import SignIn from './SignIn';

describe('SignInScreen', () => {
  it('should show the Welcome text', () => {
    render(<SignIn />);
    expect(screen.getByText('Welcome')).toBeTruthy();
  });

  it('should apply the values in the input fields when changing text', async () => {
    render(<SignIn />);
    const emailPlaceholder = screen.getByPlaceholderText('Email');
    const passPlaceholder = screen.getByPlaceholderText('Password');

    fireEvent.changeText(emailPlaceholder, 'kleavantjames@gmail.com');
    fireEvent.changeText(passPlaceholder, '123456');
    fireEvent.press(screen.getByRole('button', {name: 'Sign In'}));

    screen.debug();

    await waitFor(() => {
      expect(emailPlaceholder.props.errorMessage).toBe(
        'kleavantjames@gmail.com',
      );
      expect(passPlaceholder.props.value).toBe('123456');
    });
  });
});
