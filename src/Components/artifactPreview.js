import { Table, Tabs, Button } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { generateColumns } from './artifactColumns';
import { indexFormat, dimFormat, attrFormat } from '../util'
import { toExcel } from '../export'

import './artifactPreview.css'

const generateTable = (columns, tabular) => {
    return <Table columns={columns}
        dataSource={tabular}
        pagination={false}
        bordered
        rowKey={(record) => { return record.id + Date.now() }}
    />;
}

const generateMultiTable = (columns, dataset) => {
    let items = []
    for(let tabKey in dataset){
        items.push({
            label: `指标组 ${tabKey}`,
            key: tabKey,
            children: generateTable(columns, dataset[tabKey]),
        })
    }
    return items
}

const artifactPreview = (props) => {

    const { checkedIndexes, checkedDims, 
            ruleTag, dragStatus, checkedAttrs, 
            needReset, updateshowGroupId } = props

    const [ruleTarget, setRuleTarget] = useState(undefined);
    const [tabular, setTabular] = useState([]);
    const [tabularByKey, setTabularByKey] = useState({});
    const [columns, setColumns] = useState([]);
    const [activeKey, setActiveKey] = useState('1');
    const newTabIndex = useRef(1);
    const [items, setItems] = useState([])

    const onTagDrop = (e) => {
        setRuleTarget(e.target)
    }

    useEffect(() => {
        setColumns(generateColumns(onTagDrop))
    }, [])

    useEffect(() => {

        const indexTabular = indexFormat(checkedIndexes)
        const dimTabular = dimFormat(checkedDims)
        const attTabular = attrFormat(checkedAttrs)
        let tabular = dimTabular.concat(attTabular.concat(indexTabular))

        tabular.forEach((d, i) => {
            d.rowSpan = 0
            d.id = i
        })
        if (tabular.length > 0) tabular[0].rowSpan = tabular.length
        
        setTabular(tabular)

    }, [checkedIndexes, checkedDims, checkedAttrs])

    useEffect(() => {
        if (ruleTarget && ruleTag && dragStatus) {
            const id = parseInt(ruleTarget.id)
            const targetIndex = _.findIndex(tabular, { 'id': id });
            tabular[targetIndex].rule = ruleTag.name
            tabular[targetIndex].category = ruleTag.category
            setTabular([...tabular])
        }
    }, [ruleTarget, ruleTag])

    useEffect(() => {
        if (!dragStatus) setRuleTarget(undefined)
    }, [dragStatus])

    useEffect(() => {
        const items = generateMultiTable(columns, tabularByKey)
        setItems(items)
    }, [tabularByKey])
    
    useEffect(() => {
        const cp = {...tabularByKey}
        cp[activeKey] = tabular
        setTabularByKey(cp)
    }, [tabular, activeKey])

    const onTabChange = (activeKey) => {
        setActiveKey(activeKey);
        updateshowGroupId(activeKey)
    }

    const addTable = () => {
        const newActiveKey = `${++newTabIndex.current}`;
        setTabular([])
        setActiveKey(newActiveKey);
        updateshowGroupId(newActiveKey)
    };

    const exportTable = () => {
        toExcel(columns, tabularByKey[activeKey], '未命名', activeKey)
    };
    
    const OperationsSlot = (onClick) => { return {
        left: <Button className="tabs-extra-demo-button">指标组预览</Button>,
        right: <div><Button type="primary" onClick={onClick}>新建</Button> <Button type="info" onClick={exportTable}>导出</Button></div>,
    }};

    return <Tabs
        defaultActiveKey="1"
        onChange={onTabChange}
        tabBarExtraContent={OperationsSlot(addTable)}
        activeKey={activeKey}
        items={items}
    />
}

export default artifactPreview;