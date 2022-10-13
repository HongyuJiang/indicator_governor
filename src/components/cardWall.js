import { Card, Col, Row, Tag, Tooltip, Button } from 'antd';
import React from 'react';
import _ from 'lodash'
import { EditOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './cardWall.css';

const cardWall = (props) => {

    const { onEditBtnClick } = props

    const wallConstruct = (data) => {
        const dataChunk = _.chunk(data, 3);
        const generateTag = (tags) => tags.map((d) =>
            <Tooltip key={d.name} placement="topLeft" title={_.join(d.children, '、')}>
                <Tag color="blue" key={d.name}> {d.name} </Tag>
            </Tooltip>
        )
        const generateEle = (domain, name, desc, attrs) => <Col span={8} key={`col-${name}`}>
            <Card key={name} 
                  className='card' 
                  title={name} 
                  bordered={false} 
                  extra={<Button onClick={onEditBtnClick(domain, name, desc, attrs)} 
                  shape="circle" 
                  icon={<EditOutlined />} />}>
                <div>
                    {generateTag(attrs)}
                    <br /> <br />
                    {desc}
                </div>
            </Card>
        </Col>
        const wallLine = (fragment, i) => <Row key={i} gutter={36} className="wall-line">
            {fragment.map((d) => generateEle(d['领域'], d['维度'], d['定义'], d['属性'] || []))}
        </Row>
        return dataChunk.map((chunk, i) => wallLine(chunk, i))
    }

    return <div className="site-card-wrapper">
        {wallConstruct(props.data)}
    </div>
};

export default cardWall;