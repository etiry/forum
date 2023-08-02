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

  displayPosts(myPosts.posts);
}

function displayPosts (currentPosts) {
  postsDiv.innerHTML = '';

  sortPosts(currentPosts);
  
  currentPosts.forEach (function (post) {
    const postDiv = document.createElement('div');
    postDiv.setAttribute('data-index', post.index);

    const messageDiv = document.createElement('div')
    messageDiv.innerHTML = post.message;

    const postedByDiv = document.createElement('div')
    postedByDiv.innerHTML = `Posted By: <strong>${post.name}</strong>`;

    const iconDiv = document.createElement('div');
    iconDiv.setAttribute('class', 'icons');

    const voteDiv = document.createElement('div');
    voteDiv.setAttribute('class', 'votes');
    voteDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${post.upvotes} <i class="fa-solid fa-thumbs-down"></i>`

    const deleteEditDiv = document.createElement('div');
    deleteEditDiv.setAttribute('class', 'delete-edit-post');
    deleteEditDiv.innerHTML = '<i class="fa-solid fa-trash"></i> <i class="fa-solid fa-pen-to-square"></i>'

    const divider = document.createElement('hr');
    divider.setAttribute('class', 'hr');

    iconDiv.appendChild(voteDiv);
    iconDiv.appendChild(deleteEditDiv);

    postDiv.appendChild(messageDiv);
    postDiv.appendChild(postedByDiv);
    postDiv.appendChild(iconDiv);
    postDiv.appendChild(divider);

    postsDiv.appendChild(postDiv);

    messageInput.value = '';
    nameInput.value = '';

    addVoteEventListeners();
    addDeleteEventListeners();
    addEditEventListeners();
  })
}

function countUpvote (e) {
  const postIndex = e.target.parentElement.parentElement.dataset.index;

  myPosts.posts[postIndex].upvotes += 1;

  displayPosts(myPosts.posts);
}

function countDownvote (e) {
  const postIndex = e.target.parentElement.parentElement.dataset.index;

  myPosts.posts[postIndex].upvotes -= 1;

  displayPosts(myPosts.posts);
}

function addVoteEventListeners () {
  const upvoteIcons = document.querySelectorAll('.fa-thumbs-up');
  const downvoteIcons = document.querySelectorAll('.fa-thumbs-down');

  upvoteIcons.forEach((icon) => icon.addEventListener('click', countUpvote));
  downvoteIcons.forEach((icon) => icon.addEventListener('click', countDownvote));
}

function addDeleteEventListeners () {
  const deleteIcons = document.querySelectorAll('.fa-trash');

  deleteIcons.forEach((icon) => icon.addEventListener('click', deletePost));
}

function addEditEventListeners () {
  const editIcons = document.querySelectorAll('.fa-pen-to-square');

  editIcons.forEach((icon) => icon.addEventListener('click', editPost));
}

function sortPosts (currentPosts) {
  const sortedPosts = currentPosts.sort(function (a, b) {
    if (a.upvotes > b.upvotes) {
      return -1;
    } else {
      return 1;
    }
  })
  sortedPosts.forEach((post) => post.index = sortedPosts.indexOf(post));
}

function deletePost (e) {
  const postIndex = e.target.parentElement.parentElement.parentElement.dataset.index;

  myPosts.posts.splice(postIndex, 1);

  displayPosts(myPosts.posts);
}

function editPost (e) {
  const postIndex = e.target.parentElement.parentElement.parentElement.dataset.index;

  const editedMessage = prompt('Please enter your new message:');

  myPosts.posts[postIndex].message = editedMessage;

  displayPosts(myPosts.posts);
}