import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { Icon } from 'antd';
import { Creators as Actions } from '../../store/ducks/seller';
import { parseEmail } from '../../utils';
import { LOGIN_MUTATION } from '../../services/apolo/mutation';

class SignIn extends Component {
  state = { email: '', password: '', error: '' };

  handleSignIn = ({
    login: {
      token,
      seller: { name },
    },
  }) => {
    const { setCredentials, history } = this.props;
    setCredentials(token, name);
    history.push(`/`);
  };

  handleError = async errors => {
    this.setState({ error: errors.message.replace('GraphQL error: ', '') });
  };

  validateForm = mutation => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Preencha todos os campos!' });
    } else if (!parseEmail.test(email.trim())) {
      this.setState({ error: 'Formato de e-mail inválido' });
    } else {
      mutation();
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <>
        <input
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          type="text"
          placeholder="E-mail"
        />
        <input
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          type="password"
          placeholder="Senha"
        />
        {error && <p>{error}</p>}

        <Mutation
          mutation={LOGIN_MUTATION}
          variables={{ email: email.trim(), password }}
          onCompleted={data => this.handleSignIn(data)}
          onError={errors => this.handleError(errors)}
        >
          {(mutation, { loading }) => {
            if (loading && error) this.setState({ error: '' });
            return (
              <button onClick={() => this.validateForm(mutation)} disabled={loading}>
                {!loading ? 'Entrar' : <Icon type="loading" style={{ fontSize: 24 }} spin />}
              </button>
            );
          }}
        </Mutation>

        <hr />
        <Link to="/register">Criar conta grátis</Link>
      </>
    );
  }
}

const mapDispatchToProps = {
  setCredentials: Actions.setCredentials,
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
