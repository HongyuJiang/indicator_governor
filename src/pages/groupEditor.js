import { Layout, Row, Col, Card, Space } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import AtomicSelector from "../components/atomicSelector"
import DimSelector from "../components/dimSelector"
import ArtifactPreview from "../components/artifactPreview"
import RuleSelector from "../components/ruleSelector"
import AttrSelector from "../components/attrSelector"
import NavHeader from '../components/navHeader';

import 'antd/dist/antd.css';
import './atomicBrowser.css';

const GroupEditor = () => {

  const [checkedIndexes, setCheckedIndexes] = useState([]);
  const [checkedDims, setCheckedDims] = useState([]);
  const [attrsCandidates, setAttrsCandidates] = useState([]);
  const [checkedAttrs, setCheckedAttrs] = useState([]);
  const [ruleTag, setRuleTag] = useState({});
  const [dragStatus, setDragStatus] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [showGroupId, setShowGroupId] = useState('1');
  const [prevGroupId, setPrevGroupId] = useState('1');

  const dimSelectorRef = useRef();
  const atomicSelectorRef = useRef();
  const attrSelectorRef = useRef();

  const updateDragStatus = (status) => {
    setDragStatus(status)
  }

  const updateCheckedIndexes = (indexes) => {
    setCheckedIndexes(indexes)
  }

  const updateCheckedDims = (dims) => {
    setCheckedDims(dims)
  }

  const updateRelatedAttrs = (attrs) => {
    setAttrsCandidates(attrs)
  }

  const updateCheckedAttrs = (attrs) => {
    setCheckedAttrs(attrs)
  }

  const updateRuleTag = (tag) => {
    setRuleTag(tag)
  }

  const needReset = (tag) => {
    setResetFlag(true)
  }

  const updateshowGroupId = (groupID) => {
    setPrevGroupId(showGroupId)
    setShowGroupId(groupID)
  }

  useEffect(() => {
    setAttrsCandidates([])
    dimSelectorRef.current.resetDim(prevGroupId, showGroupId)
    atomicSelectorRef.current.resetAtomic(prevGroupId, showGroupId)
    attrSelectorRef.current.resetAttr(prevGroupId, showGroupId)
  }, [showGroupId])

  return (
    <>
      <NavHeader selectedKeys={"GroupEditor"}/>
      <Layout style={{ minHeight: '100vh' }}>
        <Space size={'middle'} direction={'vertical'} style={{ padding: 20 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card style={{ width: '100%' }} title="原子指标筛选" >
                <AtomicSelector ref={atomicSelectorRef} updateCheckedIndexes={updateCheckedIndexes} />
              </Card>
            </Col>

            <Col span={6}>
              <Card style={{ width: '100%' }} title="维度筛选" >
                <DimSelector ref={dimSelectorRef} updateCheckedDims={updateCheckedDims} updateRelatedAttrs={updateRelatedAttrs} />
              </Card>
            </Col>

            <Col span={4}>
              <Card style={{ width: '100%' }} title="维度属性" >
                <AttrSelector ref={attrSelectorRef} attrsCandidates={attrsCandidates} updateCheckedAttrs={updateCheckedAttrs} />
              </Card>
            </Col>

            <Col span={8}>
              <RuleSelector updateRuleTag={updateRuleTag} updateDragStatus={updateDragStatus} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Card style={{ width: '98vw' }} >
              <ArtifactPreview
                ruleTag={ruleTag}
                dragStatus={dragStatus}
                needReset={needReset}
                updateshowGroupId={updateshowGroupId}
                checkedIndexes={checkedIndexes}
                checkedAttrs={checkedAttrs}
                checkedDims={checkedDims} />
            </Card>
          </Row>
        </Space>
      </Layout>
    </>
  );
};

export default GroupEditor;