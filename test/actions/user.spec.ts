import { login, logOut } from 'actions/user';

describe('actions/user', () => {
  it('login', () => {
    expect(login({ username: '', password: '' })).toMatchSnapshot();
  });

  it('logOut', () => {
    expect(logOut()).toMatchSnapshot();
  });
});
