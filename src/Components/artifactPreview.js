import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { columns } from './artifactColumns';
import { indexFormat, dimFormat } from '../util'

const artifactPreview = (props) => {

    const { checkedIndexes, checkedDims } = props
    const indexTabular = indexFormat(checkedIndexes)
    const dimTabular = dimFormat(checkedDims) 
    let tabular = dimTabular.concat(indexTabular)
    
    tabular.forEach((d, i) => {
        d.rowSpan = 0
        d.key = i
    })
    if(tabular.length > 0)
        tabular[0].rowSpan = tabular.length

    useEffect(() => {

    }, [])

    return <Table columns={columns} dataSource={tabular} pagination={false} bordered />;
}

export default artifactPreview;