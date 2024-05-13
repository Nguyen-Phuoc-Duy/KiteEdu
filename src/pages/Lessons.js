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

function SchedulerTable() {
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [arr, setArr] = useState([]);
  const [statusStates, setStatusStates] = useState(null);
  const [room, setRoom] = useState(null);
  const [name, setName] = useState(null);
  const [lecturerId, setLecturerId] = useState(null);
  const [timeStart, setTimeStart] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeFinish, setTimeFinish] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeStartCreate, setTimeStartCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [timeFinishCreate, setTimeFinishCreate] = useState(moment()); // Khởi tạo với thời gian hiện tại
  const [classname, setClassName] = useState(null);
  const [content, setContent] = useState(null);
  const [contentCreate, setContentCreate] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [subject, setSubject] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [roomIdEdit, setRoomIdEdit] = useState(null);
  const [name1, setName1] = useState(null);
  const [idLesson, setIdLesson] = useState(null);
  const [idClass, setIdClass] = useState(null);
  const [statusClass, setStatusClass] = useState(null);
  const history = useHistory();
  const [visible, setVisible] = useState(false);
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
    updateLessonInLesson,
    getPupilByLesson,
    LessonByUser,
    getLessonByUser,
    getDetailLesson,
    detailLesson,
    getAllLessons,
    lessonList,
    employeeList,
    getEmployee,
    errorMessage,
  } = accountStore;
  const showModal = (record) => {
    setIdClass(record?.classId);

    setStatusClass(record?.statusClass);

    getDetailLesson({ ID: record?.ID });

    setSelectedRecord(record);
    setArr(JSON.parse(JSON.stringify(record?.pupils)));

    newArrayPupil = [...arr];
    setStatusStates(record?.status);
    setName(record?.name);
    setContent(record?.content);
    setSubject(record?.subjectId);
    setLecturer(record?.userName);
    setRoom(record?.roomName);
    setIdLesson(JSON.parse(JSON.stringify(record?.ID)));
    setRoomId(record?.roomId);
    setRoomIdEdit(record?.roomId);
    setClassName(record?.className);
    setTimeStart(moment(record?.timeStart));
    setTimeFinish(moment(record?.timeFinish));
    setIsModalVisible(true);
    getPupilByClass({
      ID: record.classId || location.state?.state,
      // lessonId: idLesson,
    });
    getPupilByLesson({
      classId: record.classId || location.state?.state,
      lessonId: record?.ID,
    });
  };
  const showModal1 = (record) => {
    newArrayPupil = [...arr];

    getPupilByClass({
      ID: location.state?.state,
      // lessonId: idLesson,
    });
    setIsModalVisible1(true);
  };

  const handleOk = () => {
    updateLessonInLesson({
      lessonId: idLesson,
      name: name,
      status: statusStates,
      content: content,
      // timeFinish: timeFinish,
      // timeStart: timeStart,
      roomId: roomIdEdit,
    });
    getLessonByClass({ ID: location.state?.state });
    getPupilByClass({
      ID: location.state?.state,
      // lessonId: idLesson,
    });
    getPupilByLesson({
      classId: location.state?.state,
      lessonId: idLesson,
    });
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
    createLesson({
      name: name1,
      // status: "started",
      // userId: location.state?.lecturer,
      // listPupil: transformedArrayA,
      role: currentUserInfo.role,
      roomId: roomId,
      classId: location.state?.state,
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
    if (errorMessage) {
      console.log("errorMessageerrorMessage", errorMessage);
      setVisible(true); // Hiển thị modal
      const timer = setTimeout(() => {
        setVisible(false); // Ẩn modal sau 3 giây
      }, 1000);
      return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc errorMessage thay đổi
    }
  };

  const handlePresentPupil = async (value) => {
    await presentPupilInClass({
      classId: idClass || location.state?.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "present",
    });

    // await updatePupilStatusInClass({
    //   classId: location.state,
    //   pupilId: value.ID,
    //   status: "present",
    //   lessonId: idLesson,
    //   userId: currentUserInfo.id,
    // });
    await getPupilByClass({
      ID: idClass || location.state?.state,
      //  lessonId: idLesson
    });
    await getPupilByLesson({
      classId: idClass || location.state?.state,
      lessonId: idLesson,
    });
  };
  const handleAbsentPupil = async (value) => {
    await presentPupilInClass({
      classId: idClass || location.state?.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "absent",
    });
    await getPupilByClass({
      ID: idClass || location.state?.state,
    });
    await getPupilByLesson({
      classId: idClass || location.state?.state,
      lessonId: idLesson,
    });
  };
  const handleTardyPupil = async (value) => {
    await presentPupilInClass({
      classId: idClass || location.state?.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "tardy",
    });
    await getPupilByClass({
      ID: idClass || location.state?.state,
    });
    await getPupilByLesson({
      classId: idClass || location.state?.state,
      lessonId: idLesson,
    });
  };
  const handleExcusedPupil = async (value) => {
    await presentPupilInClass({
      classId: idClass || location.state?.state,
      pupilId: value?.pupilId,
      lessonId: idLesson,
      userId: value?.userId,
      status: "excused",
    });
    await getPupilByClass({
      ID: idClass || location.state?.state,
    });
    await getPupilByLesson({
      classId: idClass || location.state?.state,
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
  const handleChangeE = (value) => {
    setLecturerId(value);
  };
  const handleChangeEditRoom = (value) => {
    setRoomIdEdit(value);
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
        <div className="avatar-info">
          <Title level={5}>{name}</Title>
        </div>
      ),
    },
    {
      title: "CONTENT",
      dataIndex: "content",
      key: "content",
      render: (content) => <div>{content}</div>,
    },
    {
      title: "LECTURER",
      dataIndex: "userName",
      key: "userId",
      render: (userId) => <div className="semibold">{userId}</div>,
    },
    {
      title: "CLASS",
      dataIndex: "className",
      key: "classId",
      render: (classId) => <a>{classId}</a>,
    },
    {
      title: "ROOM",
      dataIndex: "roomName",
      key: "roomId",
      render: (roomId) => <div className="semibold">{roomId}</div>,
    },
    // Kiểm tra location.state, nếu không null thì hiển thị cột "SC"
    // ...(location.state !== null
    //   ? [
    //       {
    //         title: "SC",
    //         dataIndex: "studentsCount",
    //         key: "studentsCount",
    //         width: "8%",
    //         align: "center",
    //         render: (studentsCount) => (
    //           <div className="avatar-info">
    //             <Title level={5}>{studentsCount}</Title>
    //           </div>
    //         ),
    //       },
    //     ]
    //   : []),
    {
      title: "TIME START",
      dataIndex: "timeStart",
      key: "timeStart",
      render: (timeStart) => (
        <div>{moment(timeStart).format("HH:mm DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "TIME FINISH",
      dataIndex: "timeFinish",
      key: "timeFinish",
      render: (timeFinish) => (
        <div>{moment(timeFinish).format("HH:mm DD-MM-YYYY")}</div>
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
      fixed: "right",
      render: (text, record) => (
        <Button
          type="primary"
          className="tag-primary"
          onClick={() => showModal(record, record?.pupils)}
        >
          Detail
        </Button>
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5em",
                  }}
                >
                  <Button
                    disabled
                    size={"small"}
                    style={{
                      flex: 1,
                      marginRight: "0.5em",
                    }}
                  >
                    Present
                  </Button>{" "}
                  <Button
                    disabled
                    size={"small"}
                    style={{
                      flex: 1,
                    }}
                  >
                    Absent
                  </Button>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    size={"small"}
                    disabled
                    style={{
                      flex: 1,
                      marginRight: "0.5em",
                    }}
                  >
                    Tardy
                  </Button>{" "}
                  <Button
                    size={"small"}
                    disabled
                    style={{
                      flex: 1,
                    }}
                  >
                    Excused
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {(currentUserInfo.role == "employee" &&
                location.state?.status == "started" &&
                statusStates == "started") ||
              (currentUserInfo.role !== "employee" &&
                location.state?.status == "started" &&
                statusStates == "started") ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5em",
                    }}
                  >
                    <Button
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
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
                      disabled
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
                      disabled
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      size={"small"}
                      disabled
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
                      size={"small"}
                      disabled
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
  const dataArrayG = Array.from(detailLesson);

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

  let temp = []; // Khởi tạo một mảng temp để lưu trữ các phần tử từ mảng newArrayPupil.
  let check = []; // Khởi tạo một mảng check để lưu trữ các phần tử đã kiểm tra.
  temp = newArrayPupil.filter((e) => e.lessonId === idLesson); // Lọc các phần tử từ newArrayPupil với điều kiện lessonId bằng idLesson.

  if (temp && temp.length > 0) {
    // Kiểm tra nếu mảng temp không rỗng.
    let temArr = [...arr]; // Sao chép mảng arr vào temArr.

    temp.map((el) => {
      // Duyệt qua từng phần tử của mảng temp.

      let checkItem = temArr.filter((code) => el.pupilId != code.ID);
      // Lọc các phần tử của mảng temArr với điều kiện pupilId không bằng ID.

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
  } else {
    // newArrayPupil = newArrayPupil.filter((e) => e.lessonId == "");

    let temArr = [...arr];

    temp.map((el) => {
      let checkItem = temArr.filter((code) => el.pupilId != code.ID);

      temArr = checkItem;
    });

    let temREsult = temp.concat(temArr);

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
  }

  newArrayPupil = [...new Map(check.map((item) => [item.ID, item])).values()];
  newArrayPupil = newArrayPupil.filter(
    (item) => item.id !== undefined || item.pupilName !== undefined
  );
  // Loại bỏ các phần tử trùng lặp từ mảng check và lưu kết quả vào mảng newArrayPupil.

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

  const dataArrayAll =
    currentUserInfo.role == "employee"
      ? Array.from(LessonByUser)
      : Array.from(lessonList);
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
      userName: correspondingItem1 ? correspondingItem1.name : null,
      className: correspondingItem2 ? correspondingItem2.name : null,
      roomName: correspondingItem3 ? correspondingItem3.name : null,
    };
  });

  newArrayLessonAll.forEach((lesson) => {
    if (
      lesson &&
      lesson.hasOwnProperty("pupils") &&
      lesson.hasOwnProperty("pupilsSum")
    ) {
      const presentStudents = lesson.pupils.filter(
        (pupil) => pupil.status === "present" || pupil.status === "tardy"
      );
      const attendedStudents = lesson.pupilsSum.filter(
        (pupil) => pupil.status === "attended"
      );
      lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
    } else {
      const presentStudents =
        lesson.pupils.filter(
          (pupil) => pupil.status === "present" || pupil.status === "tardy"
        ) || 0;
      const attendedStudents =
        lesson.pupilsSum.filter((pupil) => pupil.status === "attended") || 0;
      lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
    }
  });

  // newArrayLessonAll.forEach((lesson) => {
  //   if (
  //     lesson &&
  //     lesson.hasOwnProperty("pupils") &&
  //     lesson.hasOwnProperty("pupilsSum")
  //   ) {

  //     const presentStudents = lesson.pupils.filter(
  //       (pupil) => pupil.status === "present" || pupil.status === "tardy"
  //     );
  //     const attendedStudents = lesson.pupilsSum.filter(
  //       (pupil) => pupil.status === "attended"
  //     );

  //     lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
  //   } else {
  //     const presentStudents = lesson.pupils.filter(
  //       (pupil) => pupil.status === "present" || pupil.status === "tardy"
  //     );
  //     const attendedStudents = lesson.pupilsSum.filter(
  //       (pupil) => pupil.status === "attended"
  //     );
  //     lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
  //   }

  //   console.log("Lesson:", lesson);
  // });
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
      userName: correspondingItem1 ? correspondingItem1.name : null,
      className: correspondingItem2 ? correspondingItem2.name : null,
      roomName: correspondingItem3 ? correspondingItem3.name : null,
    };
  });

  newArrayLesson.forEach((lesson) => {
    if (
      lesson &&
      lesson.hasOwnProperty("pupils") &&
      lesson.hasOwnProperty("pupilsSum")
    ) {
      const presentStudents = lesson.pupils.filter(
        (pupil) => pupil.status === "present" || pupil.status === "tardy"
      );
      const attendedStudents = lesson.pupilsSum.filter(
        (pupil) => pupil.status === "attended"
      );

      lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
    } else {
      const presentStudents = lesson.pupils.filter(
        (pupil) => pupil.status === "present" || pupil.status === "tardy"
      );
      const attendedStudents = lesson.pupilsSum.filter(
        (pupil) => pupil.status === "attended"
      );
      lesson.studentsCount = `${presentStudents.length}/${attendedStudents.length}`;
    }
  });
  const dataEmployee = Array.from(employeeList);
  const onChange123S = (value, dateString) => {
    setTimeStart(moment(dateString).format("HH:mm DD-MM-YYYY"));
  };
  const onChange123F = (value, dateString) => {
    setTimeFinish(moment(dateString).format("HH:mm DD-MM-YYYY"));
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
  const onOk123S = (value) => {
    setTimeStart(value);
  };
  const onOk123F = (value) => {
    setTimeFinish(value);
  };
  const dataArrayF = Array.from(ClassByUser);
  // Sử dụng phương thức find để tìm phần tử trong mảng có thuộc tính id bằng giá trị của biến a
  let foundElement = dataArrayF.find(
    (element) => element.ID === location.state?.state
  );

  // Nếu tìm thấy phần tử phù hợp, lấy giá trị của thuộc tính name, ngược lại gán bằng null hoặc một giá trị mặc định khác
  let b = foundElement ? foundElement.name : null;

  useEffect(() => {
    createLesson();
    updateLessonInLesson();
  }, []);
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
    getLessonByUser({ ID: currentUserInfo.id });
    getAllLessons();
    // getPupilByClass({
    //   // ID: idClass,
    //   ID: location.state,
    //   lessonId: idLesson,
    // });
    // getPupilByLesson({
    //   classId: location.state,
    //   lessonId: idLesson,
    // });
    getEmployee();
    getLessonByClass({ ID: location.state?.state });
    console.log("location.state", location.state);
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
    getAllLessons,
    getEmployee,
  ]);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Lesson List"
              extra={
                <>
                  {errorMessage && (
                    <Modal
                      title="Notification"
                      visible={visible}
                      footer={null}
                      onCancel={() => setVisible(false)}
                    >
                      <p>
                        <b>{errorMessage}</b>
                      </p>
                    </Modal>
                  )}
                  {/* {currentUserInfo.role !== "employee" &&
                    location.state?.status == "started" &&
                    location.state?.state != null && (
                      <Button
                        type="primary"
                        className="tag-primary"
                        onClick={showModal1}
                        style={{ float: "right" }}
                      >
                        Add Lesson
                      </Button>
                    )} */}
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={
                    location.state == null ? newArrayLessonAll : newArrayLesson
                    // newArrayLesson
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

                    disabled={
                      currentUserInfo.role !== "employee" &&
                      location.state?.status == "started" &&
                      statusStates == "started"
                        ? false
                        : true
                    }
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
                    disabled={
                      currentUserInfo.role == "employee" &&
                      location.state?.status == "started" &&
                      statusStates == "started"
                        ? false
                        : true
                    }
                  />
                </div>
              </Col>
              <Col span={6}>
                <div className="author-info">
                  <Title level={5}>Status</Title>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    value={statusStates}
                    disabled={
                      currentUserInfo.role !== "employee" &&
                      location.state?.status == "started"
                        ? false
                        : true
                    }
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
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      handleChangeEditRoom(value);
                    }}
                    defaultValue={room}
                    disabled={true}
                    // disabled={
                    //   currentUserInfo.role !== "employee" &&
                    //   location.state?.status == "started" &&
                    //   statusStates == "started"
                    //     ? false
                    //     : true
                    // }
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
                    use12Hours
                    onChange={onChange123S}
                    onOk={onOk123S}
                    allowClear={true}
                    showNow={false}
                    value={timeStart}
                    // disabled={
                    //   currentUserInfo.role !== "employee" &&
                    //   location.state?.status == "started" &&
                    //   statusStates == "started"
                    //     ? false
                    //     : true
                    // }
                    disabled={true}
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
                    use12Hours
                    onOk={onOk123F}
                    allowClear={true}
                    value={timeFinish}
                    showNow={false}
                    // disabled={
                    //   currentUserInfo.role !== "employee" &&
                    //   location.state?.status == "started" &&
                    //   statusStates == "started"
                    //     ? false
                    //     : true
                    // }
                    disabled={true}
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
                      pagination={{ pageSize: 3, position: ["bottomCenter"] }}
                      className="ant-border-space"
                      loading={isLoading}
                      bordered
                      // scroll={{ y: 240 }}
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
                      pagination={{ pageSize: 3, position: ["bottomCenter"] }}
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
                <Input value={location.state?.nameLecturer} disabled />
              </div>
            </Col>
            {/* <Col span={12}>
              <div className="author-info">
                <Title level={5}>Lecturer</Title>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleChangeE(value);
                  }}
                >
                  {dataEmployee.map((item) => {
                    if (item.role === "employee") {
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
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Class</Title>
                <Input value={location.state?.nameClass} disabled />
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
            <Col span={12}>
              <div className="author-info">
                <Title level={5}>Status</Title>
                <Select
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
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

export default observer(SchedulerTable);
