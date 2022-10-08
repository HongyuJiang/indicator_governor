import { Tag } from 'antd';
import React from 'react';

const temp = {};

const assignColor = (category) => {
    if(category === '当前值') return 'blue'
    else if(category.indexOf('环') > -1) return 'green'
    else if(category.indexOf('同') > -1) return 'purple'
}

export const generateColumns = (onTagDrop) => {
    return [
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
        dataIndex: 'gid',
        onCell: (record) => {
            return { rowSpan: record.rowSpan }
        },
        key: 'gid',
        render: text => <span>1</span>
    },
    {
        title: '字段类型/统计规则',
        dataIndex: 'rule',
        key: 'rule',
        render: (text, d) => {
            if (d.type === 'index') {
                if (d.rule) 
                    return <Tag id={d.id} 
                                onDragEnter={onTagDrop} 
                                color={assignColor(d.category)}>
                                {d.rule}
                           </Tag>
                else return <div 
                                id={d.id} 
                                onDragEnter={onTagDrop}>
                                {'待输入'} 
                            </div>
            }
            else if (d.type === 'attr') return <Tag color={'orange'}>属性</Tag>
            else return <Tag color={'red'}>维度</Tag>
        }
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
        render: (_, { unit }) => {
            if(unit && unit !== 'NA')
                return unit.split('，').map((d) => <Tag color={'gray'} key={d}> {d} </Tag>)
            else if(unit === 'NA')
                return <Tag color={'gray'} key={'NA'}>无</Tag>
        },
    },
    {
        title: '精度',
        key: 'precision',
        render: (_, { unit, type }) => {
            if(type !== 'index')
                return ''
            else return <Tag color={'gray'}>两位小数</Tag>
        },
    },
]}