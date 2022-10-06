import { Tag } from 'antd';
import React from 'react';

const temp = {};

const onTagDrop = (e) => {
    console.log(e)
}

export const columns = [
    {
        title: '指标主题',
        dataIndex: 'theme',
        key: 'theme',
        onCell: (record) => {
            return { rowSpan: record.rowSpan }
        },
        render: text => <span>未命名</span>
    },
    {
        title: '指标组ID',
        dataIndex: 'id',
        onCell: (record) => {
            return { rowSpan: record.rowSpan }
        },
        key: 'id',
        render: text => <span>1</span>
    },
    {
        title: '字段类型/统计规则',
        dataIndex: 'rule',
        key: 'rule',
        render: text => <div onDragEnter={onTagDrop}>待输入</div>
    },
    {
        title: '维度/属性/指标',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '统计口径',
        key: 'defination',
        dataIndex: 'defination',
    },
    {
        title: '单位',
        key: 'unit',
        render: (_, { unit }) => (
            unit && <Tag color={'blue'} key={unit}> {unit} </Tag>
        ),
    },
    {
        title: '精度',
        key: 'precision'
    },
];
