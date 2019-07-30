import React from 'react';
import { connect } from 'react-redux';
import { Creators as Actions } from '../../../store/ducks/seller';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

function handleLogout(props) {
  props.clearStore();
  props.history.push('/login');
}

const DefaultLayout = props => {
  const { children, location, name } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ paddingRight: 10 }}>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ lineHeight: '64px' }}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/clientes">
            <Link to="/clientes">Clientes</Link>
          </Menu.Item>
          <Menu.Item key="/visitas">
            <Link to="/visitas">Visitas</Link>
          </Menu.Item>
          <Menu.Item style={{ float: 'right' }}>
            <Button type="link" onClick={() => handleLogout(props)}>
              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Sair</span>
            </Button>
          </Menu.Item>
          <Menu.Item key="/perfil" style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
            <Icon type="user" />
            <Link to="/perfil">{name}</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content style={{ margin: '10px 10px 0' }}>
          <div style={{ padding: 10, background: '#fff' }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

const mapDispachToProps = {
  clearStore: Actions.clearStore,
};

const mapStateToProps = ({ seller }) => ({
  name: seller.name,
});

export default connect(
  mapStateToProps,
  mapDispachToProps,
)(withRouter(DefaultLayout));
