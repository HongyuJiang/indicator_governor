import { Button, Form, Input, Modal, Select, notification, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { addDimension, updateDimension } from '../../../data.index'
import { addFormItem } from '../../util'
import { SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        offset: 21,
    },
};

const selector = (
    <Form.Item
        name={'属性'}
        label={'属性'}
        {...layout}
    >
        <Select
            mode="tags"
            style={{
                width: '100%',
            }}
            placeholder="请依次输入并回车"
        >
        </Select>
    </Form.Item>
)

const dimensionForm = (props) => {

    const { isFormOpen, handleOK, handleCancel, action, initValues } = props
    const [form] = Form.useForm();

    useEffect(() => {
        if (Object.keys(initValues).length > 0) {
            form.resetFields()
        }
    }, [initValues])

    const onFinish = (values) => {

        if(values['属性']) {
            values['属性'] = values['属性'].map((d) => {
                return { name:d }
            })
        }

        const reqParams = { 'name': values['维度'], 'data': values }
        action === 'add' ?  addDimension(values) : updateDimension(reqParams)
        notification.open({
            message: action === 'add' ? '维度添加成功' : '维度更新成功',
            duration: 4,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
        handleOK()
    };

    return <Modal width={800} title="维度信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="dimension"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={initValues}
        >

            <Row gutter={22} style={{paddingLeft: 55, paddingRight: 63}}>
                <Col span={12}>
                {addFormItem('领域', '业务域', true)}
                </Col>
                <Col span={12}>
                {addFormItem('维度', '维度名称', true)}
                </Col>
            </Row>
            {addFormItem('定义', '维度定义', true, layout, <TextArea rows={2} />)}
            {selector}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>

        </Form>
    </Modal>
}

export default dimensionForm