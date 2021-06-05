import { algoritms } from './tools';

export default class HasherWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.classes = this.constructor.classes;
    this.algoritmNumber = 0;
    this.file = null;
  }

  static get classes() {
    return {
      widget: 'hasher-widget',
      form: 'form',
      title: 'title',
      fileContainer: 'file-container',
      fileLabel: 'file-label',
      fileInput: 'file-input',
      algoritmLabel: 'algoritm-label',
      algoritmInput: 'algoritm-input',
      algoritmList: 'algoritm-list',
      hashTitle: 'hash-title',
      hashValue: 'hash-value',
    };
  }

  static get markup() {
    return `
      <form class="${this.classes.form}">
        <h1 class="${this.classes.title}">
          Hasher
        </h1>
        <div class="${this.classes.fileContainer}" tabindex="0">
          <label class="${this.classes.fileLabel}">
            Drop files here<BR>or<BR>Click to select
          </label>
          <input class="${this.classes.fileInput}" type="file" name="file">
        </div>
        <label class="${this.classes.algoritmLabel}">
          Hash algoritm:
          <ul class="${this.classes.algoritmList} hidden" tabindex="0">
          </ul>
        </label>
        <input class="${this.classes.algoritmInput}" type="input" name="algoritm" value="${algoritms[0]}" readonly>
      </form>
      <p class="${this.classes.hashTitle}">
        Calculated Hash:
      </p>
      <p class="${this.classes.hashValue}">
        &nbsp;
      </p>
    `;
  }

  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.className = this.classes.widget;
    this.widget.innerHTML = this.constructor.markup;

    this.fileContainer = this.widget.querySelector(`.${this.classes.fileContainer}`);
    this.fileInput = this.widget.querySelector(`.${this.classes.fileInput}`);
    this.algoritmInput = this.widget.querySelector(`.${this.classes.algoritmInput}`);
    this.algoritmList = this.widget.querySelector(`.${this.classes.algoritmList}`);
    this.hashValue = this.widget.querySelector(`.${this.classes.hashValue}`);

    this.fileContainer.addEventListener('dragover', (evt) => evt.preventDefault());

    this.fileContainer.addEventListener('drop', (evt) => {
      evt.preventDefault();
      this.selectFile(evt.dataTransfer.files);
    });

    this.fileContainer.addEventListener('click', () => {
      this.fileInput.dispatchEvent(new MouseEvent('click'));
    });

    this.fileContainer.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        this.fileInput.dispatchEvent(new MouseEvent('click'));
      }
    });

    this.fileInput.addEventListener('change', (evt) => this.selectFile(evt.target.files));

    this.algoritmInput.addEventListener('click', () => {
      this.algoritmList.classList.remove('hidden');
      this.redrawList();
    });

    this.algoritmInput.addEventListener('keydown', (evt) => {
      if (evt.key !== 'Enter') {
        return;
      }
      evt.preventDefault();
      this.algoritmList.classList.remove('hidden');
      this.redrawList();
    });

    this.algoritmList.addEventListener('keydown', (evt) => {
      switch (evt.key) {
        case 'ArrowUp':
          this.algoritmNumber--;
          this.algoritmNumber += algoritms.length;
          this.algoritmNumber %= algoritms.length;
          this.redrawList();
          break;
        case 'ArrowDown':
          this.algoritmNumber++;
          this.algoritmNumber %= algoritms.length;
          this.redrawList();
          break;
        case 'Enter':
          this.selectAlgoritm();
          break;
        default:
      }
    });

    this.parentEl.append(this.widget);
  }

  redrawList() {
    this.algoritmList.innerHTML = '';

    algoritms.forEach((name, index) => {
      const item = document.createElement('li');
      item.dataset.id = index;
      item.innerHTML = index === this.algoritmNumber
        ? `<span class="underlined">${name}</span><span>&nbsp;&#x2193</span>`
        : name;

      item.addEventListener('click', () => {
        this.algoritmNumber = +item.dataset.id;
        this.selectAlgoritm();
      });

      this.algoritmList.append(item);
      this.algoritmList.focus();
    });
  }

  selectAlgoritm() {
    this.algoritmInput.value = algoritms[this.algoritmNumber];
    this.algoritmList.classList.add('hidden');
    if (!this.file) {
      return;
    }

    this.hashValue.innerText = 'Идёт обработка данных...';
  }

  selectFile(files) {
    const file = Array.from(files)[0];
    this.file = file;
    this.selectAlgoritm();
  }
}
