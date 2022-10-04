import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import React, { useState, useEffect } from 'react';
import { getAtomicIndicators } from '../../data.index';
import _ from 'lodash';

const atomicByDomain = (props) => {

const [treeData, setTreeData] = useState([]);

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
        const indexesByDomain = _.groupBy(data.data, '业务域')
        let nestedIndicators = []
    
        for(const domain in indexesByDomain) {
            const domainIndexes = indexesByDomain[domain]
            const indexesByTheme = _.groupBy(domainIndexes, '一级分类')
            const topChildren = []
            for (const theme in indexesByTheme) {
                const themeIndexes = indexesByTheme[theme]
                const leafIndexes = themeIndexes.map((d) => {
                    return { title: d['指标名称'], key: domain + '_' + theme + '_' + d['指标名称'], data: d}
                })
                topChildren.push( { 
                    title: theme, key: domain + '_' + theme, children: leafIndexes, icon: <CarryOutOutlined />
                })
            }
            domain !== '' && nestedIndicators.push({title: domain, key: domain, children: topChildren, icon: <FormOutlined /> })
        }
        setTreeData(nestedIndicators)
      })
  }, [])

  return (
    <div>
      <Tree
        showLine
        showIcon
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default atomicByDomain;