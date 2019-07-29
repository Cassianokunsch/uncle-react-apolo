import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Spinner } from 'react-bootstrap';
import { setCredentials } from '../../store';
import { parseEmail } from '../../utils';
import { LOGIN_MUTATION } from '../../services/apolo/mutation';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  handleSignIn = async data => {
    const { token } = data.login;
    await setCredentials(token);
    this.props.history.push(`/`);
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
                {!loading ? 'Entrar' : <Spinner animation="border" size="sm" />}
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

export default withRouter(SignIn);
