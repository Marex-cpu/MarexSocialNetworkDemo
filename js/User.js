class User {
  userId = "";
  userName = "";
  registerEmail = "";
  registerPassword = "";
  apiUrl = "https://641d87764b6990486afd43ec.mockapi.io";

  create() {
    let data = {
      userName: this.userName,
      registerEmail: this.registerEmail,
      registerPassword: this.registerPassword,
    };
    // console.log(data);

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.userId = data.id;
        session.startSession();
        window.location.href = "hexa.html";
      });
  }

  async get(userId) {
    let response = await fetch(this.apiUrl + `/users/` + userId);
    let data = await response.json();

    return data;
  }

  edit() {
    let data = {
      userName: this.userName,
      registerEmail: this.registerEmail,
    };

    data = JSON.stringify(data);

    let session = new Session();
    sessionId = session.getSession();

    fetch(this.apiUrl + "/users/" + sessionId.slice(1), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        //on this way reload page and edit data updated
        window.location.href = "hexa.html";
      });
  }

  delete() {
    let session = new Session();
    sessionId = session.getSession();

    fetch(this.apiUrl + "/users/" + sessionId.slice(1), {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let session = new Session();
        session.destroySession();

        window.location.href = "/index.html";
      });
  }

  login() {
    fetch(this.apiUrl + "/users")
      .then((response) => response.json())
      .then((data) => {
        //we go through each object returned to us and compare whether there is already a corresponding email and password
        let loginSuccessful = 0;
        data.forEach((obj) => {
          if (
            obj.registerEmail === this.registerEmail &&
            obj.registerPassword === this.registerPassword
          ) {
            let session = new Session();
            session.userId = obj.id;
            session.startSession();
            loginSuccessful = 1;
            window.location.href = "hexa.html";
          }
        });

        if (loginSuccessful === 0) {
          alert("Pogresan email ili lozinka");
        }
      });
  }
}
