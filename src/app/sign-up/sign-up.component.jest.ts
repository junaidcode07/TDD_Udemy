import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import userEvent from '@testing-library/user-event';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import 'whatwg-fetch';
import { TestBed } from '@angular/core/testing';

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};
describe('SignUpComponent', () => {
  describe('Layout', () => {
    it('has Sign Up header', async () => {
      await setup();
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('It has user input', async () => {
      await setup();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('It has email input', async () => {
      await setup();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('It has Password input', async () => {
      await setup();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('It has Password type for password input', async () => {
      await setup();
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('It has Password type for password repeat input', async () => {
      await setup();
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has Sign Up button', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('disables the button initailly', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat have the same value', async () => {
      await setup();
      const password = screen.getByLabelText('Password');
      const repeatPassword = screen.getByLabelText('Password Repeat');
      await userEvent.type(password, 'junaid');
      await userEvent.type(repeatPassword, 'junaid');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeEnabled();
    });

    it('sends the username, email and password to the backend after clicking the sign up button', async () => {
      await setup();
      let httpTestingController = TestBed.inject(HttpTestingController);
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
      const req = httpTestingController.expectOne('api/1.0/users');
      const requetBody = req.request.body;
      expect(requetBody).toEqual({
        username: 'user1',
        email: 'junaid@gmail.com',
        password: 'junaid',
      });
    });
  });
});
