import React from 'react';
import './App.css';
import { Row, Col, Layout } from 'antd';
import { ViewNotes, WithTimer } from '../src/views'
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className='headerStyle'>A SIMPLE TIMER AND NOTE APPLICATION</Header>
      <Content className='contentStyle'>
        <Row type="flex" justify="space-between">
          <WithTimer />
          <Col><ViewNotes /></Col>
        </Row>
      </Content>
      <Footer> All rights reserved </Footer>
    </Layout>
  )
}

export default App;
