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
import { useLocation } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

function Lessons() {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [arr, setArr] = useState([]);
  const [statusStates, setStatusStates] = useState(null);
  const [room, setRoom] = useState(null);
  const [name, setName] = useState(null);
  const [timeStart, setTimeStart] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeFinish, setTimeFinish] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeStartCreate, setTimeStartCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeFinishCreate, setTimeFinishCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [classname, setClassName] = useState(null);
  const [content, setContent] = useState(null);
  const [contentCreate, setContentCreate] = useState(null);

  const [subject, setSubject] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [name1, setName1] = useState(null);
  const [idLesson, setIdLesson] = useState();
  const [idClass, setIdClass] = useState();
  const history = useHistory();

  const showModal = (record, text) => {
    setIdClass(record?.ID);
    console.log(
      "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
      record?.ID,
      idClass
    );
    console.log("record", JSON.parse(JSON.stringify(record?.pupils)));
    setSelectedRecord(record);
    setArr(JSON.parse(JSON.stringify(record?.pupils)));
    console.log("tttttttttttt", JSON.parse(JSON.stringify(record?.pupils)));
    console.log("0,", selectedRecord);
    newArrayPupil = [...arr];
    setStatusStates(record.status);
    setName(record.name);
    setContent(record.content);
    setSubject(record.subjectId);
    // setLecturer(record.userId);
    setRoom(record.roomId);
    setIdLesson(JSON.parse(JSON.stringify(record?.ID)));

    setClassName(record.classId);
    setTimeStart(moment.parseZone(record.timeStart));
    setTimeFinish(moment.parseZone(record.timeFinish));
    setIsModalVisible(true);
    getPupilByClass({
      ID: location.state,
      // lessonId: idLesson,
    });
    getPupilByLesson({
      classId: location.state,
      lessonId: record?.ID,
    });
    console.log("recordbfdbfhtrfh", record, timeFinish);
  };
  const showModal1 = (record) => {
    newArrayPupil = [...arr];

    console.log(newArrayPupil, arr);
    getPupilByClass({
      ID: location.state,
      // lessonId: idLesson,
    });
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
    presentPupilInClass,
    absentPupilInClass,
    updatePupilStatusInClass,
    createLesson,
    PupilByLesson,
    updateLesson,
    getPupilByLesson,
    LessonByUser,
    getLessonByUser,
  } = accountStore;

  const handleOk = () => {
    updateLesson({
      lessonId: idLesson,
      name: name,
      status: statusStates,
      content: content,
      timeFinish: timeFinish,
      timeStart: timeStart,
    });
    getLessonByClass({ ID: location.state });
    getPupilByClass({
      ID: location.state,
      // lessonId: idLesson,
    });
    getPupilByLesson({
      classId: location.state,
      lessonId: idLesson,
    });
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    createLesson({
      name: name1,
      status: "started",
      userId: currentUserInfo.id,
      // listPupil: transformedArrayA,
      roomId: roomId,
      classId: location.state,
      content: contentCreate,
      timeFinish: timeFinishCreate,
      timeStart: timeStartCreate,
    });
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    // getAllClasses();
    getAllSubjects();
    getAllUsers();
    setIsModalVisible1(false);
    // console.log("jkjk", currentUserInfo);
  };

  const handlePresentPupil = async (value) => {
    await presentPupilInClass({
      classId: location.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "present",
    });
    console.log("value7777777777777777777777777777777", value);
    // await updatePupilStatusInClass({
    //   classId: location.state,
    //   pupilId: value.ID,
    //   status: "present",
    //   lessonId: idLesson,
    //   userId: currentUserInfo.id,
    // });
    await getPupilByClass({
      ID: location.state,
      //  lessonId: idLesson
    });
    await getPupilByLesson({
      classId: location.state,
      lessonId: idLesson,
    });
  };
  const handleAbsentPupil = async (value) => {
    console.log("1111111111111111111111111111111", value);

    await presentPupilInClass({
      classId: location.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "absent",
    });
    await getPupilByClass({
      ID: location.state,
    });
    await getPupilByLesson({
      classId: location.state,
      lessonId: idLesson,
    });
  };
  const handleTardyPupil = async (value) => {
    console.log("1111111111111111111111111111111", value);

    await presentPupilInClass({
      classId: location.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "tardy",
    });
    await getPupilByClass({
      ID: location.state,
    });
    await getPupilByLesson({
      classId: location.state,
      lessonId: idLesson,
    });
  };
  const handleExcusedPupil = async (value) => {
    console.log("1111111111111111111111111111111", value);

    await presentPupilInClass({
      classId: location.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "excused",
    });
    await getPupilByClass({
      ID: location.state,
    });
    await getPupilByLesson({
      classId: location.state,
      lessonId: idLesson,
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible1(false);
  };

  const handleChange = (value) => {
    setStatusStates(value);
  };

  const handleChangeName = (value) => {
    setName(value);
  };

  const handleChange1 = (value) => {
    setRoomId(value);
  };

  const handleChangeName1 = (value) => {
    setName1(value);
  };
  const handleChangeContent = (value) => {
    setContent(value);
  };
  const handleChangeContent1 = (value) => {
    setContentCreate(value);
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
        <>
          <div className="semibold">
            {moment.parseZone(timeStart).format("HH:mm DD-MM-YYYY")}
          </div>
          {/* {timeStart} */}
        </>
      ),
    },
    {
      title: "TIME FINISH",
      dataIndex: "timeFinish",
      key: "timeFinish",
      render: (timeFinish) => (
        <>
          <div className="semibold">
            {moment.parseZone(timeFinish).format("HH:mm DD-MM-YYYY")}
            {/* {timeFinish} */}
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
            onClick={() => showModal(record, record?.pupils)}
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
      dataIndex: "pupilName",
      key: "pupilName",
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
      width: "20%",
      align: "center",
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
      width: "40%",
      align: "center",
      render: (text, record) => (
        <>
          {record?.status === "not attend" ? (
            <>
              <Button type="primary" className="tag-primary" disabled>
                Present
              </Button>{" "}
              <Button type="danger" className="tag-primary" disabled>
                Absent
              </Button>{" "}
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5em",
                }}
              >
                <Button
                  type="primary"
                  className="tag-primary"
                  onClick={() => handlePresentPupil(record)}
                  size={"small"}
                  style={{
                    flex: 1,
                    background: "green",
                    borderColor: "green",
                    color: "white",
                    marginRight: "0.5em",
                  }}
                >
                  Present
                </Button>{" "}
                <Button
                  type="danger"
                  className="tag-primary"
                  onClick={() => handleAbsentPupil(record)}
                  size={"small"}
                  style={{
                    flex: 1,
                    background: "red",
                    borderColor: "red",
                    color: "white",
                  }}
                >
                  Absent
                </Button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  type="primary"
                  className="tag-primary"
                  size={"small"}
                  onClick={() => handleTardyPupil(record)}
                  style={{
                    flex: 1,
                    background: "orange",
                    borderColor: "orange",
                    color: "white",
                    marginRight: "0.5em",
                  }}
                >
                  Tardy
                </Button>{" "}
                <Button
                  type="danger"
                  className="tag-primary"
                  size={"small"}
                  onClick={() => handleExcusedPupil(record)}
                  style={{
                    flex: 1,
                    background: "blue",
                    borderColor: "blue",
                    color: "white",
                  }}
                >
                  Excused
                </Button>
              </div>
            </div>
          )}
        </>
      ),
    },
  ];
  const columnsDetail1 = [
    {
      title: "NAME PUPIL",
      dataIndex: "pupilName",
      key: "pupilName",
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
      width: "30%",
      align: "center",
      render: (status) => (
        <>
          {status === "present" ? (
            <Tag color="green">{status}</Tag>
          ) : status === "absent" ? (
            <Tag color="red">{status}</Tag>
          ) : status === "excused" ? (
            <Tag color="blue">{status}</Tag>
          ) : (
            <Tag color="orange">{status}</Tag>
          )}
        </>
      ),
    },

    // {
    //   title: "ACTION",
    //   key: "action",
    //   width: "40%",
    //   align: "center",
    //   render: (text, record) => (
    //     <>
    //       {record?.status === "not attend" ? (
    //         <>
    //           <Button type="primary" className="tag-primary" disabled>
    //             Present
    //           </Button>{" "}
    //           <Button type="danger" className="tag-primary" disabled>
    //             Absent
    //           </Button>{" "}
    //         </>
    //       ) : (
    //         <>
    //           <Button
    //             type="primary"
    //             className="tag-primary"
    //             onClick={() => handlePresentPupil(record)}
    //           >
    //             Present
    //           </Button>{" "}
    //           <Button
    //             type="danger"
    //             className="tag-primary"
    //             onClick={() => handleAbsentPupil(record)}
    //           >
    //             Absent
    //           </Button>
    //         </>
    //       )}
    //     </>
    //   ),
    // },
  ];
  const dataArray = Array.from(ClassByUser);
  console.log("dataArraydataArray", dataArray);
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
  let listPupilByClassArray = listPupilByClass.map((item1) => {
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", location.state);
  const listPupilByClass1 = Array.from(PupilByLesson);

  const arrayPupils = dataArrayD.map((itemB) => ({
    label: itemB.name,
    value: itemB.name + " " + itemB.ID,
  }));

  let newArrayPupil1 = listPupilByClass1.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });
  console.log("newArrayPupilnewArrayPupil", newArrayPupil1, listPupilByClass1);
  let newArrayPupil = listPupilByClass1.map((item1) => {
    // Tìm phần tử tương ứng trong Array2
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });

  console.log(" arr1111111111111", arr);
  let temp = []; // Khởi tạo một mảng temp để lưu trữ các phần tử từ mảng newArrayPupil.
  let check = []; // Khởi tạo một mảng check để lưu trữ các phần tử đã kiểm tra.
  temp = newArrayPupil.filter((e) => e.lessonId === idLesson); // Lọc các phần tử từ newArrayPupil với điều kiện lessonId bằng idLesson.

  if (temp && temp.length > 0) {
    // Kiểm tra nếu mảng temp không rỗng.
    let temArr = [...arr]; // Sao chép mảng arr vào temArr.

    temp.map((el) => {
      // Duyệt qua từng phần tử của mảng temp.
      console.log("111111111111", el, el.pupilId, arr);
      console.log("jjjjjjjjjjjj", temp);
      let checkItem = temArr.filter((code) => el.pupilId != code.ID);
      // Lọc các phần tử của mảng temArr với điều kiện pupilId không bằng ID.
      console.log(checkItem);
      temArr = checkItem; // Gán lại temArr sau khi lọc.
    });

    let temREsult = temp.concat(temArr); // Nối mảng temp và temArr lại với nhau.

    temREsult.map((e) => {
      // Duyệt qua từng phần tử của mảng temREsult.
      let prt = {
        // Tạo một đối tượng prt để lưu trữ thông tin của từng phần tử.
        ID: e.ID,
        classId: e.classId ? e.classId : "",
        lessonId: e.lesson ? e.lesson : "",
        pupilId: e.pupilId ? e.pupilId : "",
        pupilName: e.pupilName ? e.pupilName : e.name,
        status: e.status ? e.status : e.status,
        userId: e.userId ? e.userId : "",
      };
      check.push(prt); // Thêm đối tượng prt vào mảng check.
    });

    console.log("temArr", temArr);
    console.log("temREsult", temREsult, check);
  } else {
    // newArrayPupil = newArrayPupil.filter((e) => e.lessonId == "");

    console.log("jjjjjjjjjjjj", temp);
    let temArr = [...arr];
    console.log(temArr);

    temp.map((el) => {
      console.log("111111111111", el, el.pupilId, arr);
      let checkItem = temArr.filter((code) => el.pupilId != code.ID);
      console.log(checkItem);
      temArr = checkItem;
    });

    let temREsult = temp.concat(temArr);
    console.log("temREsult000000000000000000", temREsult, check);
    temREsult.map((e) => {
      let prt = {
        ID: e.ID,
        classId: e.classId ? e.classId : "",
        lessonId: e.lessonId ? e.lessonId : "",
        pupilId: e.pupilId ? e.pupilId : "",
        pupilName: e.pupilName ? e.pupilName : e.name,
        status: e.status ? e.status : e.status,
        userId: e.userId ? e.userId : "",
      };
      check.push(prt);
    });

    console.log("temArr", temArr);
    console.log("temREsult", temREsult, check);
  }
  console.log("newArrayPupil", newArrayPupil);
  // console.log("temp", temp);

  newArrayPupil = [...new Map(check.map((item) => [item.ID, item])).values()];
  newArrayPupil = newArrayPupil.filter(
    (item) => item.id !== undefined || item.pupilName !== undefined
  );
  // Loại bỏ các phần tử trùng lặp từ mảng check và lưu kết quả vào mảng newArrayPupil.
  console.log("newArrayPupil22222222222222", newArrayPupil);
  // console.log("hhhhhhhhhhhhhhhhh", check, newArrayPupil);
  // let obj = {};
  // obj = testMsg.errMsg;
  // console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ", obj);
  let listPupilByClassAdd = listPupilByClass.map((item1) => {
    let correspondingItem1 = dataArrayD.find((item2) => {
      return item2.ID === item1.pupilId;
    });
    return {
      ...item1,
      pupilName: correspondingItem1 ? correspondingItem1.name : null,
    };
  });

  const dataArrayAll = Array.from(LessonByUser);
  let newArrayLessonAll = dataArrayAll.map((item1) => {
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

  const dataArray0 = Array.from(LessonByClass);

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
  // console.log("first", newArrayLesson);
  const onChange123S = (value, dateString) => {
    setTimeStart(moment.parseZone(dateString).format("HH:mm DD-MM-YYYY"));
  };
  const onChange123F = (value, dateString) => {
    setTimeFinish(moment.parseZone(dateString).format("HH:mm DD-MM-YYYY"));
  };

  const onChangeCreateS = (value, dateString) => {
    setTimeStartCreate(moment.parseZone(dateString).format("HH:mm DD-MM-YYYY"));
  };
  const onChangeCreateF = (value, dateString) => {
    setTimeFinishCreate(
      moment.parseZone(dateString).format("HH:mm DD-MM-YYYY")
    );
  };
  ///////////
  const onOkCreateS = (value) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value);
    setTimeStartCreate(value);
  };
  const onOkCreateF = (value) => {
    setTimeFinishCreate(value);
  };
  const onOk123S = (value) => {
    setTimeStart(value);
  };
  const onOk123F = (value) => {
    setTimeFinish(value);
  };
  const dataArrayF = Array.from(ClassByUser);
  // Sử dụng phương thức find để tìm phần tử trong mảng có thuộc tính id bằng giá trị của biến a
  let foundElement = dataArrayF.find(
    (element) => element.ID === location.state
  );

  // Nếu tìm thấy phần tử phù hợp, lấy giá trị của thuộc tính name, ngược lại gán bằng null hoặc một giá trị mặc định khác
  let b = foundElement ? foundElement.name : null;
  useEffect(() => {
    getAllRooms();
    // getAllClasses();
    getAllSubjects();
    getAllUsers();
    getAllPupils();
    getClassByUser({
      ID: currentUserInfo.id,
      role: currentUserInfo.role,
    });
    getLessonByUser();
    // getPupilByClass({
    //   // ID: idClass,
    //   ID: location.state,
    //   lessonId: idLesson,
    // });
    // getPupilByLesson({
    //   classId: location.state,
    //   lessonId: idLesson,
    // });
    getLessonByClass({ ID: location.state });
    console.log("hohohoho", PupilByLesson);
  }, [
    isModalVisible1,
    isModalVisible,
    getAllRooms,
    getAllSubjects,
    getAllUsers,
    getAllPupils,
    getClassByUser,
    currentUserInfo.id,
    currentUserInfo.role,
    getLessonByClass,
    location.state,
    PupilByLesson,
    getLessonByUser,
  ]);

  return (
    <>
      {currentUserInfo.id !== "employee" ? (
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
                    dataSource={
                      location.state == null
                        ? newArrayLessonAll
                        : newArrayLesson
                    }
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
      ) : (
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
                    dataSource={
                      location.state == null
                        ? newArrayLessonAll
                        : newArrayLesson
                    }
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
      )}

      <Modal
        title="DETAIL"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
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
                      handleChangeContent(event.target.value);
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
                  <Input value={currentUserInfo.name} disabled={true} />
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
                  <Input value={classname} disabled />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Time Start</Title>
                  <DatePicker
                    showTime={{
                      format: "HH:mm",
                    }}
                    format="HH:mm DD-MM-YYYY"
                    onChange={onChange123S}
                    onOk={onOk123S}
                    allowClear={true}
                    showNow={false}
                    value={timeStart}
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Time Finish</Title>
                  <DatePicker
                    showTime={{
                      format: "HH:mm",
                    }}
                    format="HH:mm DD-MM-YYYY"
                    onChange={onChange123F}
                    onOk={onOk123F}
                    allowClear={true}
                    value={timeFinish}
                    showNow={false}
                  />
                </div>
              </Col>
              <Col span={15}>
                <div className="author-info">
                  <Title level={5}>List Pupil Class</Title>
                  <div className="table-responsive">
                    <Table
                      columns={columnsDetail}
                      dataSource={listPupilByClassArray}
                      pagination={false}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      scroll={{ y: 240 }}
                    />
                  </div>
                </div>
              </Col>
              <Col span={9}>
                <div className="author-info">
                  <Title level={5}>List Pupil Lesson</Title>
                  <div className="table-responsive">
                    <Table
                      columns={columnsDetail1}
                      dataSource={newArrayPupil1}
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
                <Title level={5}>Lecturer</Title>
                <Input value={currentUserInfo.name} disabled />
              </div>
            </Col>
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Input value={b} disabled />
              </div>
            </Col>

            <Col span={12}>
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
                  // onChange={(value) => {
                  //   handleChangeBirthAdd(value);
                  // }}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChangeCreateF}
                  onOk={onOkCreateF}
                  allowClear={true}
                  value={timeFinishCreate}
                  showNow={false}
                />
              </div>
            </Col>
            <Col span={12}>
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
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Room</Title>
                <Select
                  style={{ width: 120 }}
                  onChange={(value) => {
                    handleChange1(value);
                  }}
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
            {/* <Col span={24}>
              <div className="author-info">
                <Title level={5}>List Pupil</Title>
                <div className="table-responsive">
                  <Table
                    columns={columnsDetail}
                    dataSource={listPupilByClassAdd}
                    pagination={false}
                    className="ant-border-space"
                    loading={isLoading}
                    bordered
                    scroll={{ y: 240 }}
                  />
                </div>
              </div>
            </Col> */}
          </Row>
        </>
      </Modal>
    </>
  );
}

export default observer(Lessons);
