import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Switch,
  Modal,
  Select,
  Tag,
  Spin,
} from "antd";
import moment from "moment";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;
const pencil = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
      className="fill-gray-7"
    ></path>
    <path
      d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
      className="fill-gray-7"
    ></path>
  </svg>,
];
function Accounts() {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [lockedState, setLockedState] = useState(null);
  const [roleState, setRoleState] = useState(null);
  const [subjectState, setSubjectState] = useState(null);
  // const [isLoading, setIsLoading] = useState(false)

  const showModal = (record) => {
    setSelectedRecord(record);
    // console.log("abc", selectedRecord);
    setLockedState(record.locked);
    setRoleState(record.role);
    setSubjectState(record.subjectId);
    setIsModalVisible(true);
    console.log("log", subjectState, newArray1);
  };

  const { accountStore } = useStore();
  const {
    getAllUsers,
    userList,
    adminUpdate,
    isLoading,
    subjectList,
    getAllSubjects,
    currentUserInfo,
    updateUserSubject,
  } = accountStore;

  const handleOk = () => {
    adminUpdate(
      selectedRecord.ID,
      {
        isLocked: lockedState,
      },
      {
        ID: selectedRecord.ID,
        role: roleState,
      },
      // updateUserSubject(
      {
        ID: selectedRecord.ID,
        subjectId: subjectState,
        role: selectedRecord.role,
      }
      // )
    );
    // console.log("hhhhhhhhhhhhhhhh", selectedRecord.ID, subjectState, roleState);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setRoleState(value);
  };
  const handleChangeSubject = (value) => {
    console.log("aaaaa", value);
    setSubjectState(value);
  };
  const handleSwitchChange = (value) => {
    setLockedState(value);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            <p>{name}</p>
          </div>
        </>
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (subjectId) => (
        <>
          <div className="semibold">{subjectId}</div>
        </>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (email) => <Title level={5}>{email}</Title>,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <div className="semibold">{phone}</div>,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <div className="semibold">{address}</div>
        </>
      ),
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <div className="semibold">{gender === 1 ? "Nam" : "Nữ"}</div>
      ),
    },
    {
      title: "BIRTH",
      dataIndex: "birth",
      key: "birth",
      render: (birth) => (
        <div className="semibold">{moment(birth).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <>
          {role === "employee" ? (
            <Tag color="green">{role}</Tag>
          ) : (
            <Tag color="red">{role}</Tag>
          )}
        </>
      ),
    },
    {
      title: "LOCKED",
      dataIndex: "locked",
      key: "locked",
      render: (locked) => (
        <div className="semibold">
          <Switch
            checked={locked}
            // onChange={(value) => handleSwitchChange(value, locked)}
            disabled
          />
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            {/* {pencil} */}
            Edit
            {/* {record.username} */}
          </Button>
          {/* <Button type="link" className="darkbtn">
            {pencil} EDIT
          </Button> */}
          {/* <Button
            type="danger"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            Delete
          </Button> */}
        </>
      ),
    },
  ];
  const columnsEmployee = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "15%",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            <p>{name}</p>
          </div>
        </>
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subjectId",
      key: "subjectId",
      render: (subjectId) => (
        <>
          <div className="semibold">{subjectId}</div>
        </>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: "15%",
      render: (email) => <Title level={5}>{email}</Title>,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <div className="semibold">{phone}</div>,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      width: "15%",
      render: (address) => (
        <>
          <div className="semibold">{address}</div>
        </>
      ),
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <div className="semibold">{gender === 1 ? "Nam" : "Nữ"}</div>
      ),
    },
    {
      title: "BIRTH",
      dataIndex: "birth",
      key: "birth",
      render: (birth) => (
        <div className="semibold">{moment(birth).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <>
          {role === "employee" ? (
            <Tag color="green">{role}</Tag>
          ) : (
            <Tag color="red">{role}</Tag>
          )}
        </>
      ),
    },
    {
      title: "LOCKED",
      dataIndex: "locked",
      key: "locked",
      render: (locked) => (
        <div className="semibold">
          <Switch
            checked={locked}
            // onChange={(value) => handleSwitchChange(value, locked)}
            disabled
          />
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <>
          <Button type="primary" className="tag-primary" disabled>
            Edit
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    getAllUsers();
    getAllSubjects();
  }, []);

  const dataA = Array.from(userList);
  const dataArray = dataA.map((user) => {
    // console.log(user)
    const order = [
      "ID",
      "name",
      "username",
      "birth",
      "gender",
      "subjectId",
      "email",
      "phone",
      "address",
      "role",
      "status",
      "locked",
      "createdAt",
      "updatedAt",
    ];

    const sortedUser = {};
    order.forEach((key) => {
      if (user.hasOwnProperty(key)) {
        sortedUser[key] = user[key];
      }
    });

    return sortedUser;
  });
  const dataB = Array.from(subjectList);
  const dataArrayB = dataB.map((user) => {
    // console.log(user)
    const order = ["ID", "name", "status", "createdAt", "updatedAt"];

    const sortedUser = {};
    order.forEach((key) => {
      if (user.hasOwnProperty(key)) {
        sortedUser[key] = user[key];
      }
    });

    return sortedUser;
  });

  let newArray1 = dataArray.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem = dataArrayB.find(
      (item2) => item2.ID === item1.subjectId
    );
    // Trả về một đối tượng mới với idArray2 được thay thế bằng name
    // console.log(correspondingItem);
    return {
      ...item1,
      subjectId: correspondingItem ? correspondingItem.name : null,
    };
  });
  let filteredArray = [];
  if (currentUserInfo.role == "manager" || currentUserInfo.role == "employee") {
    filteredArray = newArray1.filter((item) => item.role !== "manager");
  }
  if (currentUserInfo.role == "admin") {
    filteredArray = newArray1;
  }
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="INFORMATION ACCOUNTS"
              extra={
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={() => history.push("/create-account")}
                  style={{ align: "right" }}
                >
                  Create Account
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={
                    currentUserInfo.role == "employee"
                      ? columnsEmployee
                      : columns
                  }
                  dataSource={filteredArray}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  scroll={{ x: 1600, y: 415 }}
                  // title={() => (
                  //   <Button
                  //     type="primary"
                  //     className="tag-primary"
                  //     onClick={() => history.push("/create-account")}
                  //     style={{ align: "right" }}
                  //   >
                  //     Create Account
                  //   </Button>
                  // )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="EDIT"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedRecord && (
          <>
            <Row>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>UserName</Title>
                  <p>{selectedRecord.username}</p>
                </div>
              </Col>
              {/* <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Subject</Title>
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChangeSubject(
                        value
                        // || { subjectState }
                      );
                    }}
                    // defaultValue={subjectState}
                    value={subjectState}
                  >
                    {dataArrayB.map((item) => {
                      if (item.status === "active") {
                        return (
                          <Option key={item.ID} value={item.ID}>
                            {item.name}
                          </Option>
                        );
                      }
                      return null; // Trả về null nếu item.status không phải 'active'
                    })}
                  </Select>
                </div>
              </Col> */}
              <Col span={12}></Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Role</Title>
                  <Select
                    // defaultValue={selectedRecord.role}
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={roleState}
                  >
                    <Option value="manager">manager</Option>
                    <Option value="employee">employee</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Locked</Title>
                  {/* {selectedRecord.locked == 1 ? (
                    <Switch
                      // defaultChecked={selectedRecord.locked === 0}
                      onChange={(value) =>
                        handleSwitchChange(value, selectedRecord.locked)
                      }
                      checked={false}
                    />
                  ) : (
                    <Switch
                      checked={true}
                      onChange={(value) =>
                        handleSwitchChange(value, selectedRecord.locked)
                      }
                    />
                  )} */}
                  <Switch
                    checked={lockedState}
                    // valuePropName={!selectedRecord.locked}
                    onChange={(value) => {
                      handleSwitchChange(value);
                    }}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </>
  );
}

export default observer(Accounts);
