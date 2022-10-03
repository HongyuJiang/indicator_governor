import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import React, { useState } from 'react';
import { getAtomicIndicators } from '../../data.index';
import * as _ from 'lodash';

let defalutData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];

const atomicByDomain = () => {

const [treeData, setTreeData] = useState(defalutData);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  getAtomicIndicators().then((data) => {
    const indexesByDomain = _.groupBy(data.data, '业务域')
    let nestedIndicators = []

    for(const domain in indexesByDomain) {
        const domainIndexes = indexesByDomain[domain]
        const indexesByTheme = _.groupBy(domainIndexes, '一级分类')
        const topChildren = []
        for (const theme in indexesByTheme) {
            const themeIndexes = indexesByTheme[theme]
            const leafIndexes = themeIndexes.map((d) => {return { title: d['指标名称'], key: domain + '_' + theme + '_' + d['指标名称']}})
            topChildren.push({title: theme, key: domain + '_' + theme, children: leafIndexes, icon: <CarryOutOutlined /> })
        }
        domain !=='' && nestedIndicators.push({title: domain, key: domain, children: topChildren, icon: <FormOutlined /> })
    }
    setTreeData(nestedIndicators)
  })

  return (
    <div>
      <Tree
        showLine={true}
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default atomicByDomain;