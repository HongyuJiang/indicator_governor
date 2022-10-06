import { Segmented, Card, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { getStatRule } from '../../data.index';
import _ from 'lodash';

import './dimSelector.css';

const assignColor = (category) => {
    if(category === '当前值') return 'blue'
    else if(category.indexOf('环') > -1) return 'green'
    else if(category.indexOf('同') > -1) return 'purple'
}

const onDragEnd = (e) => {
    console.log(e)
}

const ruleSelector = (props) => {

    const [statRules, setStatRules] = useState({});
    const [statRulesFocused, setStatRulesFocused] = useState([]);
    const [statPeriod, setStatPeriod] = useState('日');

    const onStatPeriodChange = (value) => {
        setStatPeriod(value)
        setStatRulesFocused(statRules[value])
    }

    useEffect(() => {
        getStatRule().then((graphData) => {
            const screening = (data) => {
                return _.filter(data, (d) => d['统计时点'] != '期初' && d['统计时点'].indexOf('最') === -1)
            }
            const rules = _.groupBy(screening(graphData.data), '统计周期')
            setStatRules(rules)
            setStatRulesFocused(rules[statPeriod])
        })
    }, [])

    return (

        <Card title="统计规则" extra={<Segmented options={['日', '月', '季度', '年', '上市以来', '截止']} onChange={onStatPeriodChange}/>}>
            <div className='ruleSelector' style={{height: 300, overflowY: 'auto'}}>
                {statRulesFocused.map((d) => 
                    <Tag key={d['统计规则']} color={assignColor(d['统计方法'])} draggable onDragEnd={onDragEnd} style={{margin:8}}>{d['统计规则']}</Tag>
                )}
            </div>
        </Card>
    );
};

export default ruleSelector;