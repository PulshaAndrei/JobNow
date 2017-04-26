import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Container, LoadingIndiactor } from '../../components/Common';
import { LoginView, BrandView, InputView,
  LoginAndSignupView, BrandIcon, BrandTitle,
  PhoneInput, PasswordInput, ForgotButton,
  LoginButton, SignupButton
} from '../../components/Login';

import { login, phoneMask } from '../../modules/user';

class Login extends Component {
  state = {
    phone: '',
    password: '',
  }
  render() {
    const { login, phoneMask, isLoading } = this.props;
    return (
      <Container>
        <LoginView>
          <BrandView>
            <BrandIcon />
            <BrandTitle title="JobNow" />
          </BrandView>
          <InputView>
            <PhoneInput
              value={this.state.phone}
              setValue={(value) => this.setState({ phone: phoneMask(value) })}
              onFocus={() => this.setState({ phone: '+375 ' })}
            />
            <PasswordInput value={this.state.password} setValue={(value) => this.setState({ password: value })} />
            <ForgotButton />
          </InputView>
          <LoginAndSignupView>
            <LoginButton onPress={() => login(this.state.phone, this.state.password)} />
            <SignupButton onPress={Actions.signup} />
          </LoginAndSignupView>
        </LoginView>
        <LoadingIndiactor visible={isLoading} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.user.isLoading,
  }),
  { login, phoneMask }
)(Login);
