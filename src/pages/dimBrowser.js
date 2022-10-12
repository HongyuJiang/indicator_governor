import { Layout, Menu, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import CardWall from "../components/cardWall"
import { getCommonDimensions } from '../../data.index';
import NavHeader from '../components/navHeader';
import DimForm from './forms/dimension'
import { PlusCircleOutlined } from '@ant-design/icons';
import _ from 'lodash'

import 'antd/dist/antd.css';

const { Content, Sider } = Layout;

const dimBrowser = () => {

    const [allDimensions, setAllDimensions] = useState([]);
    const [domains, setDomains] = useState([]);
    const [focusDomain, setFocusDomain] = useState("交易所");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [shouldUpdate, setShouldUpdate] = useState(0);
    const [selectedDimension, setSelectedDimension] = useState(0);
    const [action, setAction] = useState('add');

    const onChangeDomain = (d, l) => {
        setFocusDomain(d.key)
    }

    const addDimension = () => {
        setIsFormOpen(true)
        setAction('add')
    }

    const editDimension = (domain, name, desc, attrs) => {
        return () => {
            console.log(attrs)
            setIsFormOpen(true)
            setAction('update')
            setSelectedDimension({
                '领域': domain,
                '维度': name,
                '定义': desc,
                '属性': attrs.map((d) => d.name)
            })
        }
    }

    const handleOK = () => {
        setIsFormOpen(false)
        setShouldUpdate(Math.random())
    }

    const handleCancel = () => {
        setIsFormOpen(false)
    }

    useEffect(() => {
        getCommonDimensions().then((dimData) => {
            const dimWithAttr = dimData.data;
            setAllDimensions(_.groupBy(dimWithAttr, '领域'))
            const domains = _.uniq(dimWithAttr.map((d) => d['领域'])).map((d, i) => {
                return { key: d, label: d }
            })
            setDomains(domains)
        })
    }, [shouldUpdate])

    return (
        <>
            <NavHeader selectedKeys={"Dimension"}/>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className="site-layout-background" width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%' }}
                        items={domains}
                        onSelect={onChangeDomain}
                    />
                </Sider>
                <Content style={{ padding: '0 24px', paddingTop: 20, minHeight: 280 }}>
                    <DimForm  action={action} 
                              initValues={action === 'add' ? {} : {selectedDimension}}
                              isFormOpen={isFormOpen} 
                              handleOK={handleOK} 
                              handleCancel={handleCancel} />
                    <CardWall data={allDimensions[focusDomain]} 
                              onEditBtnClick={editDimension}/>
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={addDimension}>
                            新增一个维度
                        </Button>
                    </div>
                </Content>
            </Layout>
        </>
    );
};

export default dimBrowser;