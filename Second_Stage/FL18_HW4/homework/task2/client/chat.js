let userName;
// userName = prompt('What is your nickname?') || 'Anonymous';
userName = 'Anonymous';

const ws = new WebSocket('ws://localhost:8080');
const chat = document.getElementById('chat');
const lastMsgName = document.querySelector('.active  .last-msg-name');
const lastMsgPreview = document.querySelector(
  '.active .chat-list-item-preview-msg',
);
const counter = document.querySelector('.active .new-msg-counter');
const onlineCounter = document.querySelector('.chat-subtitle');

const timeStringLength = 5;

let unreadMsgCount = 0;

ws.onopen = () => {
  ws.send(JSON.stringify({ userName }));
};

ws.onmessage = ({ data }) => {
  const parsed = JSON.parse(data);
  console.log(parsed) // {"name":"Anonymous","message":"dsa","time":"1:28:"}

  // if (parsed.online) {
  //   onlineCounter.textContent = `${parsed.online} members online`;
  // }

  // <!-- beforebegin - before element -->
  // <p>
  //   <!-- afterbegin - first child -->
  //   foo
  //   <!-- beforeend - last child -->
  // </p>
  // <!-- afterend - after element -->

  if (parsed.userName) {
    chat.insertAdjacentHTML( // similar to innerHTML
      'beforeend',
      `<p class="connection-message">${parsed.userName} has joined the chat</p>`,
    );
  }

  if (parsed.time) {
    const { name, message, time } = parsed;
    chat.insertAdjacentHTML(
      'beforeend',
      `<p class="user-message">
        <span class="user-name">${name}</span>
        <span class="user-chat-message">${message}<span class="time">${time}</span></span>
            
      </p>
      <div class="clear"></div>`,
    );

    lastMsgName.textContent = `${name}: `;
    lastMsgPreview.textContent = `${message}`;

    unreadMsgCount += 1;
    unreadMsgCount !== 0
      ? (counter.innerHTML = unreadMsgCount)
      : (counter.innerHTML = 1);

    if (document.hasFocus()) {
      unreadMsgCount = 0;
      counter.innerHTML = '';

      chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }
  }
};

const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = this.elements.message.value;
  const time = new Date().toLocaleTimeString().slice(0, timeStringLength);

  const data = {
    name: userName,
    message,
    time,
  };

  ws.send(JSON.stringify(data));
  this.reset();
  chat.insertAdjacentHTML(
    'beforeend',
    `<p class="your-message">
     <span class="your-chat-message">${message}<span class="time">${time}</span></span>
     </p>`,
  );
  lastMsgName.textContent = `${userName}: `;
  lastMsgPreview.textContent = `${message}`;

  chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
  if (document.hasFocus()) {
    unreadMsgCount = 0;
    counter.innerHTML = '';
    console.log('Tab is active');
  }
});