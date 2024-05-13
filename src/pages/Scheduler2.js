import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
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
import { useLocation } from "react-router-dom";
import Scheduler, { Resource, Editing } from "devextreme-react/scheduler";
import RadioGroup from "devextreme-react/radio-group";
const { Title } = Typography;
const { Option } = Select;

function Lessons() {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [statusStates, setStatusStates] = useState(null);
  const [name, setName] = useState(null);
  const [lecturerId, setLecturerId] = useState(null);
  const [timeStartCreate, setTimeStartCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeFinishCreate, setTimeFinishCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [content, setContent] = useState(null);
  const [contentCreate, setContentCreate] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [classId, setClassId] = useState(null);
  const [roomIdEdit, setRoomIdEdit] = useState(null);
  const [name1, setName1] = useState(null);
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { accountStore } = useStore();
  const {
    getAllClassesActive,
    roomList,
    getAllRooms,
    getAllUsers,
    currentUserInfo,
    createLesson,
    getAllLessons,
    lessonList,
    errorMessage,
    classListActive,
  } = accountStore;
 
  const showModal1 = (record) => {

    setIsModalVisible1(true);
  };


  const handleOk1 = () => {
    createLesson({
      name: name1,
      role: currentUserInfo.role,
      roomId: roomId,
      classId: classId,
      content: contentCreate,
      timeFinish: timeFinishCreate,
      timeStart: timeStartCreate,
    });
    setIsModalVisible1(false);
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


  const handleChange1 = (value) => {
    setRoomId(value);
  };
  const handleChange2 = (value) => {
    setClassId(value);
  };
  const handleChangeName1 = (value) => {
    setName1(value);
  };
  const handleChangeContent1 = (value) => {
    setContentCreate(value);
  };

  const onChangeCreateS = (value, dateString) => {
    setTimeStartCreate(moment(dateString).format("HH:mm DD-MM-YYYY"));
  };
  const onChangeCreateF = (value, dateString) => {
    setTimeFinishCreate(moment(dateString).format("HH:mm DD-MM-YYYY"));
  };
  ///////////
  const onOkCreateS = (value) => {
    setTimeStartCreate(value);
  };
  const onOkCreateF = (value) => {
    setTimeFinishCreate(value);
  };


  ////////
  const dataA = JSON.parse(JSON.stringify(lessonList));
  const arrayA = [];
  for (let i = 0; i < dataA.length; i++) {
    const {
      timeStart,
      timeFinish,
      name,
      content,
      userId,
      classId,
      roomId,
      ...rest
    } = dataA[i];
    const startDate = timeStart;
    const endDate = timeFinish;
    const text = name;
    const ownerId = userId;
    const classID = classId;
    const roomID = roomId;
    const descriptionExpr = content;
    arrayA.push({
      ...rest,
      startDate,
      endDate,
      text,
      descriptionExpr,
      ownerId,
      classID,
      roomID,
    });
  }
  const currentDate = new Date();
  const views = ["day", "week", "month"];
  const usedColors = [];
  const resourcesList = [
    "Class",
    "Room",
  ];
  const [currentResource, setCurrentResource] = useState(resourcesList[0]);
  const onRadioGroupValueChanged = useCallback((e) => {
    setCurrentResource(e.value);
  }, []);
  const getRandomColor = (usedColors) => {
    const letters = "0123456789ABCDEF";
    let color;
    do {
      color = "#";
      const brightnessThreshold = 100; // Ngưỡng độ sáng để đảm bảo đủ độ tương phản với màu trắng
      for (let i = 0; i < 6; i++) {
        let randomValue;
        do {
          randomValue = Math.floor(Math.random() * 256);
        } while (randomValue > brightnessThreshold); // Chỉ chọn giá trị màu độ sáng thấp hơn ngưỡng
        color += letters[randomValue % 16];
      }
    } while (usedColors.includes(color));
    return color;
  };
  const dataC = JSON.parse(JSON.stringify(classListActive));

  const dataD = JSON.parse(JSON.stringify(roomList));
  const arrayD = [];
  for (let i = 0; i < dataD.length; i++) {
    const { name, ID, ...rest } = dataD[i];
    const text = name;
    const id = ID;
    const color = getRandomColor(usedColors);
    arrayD.push({ ...rest, text, id, color });
  }
  const arrayC = [];
  for (let i = 0; i < dataC.length; i++) {
    const { name, ID, ...rest } = dataC[i];
    const text = name;
    const id = ID;
    const color = getRandomColor(usedColors);
    arrayC.push({ ...rest, text, id, color });
  }

  useEffect(() => {
    getAllLessons();
    createLesson();
    getAllRooms();
    getAllClassesActive();
  }, []);
  // useEffect(() => {
  //   getAllRooms();
  //   getAllClassesActive();
  // }, [getAllClassesActive, getAllRooms]);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Scheduler"
              extra={
                <>
                  {errorMessage && (
                    <Modal
                      title="Notification"
                      visible={visible}
                      footer={null}
                      onCancel={() => setVisible(false)}
                      // onOk={onOk}
                    >
                      <p>
                        <b>{errorMessage}</b>
                      </p>
                    </Modal>
                  )}
                  {
                    // currentUserInfo.role !== "employee" &&
                    //   location.state?.status == "started" &&
                    //   location.state?.state != null &&
                    <Button
                      type="primary"
                      className="tag-primary"
                      onClick={showModal1}
                      style={{ float: "right" }}
                    >
                      Add Lesson
                    </Button>
                  }
                </>
              }
            >
              <div className="table-responsive">
                <Scheduler
                  timeZone="Asia/Bangkok"
                  dataSource={arrayA}
                  views={views}
                  defaultCurrentView="day"
                  defaultCurrentDate={currentDate}
                  height={400}
                  startDayHour={0}
                  endDayHour={24}
                  descriptionExpr="descriptionExpr"
                >
                  <Editing
                    allowAdding={false}
                    allowDeleting={false}
                    allowResizing={false}
                    allowDragging={false}
                    allowUpdating={false}
                  />
                  {/* <Resource
                    fieldExpr="ownerId"
                    allowMultiple={false}
                    dataSource={arrayB}
                    label="Lecturer"
                    useColorAsDefault={currentResource === "Lecturer"}
                  /> */}
                  <Resource
                    fieldExpr="classID"
                    allowMultiple={false}
                    dataSource={arrayC}
                    label="Class"
                    useColorAsDefault={currentResource === "Class"}
                  />
                  <Resource
                    fieldExpr="roomID"
                    allowMultiple={false}
                    dataSource={arrayD}
                    label="Room"
                    useColorAsDefault={currentResource === "Room"}
                  />
                </Scheduler>
                <div
                  className="options"
                  style={{
                    backgroundColor: "rgba(191, 191, 191, 0.15)",
                  }}
                >
                  <div
                    style={{
                      margin: "0 10px",
                    }}
                  >
                    <div className="caption">
                      <b>Use colors of:</b>
                    </div>
                    <div className="option">
                      <RadioGroup
                        items={resourcesList}
                        value={currentResource}
                        layout="horizontal"
                        onValueChanged={onRadioGroupValueChanged}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="ADD"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel}
        destroyOnClose={true}
        // width={1000}
      >
        <>
          <Row gutter={[16, 16]}>
            <Col span={12}>
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
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Content</Title>
                <Input
                  // value={name}
                  onChange={(event) => {
                    handleChangeContent1(event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={""}
                  onChange={(value) => {
                    handleChange2(value);
                  }}
                >
                  {dataC &&
                    Array.isArray(dataC) &&
                    dataC.map((item) => (
                      <Option key={item.ID} value={item.ID}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => handleChange1(value)}
                >
                  {dataD &&
                    Array.isArray(dataD) &&
                    dataD.map((item) => {
                      if (item.status === "empty") {
                        return (
                          <Option key={item.ID} value={item.ID}>
                            {item.name}
                          </Option>
                        );
                      }
                      return null; // Trả về null nếu item.status không phải 'empty'
                    })}
                </Select>
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Time Start</Title>
                <DatePicker
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  use12Hours
                  onChange={onChangeCreateS}
                  onOk={onOkCreateS}
                  allowClear={true}
                  value={timeStartCreate}
                  showNow={false}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Time Finish</Title>
                <DatePicker
                  showTime={{
                    format: "HH:mm",
                  }}
                  use12Hours
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChangeCreateF}
                  onOk={onOkCreateF}
                  allowClear={true}
                  value={timeFinishCreate}
                  showNow={false}
                />
              </div>
            </Col>
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Lessons);
