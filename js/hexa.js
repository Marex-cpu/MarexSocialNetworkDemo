//1) ----RELOCATION ON index.html IF THE SESSION IS EMPTIED----
let session = new Session();
let sessionId = session.getSession();

if (sessionId !== "") {
  console.log("You are logged in!");

  async function populateUserDate() {
    let user = new User();
    user = await user.get(sessionId.slice(1));

    document.querySelector("#username").innerHTML = user.userName;
    document.querySelector("#email").innerHTML = user.registerEmail;
    document.querySelector("#user_name_edit").value = user.userName;
    document.querySelector("#user_email_edit").value = user.registerEmail;
  }
  populateUserDate();
} else {
  window.location.href = "index.html";
}

//2) ----LOGIC FOR SIGN OUT----
const signOut = document.querySelector("#signOut");

signOut.addEventListener("click", function signOutHexa(e) {
  e.preventDefault();

  let text = "Are you sure want to 'Sign out'?";

  if (confirm(text) === true) {
    session.destroySession();
    window.location.href = "index.html";
  }
});

//3) ----OPEN AND CLOSE EDIT ACCOUNT MODAL----
const openEditAccount = document.querySelector("#openEditAccount");
const closeEditModal = document.querySelector("#closeEditModal");

openEditAccount.addEventListener("click", function openModal() {
  document.querySelector(".modalEditAccount").classList.add("open");
});

closeEditModal.addEventListener("click", function closeModal() {
  document.querySelector(".modalEditAccount").classList.remove("open");
});

// edit profile data
const editProfile = document.querySelector("#editProfile");
const deleteAccount = document.querySelector("#deleteAccount");

//edit
editProfile.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = new User();
  user.userName = document.querySelector("#user_name_edit").value;
  user.registerEmail = document.querySelector("#user_email_edit").value;
  user.edit();
});

//delete
deleteAccount.addEventListener("click", (e) => {
  e.preventDefault();
  let text = "Are you sure want to delete account?";

  if (confirm(text) === true) {
    let user = new User();
    user.delete();
  }
});

//4) ----WHOLE LOGIC FOR THE POSTS (PUBLISH, AND MORE...)----
const postContentFrom = document.querySelector("#postForm");

postContentFrom.addEventListener("submit", function publishPost(e) {
  e.preventDefault();

  async function createPost() {
    let content = document.querySelector("#postContent").value;
    document.querySelector("#postContent").value = "";

    let post = new Post();
    post.postContent = content;

    if (post.postContent !== "") {
      post = await post.create();
      const postId = post.id;
      let currentUser = new User();
      currentUser = await currentUser.get(sessionId.slice(1));

      let deletePost = "";
      if (sessionId.slice(1) === post.userId) {
        deletePost =
          "<button onclick='removeMyPost(this)' class='btnRemovePost'>Remove</button>";
      }

      let html = document.querySelector("#allPostWrapper").innerHTML;

      document.querySelector("#allPostWrapper").innerHTML =
        `<div class="singlePost" data-post-id="${postId}">
                        <div class="postContent">${post.content}</div>
                     
                        <div class="postActions">
                          <p><strong>Published:</strong> ${currentUser.userName}</p>
                          <div>
                            <button onclick="likePost(this)" class="likePost">
                              <img
                                src="assets/like.png"
                                width="18"
                                height="18"
                                alt="like icon"
                              />
                              <span>${post.likes}</span>
                            </button>
                            <button onclick="commentPost(this)" class="commnets">
                              <img src="assets/comment.png" width="18" height="18" alt="comment icon">
                            Comments
                            </button>
                            ${deletePost}
                          </div>
                        </div>

                        <form onsubmit="commentPostSubmit(event)" id="commentForm">
                          <div>
                            <input
                              maxlength="80"
                              type="text"
                              placeholder="Write comment..."
                            />
                            <button type="submit" class="postComment">Comment</button>
                          </div>   
                        </form>
      </div>` + html;
    }
  }
  createPost();
});

//get all post on hexa page including mine and other when logging in
async function getAllPosts() {
  let allPosts = new Post();
  allPosts = await allPosts.getAllPosts();

  allPosts.map((post) => {
    async function getPostUser() {
      let user = new User();
      user = await user.get(post.userId);

      let comments = new Comment();
      comments = await comments.get(post.id);

      let commentsHtml = "";
      if (comments.length > 0) {
        comments.forEach((comment) => {
          commentsHtml += `<div class='singlePostComment'>${comment.content}</div>`;
        });
      }

      let deletePost = "";
      if (sessionId.slice(1) === post.userId) {
        deletePost =
          "<button onclick='removeMyPost(this)' class='btnRemovePost'>Remove</button>";
      }

      let html = document.querySelector("#allPostWrapper").innerHTML;

      document.querySelector("#allPostWrapper").innerHTML =
        `<div class="singlePost" data-post-id="${post.id}">
          <div class="postContent">${post.content}</div>
                     
            <div class="postActions">
              <p><strong>Published:</strong> ${user.userName}</p>
              <div>
                <button onclick="likePost(this)" class="likePost">
                  <img
                    src="assets/like.png"
                    width="18"
                    height="18"
                    alt="likes icon"
                  />
                  <span>${post.likes}</span>
                </button>
                <button onclick="commentPost(this)" class="commnets">
                  <img src="assets/comment.png" width="18" height="18" alt="comment icon">
                  Comments
                </button>
                ${deletePost}
              </div>
            </div>

            <form onsubmit="commentPostSubmit(event)" id="commentForm">
              <div>
                <input
                  maxlength="80"
                  type="text"
                  placeholder="Write comment..."
                />
                <button type="submit" class="postComment">Comment</button>
              </div>
              ${commentsHtml}   
            </form>
        </div>` + html;
    }
    getPostUser();
  });
}
getAllPosts();

//open comment input
const commentPost = (btn) => {
  let mainPostEl = btn.closest(".singlePost");
  let postId = mainPostEl.getAttribute("data-post-id");

  const commentPostForm = mainPostEl.querySelector("#commentForm");

  if (
    commentPostForm.style.display === "none" ||
    commentPostForm.style.display === ""
  ) {
    commentPostForm.style.display = "flex";
  } else {
    commentPostForm.style.display = "none";
  }
};

//post comment on post
const commentPostSubmit = (e) => {
  e.preventDefault();

  let btn = e.target;
  document.querySelector(".postComment").disabled = true;

  let mainPostEl = btn.closest(".singlePost");
  let postId = mainPostEl.getAttribute("data-post-id");

  let commentValue = mainPostEl.querySelector("input").value;
  mainPostEl.querySelector("input").value = "";

  let comment = new Comment();

  if (commentValue !== "") {
    mainPostEl.querySelector(
      "#commentForm"
    ).innerHTML += `<div class="singlePostComment">${commentValue}</div>`;

    comment.content = commentValue;
    comment.userId = sessionId.slice(1);
    comment.postId = postId;
    comment.create();
  }
};

//remove my post
const removeMyPost = (btn) => {
  let postId = btn.closest(".singlePost").getAttribute("data-post-id");
  btn.closest(".singlePost").remove();

  let post = new Post();
  post.delete(postId);

  let comment = new Comment();
  if (comment.length !== 0) {
    comment.delete(postId);
  }
};

//like post
const likePost = (btn) => {
  let mainPostEl = btn.closest(".singlePost");
  let postId = mainPostEl.getAttribute("data-post-id");

  let numberOfLikes = parseInt(btn.querySelector("span").innerText);
  btn.querySelector("span").innerText = numberOfLikes + 1;
  btn.setAttribute("disabled", "true");

  let post = new Post();
  post.like(postId, numberOfLikes + 1);
};
