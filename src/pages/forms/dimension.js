import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        offset: 21,
    },
};

const requireMsg = (d) => {
    return [
        {
            required: true,
            message: `${d}对于维度是必要的哦`,
        },
    ]
}

const addFormItem = (name, label, required, layout = {}) => {
    return <Form.Item
        name={name}
        label={label}
        rules={required ? requireMsg(label) : []}
        {...layout}
    >
        <Input />
    </Form.Item>
}

const selector = (
    <Form.Item
        name={'attrs'}
        label={'维度属性'}
        {...layout}
    >
        <Select
            mode="tags"
            style={{
                width: '100%',
            }}
            placeholder="Please select"
        >
        </Select>
    </Form.Item>
)

const dimensionForm = (props) => {

    const { isFormOpen, handleOK, handleCancel } = props
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        handleOK()
    };

    return <Modal title="维度信息" open={isFormOpen} footer={null} onCancel={handleCancel}>
        <Form
            form={form}
            name="dimension"
            onFinish={onFinish}
            scrollToFirstError
        >
            {addFormItem('name', '维度名称', true)}
            {addFormItem('defination', '维度定义', true, layout)}
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