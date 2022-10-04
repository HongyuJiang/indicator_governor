import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
const { Header, Content, Sider } = Layout;
import CardWall from "../components/cardWall"
import { getCommonDimensions, getAttributes } from '../../data.index';
import _ from 'lodash'
import { bindAttr2Dim } from '../util'

import 'antd/dist/antd.css';

const headerItems = [
    { key: 'Atomic', label: (<a href="/atomicBrowser"> 原子指标 </a>) },
    { key: 'Dimension', label: (<a href="/dimBrowser"> 统计维度 </a>) },
    { key: 'Rule', label: (<a href="/ruleBrowser"> 统计规则 </a>) }
]

const dimBrowser = () => {

    const [allDimensions, setAllDimensions] = useState([]);
    const [domains, setDomains] = useState([]);
    const [focusDomain, setFocusDomain] = useState("交易所");

    const onChangeDomain = (d, l) => {
        setFocusDomain(d.key)
    }

    useEffect(() => {
        getCommonDimensions().then((dimData) => {
            getAttributes().then((attrData) => {
                const dims = dimData.data
                const attrs = attrData.data
                const dimWithAttr = bindAttr2Dim(dims, attrs);
                setAllDimensions(_.groupBy(dimWithAttr, '领域'))
                const domains = _.uniq(dims.map((d) => d['领域'])).map((d, i) => {
                    return { key: d, label: d }
                })
                setDomains(domains)
            })
        })
    }, [])

    return (
        <>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Atomic']} items={headerItems} selectedKeys={"Dimension"} />
            </Header>
            <Layout  style={{ minHeight: '100vh' }}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%' }}
                        items={domains}
                        onSelect={onChangeDomain}
                    />
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <CardWall data={allDimensions[focusDomain]}/>
                </Content>
            </Layout>
        </>
    );
};

export default dimBrowser;