import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 52, 98);
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;

  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }

  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: rgba(0, 52, 98, 0.8);
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;

export const Title = styled.div`
  padding: 20px;
  width: 100%;

  h1 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
  h2 {
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
