import { Card, Col, Row, Tag, Divider } from 'antd';
import React from 'react';

import 'antd/dist/antd.css';
import './cardWall.css';

const wallConstruct = (data) => {
    const dataChunk = _.chunk(data,3);
    const generateTag = (tags) => tags.map((d) => <Tag key={d.name}> {d.name} </Tag>)
    const generateEle = (name, desc, attrs) => <Col span={8} key={`col-${name}`}> 
        <Card key={name} className='card' title={name} bordered={false}> 
            <div>
                {generateTag(attrs)}
                <br /> <br />
                {desc} 
            </div>
        </Card> 
    </Col>
    const wallLine = (fragment, i) => <Row key={i} gutter={16} className="wall-line"> 
        {fragment.map((d) => generateEle(d['维度'], d['定义'], d['属性'] || []))}
    </Row>
    return dataChunk.map((chunk, i) => wallLine(chunk, i))
}

const cardWall = (props) => (
  <div className="site-card-wrapper">
    {wallConstruct(props.data)}
  </div>
);

export default cardWall;