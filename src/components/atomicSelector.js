import { ApartmentOutlined } from '@ant-design/icons'; 
import { Tabs, Tree } from 'antd';
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { getAtomicIndicators } from '../data.index';
import _ from 'lodash';

import './atomicSelector.css';

const atomicByDomain = forwardRef((props, ref) => {

    const [treeData, setTreeData] = useState([]);
    const [indexAttr, setIndexAttr] = useState([]);
    const [checkedIndexes, setCheckedIndexes] = useState(true);
    const [groupStore, setGroupStore] = useState({});

    useImperativeHandle(ref, () => ({
        resetAtomic: (prevId, curId) => {
            let newStore = {...groupStore}
            newStore[prevId] = checkedIndexes
            setGroupStore(newStore)
            
            if (curId in groupStore){
                setCheckedIndexes(groupStore[curId])
            }
            else {
                setCheckedIndexes([])
            }
        },
      }));

    const onCheck = (checkedKeysValue) => {
        setCheckedIndexes(checkedKeysValue)
    };

    useEffect(() => {
        const selectedIndexes = _.filter(indexAttr, (d) => checkedIndexes.indexOf(d.key) > -1)
        props.updateCheckedIndexes(selectedIndexes)
    }, [checkedIndexes])

    useEffect(() => {
        getAtomicIndicators().then((data) => {
            const indexesByDomain = _.groupBy(data.data, '业务域')
            let nestedIndicators = []
            let flattenIndicators = []

            for (const domain in indexesByDomain) {
                const domainIndexes = indexesByDomain[domain]
                const indexesByTheme = _.groupBy(domainIndexes, '一级分类')
                const topChildren = []
                for (const theme in indexesByTheme) {
                    const themeIndexes = indexesByTheme[theme]
                    const leafIndexes = themeIndexes.map((d) => {
                        return { title: d['指标名称'], key: domain + '_' + theme + '_' + d['指标名称'], data: d }
                    })
                    topChildren.push({
                        title: theme, key: domain + '_' + theme, children: leafIndexes, icon: <ApartmentOutlined />
                    })
                    flattenIndicators = flattenIndicators.concat(leafIndexes)
                }
                domain !== '' && nestedIndicators.push({ title: domain, key: domain, children: topChildren, icon: <ApartmentOutlined /> })
            }

            setTreeData(nestedIndicators)
            setIndexAttr(flattenIndicators)
        })
    }, [])

    return (
        <div className='atomicSelector'>
            {treeData.length > 0 && <Tabs
                tabPosition={'left'}
                items={treeData.map((d, i) => {
                const id = String(i + 1);
                return {
                    label: d.title,
                    key: id,
                    children: <Tree checkable checkedKeys={checkedIndexes} onCheck={onCheck} treeData={treeData[i].children} />,
                };
                })}
            />}
            
        </div>
    );
});

export default atomicByDomain;