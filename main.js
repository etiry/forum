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

    const voteDiv = document.createElement('div');
    voteDiv.setAttribute('class', 'votes');
    voteDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${post.upvotes} <i class="fa-solid fa-thumbs-down"></i> <hr class="hr" />`

    postDiv.appendChild(messageDiv);
    postDiv.appendChild(postedByDiv);
    postDiv.appendChild(voteDiv);

    postsDiv.appendChild(postDiv);

    messageInput.value = '';
    nameInput.value = '';

    addVoteEventListeners();
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
  const upvote = document.querySelectorAll('.fa-thumbs-up');
  const downvote = document.querySelectorAll('.fa-thumbs-down');

  upvote.forEach((icon) => icon.addEventListener('click', countUpvote));
  downvote.forEach((icon) => icon.addEventListener('click', countDownvote));
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