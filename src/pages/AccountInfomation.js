/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { Button, Card, Form, Input, Row, Col, Select, DatePicker } from "antd";
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn'; //en_US
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";
const { Option } = Select;
const AccountInformation = () => {

  const { accountStore } = useStore();
  const { currentUserInfo } = accountStore;
  useEffect(() => {
    console.log(currentUserInfo.birth);
  }, []);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = (value) => {};
  return (
    <>
      <div
        className="layout-default  layout-sign-up"
      >
        <Card
          className=" header-solid h-full ant-card pt-0"
          title={<h5>ACCOUNT INFOMATION</h5>}
          bordered={false}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                >
                  <Input defaultValue={currentUserInfo.name} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username!",
                    },
                  ]}
                >
                  <Input defaultValue={currentUserInfo.username} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Gender"
                    onChange={onGenderChange}
                    defaultValue={currentUserInfo.gender}
                    allowClear
                  >
                    <Option value={true}>Nam</Option>
                    <Option value={false}>Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                    },
                  ]}
                >
                  <Input defaultValue={currentUserInfo.email} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone number!",
                    },
                  ]}
                >
                  <Input defaultValue={currentUserInfo.phone} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Birth"
                  name="DatePicker"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <DatePicker
                    defaultValue={dayjs(currentUserInfo.birth, "YYYY-MM-DD")}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={8}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input confirm password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please input address!" }]}
                >
                  <Input defaultValue={currentUserInfo.address} />
                </Form.Item>
              </Col>
              
              <Col span={16}></Col>
              <Col span={8}></Col>
              <Col span={4}>
                <Form.Item>
                  <Button htmlType="reset" style={{ width: "100%" }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Update
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default observer(AccountInformation);
