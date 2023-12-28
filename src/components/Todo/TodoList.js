import { LOCAL_STORAGE_CHANGED } from '../../constants/event.js';
import checkNewComponent from '../../utils/checkNewComponent.js';
import validation from '../../utils/validation.js';

export default function TodoList({
  targetElement,
  initialState,
  onToggle,
  onDelete,
}) {
  // 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드 넣기
  const self = this;
  checkNewComponent(TodoList, self);

  // 함수의 파라미터 비구조화 할당화
  const todoElementList = document.createElement('div');
  todoElementList.classList.add('todoList--mainContainer');
  targetElement.appendChild(todoElementList);

  // state에 대한 validation을 진행
  const isValid = validation(initialState);
  if (isValid) {
    this.state = initialState;
  } else {
    throw new Error('잘못된 데이터 값이 들어가 있습니다.');
  }

  //TodoForm 에서 Todolist 추가하기 위해서 구현
  this.setState = (nextState) => {
    if (isValid) {
      this.state = nextState;
      this.render();
    } else {
      throw new Error('잘못된 데이터 값이 들어가 있습니다.');
    }
  };

  this.render = () => {
    if (document.querySelector('#todo-container')) {
      todoElementList.removeChild(document.querySelector('#todo-container'));
    }
    const todoElements = document.createElement('ul');
    todoElements.classList.add('todoList--container');
    todoElements.id = 'todo-container';

    const fragment = document.createDocumentFragment();
    this.state.forEach(({ text, isCompleted, id }) => {
      const liElement = document.createElement('li');
      liElement.classList.add('todoList--item');
      liElement.dataset.id = 'todo-item';

      const spanElement = document.createElement('span');
      spanElement.dataset.id = 'todo-text';
      spanElement.dataset.todoid = id;
      spanElement.classList.add('todo-item__span');
      isCompleted
        ? spanElement.classList.add('line-through')
        : spanElement.classList.remove('line-through');
      spanElement.textContent = text;

      const buttonElement = document.createElement('button');
      buttonElement.dataset.id = 'todo-button';
      buttonElement.classList.add('todo-item__button');
      buttonElement.dataset.todoid = id;
      buttonElement.textContent = 'Delete';

      liElement.appendChild(spanElement);
      liElement.appendChild(document.createTextNode(' '));
      liElement.appendChild(buttonElement);
      fragment.appendChild(liElement);
    });

    todoElements.appendChild(fragment);
    todoElementList.appendChild(todoElements);
  };

  // TodoList의 Todo를 클릭하면 해당 값이 토글 및 삭제 되도록 만듭니다.
  todoElementList.addEventListener('click', (e) => {
    const liElement = e.target.closest('li');

    if (liElement) {
      const { id, todoid } = e.target.dataset;

      if (todoid === null || todoid === undefined) {
        return;
      }

      const actions = {
        'todo-text': onToggle,
        'todo-button': onDelete,
      };
      const todoId = Number(todoid);

      actions[id](todoId);
      return;
    }
  });

  window.addEventListener(LOCAL_STORAGE_CHANGED, (event) => {
    const nextState = event.detail.localStorage;
    this.setState(nextState);
  });

  this.render();
}
