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
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; //en_US
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const { Option } = Select;

const AccountInformation = () => {
  const { accountStore } = useStore();
  const {
    currentUserInfo,
    updateUserInfo,
    isLoading,
  } = accountStore;
  const [gender, setGender] = useState(currentUserInfo.gender === true ? "Nam" : "Nữ");
  useEffect(() => {
    setGender(currentUserInfo.gender)
  }, [currentUserInfo]);
  const onFinish = (values) => {
    console.log("VVVVVVVVVVVVVVVVVVVVVV", values);
    updateUserInfo({
      ...values,
      ID: currentUserInfo.id,
      
    });

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onGenderChange = (value) => {setGender(value)};
  
  return (
    <>
      <div className="layout-default  layout-sign-up">
        <Card
          loading={isLoading}
          className=" header-solid h-full ant-card pt-0"
          title={<h5>ACCOUNT INFORMATION</h5>}
          bordered={true}
        >
          <Form
            name="basic"
            initialValues={{
              name: currentUserInfo.name,
              username: currentUserInfo.username,
              gender: gender,
              email: currentUserInfo.email,
              phone: currentUserInfo.phone,
              birth: dayjs(currentUserInfo.birth),
              address: currentUserInfo.address,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="gender" label="Gender">
                  <Select placeholder="Gender" onChange={onGenderChange} >
                    <Option value="true">Nam</Option>
                    <Option value="false">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Birth"
                  name="birth"
                  rules={[
                    { required: true, message: "Please input!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && getFieldValue("birth")) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please choose a birth date!")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker />
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
