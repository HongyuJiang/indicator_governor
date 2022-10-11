import { ApartmentOutlined } from '@ant-design/icons'; 
import { Tree, Input } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { getAtomicIndicators } from '../../data.index';
const { Search } = Input;
import { getParentKey } from '../util'
import _ from 'lodash';

const atomicTree = (props) => {

    const [treeData, setTreeData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [flattenIndexes, setFlattenIndexes] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onChange = (e) => {
        const { value } = e.target;
        let newExpandedKeys = []
        if(value !== '') {
            newExpandedKeys = flattenIndexes
            .map((item) => {
                if (item['指标名称'].indexOf(value) > -1) {
                    const key = item['业务域'] + '_' + item['一级分类'] + '_' + item['指标名称']
                    return getParentKey(key, treeData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        }

        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const onExpand = (newExpandedKeys) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onSelect = (_, info) => {
        const attr = info.node;
        props.updateBreadcrumb(info.node.key.replaceAll('_', ' / '))
        info.node.key.split('_').length > 2 && props.updateDetailOfIndex({
            name: attr.title,
            className: attr.data['二级分类'],
            stat_rules: attr.data['适用公共统计规则'],
            dimension: attr.data['常用维度'],
            range: attr.data['取值范围'],
            defination: attr.data['业务定义'],
            equation: attr.data['计算公式'],
            target: attr.data['指标归口业务部门'],
            unit: attr.data['度量单位'],
            condition: attr.data['范围及条件'],
            alias: attr.data['指标别名']
        })
    };

    useEffect(() => {
        getAtomicIndicators().then((data) => {

            setFlattenIndexes(data.data)
            const indexesByDomain = _.groupBy(data.data, '业务域')
            let nestedIndicators = []

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
                }
                domain !== '' && nestedIndicators.push({ title: domain, key: domain, children: topChildren, icon: <ApartmentOutlined /> })
            }
            setTreeData(nestedIndicators)
        })
    }, [])

    const semanticData = useMemo(() => {
        const loop = (data) =>
          data.map((item) => {
            const strTitle = item.title;
            const index = strTitle.indexOf(searchValue);
            const beforeStr = strTitle.substring(0, index);
            const afterStr = strTitle.slice(index + searchValue.length);
            const title =
              index > -1 ? (
                <span>
                  {beforeStr}
                  <span style={{color: 'red'}}>{searchValue}</span>
                  {afterStr}
                </span>
              ) : (
                <span>{strTitle}</span>
              );
    
            if (item.children) {
              return {
                title,
                key: item.key,
                icon: item.icon,
                children: loop(item.children),
              };
            }
    
            return {
              title,
              key: item.key,
              data: item.data,
            };
          });
    
        return loop(treeData);
      }, [treeData, searchValue]);

    return (
        <div>
            <Search placeholder="search index" onChange={onChange} style={{ width: 270, paddingBottom: 20 }} />
            <Tree
                showLine
                showIcon
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={semanticData}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
            />
        </div>
    );
};

export default atomicTree;