import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container } from '../../components/Common';
import { LoginView, BrandView, InputView, LoginAndSignupView, BrandIcon, BrandTitle , PhoneInput, PasswordInput, ForgotButton, LoginButton, SignupButton } from '../../components/Login';

//import { login } from './state';

class Login extends Component {
  state = {
    phone: '',
    password: '',
  }
  render() {
    return (
      <Container>
        <LoginView>
          <BrandView>
            <BrandIcon />
            <BrandTitle title="JobNow" />
          </BrandView>
          <InputView>
            <PhoneInput />
            <PasswordInput />
            <ForgotButton />
          </InputView>
          <LoginAndSignupView>
            <LoginButton onPress={Actions.drawer} />
            <SignupButton onPress={Actions.signup} />
          </LoginAndSignupView>
        </LoginView>
      </Container>
    );
  }
}

export default connect(
  state => ({},
    { /*login*/ }
  )
)(Login);
