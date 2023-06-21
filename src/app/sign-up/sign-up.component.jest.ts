import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';
describe('SignUpComponent', () => {
  describe('Layout', () => {
    it('has Sign Up header', async () => {
      await render(SignUpComponent);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('It has user input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('It has email input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('It has Password input', async () => {
      await render(SignUpComponent);
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('It has Password type for password input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('It has Password type for password repeat input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has Sign Up button', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('disables the button initailly', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat have the same value', async () => {
      await render(SignUpComponent);
      const password = screen.getByLabelText('Password');
      const repeatPassword = screen.getByLabelText('Password Repeat');
      await userEvent.type(password, 'junaid');
      await userEvent.type(repeatPassword, 'junaid');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeEnabled();
    });

    it('sends the username, email and password to the backend after clicking the sign up button', async () => {
      const spy = jest.spyOn(window, 'fetch');
      await render(SignUpComponent);
      const username = screen.getByLabelText('Username');
      const email = screen.getByLabelText('Email');
      const password = screen.getByLabelText('Password');
      const repeatPassword = screen.getByLabelText('Password Repeat');
      await userEvent.type(username, 'user1');
      await userEvent.type(email, 'junaid@gmail.com');
      await userEvent.type(password, 'junaid');
      await userEvent.type(repeatPassword, 'junaid');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      await userEvent.click(button);
      const args = spy.mock.calls[0];
      const secondParam = args[1] as RequestInit;
      expect(secondParam.body).toEqual(
        JSON.stringify({
          username: 'user1',
          password: 'junaid',
          email: 'junaid@gmail.com',
        })
      );
    });
  });
});
