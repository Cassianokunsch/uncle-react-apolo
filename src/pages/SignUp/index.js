import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { Icon } from 'antd';
import { Creators as Actions } from '../../store/ducks/seller';
import { parseEmail } from '../../utils';
import { SIGNUP_MUTATION } from '../../services/apolo/mutation';

class SignUp extends Component {
  state = { email: '', password: '', name: '', error: '' };

  handleSignUp = async ({
    signUp: {
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
    const { email, password, name } = this.state;
    if (!email || !password || !name) {
      this.setState({ error: 'Preencha todos os campos!' });
    } else if (!parseEmail.test(email.trim())) {
      this.setState({ error: 'Formato de e-mail inválido' });
    } else {
      mutation();
    }
  };

  render() {
    const { email, password, name, error } = this.state;
    return (
      <>
        <input
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
          type="text"
          placeholder="Nome Completo"
        />

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
          mutation={SIGNUP_MUTATION}
          variables={{ email: email.trim(), password, name: name.trim() }}
          onCompleted={data => this.handleSignUp(data)}
          onError={errors => this.handleError(errors)}
        >
          {(mutation, { loading }) => {
            if (loading && error !== '') this.setState({ error: '' });
            return (
              <button onClick={() => this.validateForm(mutation)} disabled={loading}>
                {!loading ? 'Criar conta' : <Icon type="loading" style={{ fontSize: 24 }} spin />}
              </button>
            );
          }}
        </Mutation>

        <hr />
        <Link to="/login">Já tem uma conta?</Link>
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
)(withRouter(SignUp));
