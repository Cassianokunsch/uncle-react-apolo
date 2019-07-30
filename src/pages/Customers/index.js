import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Creators as Actions } from '../../store/ducks/seller';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ME_CUSTOMERS = gql`
  query {
    me {
      customers {
        id
        companyName
        mainContactName
        email
      }
    }
  }
`;

const columns = [
  {
    title: 'Razão Social',
    dataIndex: 'companyName',
  },
  {
    title: 'Principal Pessoa de Contato',
    dataIndex: 'mainContactName',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
  },
];

const expandedRowRender = () => {
  const columns = [
    { title: 'Data', dataIndex: 'date', key: 'date' },
    { title: 'Pessoa de Contato', dataIndex: 'name', key: 'name' },
    { title: 'Descrição', dataIndex: 'descricao', key: 'descricao' },
  ];

  const data = [
    {
      date: '12/12/1202',
      name: 'joao',
    },
    {
      date: '12/12/1202',
      name: 'joao',
    },
    {
      date: '12/12/1202',
      name: 'joao',
    },
  ];
  return <Table columns={columns} size="small" bordered dataSource={data} pagination={false} />;
};

class Customers extends Component {
  state = { data: null };

  onCompletedQuery = ({ me: { customers } }) => {
    this.props.setCustomers(customers);
    this.setState({ data: customers });
  };

  render() {
    return (
      <Query query={ME_CUSTOMERS} onCompleted={this.onCompletedQuery}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Table
                size="small"
                columns={columns}
                dataSource={data && null}
                loading={loading}
                bordered
                title={() => 'Header'}
                footer={() => 'Footer'}
              />
            );
          const { customers } = data.me;
          return (
            <Table
              size="small"
              rowKey={record => record.id}
              columns={columns}
              expandedRowRender={expandedRowRender}
              dataSource={customers}
              loading={loading}
              bordered
              title={() => 'Header'}
              footer={() => 'Footer'}
            />
          );
        }}
      </Query>
    );
  }
}

const mapDispachToProps = {
  setCustomers: Actions.setCustomers,
};

export default connect(
  null,
  mapDispachToProps,
)(withRouter(Customers));
