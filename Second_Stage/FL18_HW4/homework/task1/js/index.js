// Your code goes here
const users = document.getElementById('users');
const ONE_SECOND = 1000;

const deleteUser = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method: 'DELETE'
    })
    .then(response => response.json())
}

const getAllUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      json.forEach(user => {
        const userBlock = document.createElement('ul');
        userBlock.style.padding = '10px';
        userBlock.style.margin = '0';
        userBlock.innerHTML = `
            <li>Name: <span contenteditable="true">${user.name}</span></li>
            <li>Username: <span contenteditable="true">${user.username}</span></li>
            <li>Email: <span contenteditable="true">${user.email}</span></li>`;

        const loader = document.createElement('img')
        loader.src = 'http://cdn.onlinewebfonts.com/svg/img_462420.png';
        loader.style.width = '20px';
        loader.animate([
            // keyframes
            {transform: 'rotate(360deg)'}
          ],
          {
            // timing options
            duration: ONE_SECOND,
            iterations: Infinity
          });
        loader.style.display = 'none';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.style.marginBottom = '10px';
        deleteBtn.style.marginRight = '10px';

        deleteBtn.addEventListener('click', () => {
          deleteUser(user.id);
          userBlock.innerHTML = '';
          deleteBtn.remove();
          updateBtn.remove();
        })

        const updateBtn = document.createElement('button');
        updateBtn.innerText = 'Update';

        updateBtn.addEventListener('click', () => {

          fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              name: prompt('Name: '),
              username: prompt('Username: '),
              email: prompt('Email: ')
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => response.json())
            .then(newUser => {
              userBlock.innerHTML = '';
              loader.style.display = 'block'
              setTimeout(() => {
                userBlock.innerHTML = `
                 <li>Name: <span contenteditable="true">${newUser.name}</span></li>
                 <li>Username: <span contenteditable="true">${newUser.username}</span></li>
                 <li>Email: <span contenteditable="true">${newUser.email}</span></li>`;
                loader.style.display = 'none'
              }, ONE_SECOND)

            })
        })

        users.append(userBlock, loader, deleteBtn, updateBtn);
      })
    })
}

getAllUsers();