const Post = (name, message) => {
  const upvotes = 0;
  const index = null;

  return {
    name,
    message,
    upvotes,
    index
  }
}

const postList = () => {
  const posts = [];

  const addPostToList = (post) => {
    posts.push(post);
    post.index = posts.indexOf(post);
  }

  return {
    posts, 
    addPostToList
  }
}

myPosts = postList();

const postsDiv = document.querySelector('.posts');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#submit');


submitButton.addEventListener('click', addPost);

function createNewPost (name, message) {
  return Post(name, message);
}

function addPost () {
  const newPost = createNewPost(nameInput.value, messageInput.value);

  myPosts.addPostToList(newPost);

  const postDiv = document.createElement('div');
  postDiv.setAttribute('data-index', newPost.index);

  const messageDiv = document.createElement('div')
  messageDiv.innerHTML = newPost.message;

  const postedByDiv = document.createElement('div')
  postedByDiv.innerHTML = `Posted By: <strong>${newPost.name}</strong>`;

  const voteDiv = document.createElement('div');
  voteDiv.setAttribute('class', 'votes');
  voteDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${newPost.upvotes} <i class="fa-solid fa-thumbs-down"></i> <hr class="hr" />`

  postDiv.appendChild(messageDiv);
  postDiv.appendChild(postedByDiv);
  postDiv.appendChild(voteDiv);

  postsDiv.appendChild(postDiv);

  messageInput.value = '';
  nameInput.value = '';

  addVoteEventListeners();
}

function countUpvote (e) {
  const postIndex = e.target.parentElement.parentElement.dataset.index;

  myPosts.posts[postIndex].upvotes += 1;

  updateVoteDiv(e, myPosts.posts[postIndex]);
}

function countDownvote (e) {
  const postIndex = e.target.parentElement.parentElement.dataset.index;

  myPosts.posts[postIndex].upvotes -= 1;

  updateVoteDiv(e, myPosts.posts[postIndex]);
}

function updateVoteDiv (e, post) {
  const voteDiv = e.target.parentElement;
  voteDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${post.upvotes} <i class="fa-solid fa-thumbs-down"></i> <hr class="hr" />`
  addVoteEventListeners();
}

function addVoteEventListeners () {
  const upvote = document.querySelector('.fa-thumbs-up');
  const downvote = document.querySelector('.fa-thumbs-down');

  upvote.addEventListener('click', countUpvote);
  downvote.addEventListener('click', countDownvote);
}