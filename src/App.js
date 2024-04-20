
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Accounts from "./pages/Accounts";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import CreateAccount from "./pages/CreateAccount";
//import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "antd/dist/antd.min.css";
import { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/store";
// import AccountInformation from "./pages/AccountInfomation";
import Subjects from "./pages/Subjects";
import CreateSubject from "./pages/CreateSubject";
import Rooms from "./pages/Rooms";
import CreateRoom from "./pages/CreateRoom";
import Pupils from "./pages/Pupils";
import CreatePupil from "./pages/CreatePupil";
import Classes from "./pages/Classes";
import Lessons from "./pages/Lessons";
// import CreateClass from "./pages/CreateClass";
// function App() {
//   const history = useHistory();

//   const { accountStore } = useStore();
//   const { currentUserToken } = accountStore;

//   // useEffect(() => {
//   //   if (userToken) {
//   //     localStorage.removeItem("userInfo");
//   //     history.push("/sign-in");
//   //   }
//   // }, []);

//   return (
//     <div className="App">
//       <Switch>
//         <Route path="/sign-up" exact component={SignUp} />
//         <Route path="/sign-in" exact component={SignIn} />
//         <Main>
//           <Route exact path="/dashboard" component={Home} />
//           <Route exact path="/tables" component={Tables} />
//           <Route exact path="/accounts" component={Accounts} />
//           <Route exact path="/create-account" component={CreateAccount} />
//           <Route exact path="/create-subject" component={CreateSubject} />
//           <Route exact path="/create-room" component={CreateRoom} />
//           <Route exact path="/create-pupil" component={CreatePupil} />
//           {/* <Route exact path="/create-class" component={CreateClass} /> */}
//           <Route
//             exact
//             path="/account-information"
//             component={AccountInformation}
//           />
//           <Route exact path="/subjects" component={Subjects} />
//           <Route exact path="/rooms" component={Rooms} />
//           <Route exact path="/pupils" component={Pupils} />
//           <Route exact path="/classes" component={Classes} />
//           <Route exact path="/billing" component={Billing} />
//           <Route exact path="/rtl" component={Rtl} />
//           <Route exact path="/profile" component={Profile} />
//           <Route from="*" to="/dashboard" />
//           {/* <Route exact path="/">
//             {currentUserToken ? <Redirect to="/sign-in" /> : <Home />}
//           </Route> */}
//         </Main>
//       </Switch>
//     </div>
//   );
// }

// export default observer(App);




function App() {
  const history = useHistory();
  const { accountStore } = useStore();
  const { currentUserToken } = accountStore;

  // Nếu không có token của người dùng, chuyển hướng về trang đăng nhập
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        currentUserToken ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Main>
          {/* <PrivateRoute exact path="/dashboard" component={Home} /> */}
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute exact path="/tables" component={Tables} />
          <PrivateRoute exact path="/accounts" component={Accounts} />
          <PrivateRoute exact path="/create-account" component={CreateAccount} />
          <PrivateRoute exact path="/create-subject" component={CreateSubject} />
          <PrivateRoute exact path="/create-room" component={CreateRoom} />
          <PrivateRoute exact path="/create-pupil" component={CreatePupil} />
          {/* <Route exact path="/create-class" component={CreateClass} /> */}
          <PrivateRoute
            exact
            path="/profile"
            component={Profile}
          />
          <PrivateRoute exact path="/subjects" component={Subjects} />
          <PrivateRoute exact path="/rooms" component={Rooms} />
          <PrivateRoute exact path="/pupils" component={Pupils} />
          <PrivateRoute exact path="/classes" component={Classes} />
          <PrivateRoute exact path="/lessons" component={Lessons} />
          {/* <Redirect from="*" to="/dashboard" /> */}
          {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
          {/* <Redirect from="*" to="/dashboard" /> */}
          {/* Các Route khác chỉ hiển thị khi đã đăng nhập */}
        </Main>
        {/* Nếu người dùng truy cập vào một Route không tồn tại, redirect về trang dashboard */}
        <Redirect from="*" to="/sign-in" />
      </Switch>
    </div>
  );
}

export default observer(App);

