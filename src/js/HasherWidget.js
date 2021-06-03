export default class HasherWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.classes = this.constructor.classes;
  }

  static get classes() {
    return {
      widget: 'hasher-widget',
      form: 'form',
      title: 'title',
    };
  }

  static get markup() {
    return `
      <form class="${this.classes.form}">
        <h1 class="${this.classes.form}">
          Hasher
        </h1>
      </form>
    `;
  }

  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.className = this.classes.widget;
    this.widget.innerHTML = this.constructor.markup;

    this.parentEl.append(this.widget);
  }
}
/*
  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.className = `${this.classes.widget} hidden`;
    this.widget.innerHTML = this.constructor.markup;

    this.users = this.widget.querySelector(`.${this.classes.users}`);
    this.messages = this.widget.querySelector(`.${this.classes.messages}`);
    this.form = this.widget.querySelector(`.${this.classes.form}`);
    this.input = this.widget.querySelector(`.${this.classes.newMessage}`);
    this.error = this.widget.querySelector(`.${this.classes.error}`);

    this.form.addEventListener('submit', (evt) => this.addMessage(evt));
    this.input.addEventListener('change', () => {
      this.input.value = this.input.value.trim();
    });

    this.parentEl.append(this.widget);

    this.registrationForm = new RegistrationForm(
      document.body,
      this.ws,
      (name) => this.registration(name),
    );
    this.registrationForm.bindToDOM();

    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', () => {
      this.registrationForm.hideError();
      this.hideError();
      if (this.name) {
        this.registration(this.name);
      }

      this.timeCount = this.timeout;
      this.timer = setInterval(() => this.pingTimer(), 1000);
    });

    this.ws.addEventListener('message', (evt) => {
      const data = JSON.parse(evt.data);
      this.timeCount = this.timeout;

      switch (data.event) {
        case 'connect':
          this.name = data.name;
          this.showChat();
          this.send({
            event: 'request-messages',
            time: this.lastMessageTime,
          });
          break;

        case 'noconnect':
          if (this.name) {
            this.hideChat();
          }
          this.registrationForm.showError(`Пользователь ${data.name} уже есть в чате`);
          this.name = null;
          break;

        case 'users':
          this.userListUpdate(data.users);
          break;

        case 'new-message':
          this.send({
            event: 'request-messages',
            time: this.lastMessageTime,
          });
          break;

        case 'messages':
          this.receivingМessages(data.messages);
          break;

        default:
      }
    });

    this.ws.addEventListener('error', () => {
      this.ws.close();
    });

    this.ws.addEventListener('close', () => {
      this.registrationForm.showError('Нет связи с сервером');
      this.showError();
      clearInterval(this.timer);
      setTimeout(() => this.connect(), 3000);
    });
  }

  send(req) {
    if (this.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    this.ws.send(JSON.stringify(req));
  }

  registration(name) {
    this.send({
      event: 'connect',
      name,
    });
  }

  showChat() {
    this.registrationForm.hide();
    this.widget.classList.remove('hidden');
  }

  hideChat() {
    this.registrationForm.show();
    this.widget.classList.add('hidden');
  }

  showError() {
    this.error.classList.remove('hidden');
  }

  hideError() {
    this.error.classList.add('hidden');
  }

  userListUpdate(users) {
    let userList = '';

    users.forEach((name) => {
      userList += `
        <div class="${this.classes.user}">
          <img class="${this.classes.userAvatar}" src="img/avatar.png" width="50" alt="no avatar">
          <p class="${this.classes.userName + (name === this.name ? ' red' : '')}">
            ${name}
          </p>
        </div>
      `;
    });

    this.users.innerHTML = userList;
  }

  addMessage(evt) {
    evt.preventDefault();
    this.send({
      event: 'message',
      text: this.input.value,
    });
    this.input.value = '';
  }

  receivingМessages(messages) {
    messages.forEach(({ name, time, text }) => {
      const message = document.createElement('div');
      message.className = this.classes.message;
      message.innerHTML = `
        <p class="${this.classes.messageTitle + (name === this.name ? ' right red' : '')}">
          ${name}, ${outputTime(time)}
        </p>
        <p class="${this.classes.messageText + (name === this.name ? ' right' : '')}">
        </p>
      `;

      const messageText = message.querySelector(`.${this.classes.messageText}`);
      messageText.innerText = text;

      const autoscroll = this.messages.scrollHeight
        === this.messages.scrollTop + this.messages.clientHeight;

      this.messages.append(message);
      if (autoscroll) {
        this.messages.scrollTop = this.messages.scrollHeight - this.messages.clientHeight;
      }

      this.lastMessageTime = time;
    });
  }

  pingTimer() {
    this.timeCount--;
    if (!this.timeCount) {
      this.ws.close();
      return;
    }

    if (this.timeCount === Math.trunc(this.timeout / 2)) {
      this.send({
        event: 'ping',
      });
    }
  }
}
*/
