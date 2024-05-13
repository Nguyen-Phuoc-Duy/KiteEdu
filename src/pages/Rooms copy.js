import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Typography,
  Modal,
  Select,
  Tag,
  Input,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Rooms() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };
  const showModal1 = (record) => {
    setIsModalVisible1(true);
  };
  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
    updateSubject,
    updateRoom,
    roomList,
    getAllRooms,
    createRoom,
    currentUserInfo,
    errorMessageR,
  } = accountStore;

  const handleOk = () => {
    updateRoom({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    setIsModalVisible(false);
    if (errorMessageR) {
      console.log("errorMessage2", errorMessageR);
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessageR thay đổi
    }
  };
  const handleOk1 = () => {
    createRoom({
      status: statusStates1,
      name: name1,
    });
    setIsModalVisible1(false);
    setName1(null);
    setStatusStates1(null);
    getAllRooms();
    console.log("errorMessage1", errorMessageR);
    if (errorMessageR) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessageR thay đổi
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
    console.log("currentUserInfo", currentUserInfo.role);
  };

  const handleChange = (value) => {
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChange1 = (value) => {
    setStatusStates1(value);
  };

  const handleChangeName1 = (value) => {
    setName1(value);
  };
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "empty" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "fix" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "full" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
      // align: 'center',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            Edit
            {/* {record.username} */}
          </Button>
        </>
      ),
    },
  ];
  const columnsEmployee = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "empty" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "fix" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "full" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
      // align: 'center',
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
    getAllRooms();
    if (errorMessageR) {
      console.log("errorMessage0", errorMessageR);
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessageR thay đổi
    }
  }, [isModalVisible1, isModalVisible, getAllRooms, errorMessageR]);

  const dataA = Array.from(roomList);
  const dataArray = dataA.map((user) => {
    const order = ["ID", "name", "status", "createdAt", "updatedAt"];

    const sortedUser = {};
    order.forEach((key) => {
      if (user.hasOwnProperty(key)) {
        sortedUser[key] = user[key];
      }
    });

    return sortedUser;
  });

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION ROOMS"
              extra={
                <>
                  {errorMessageR && (
                    <Modal
                      title="Notification"
                      visible={visible}
                      footer={null}
                      onCancel={() => setVisible(false)}
                    >
                      <p>{errorMessageR}</p>
                    </Modal>
                  )}

                  <Button
                    type="primary"
                    className="tag-primary"
                    // onClick={() => history.push("/create-room")}
                    onClick={(record) => showModal1(record)}
                    style={{ align: "right" }}
                  >
                    Add Room
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={
                    currentUserInfo.role == "employee"
                      ? columnsEmployee
                      : columns
                  }
                  dataSource={dataArray}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  scroll={{ y: 420 }}
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
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Room</Title>
                  <Input
                    value={name}
                    onChange={(event) => {
                      handleChangeName(event.target.value);
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                  >
                    <Option value="empty">empty</Option>
                    <Option value="fix">fix</Option>
                    <Option value="full">full</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
      <Modal
        title="ADD"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Input
                  // value={name1}
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                  onChange={(event) => {
                    handleChangeName1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
                  rules={[{ required: true, message: "Please input status!" }]}
                  value={statusStates1 || "empty"}
                  disabled
                >
                  <Option value="empty">empty</Option>
                  <Option value="fix">fix</Option>
                  <Option value="full">full</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Rooms);
