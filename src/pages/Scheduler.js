import React, { useState, useEffect, useCallback } from "react";
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
// import "devextreme/dist/css/dx.light.css";
import RadioGroup from "devextreme-react/radio-group";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Scheduler, { Resource, Editing } from "devextreme-react/scheduler";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
const { Title } = Typography;
const { Option } = Select;
const url = "https://js.devexpress.com/Demos/Mvc/api/SchedulerData";
const dataSource = AspNetData.createStore({
  key: "AppointmentId",
  loadUrl: `${url}/Get`,
  insertUrl: `${url}/Post`,
  updateUrl: `${url}/Put`,
  deleteUrl: `${url}/Delete`,
  onBeforeSend(_, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});
const currentDate = new Date();
const views = ["day", "week", "month"];
function SchedulerTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataLesson, setDataLesson] = useState(null);
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { accountStore } = useStore();
  const resourcesList = [
    // "Lecturer",
    "Class",
    "Room",
  ];
  const [currentResource, setCurrentResource] = useState(resourcesList[0]);
  const onRadioGroupValueChanged = useCallback((e) => {
    setCurrentResource(e.value);
  }, []);
  const {
    isLoading,
    lessonList,
    getAllLessons,
    employeeList,
    getEmployee,
    classListActive,
    getAllClassesActive,
    roomList,
    getAllRooms,
    createLesson,
    updateLesson,
    errorMessage,
    currentUserInfo,
  } = accountStore;
  // const [scheduleData, setScheduleData] = useState([]);
  // const addSchedule = (newSchedule) => {
  //   setScheduleData([...scheduleData, newSchedule]);
  // };
  const A = JSON.parse(JSON.stringify(lessonList));
  const dataA = Array.isArray(A)
    ? A.filter((item) => item.status !== "canceled")
    : [];

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

  const dataB = JSON.parse(JSON.stringify(employeeList));
  const arrayB = [];
  const usedColors = [];
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

  for (let i = 0; i < dataB.length; i++) {
    const { name, ID, ...rest } = dataB[i];
    const text = name;
    const id = ID;
    const color = getRandomColor(usedColors);
    arrayB.push({ ...rest, text, id, color });
  }

  const dataC = JSON.parse(JSON.stringify(classListActive));
  const arrayC = [];
  for (let i = 0; i < dataC.length; i++) {
    const { name, ID, ...rest } = dataC[i];
    const text = name;
    const id = ID;
    const color = getRandomColor(usedColors);
    arrayC.push({ ...rest, text, id, color });
  }

  const dataD = JSON.parse(JSON.stringify(roomList));
  const arrayD = [];
  for (let i = 0; i < dataD.length; i++) {
    const { name, ID, ...rest } = dataD[i];
    const text = name;
    const id = ID;
    const color = getRandomColor(usedColors);
    arrayD.push({ ...rest, text, id, color });
  }
  const arrayD1 = arrayD.filter((item) => item.status === "empty");
  // const arrayD1 = arrayD
  // console.log("lllllllllllll", arrayD1);

  const onAppointmentAdding = (e) => {
    if (
      e &&
      e.appointmentData?.text &&
      e.appointmentData?.roomID &&
      e.appointmentData?.classID &&
      e.appointmentData?.descriptionExpr
    ) {
      console.log("FFFFFFFFFFFFFFFFFFFFF", e);
      createLesson({
        role: currentUserInfo.role,
        name: e.appointmentData?.text,
        roomId: e.appointmentData?.roomID,
        classId: e.appointmentData?.classID,
        content: e.appointmentData?.descriptionExpr,
        timeFinish: e.appointmentData?.endDate,
        timeStart: e.appointmentData?.startDate,
      });
      console.log("errorMessage", errorMessage);
      if (errorMessage) {
        setVisible(true); // Hiển thị modal
        const timer = setTimeout(() => {
          setVisible(false); // Ẩn modal sau 3 giây
        }, 1000);
        return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
      }
    }
  };

  const onAppointmentUpdating = (e) => {
    if (
      e
      // && e.appointmentData?.status !== "finished"
      // &&
      // e.appointmentData?.text !== "" &&
      // e.appointmentData?.roomID &&
      // e.appointmentData?.classID &&
      // e.appointmentData?.descriptionExpr
    ) {
      console.log("cccccccc", e);
      updateLesson({
        lessonId: e.newData?.ID,
        name: e.newData?.text,
        status: "",
        userId: e.newData?.ownerId,
        roomId: e.newData?.roomID,
        classId: e.newData?.classID,
        content: e.newData?.descriptionExpr,
        timeFinish: e.newData?.endDate,
        timeStart: e.newData?.startDate,
      });
      if (errorMessage) {
        setVisible(true); // Hiển thị modal
        const timer = setTimeout(() => {
          setVisible(false); // Ẩn modal sau 3 giây
        }, 1000);
        return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
      }
    }
  };

  const onOk = (value) => {
    // setTimeFinishCreate(value);
    console.log("gg");
    onAppointmentAdding();
    setVisible(false);
  };
  useEffect(() => {
    getAllLessons();
    // onAppointmentUpdating();
    // onAppointmentAdding();
    createLesson();
    updateLesson();
  }, []);

  useEffect(() => {
    // onAppointmentUpdating();
    // onAppointmentAdding();
    createLesson();
    updateLesson();
    getAllClassesActive();
    getEmployee();
    getAllRooms();
  }, [getAllClassesActive, getAllRooms, getEmployee]);

  return (
    <>
      {/* <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}> */}
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
          </>
        }
      >
        <div className="table-responsive">
          <Scheduler
            timeZone="Asia/Bangkok"
            dataSource={arrayA}
            views={views}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            height={400}
            startDayHour={0}
            endDayHour={24}
            descriptionExpr="descriptionExpr"
            onAppointmentAdding={onAppointmentAdding}
            onAppointmentUpdating={onAppointmentUpdating}
          >
            <Editing
              allowAdding={true}
              allowDeleting={false}
              allowResizing={true}
              allowDragging={true}
              allowUpdating={true}
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
      {/* </Col>
        </Row>
      </div> */}
    </>
  );
}

export default observer(SchedulerTable);
