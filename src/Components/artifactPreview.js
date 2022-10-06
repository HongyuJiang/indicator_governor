import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import { generateColumns } from './artifactColumns';
import { indexFormat, dimFormat } from '../util'

const artifactPreview = (props) => {

    const [ruleTarget, setRuleTarget] = useState(undefined);
    const [tabular, setTabular] = useState([]);
    const [columns, setColumns] = useState([]);

    const onTagDrop = (e) => {
        console.log(e.target.id)
        setRuleTarget(e.target)
    }

    const { checkedIndexes, checkedDims, ruleTag, dragStatus } = props

    useEffect(() => {

        const indexTabular = indexFormat(checkedIndexes)
        indexTabular.forEach((d, i) => { d.type = 'index' })

        const dimTabular = dimFormat(checkedDims) 
        dimTabular.forEach((d, i) => { d.type = 'dimension' })

        let tabular = dimTabular.concat(indexTabular)

        tabular.forEach((d, i) => {
            d.rowSpan = 0
            d.id = i
        })
        if(tabular.length > 0)
            tabular[0].rowSpan = tabular.length

        setColumns(generateColumns(onTagDrop))
        setTabular(tabular)
    
    }, [checkedIndexes, checkedDims])

    useEffect(() => {
        
        if (ruleTarget && ruleTag && dragStatus) {
            const id = parseInt(ruleTarget.id)
            tabular[id].rule = ruleTag.name
            tabular[id].category = ruleTag.category
            setTabular([...tabular])
        }
    }, [ruleTarget, ruleTag])

    useEffect(() => {
        if(!dragStatus) setRuleTarget(undefined)
    }, [dragStatus])

    return <Table columns={columns} 
                dataSource={tabular} 
                pagination={false} 
                bordered 
                rowKey={(record) => {return record.id + Date.now()}}
            />;
}

export default artifactPreview;