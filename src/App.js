import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import AtomicByDomain from "./Components/atomicByDomain"
const { Header, Content, Footer, Sider } = Layout;

import 'antd/dist/antd.css';
import './App.css';


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
        }}
      />
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider width={350} className="light-sider" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" />
          <AtomicByDomain />
        </Sider>
        <Layout className="site-layout">

          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;