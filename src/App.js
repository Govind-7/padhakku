import { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    creatAc: "",
    postCmnt: "",
    deleteCmnt: "",
    allCmnt: [],
  };

  signUp = () => {
    this.setState((prev) => ({ createAc: !prev.createAc }));
  };

  submitForm1 = async (event) => {
    event.preventDefault();
    const name = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    if (name !== "" && email !== "") {
      const userData = {
        name,
        email,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      };
      const respons = await fetch("http://localhost:5000/api/signup", options);
      //   const respons = await fetch("http://localhost:5000/data");

      const jsonData = await respons.json();
      this.setState({ creatAc: jsonData });
      console.log(jsonData);
    }
  };

  submitForm2 = async (event) => {
    event.preventDefault();
    const name = document.getElementById("user1").value;
    const email = document.getElementById("email1").value;
    if (name !== "" && email !== "") {
      const userData = {
        name,
        email,
      };
      //   console.log(userData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      };
      const respons = await fetch("http://localhost:5000/api/posts", options);

      const jsonData = await respons.json();
      this.setState({ postCmnt: jsonData.message });
      console.log(jsonData.message);
    }
  };

  submitForm3 = async (event) => {
    event.preventDefault();
    const name = document.getElementById("user2").value;

    if (name !== "") {
      //   console.log(name);
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const respons = await fetch(
        `http://localhost:5000/api/deletepost/${name}`,
        options
      );

      const jsonData = await respons.json();
      this.setState({ deleteCmnt: jsonData.message });
      console.log(jsonData.message);
    }
  };

  submitForm4 = async (event) => {
    event.preventDefault();
    const name = document.getElementById("user3").value;
    // console.log(`http://localhost:5000/API/posts/${name}`);

    if (name !== "") {
      const respons = await fetch(`http://localhost:5000/API/posts/${name}`);

      const jsonData = await respons.json();
      const { dbResponse } = jsonData;
      this.setState({ allCmnt: dbResponse });
      console.log(dbResponse);
    }
  };

  render() {
    const { creatAc, postCmnt, deleteCmnt, allCmnt } = this.state;
    return (
      <div>
        <div className="bg-m">
          <div>
            <img
              className="bg-img"
              alt="logo"
              src="https://media.licdn.com/dms/image/C510BAQHueEBLpXmj_Q/company-logo_200_200/0/1577019307700?e=1704931200&v=beta&t=CY9ycTxVPFsRNwUKMAqvM_7N1ZyPlwWca16axxQqEYI"
            />
          </div>
        </div>

        <div>
          <h1>CREATE ACCOUNT</h1>
          <form onSubmit={this.submitForm1}>
            <label htmlFor="user">Enter name</label>
            <br />
            <input id="user" type="text" />
            <br />
            <label htmlFor="email">Enter Email</label>
            <br />
            <input id="email" type="text" />
            <br />
            <button type="submit">Submit</button>
          </form>

          {creatAc !== "" ? (
            <p className="result"> user id : {creatAc.userid} </p>
          ) : (
            ""
          )}
          <p className="result">{creatAc.message}</p>
        </div>
        <div>
          <h1>POST YOUR COMMENT</h1>
          <form onSubmit={this.submitForm2}>
            <label htmlFor="user1">Enter User ID</label>
            <br />
            <input id="user1" type="text" />
            <br />
            <label htmlFor="email1">Enter Comment</label>
            <br />
            <input id="email1" type="text" />
            <br />
            <button type="submit">Submit</button>
          </form>
          <p className="result">{postCmnt}</p>
        </div>
        <div>
          <h1>DELETE POST BY POST ID</h1>
          <form onSubmit={this.submitForm3}>
            <label htmlFor="user2">Enter Post ID</label>
            <br />
            <input id="user2" type="text" />

            <br />
            <button type="submit">Submit</button>
          </form>
          <p className="result">{deleteCmnt}</p>
        </div>
        <div>
          <h1>GET ALL POSTS BY USER ID</h1>
          <form onSubmit={this.submitForm4}>
            <label htmlFor="user3">Enter Post ID</label>
            <br />
            <input id="user3" type="text" />

            <br />
            <button type="submit">Submit</button>
          </form>
          {allCmnt !== undefined ? (
            allCmnt.map((item) => (
              <div>
                <p className="result">customer ID :{item.customerId}</p>
                <p className="result">massage :{item.msg}</p>
              </div>
            ))
          ) : (
            <p className="result">no posts are availble</p>
          )}
        </div>
      </div>
    );
  }
}
export default App;
