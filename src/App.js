import React, { Component } from 'react';
import { Spectrogram, Uploader } from './components';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
const SpectrogramStyles = {
  width: '95vw',
  height: '50vh',
  border: '1px solid',
  margin: '0 auto'
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    }
  }
  render() {
    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Spectrogram style={SpectrogramStyles} />
          <Uploader /> 
        </Content>
      </Layout>
    );
  }
}

export default App;

