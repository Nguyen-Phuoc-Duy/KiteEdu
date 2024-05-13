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
  message,
  notification,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CreateSubject from "./CreateSubject";
const { Title } = Typography;
const { Option } = Select;

function Subjects() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [statusStatesAdd, setStatusStatesAdd] = useState(null);
  const [name, setName] = useState(null);
  const [nameAdd, setNameAdd] = useState(null);
  const history = useHistory();

  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
    updateSubject,
    createSubject,
    currentUserInfo,
    testMsg,
    errorMessage,
    errorCode,
  } = accountStore;

  // Hiển thị modal chỉnh sửa thông tin môn học
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setIsModalVisible(true);
  };

  // Hiển thị modal thêm môn học
  const showModalAdd = (record) => {
    setIsModalVisibleAdd(true);
  };

  // Xử lý khi nhấn nút OK trên modal chỉnh sửa
  const handleOk = async () => {
    await updateSubject({
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
  const handleOkAdd = () => {
    createSubject({
      status: statusStatesAdd,
      name: nameAdd,
    });
    setIsModalVisibleAdd(false);
    setNameAdd(null);
    setStatusStatesAdd(null);
    getAllSubjects();
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
    setIsModalVisibleAdd(false);
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
    setStatusStatesAdd(value);
  };

  // Xử lý thay đổi tên môn học khi thêm môn học
  const handleChangeNameAdd = (value) => {
    setNameAdd(value);
  };
  useEffect(() => {
    getAllSubjects();
    createSubject();
    updateSubject()
  }, []);
  // Lấy danh sách môn học khi component được render hoặc khi modal hiển thị/ẩn hoặc khi có sự thay đổi từ tạo hoặc cập nhật môn học
  // useEffect(() => {
  //   getAllSubjects();
  //   createSubject();
  //   updateSubject()
  // }, [createSubject, errorMessage, getAllSubjects, updateSubject]);

  // Cấu hình cột cho Table
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
          {status === "active" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
      ),
    },
    ...(currentUserInfo.role !== "employee"
      ? [
          {
            title: "ACTION",
            key: "action",
            render: (text, record) => (
              <>
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={() => showModal(record)}
                >
                  Edit
                </Button>
              </>
            ),
          },
        ]
      : []),
  ];

  // Cấu hình cột cho Table khi người dùng là nhân viên
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
          {status === "active" ? (
            <Tag color="green">{status}</Tag>
          ) : (
            <Tag color="red">{status}</Tag>
          )}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
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
  const dataA = Array.from(subjectList);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Subject List"
              extra={
                <>
                  {errorMessage && (
                    <Modal
                      title="Notification"
                      visible={visible}
                      footer={null}
                      onCancel={() => setVisible(false)}
                    >
                      <p><b>{errorMessage}</b></p>
                    </Modal>
                  )}
                  {currentUserInfo.role == "employee" ? (
                    ""
                  ) : (
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={(record) => showModalAdd(record)}
                      style={{ align: "right" }}
                    >
                      Add Subject
                    </Button>
                  )}
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
                  dataSource={dataA}
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
                  <Title level={5}>Subject</Title>
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
                    <Option value="active">active</Option>
                    <Option value="inactive">inactive</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>

      <Modal
        title="ADD"
        visible={isModalVisibleAdd}
        onOk={handleOkAdd}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Subject</Title>
                <Input
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                  onChange={(event) => {
                    handleChangeNameAdd(event.target.value);
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
                    handleChangeAdd(value);
                  }}
                  rules={[{ required: true, message: "Please input status!" }]}
                  value={statusStatesAdd || "active"}
                  disabled
                >
                  <Option value="active">active</Option>
                  <Option value="inactive">inactive</Option>
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
