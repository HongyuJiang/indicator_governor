import { Layout, Menu, Button } from 'antd';
import React, { useState } from 'react';
import AtomicByDomain from "../components/atomicTree"
import IndexDetail from "../components/indexDetail"
import AtomicForm from "./forms/atomic"
import NavHeader from '../components/navHeader';
import { PlusCircleOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const { Content, Sider } = Layout;

const atomicBrowser = () => {
  const [indexPath, setIndexPath] = useState("指标层级");
  const [indexDetail, setIndexDetail] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [action, setAction] = useState('add');
  const updateBreadcrumb = (path) => { setIndexPath(path) }
  const updateDetailOfIndex = (info) => { setIndexDetail(info) }

  const addNewIndex = () => {
    setIsFormOpen(true)
    setAction('add')
  }

  const updateIndex = () => {
    setIsFormOpen(true)
    setAction('update')
  }

  const handleOK = () => {
    setIsFormOpen(false)
    setShouldUpdate(Math.random())
  }

  const handleCancel = () => {
    setIsFormOpen(false)
  }

  return (
    <>
      <NavHeader selectedKeys={"Atomic"}/>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider width={300} className="light-sider">
          <AtomicByDomain shouldUpdate={shouldUpdate} updateBreadcrumb={updateBreadcrumb} updateDetailOfIndex={updateDetailOfIndex} />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }} >
            <div style={{ margin: '16px 0' }} >
              <span>{indexPath}</span>
            </div>
            <div className="site-layout-background" >
              <IndexDetail {...indexDetail} onEditBtnClick={updateIndex} />
            </div>
            <div style={{textAlign: 'center', marginTop:20}}>
              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={addNewIndex}>
                  新增一个原子指标
              </Button>
              <AtomicForm 
                    action={action} 
                    isFormOpen={isFormOpen} 
                    handleOK={handleOK} 
                    handleCancel={handleCancel} 
                    initialValues={action === 'add' ? {} : {...indexDetail}}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default atomicBrowser;