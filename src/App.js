import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [newrow, setNewrow] = useState([])

  const getUsers = async () => {
    try {
    const { data } = await axios.get(url);
    // console.log(data);
    setUsers(data.results);
    setLoading(false);
    setValue(data.results[0].name.first);
    setTitle("name");
    } catch (error) {
      console.log(error)
    }
    
  };

  const addUsers = () => {
    if(emails.includes(users[0].email)){
      toast.error("user already exists")
    }else{
      setNewrow([...newrow, [
        {header:users[0].name.first},
        {header:users[0].email},
        {header:users[0].phone},
        {header:users[0].dob.age}
      ]])
      setEmails([...emails, users[0].email])
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  // console.log(users[0].name.first)

  if (loading) {
    <h1>loading</h1>;
  }

  return (
    <main>
       <Toaster/>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          {users?.map((item, index) => {
            return (
              <div key={index}>
                <img
                  src={item.picture.medium}
                  alt="random user"
                  className="user-img"
                />
                {value && (
                  <>
                    <p className="user-title">My {title} is</p>
                    <p className="user-value">{value}</p>
                  </>
                )}

                <div className="values-list">
                  <button className="icon" data-label="name">
                    <img
                      src={item.gender === "female" ? womanSvg : manSvg}
                      alt="user"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("name");
                        setValue(item.name.first);
                      }}
                    />
                  </button>
                  <button className="icon" data-label="email">
                    <img
                      src={mailSvg}
                      alt="mail"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("email");
                        setValue(item.email);
                      }}
                    />
                  </button>
                  <button className="icon" data-label="age">
                    <img
                      src={item.gender === "female" ? womanAgeSvg : manAgeSvg}
                      alt="age"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("age");
                        setValue(item.dob.age);
                      }}
                    />
                  </button>
                  <button className="icon" data-label="street">
                    <img
                      src={mapSvg}
                      alt="map"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("street");
                        setValue(item.location.street.name);
                      }}
                    />
                  </button>
                  <button className="icon" data-label="phone">
                    <img
                      src={phoneSvg}
                      alt="phone"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("phone");
                        setValue(item.phone);
                      }}
                    />
                  </button>
                  <button className="icon" data-label="password">
                    <img
                      src={padlockSvg}
                      alt="lock"
                      id="iconImg"
                      onMouseOver={() => {
                        setTitle("password");
                        setValue(item.login.password);
                      }}
                    />
                  </button>
                </div>

                <div className="btn-group">
                  <button className="btn" type="button" onClick={getUsers}>
                    new user
                  </button>
                  <button className="btn" type="button" onClick={addUsers}>
                    add user
                  </button>
                </div>

                <table className="table">
                  <thead>
                    <tr className="head-tr">
                      <th className="th">Firstname</th>
                      <th className="th">Email</th>
                      <th className="th">Phone</th>
                      <th className="th">Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newrow?.map((item, index)=>{
                      return <tr key={index}>
                        {item.map((element, index)=>{
                          return <td key={index}>{element.header}</td>
                        })}
                      </tr>
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
