import { Layout, Menu, Button } from 'antd';
import React, { useState } from 'react';
import AtomicByDomain from "../components/atomicTree"
import IndexDetail from "../components/indexDetail"
import AtomicForm from "./forms/atomic"
import { headerItems } from '../global'
import { PlusCircleOutlined } from '@ant-design/icons';
import logo from '../favicon.png';

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const { Header, Content, Sider } = Layout;

const atomicBrowser = () => {
  const [indexPath, setIndexPath] = useState("指标层级");
  const [indexDetail, setIndexDetail] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const updateBreadcrumb = (path) => { setIndexPath(path) }
  const updateDetailOfIndex = (path) => { setIndexDetail(path) }

  const addNewIndex = () => {
    setIsFormOpen(true)
  }

  const handleOK = () => {
    setIsFormOpen(false)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
  }

  return (
    <>
      <Header className="header">
        <img src={logo} alt="fireSpot"/>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={"Atomic"}/>
      </Header>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider width={300} className="light-sider">
          <AtomicByDomain updateBreadcrumb={updateBreadcrumb} updateDetailOfIndex={updateDetailOfIndex} />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }} >
            <div style={{ margin: '16px 0' }}
            >
              <span>{indexPath}</span>
            </div>
            <div className="site-layout-background" >
              <IndexDetail {...indexDetail} />
            </div>
            <div style={{textAlign: 'center', marginTop:20}}>
              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={addNewIndex}>
                  新增一个原子指标
              </Button>
              <AtomicForm isFormOpen={isFormOpen} handleOK={handleOK} handleCancel={handleCancel} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default atomicBrowser;