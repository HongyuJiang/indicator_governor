import { Button, Form, Input, Modal, Select, notification, Row, Col, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { addAtomic, updateAtomic, deleteAtomic } from '../../../data.index'
import { splitFields, joinFields, addFormItem } from '../../util'
import { SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const multipleFields = ['常用维度', '适用公共统计规则', '指标使用部门', '度量单位']

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const selector = (name, label, children) => (
    <Form.Item
        name={name}
        label={label}
        {...layout}
    >
        <Select
            mode={_.isNull(children) ? 'tags' : 'multiple'}
            style={{ width: '100%' }}
            placeholder="请依次输入并回车"
        >
            {children}
        </Select>
    </Form.Item>
)

const departments = ['结算部', '会员部', '商品二部', '品种部', '市场发展部', '监察部', '衍生品部', '交易部']
const departCandidates = departments.map((d, i) => <Option key={d}>{d}</Option>)

const notify = (action) => {
    notification.open({
        message: `指标${action}成功`,
        duration: 4,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
}

const atomicForm = (props) => {

    const [form] = Form.useForm();
    const [atomicName, setAtomicName] = useState("");

    const { isFormOpen, handleOK, handleCancel, action, initialValues, rules } = props
    const values = splitFields(initialValues, multipleFields)

    const ruleCandidates = rules.map((d, i) => <Option key={d['统计规则']}>{d['统计规则']}</Option>)
    
    const handleDelete = () => {
        deleteAtomic({'name': atomicName}).then(() => {
            notify('删除')
        })
        handleOK()
    }

    useEffect(() => {
        const atomicName = initialValues['指标名称']
        atomicName && setAtomicName(atomicName)
        form.resetFields()
    }, [initialValues['指标名称']])

    const onFinish = (values) => {
        const newValues = joinFields(values, multipleFields)
        const reqParams = { 'name': atomicName, 'data': newValues }
        if(action === 'add') {
            addAtomic(newValues)
            notify('新增')
        }
        else if(action === 'update') {
            updateAtomic(reqParams)
            notify('更新')
        }
        handleOK()
    };

    return <Modal width={800} title="指标信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="atomic"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={values}
        >

            <Row gutter={22} style={{paddingLeft: 45, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('指标名称', '指标名称', true)}
                </Col>
                <Col span={12}>
                {addFormItem('指标别名', '指标别名', false)}
                </Col>
            </Row>

            <Row gutter={22} style={{paddingLeft: 45, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('业务域', '业务域', true)}
                </Col>
                <Col span={12}>
                {addFormItem('一级分类', '主题', true)}
                </Col>
            </Row>

            {addFormItem('业务定义', '业务定义', true, layout, <TextArea rows={2} />)}
            {addFormItem('计算公式', '计算公式', false, layout)}
            {addFormItem('范围及条件', '条件范围', false, layout)}

            {selector('常用维度', '常用维度', null)}
            {selector('适用公共统计规则', '统计规则', ruleCandidates)}
            {selector('指标使用部门', '关注部门', departCandidates)}

            <Row gutter={22} style={{paddingLeft: 55, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('取值范围', '数值范围', false)}
                </Col>
                <Col span={12}>
                {selector('度量单位', '单位', null)}
                </Col>
            </Row>

            <Form.Item style={{ textAlign: 'center' }}>
                <Space>
                    <Button type="primary" htmlType="submit"> 提交 </Button>
                    { action === 'update' && <Button type="primary" danger onClick={handleDelete}> 删除 </Button>}
                </Space>
            </Form.Item>

        </Form>
    </Modal>
}

export default atomicForm