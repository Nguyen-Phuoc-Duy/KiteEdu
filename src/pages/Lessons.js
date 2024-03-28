import React, { useState, useEffect, useLayoutEffect } from "react";
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
  DatePicker,
} from "antd";
import moment from "moment";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const { Title } = Typography;
const { Option } = Select;

function Lessons() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [statusStates, setStatusStates] = useState(null);
  const [room, setRoom] = useState(null);
  const [name, setName] = useState(null);
  const [classname, setClassName] = useState(null);
  const [content, setContent] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [subject, setSubject] = useState(null);
  const [statusStates1, setStatusStates1] = useState(null);
  const [name1, setName1] = useState(null);
  const [classPupils, setClassPupils] = useState([]);
  const [idClass, setIdClass] = useState();
  const history = useHistory();
  const { RangePicker } = DatePicker;

  const handleChangeSelect = (value) => {
    // const result = value.split(' ').pop();
    setClassPupils(value);
    // console.log(`selected ${value}`);
  };
  const showModal = (record) => {
    setSelectedRecord(record);
    setStatusStates(record.status);
    setName(record.name);
    setContent(record.content)
    setSubject(record.subjectId);
    setLecturer(record.userId);
    setRoom(record.roomId)
    setIdClass(record.ID);
    setClassName(record.classId)
    setIsModalVisible(true);
  };
  const showModal1 = (record) => {
    // getPupilByClass({
    //   ID: idClass,
    // });
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
    classList,
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
    LessonByClass,
    getLessonByClass,
    testMsg,
  } = accountStore;

  const handleOk = () => {
    updateClass({
      ID: selectedRecord.ID,
      status: statusStates,
      name: name,
    });
    getPupilByClass({
      // ID: idClass,
      ID: "f36e6597-3350-4e9e-b49f-2ddaad5930a8",
    });
    setIsModalVisible(false);
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
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible1(false);
    // console.log("jkjk", currentUserInfo);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
    // console.log("ggggggggggggggggggggggggg", listPupilByClass);
    // console.log("jkjkxxxxxxx", currentUserInfo.subjectId, currentUserInfo);
    // console.log(`bbbbbbbbbbbbbbbbbbbbb`, classPupils);
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
      title: "CONTENT",
      dataIndex: "content",
      key: "content",
      render: (content) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{content}</Title>
            <p>{content}</p>
          </div>
        </>
      ),
    },
    {
      title: "LECTURER",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{userId}</Title>
            <p>{userId}</p>
          </div>
        </>
      ),
    },
    {
      title: "CLASS",
      dataIndex: "classId",
      key: "classId",
      render: (classId) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{classId}</Title>
            <p>{classId}</p>
          </div>
        </>
      ),
    },
    {
      title: "ROOM",
      dataIndex: "roomId",
      key: "roomId",
      render: (roomId) => (
        <>
          <div className="avatar-info">
            <Title level={5}>{roomId}</Title>
            <p>{roomId}</p>
          </div>
        </>
      ),
    },

    {
      title: "TIME START",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (timeStart) => (
        <div className="semibold">
          {moment.parseZone(timeStart).format("DD-MM-YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "TIME FINISH",
      dataIndex: "timeFinish",
      key: "timeFinish",
      render: (timeFinish) => (
        <div className="semibold">
          {moment.parseZone(timeFinish).format("DD-MM-YYYY HH:mm:ss")}
        </div>
      ),
    },
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
      fixed: "right",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="tag-primary"
            onClick={() => showModal(record)}
          >
            Detail
            {/* {record.ID} */}
          </Button>
        </>
      ),
    },
  ];

  const columnsDetail = [
    {
      title: "NAME PUPIL",
      dataIndex: "pupilId",
      key: "pupilId",
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
          {status === "present" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "absent" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "attended" ? (
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
            onClick={() => showModal1(record)}
          >
            Present
            {/* {record.username} */}
          </Button>
          {' '}
          <Button
            type="danger"
            className="tag-primary"
            onClick={() => showModal1(record)}
          >
            Absent
          </Button>
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
      userId: correspondingItem1 ? correspondingItem1.name : null,
      subjectId: correspondingItem ? correspondingItem.name : null,
    };
  });
  const dataArrayD = Array.from(pupilList);

  const dataArrayE = Array.from(roomList);

  const listPupilByClass = Array.from(PupilByClass);

  let newArrayPupil = listPupilByClass.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      pupilId: correspondingItem1 ? correspondingItem1.name : null,
    };
  });
  console.log(" newArrayPupil", newArrayPupil);
  let options = [];

  const arrayPupils = dataArrayD.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  options = arrayPupils;
  let obj = {};
  obj = testMsg.errMsg;

  const dataArray0 = Array.from(LessonByClass);
  // console.log("dataArray0", LessonByClass);
  let newArrayLesson = dataArray0.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayC.find((item2) => {
      return item2.ID === item1.userId;
    });
    let correspondingItem2 = dataArray.find((item2) => {
      return item2.ID === item1.classId;
    });
    let correspondingItem3 = dataArrayE.find((item2) => {
      return item2.ID === item1.roomId;
    });

    return {
      ...item1,
      userId: correspondingItem1 ? correspondingItem1.name : null,
      classId: correspondingItem2 ? correspondingItem2.name : null,
      roomId: correspondingItem3 ? correspondingItem3.name : null,
    };
  });

  const onChange123 = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk123 = (value) => {
    console.log("onOk: ", value);
  };

  useEffect(() => {
    getAllRooms();
    getAllClasses();
    getAllSubjects();
    getAllUsers();
    getAllPupils();
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getPupilByClass({
      // ID: idClass,
      ID: "f36e6597-3350-4e9e-b49f-2ddaad5930a8",
    });
    getLessonByClass({ ID: "f36e6597-3350-4e9e-b49f-2ddaad5930a8" });
    // console.log('hohohoho', dataArrayD, options);
  }, [isModalVisible1, isModalVisible]);

  // useLayoutEffect(() => {
  //   getAllRooms();
  //   getAllClasses();
  //   getAllSubjects();
  //   getAllUsers();
  //   getAllPupils();
  //   getClassByUser({
  //     ID: currentUserInfo.id,
  //     role: currentUserInfo.role,
  //   });
  //   getPupilByClass({
  //     ID: idClass,
  //   });
  //   getLessonByClass({ ID: "f36e6597-3350-4e9e-b49f-2ddaad5930a8" });
  // }, [isModalVisible1, isModalVisible]);
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="INFORMATION LESSON"
              extra={
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={(record) => showModal1(record)}
                  style={{ align: "right" }}
                >
                  Add Lesson
                </Button>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={newArrayLesson}
                  pagination={false}
                  className="ant-border-space"
                  loading={isLoading}
                  bordered
                  scroll={{ x: 1600, y: 415 }}
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
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        bodyStyle={{ height: 440 }}
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
                  />
                </div>
              </Col>
              <Col span={6}>
              <div className="author-info">
                <Title level={5}>Content</Title>
                <Input
                  value={content}
                  onChange={(event) => {
                    handleChangeName(event.target.value);
                  }}
                />
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
                  >
                    <Option value="started">started</Option>
                    <Option value="finished">finished</Option>
                    <Option value="canceled">canceled</Option>
                  </Select>
                </div>
              </Col>
              <Col span={6}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
                  value={room}
                >
                  {dataArrayE.map((item) => {
                    if (item.status === "empty") {
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
            </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Lecturer</Title>
                  <Input value={lecturer} disabled={true} />
                </div>
              </Col>
              {/* <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Subject</Title>
                  <Input value={subject} disabled={true} />
                </div>
              </Col> */}
              <Col span={6}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Input
                  // value={name}
                  // onChange={(event) => {
                  //   handleChangeName1(event.target.value);
                  // }}
                  value={classname}
                  disabled
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Time Start</Title>
                <DatePicker
                  // onChange={(value) => {
                  //   handleChangeBirthAdd(value);
                  // }}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange123}
                  onOk={onOk123}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Time Finish</Title>
                <DatePicker
                  // onChange={(value) => {
                  //   handleChangeBirthAdd(value);
                  // }}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange123}
                  onOk={onOk123}
                />
              </div>
            </Col>
              <Col span={24}>
                <div className="author-info">
                  <Title level={5}>List Pupil</Title>
                  <div className="table-responsive">
                    <Table
                      columns={columnsDetail}
                      dataSource={newArrayPupil}
                      pagination={false}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      scroll={{ y: 240 }}
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
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Name</Title>
                <Input
                  // value={name}
                  onChange={(event) => {
                    handleChangeName1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Content</Title>
                <Input
                  // value={name}
                  onChange={(event) => {
                    handleChangeName1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: 120 }}
                  // onChange={(value) => {
                  //   handleChange1(value);
                  // }}
                  value={"started"}
                  disabled
                >
                  <Option value="started">started</Option>
                  <Option value="finished">finished</Option>
                  <Option value="canceled">canceled</Option>
                </Select>
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
                  // value={statusStates}
                >
                  {dataArrayE.map((item) => {
                    if (item.status === "empty") {
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
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Lecturer</Title>
                <Input
                  // value={name}
                  onChange={(event) => {
                    handleChangeName1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={6}>
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

            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Time Start</Title>
                <DatePicker
                  // onChange={(value) => {
                  //   handleChangeBirthAdd(value);
                  // }}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange123}
                  onOk={onOk123}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="author-info">
                <Title level={5}>Time Finish</Title>
                <DatePicker
                  // onChange={(value) => {
                  //   handleChangeBirthAdd(value);
                  // }}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange123}
                  onOk={onOk123}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="author-info">
                <Title level={5}>List Pupil</Title>
                <div className="table-responsive">
                  <Table
                    columns={columnsDetail}
                    dataSource={newArrayPupil}
                    pagination={false}
                    className="ant-border-space"
                    loading={isLoading}
                    bordered
                    scroll={{ y: 240 }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Lessons);
