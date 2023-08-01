const postsDiv = document.querySelector('.posts');
const nameInput = document.querySelector('#name');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', addPost);


function addPost () {
  const postDiv = document.createElement('div');

  const messageDiv = document.createElement('div')
  messageDiv.innerHTML = messageInput.value;

  const postedByDiv = document.createElement('div')
  postedByDiv.innerHTML = `Posted By: <strong>${nameInput.value}</strong>`;

  const voteDiv = document.createElement('div');
  voteDiv.innerHTML = '<i class="fa-solid fa-thumbs-up"></i> <i class="fa-solid fa-thumbs-down"></i> <hr class="hr" />'

  postDiv.appendChild(messageDiv);
  postDiv.appendChild(postedByDiv);
  postDiv.appendChild(voteDiv);

  postsDiv.appendChild(postDiv);

  messageInput.value = '';
  nameInput.value = '';
}