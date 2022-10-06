import { Layout, Menu, Row, Col, Card, Space, Button } from 'antd';
import React, { useState } from 'react';
import AtomicSelector from "../components/atomicSelector"
import DimSelector from "../components/dimSelector"
import ArtifactPreview from "../components/artifactPreview"
import RuleSelector from "../components/ruleSelector"
const { Header } = Layout;
import { headerItems } from '../global'

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const groupEditor = () => {

  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [checkedDims, setCheckedDims] = useState([]);

  const updateCheckedIndexes = (indexes) => {
    setCheckedIndexes(indexes)
  }

  const updateCheckedDims = (dims) => {
    setCheckedDims(dims)
  }

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
                        <AtomicSelector updateCheckedIndexes={updateCheckedIndexes}/>
                    </Card>  
                </Col>

                <Col span={6}> 
                    <Card style={{ width: '100%'}} title="维度筛选" >
                        <DimSelector updateCheckedDims={updateCheckedDims} />
                    </Card>  
                </Col>

                <Col span={10}> 
                    <RuleSelector />
                </Col>
            </Row>

            <Row gutter={16}>
                <Card style={{ width: '98vw'}} title="指标组预览" extra={<Button type="primary">导出</Button>}>
                    <ArtifactPreview checkedIndexes={checkedIndexes} checkedDims={checkedDims} />
                </Card>  
            </Row>
        </Space>
      </Layout>
    </>
  );
};

export default groupEditor;