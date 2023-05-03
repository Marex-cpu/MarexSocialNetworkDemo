class Comment {
  postId = "";
  userId = "";
  content = "";
  apiUrl = "https://6450e387e1f6f1bb22a1a588.mockapi.io";

  create() {
    let data = {
      userId: this.userId,
      postId: this.postId,
      content: this.content,
    };

    data = JSON.stringify(data);

    fetch(this.apiUrl + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {});
  }

  async get(postId) {
    let apiUrl = this.apiUrl + "/comments";

    const response = await fetch(apiUrl);
    const data = await response.json();
    let postComments = [];

    let i = 0;
    data.forEach((item) => {
      if (item.postId === postId) {
        postComments[i] = item;
        i++;
      }
    });

    return postComments;
  }

  delete(postId) {
    fetch(this.apiUrl + "/comments/" + postId, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("obrisan kom");
      });
  }
}
