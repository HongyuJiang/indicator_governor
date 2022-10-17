import _ from 'lodash'
import { Form, Input } from 'antd';
import React from 'react';

const flatObject = (object, leafInfo, prefix='') => {
    const flatten = []
    for (let key in object) {
        flatten.push({ 'name': key, 'id': `${prefix}_${key}`, 'children': object[key].map(leafInfo), collapsed: true})
    }
    return flatten
}

export const bindAttr2Dim = (dims, attrs) => {

    const structedAttrs = _.groupBy(attrs, '维度')
    let nestedAttrs = {}
    for (let dim in structedAttrs) {
        nestedAttrs[dim] = flatObject(_.groupBy(structedAttrs[dim], '维度属性'), (d) => d['维度值'])
    }

    return dims.map((dim) => {
        dim['属性'] = nestedAttrs[dim['维度']]
        return dim
    })
}

export const structuringList = (arr) => {

    const generateLeafInfo = (d) => {
        return {'id':d["统计周期"] + '_' + d["统计方法"] + '_' + d["统计规则"], 'name': d["统计规则"] }
    }
    const nestedArray = []
    const firstLevel = _.groupBy(arr, '统计周期')
    for (let firstDim in firstLevel) {
        const secondEle = flatObject(_.groupBy(firstLevel[firstDim], '统计方法'), generateLeafInfo, firstDim)
        nestedArray.push({ id:firstDim, name: firstDim, children: secondEle, collapsed: true })
    }
    return { id: 'root', name: '统计规则', children: nestedArray}
}

export const getParentKey = (key, tree) => {
  let parentKey;

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];

    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }

  return parentKey;
};


export const indexFormat = (originIndexes) => {

    return originIndexes.map((d) => {
        return {
            name: d.data['指标名称'],
            defination: d.data['业务定义'],
            unit: d.data['度量单位'],
            type: 'index',
        }
    })
}

export const dimFormat = (originIndexes) => {

    return originIndexes.map((d) => {
        return {
            name: d['维度'],
            defination: d['定义'],
            type: 'dimension'
        }
    })
}

export const attrFormat = (originIndexes) => {

    return originIndexes.map((d) => {
        return {
            ...d,
            type: 'attr'
        }
    })
}

export const splitFields = (values, fields) => {

    const newValues = {...values}
    fields.forEach((field) => {
        if (newValues[field]) {
            newValues[field] = newValues[field].split((/，|,/)).filter((d) => d !== ' ')
        }
    })
    return newValues
}

export const joinFields = (values, fields) => {

    const newValues = {...values}
    fields.forEach((field) => {
        if (newValues[field]) {
            newValues[field] = newValues[field].join(',')
        }
    })
    return newValues
}

const requireMsg = (d) => {
    return [{
        required: true,
        message: `${d}对于指标是必要的哦`,
    }]
}

export const addFormItem = (name, label, required, layout = {}, children=<Input />) => {
    return <Form.Item
        name={name}
        label={label}
        rules={required ? requireMsg(label) : []}
        {...layout}
    >
        {children}
    </Form.Item>
}
