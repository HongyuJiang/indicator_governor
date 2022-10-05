import { Tabs, Tree } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons'; 
import React, { useState, useEffect } from 'react';
import { getCommonDimensions, getAttributes } from '../../data.index';
import { bindAttr2Dim } from '../util'
import _ from 'lodash';

import './dimSelector.css';

const structuringList = (data) => {

    const indexesByDomain = _.groupBy(data, '领域')
    let nestedIndicators = []

    for (const domain in indexesByDomain) {
        const leafIndexes = indexesByDomain[domain].map((d) => {
            return { title: d['维度'], key: domain + "_" + d['维度'], data: d }
        })
        domain !== '' && nestedIndicators.push({ title: domain, key: domain, children: leafIndexes, icon: <ApartmentOutlined /> })
    }

    return nestedIndicators
}

const dimSelector = (props) => {

    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        getCommonDimensions().then((dimData) => {
            getAttributes().then((attrData) => {
                const dims = dimData.data
                const attrs = attrData.data
                const dimWithAttr = bindAttr2Dim(dims, attrs);
                console.log(dimWithAttr)
                const nestedDims = structuringList(dimWithAttr)
                setTreeData(nestedDims)

            })
        })
    }, [])

    return (
        <div className='dimSelector'>
            {treeData.length > 0 && <Tabs
                tabPosition={'left'}
                items={treeData.map((d, i) => {
                    const id = String(i + 1);
                    return {
                        label: d.title,
                        key: id,
                        children: <Tree checkable treeData={treeData[i].children} />,
                    };
                })}
            //onChange={onTabChange}
            />}

        </div>
    );
};

export default dimSelector;