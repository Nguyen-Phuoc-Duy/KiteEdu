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
  Space,
} from "antd";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Classes() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [subject, setSubject] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const [statusPupil, setStatusPupil] = useState(null);
  const [classPupils, setClassPupils] = useState([]);
  const [classPupilsUpdate, setClassPupilsUpdate] = useState([]);
  const [idClass, setIdClass] = useState();
  const [idPupil, setIdPupil] = useState();
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const { accountStore } = useStore();
  const {
    isLoading,
    subjectList,
    getAllSubjects,
    getAllClasses,
    createClass,
    userList,
    getAllUsers,
    updateClass,
    currentUserInfo,
    pupilList,
    getAllPupils,
    ClassByUser,
    getClassByUser,
    PupilByClass,
    getPupilByClass,
    removePupilInClass,
    addPupilInClass,
    detailClass,
    errorMessage,
  } = accountStore;

  const handleChangeSelect = (value) => {
    // const result = value.split(' ').pop();
    setClassPupils(value);
  };
  const handleChangeSelectUpdate = (value) => {
    // const result = value.split(' ').pop();
    setClassPupilsUpdate(value);
    // console.log(`selected ${value}`);
  };

  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setSubject(record.subjectName);
    setLecturer(record.userName);
    setIdClass(record.ID);
    // setStatusPupil(newArrayPupil.status);
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });

    setIsModalVisible(true);
  };

  const showModal1 = (record) => {
    setIsModalVisible1(true);
  };

  const handleOk = () => {
    const regex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;

    const uuidArrayUpdate = classPupilsUpdate.map((item) => {
      const match = item.match(regex);
      return match ? match[0] : null;
    });
    const transformedArrayUpdate = uuidArrayUpdate.map((id) => ({ id }));
    updateClass({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
      listPupil: transformedArrayUpdate,
      userId: currentUserInfo.id,
    });

    // removePupilInClass({
    //   classId: selectedRecord.ID,
    //   pupilId: idPupil,
    // });
    // addPupilInClass({
    //   classId: selectedRecord.ID,
    //   pupilId: idPupil,
    // });
    getPupilByClass({ ID: idClass });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible(false);
    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  const handleOk1 = () => {
    const regex = /[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/i;

    const uuidArray = classPupils.map((item) => {
      const match = item.match(regex);
      return match ? match[0] : null;
    });
    const transformedArrayA = uuidArray.map((id) => ({ id }));
    // console.log("réult", uuidArray, transformedArrayA);
    createClass({
      name: name1,
      status: statusStates1,
      userId: currentUserInfo.id,
      subjectId: currentUserInfo.subjectId,
      listPupil: transformedArrayA,
    });
    getPupilByClass({ ID: idClass });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible1(false);
    setStatusStates(null);
    // console.log("jkjk", currentUserInfo);
    if (errorMessage) {
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  const handleRemovePupil = async (value) => {
    await removePupilInClass({
      classId: selectedRecord.ID,
      pupilId: value,
    });
    await getPupilByClass({ ID: idClass });
    // setIdPupil(value)
  };
  const handleAddPupil = async (value) => {
    await addPupilInClass({
      classId: selectedRecord.ID,
      pupilId: value,
    });
    await getPupilByClass({ ID: idClass });
    // setIdPupil(value)
  };
  const handleChange = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    // console.log("aaaaaaaaa", value);
    setName(value);
    // console.log("name", name);
  };

  const handleChange1 = (value) => {
    // console.log("vvvvvvvvvvvvvvvvvvvvvvv", value);
    setStatusStates1(value);
  };

  const handleChangeName1 = (value) => {
    // console.log("aaaaaaaaa", value);
    setName1(value);
    // console.log("name", name);
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
          </div>
        </>
      ),
    },

    {
      title: "LECTURER",
      dataIndex: "userName",
      key: "userId",
      render: (userId) => (
        <>
          <div className="avatar-info">
            <a>{userId}</a>
          </div>
        </>
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subjectName",
      key: "subjectId",
      render: (subjectId) => (
        <>
          <div className="semibold">
          {subjectId}
          </div>
        </>
      ),
    },
    // {
    //   title: "SC",
    //   dataIndex: "studentsCount",
    //   key: "studentsCount",
    //   width: "8%",
    //   align: "center",
    //   render: (studentsCount) => (
    //     <>
    //       <div className="avatar-info">
    //         <Title level={5}>{studentsCount}</Title>
    //       </div>
    //     </>
    //   ),
    // },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "finished" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "canceled" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "started" ? (
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
            {/* {record.ID} */}
          </Button>{" "}
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => history.push("/lessons", record.ID)}
          >
            Lessons
          </Button>
        </>
      ),
    },
  ];

  const columnsDetail = [
    {
      title: "NAME PUPIL",
      dataIndex: "pupilName",
      key: "pupilName",
      width: "40%",
      render: (name) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{name}</Title>
          </div>
        </>
      ),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "20%",
      align: "center",
      render: (status) => (
        <>
          {status === "present" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "not present" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "attended" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
          {/* {statusPupil} */}
        </>
      ),
    },

    {
      title: "ACTION",
      key: "action",
      width: "40%",
      align: "center",
      render: (text, record) => (
        <>
          {currentUserInfo.role === "employee" && statusStates == "started" ? (
            <>
              <Button
                type="primary"
                className="tag-primary"
                onClick={() => handleAddPupil(record.pupilId)}
              >
                Add
              </Button>{" "}
              <Button
                type="danger"
                className="tag-primary"
                onClick={() => handleRemovePupil(record.pupilId)}
              >
                Remove
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" className="tag-primary" disabled>
                Add
              </Button>{" "}
              <Button type="danger" className="tag-primary" disabled>
                Remove
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  const dataArray = Array.from(ClassByUser);

  const dataArrayB = Array.from(subjectList);

  const dataArrayC = Array.from(userList);

  let newArray1 = dataArray.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem = dataArrayB.find(
      (item2) => item2.ID === item1.subjectId
    );

    let correspondingItem1 = dataArrayC.find((item2) => {
      return item2.ID === item1.userId;
    });
    return {
      ...item1,
      userName: correspondingItem1 ? correspondingItem1.name : null,
      subjectName: correspondingItem ? correspondingItem.name : null,
    };
  });
  newArray1.forEach((item) => {
    console.log("itemitemitemitem", item);
    if (item.pupils) {
      const attendedStudents = item.pupils.filter(
        (pupil) => pupil.status === "attended"
      );
      item.studentsCount = attendedStudents.length;
    } else {
      item.studentsCount = 0; // Nếu không có mảng pupils, gán studentsCount là 0
    }
  });
  const dataArrayD = Array.from(pupilList);

  const listPupilByClass = Array.from(PupilByClass);

  let newArrayPupil = listPupilByClass.map((item1) => {
    // console.log("oooooooooooooooooo", dataArrayD, listPupilByClass);
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      // pupilId: correspondingItem1.pupilId,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });
  let options = [];
  let optionsUpdate = [];
  let optionsUpdateFinal = [];

  const B = dataArrayD.filter((item) => item.status === "active");
  const arrayPupils = B.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  options = arrayPupils;

  for (const itemA of B) {
    let found = false;
    for (const itemB of listPupilByClass) {
      if (itemA.ID === itemB.pupilId) {
        found = true;
        break;
      }
    }
    if (!found) {
      optionsUpdate.push(itemA);
    }
  }

  const arrayPupilsUpdate = optionsUpdate.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  optionsUpdateFinal = arrayPupilsUpdate;
  console.log("arrayPupilsarrayPupils", arrayPupils, options, optionsUpdate);
  // console.log("errorMessageerrorMessage", errorMessage);
  useEffect(() => {
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    getAllPupils();
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getPupilByClass({
      ID: idClass,
    });
    console.log("detailClass", detailClass);
  }, [
    isModalVisible1,
    isModalVisible,
    getAllClasses,
    getAllSubjects,
    getAllUsers,
    getAllPupils,
    getClassByUser,
    currentUserInfo.id,
    currentUserInfo.role,
    getPupilByClass,
    idClass,
    detailClass,
    createClass,
    updateClass,
  ]);
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Class List"
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
                  {currentUserInfo.role === "employee" ? (
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={(record) => showModal1(record)}
                      style={{ align: "right" }}
                    >
                      Add Class
                    </Button>
                  ) : (
                    ""
                  )}
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={newArray1}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  scroll={{ y: 420 }}
                  // title={() => (
                  //   <Button
                  //     type="primary"
                  //     className="tag-primary"
                  //     onClick={(record) => showModal1(record)}
                  //     style={{ align: "right" }}
                  //   >
                  //     Add Class
                  //   </Button>
                  // )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="DETAIL"
        visible={isModalVisible}
        onOk={currentUserInfo.role === "employee" ? handleOk : handleCancel}
        onCancel={handleCancel}
        width={1000}
        // bodyStyle={{ height: 440 }}
        destroyOnClose={true}
      >
        {selectedRecord && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Name</Title>
                  <Input
                    value={name}
                    onChange={(event) => {
                      handleChangeName(event.target.value);
                    }}
                    disabled={currentUserInfo.role == "employee" && statusStates == "started" ? false : true}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Lecturer</Title>
                  <Input value={lecturer} disabled={true} />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Subject</Title>
                  <Input value={subject} disabled={true} />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                    disabled={currentUserInfo.role == "employee" ? false : true}
                  >
                    <Option value="started">started</Option>
                    <Option value="finished">finished</Option>
                    <Option value="canceled">canceled</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>Pupils</Title>
                  <Space style={{ width: "100%" }} direction="vertical">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      // defaultValue={["a10", "c12"]}
                      onChange={handleChangeSelectUpdate}
                      options={optionsUpdateFinal}
                      disabled={currentUserInfo.role == "employee" && statusStates == "started" ? false : true}
                    />
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div className="author-info">
                  <Title level={5}>List Pupil</Title>
                  <div className="table-responsive">
                    <Table
                      columns={columnsDetail}
                      dataSource={newArrayPupil}
                      pagination={{ pageSize: 3 }}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      // scroll={{ y: 240 }}
                    />
                  </div>
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
        width={1000}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Input
                  // value={name}
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
                    handleChange1(value);
                  }}
                  value={statusStates1 || "started"}
                  disabled
                >
                  <Option value="started">started</Option>
                  <Option value="finished">finished</Option>
                  <Option value="canceled">canceled</Option>
                </Select>
              </div>
            </Col>
            <Col span={24}>
              <div className="author-info">
                <Title level={5}>Pupils</Title>
                <Space style={{ width: "100%" }} direction="vertical">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    // defaultValue={["a10", "c12"]}
                    onChange={handleChangeSelect}
                    options={options}
                  />
                </Space>
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Classes);
