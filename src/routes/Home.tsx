import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Container, responsive, Text } from 'styled-minimal';

import { spacer } from 'modules/theme';

import { name } from 'config';
import { STATUS } from 'literals';

import { login } from 'actions';

import Background from 'components/Background';
import Icon from 'components/Icon';
import Logo from 'components/Logo';

import { RootState } from 'types';

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;

  svg {
    height: 10rem;
    width: auto;

    ${
      /* sc-custom '@media-query' */ responsive({
        lg: {
          height: '15rem',
        },
      })
    };
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 3.5rem;
  line-height: 1.4;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  ${
    /* sc-custom '@media-query' */ responsive({
      lg: {
        fontSize: '4rem',
      },
    })
  };
`;

function Home() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const status = useSelector<RootState>(({ user }) => user.status);

  const handleClickLogin = () => {
    dispatch(login({ username, password }));
  };

  return (
    <Background key="Home" data-testid="Home">
      <Container fullScreen>
        <Header>
          <Logo />
        </Header>
        <Heading>{name}</Heading>
        <div>
          <label htmlFor="username">
            Email:
            <input id="username" onChange={event => setUsername(event.target.value)} type="text" />
          </label>
          <label htmlFor="password">
            Password:
            <input id="password" onChange={event => setPassword(event.target.value)} type="text" />
          </label>
          <button onClick={handleClickLogin} type="submit">
            Loginnnn
          </button>
        </div>
        <Button
          busy={status === STATUS.RUNNING}
          data-testid="Login"
          onClick={handleClickLogin}
          size="xl"
          textTransform="uppercase"
          type="submit"
          variant="white"
        >
          <Icon name="sign-in" />
          <Text ml={2}>Start</Text>
        </Button>
      </Container>
    </Background>
  );
}

export default Home;
