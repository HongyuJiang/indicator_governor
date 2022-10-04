import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import AtomicByDomain from "../components/atomicByDomain"
import IndexDetail from "../components/indexDetail"
const { Header, Content, Footer, Sider } = Layout;

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const headerItems = [
  { key: 'Atomic', label: ( <a href="/atomicBrowser"> 原子指标 </a> )},
  { key: 'Dimension', label: ( <a href="/dimBrowser"> 统计维度 </a> )},
  { key: 'Rule', label: ( <a href="/ruleBrowser"> 统计规则 </a> ) }
]

const atomicBrowser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [indexPath, setIndexPath] = useState("指标层级");
  const [indexDetail, setIndexDetail] = useState({});
  const updateBreadcrumb = (path) => { setIndexPath(path) }
  const updateDetailOfIndex = (path) => { setIndexDetail(path) }

  return (
    <>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={"Atomic"}/>
      </Header>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider width={350} className="light-sider">
          <AtomicByDomain updateBreadcrumb={updateBreadcrumb} updateDetailOfIndex={updateDetailOfIndex} />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }} >
            <Breadcrumb style={{ margin: '16px 0' }}
            >
              <Breadcrumb.Item>{indexPath}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" >
              <IndexDetail {...indexDetail} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }} >
            Hongyu@Thoughtworks ©2022
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default atomicBrowser;