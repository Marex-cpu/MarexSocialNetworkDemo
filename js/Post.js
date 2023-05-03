class Post {
  postId = "";
  postContent = "";
  userId = "";
  likes = 0;
  apiUrl = "https://641d87764b6990486afd43ec.mockapi.io";

  async create() {
    let session = new Session();
    sessionId = session.getSession();

    let data = {
      userId: sessionId.slice(1),
      content: this.postContent,
      likes: 0,
    };

    data = JSON.stringify(data);

    let response = await fetch(this.apiUrl + "/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    data = await response.json();

    return data;
  }

  async getAllPosts() {
    let response = await fetch(this.apiUrl + `/posts`);
    let data = await response.json();

    return data;
  }

  like(postId, likes) {
    let data = {
      likes: likes,
    };

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/posts/" + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // alert("Izmenjen broj lajkova");
      });
  }

  delete(postId) {
    fetch(this.apiUrl + "/posts/" + postId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Your post is removed");
      });
  }
}
