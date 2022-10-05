import { Layout, Menu, Row, Col, Card, Space } from 'antd';
import React, { useState } from 'react';
import AtomicSelector from "../components/atomicSelector"
import DimSelector from "../components/dimSelector"
import ArtifactPreview from "../components/artifactPreview"
const { Header } = Layout;
import { headerItems } from '../global'

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const groupEditor = () => {
  const [indexPath, setIndexPath] = useState("指标层级");
  const [indexDetail, setIndexDetail] = useState({});
  const updateBreadcrumb = (path) => { setIndexPath(path) }
  const updateDetailOfIndex = (path) => { setIndexDetail(path) }

  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={"GroupEditor"}/>
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Space size={'middle'} direction={'vertical'} style={{padding: 20}}>
            <Row gutter={16}>
                <Col span={8}> 
                    <Card style={{ width: '100%'}} title="原子指标筛选" >
                        <AtomicSelector />
                    </Card>  
                </Col>

                <Col span={8}> 
                    <Card style={{ width: '100%'}} title="维度筛选" >
                        <DimSelector />
                    </Card>  
                </Col>
            </Row>

            <Row gutter={16} style={{textAlign: 'center'}}>
                <Card style={{ width: '90vw'}} title="指标组预览" >
                    <ArtifactPreview />
                </Card>  
            </Row>
        </Space>
      </Layout>
    </>
  );
};

export default groupEditor;