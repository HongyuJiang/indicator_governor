import { Tabs, Tree } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons'; 
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
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

const dimSelector = forwardRef((props, ref) => {

    const [treeData, setTreeData] = useState([]);
    const [dimAttr, setDimAttr] = useState([]);
    const [checkedDims, setCheckedDims] = useState([]);
    const [groupStore, setGroupStore] = useState({});
    const { updateCheckedDims, updateRelatedAttrs } = props

    useImperativeHandle(ref, () => ({
        resetDim: (prevId, curId) => {

            let newStore = {...groupStore}
            newStore[prevId] = checkedDims
            setGroupStore(newStore)
            
            if (curId in groupStore){
                setCheckedDims(groupStore[curId])
            }
            else {
                setCheckedDims([])
            }
        },
      }), [checkedDims]);

    useEffect(() => {
        getCommonDimensions().then((dimData) => {
            getAttributes().then((attrData) => {
                const dims = dimData.data
                const attrs = attrData.data
                const dimWithAttr = bindAttr2Dim(dims, attrs);
                const nestedDims = structuringList(dimWithAttr)
                setTreeData(nestedDims)
                setDimAttr(dimWithAttr)
            })
        })
    }, [])

    const onCheck = (checkedKeysValue) => {
        setCheckedDims(checkedKeysValue)
    };

    useEffect(() => {
        const selectedDims = _.filter(dimAttr, (d) => 
        checkedDims.indexOf(d['领域'] + '_' + d['维度']) > -1)
        updateCheckedDims(selectedDims)
        let attrs = []
        selectedDims.forEach((d) => {
            attrs = attrs.concat(d['属性'].map((d) => { return {'name': d.name, 'defination': d.children[0]}}))
        })
        updateRelatedAttrs(attrs)
    }, [checkedDims])

    return (
        <div className='dimSelector'>
            {treeData.length > 0 && <Tabs
                tabPosition={'left'}
                items={treeData.map((d, i) => {
                    const id = String(i + 1);
                    return {
                        label: d.title,
                        key: id,
                        children: <Tree checkable checkedKeys={checkedDims} onCheck={onCheck} treeData={treeData[i].children} />,
                    };
                })}
            />}

        </div>
    );
});

export default dimSelector;