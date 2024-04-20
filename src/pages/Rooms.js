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

function Subjects() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const history = useHistory();

  const { accountStore } = useStore();
  const {
    isLoading,
    getAllSubjects,
    updateSubject,
    createSubject,
    currentUserInfo,
    errorMessage,
    updateRoom,
    roomList,
    getAllRooms,
    createRoom,
  } = accountStore;

  // Hiển thị modal chỉnh sửa thông tin môn học
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };

  // Hiển thị modal thêm môn học
  const showModal1 = (record) => {
    setIsModalVisible1(true);
  };

  // Xử lý khi nhấn nút OK trên modal chỉnh sửa
  const handleOk = async () => {
    await updateRoom({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    setIsModalVisible(false);
    console.log("errorMessage0", errorMessage);
    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  // Xử lý khi nhấn nút OK trên modal thêm
  const handleOk1 = () => {
    createRoom({
      status: statusStates1,
      name: name1,
    });
    setIsModalVisible1(false);
    setName1(null);
    setStatusStates1(null);

    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  // Xử lý khi nhấn nút Cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  // Xử lý thay đổi trạng thái môn học
  const handleChange = (value) => {
    setStatusStates(value);
  };

  // Xử lý thay đổi tên môn học
  const handleChangeName = (value) => {
    setName(value);
  };

  // Xử lý thay đổi trạng thái khi thêm môn học
  const handleChangeAdd = (value) => {
    setStatusStates1(value);
  };

  // Xử lý thay đổi tên môn học khi thêm môn học
  const handleChangeName1 = (value) => {
    setName1(value);
  };

  // Lấy danh sách môn học khi component được render hoặc khi modal hiển thị/ẩn hoặc khi có sự thay đổi từ tạo hoặc cập nhật môn học
  useEffect(() => {
    getAllRooms();
  }, [
    createSubject,
    errorMessage,
    getAllRooms,
    getAllSubjects,
    updateSubject,
    createRoom,
    updateRoom,
    isModalVisible,
    isModalVisible1,
  ]);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
            {/* <p>{name}</p> */}
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
            disabled= {currentUserInfo.role == "employee" ? true : false}
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

  // Chuyển đổi dữ liệu thành mảng và sắp xếp lại theo thứ tự
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
              title="Room List"
              extra={
                <>
                  {/* {errorMessage && (
                    <Modal
                      title="Notification"
                      visible={visible}
                      footer={null}
                      onCancel={() => setVisible(false)}
                    >
                      <h3>{errorMessage}</h3>
                    </Modal>
                  )} */}

                  <Button
                    type="primary"
                    className="tag-primary"
                    onClick={(record) => showModal1(record)}
                    style={{ align: "right" }}
                    disabled= {currentUserInfo.role == "employee" ? true : false}
                  >
                    Add Room
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={
                    // currentUserInfo.role === "employee"
                    //   ? columnsEmployee
                    //   : 
                      columns
                  }
                  dataSource={dataArray}
                  pagination={false}
                  rowKey={(record) => record.ID}
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

      {/* Modal chỉnh sửa */}
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
                    style={{ width: 120 }}
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
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChangeAdd(value);
                  }}
                  rules={[{ required: true, message: "Please input status!" }]}
                  value={statusStates1 || "active"}
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

export default observer(Subjects);
