import checkNewComponent from '../../utils/checkNewComponent.js';

export default function TodoForm({ targetElement, onSubmit }) {
  // 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드 넣기
  const self = this;
  checkNewComponent(TodoForm, self);

  const formElement = document.createElement('form');
  formElement.classList.add('todoForm');

  targetElement.appendChild(formElement);

  formElement.addEventListener('submit', (e) => {
    e.preventDefault(); // 화면 새로고침 방지
    // todo의 고유 id -> id가 중복되지 않도록 한번만 0으로 초기화 되도록 함
    const uuid = new Date().getTime();

    const todoElement = formElement.querySelector('input[name=todo]');
    const text = todoElement.value; // input태그 중 name attribute가 todo인 것

    //빈 문자열과 공백 예외 처리 , 1글자 이상이면 입력 가능
    if (text !== '' && text.trim().length > 0) {
      todoElement.value = ''; // todo 추가 후 input 비우게 만들기
      onSubmit(text, uuid);
    }
  });

  this.render = () => {
    // 기본적으로 form 태그 안의 버튼의 타입은 submit이다
    const inputElement = document.createElement('input');
    inputElement.classList.add('todoForm--input');
    inputElement.placeholder = '할 일을 입력해주세요!🤔';
    inputElement.type = 'text';
    inputElement.name = 'todo';

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('todoForm--button');
    buttonElement.textContent = 'Add';

    const fragment = document.createDocumentFragment();
    fragment.appendChild(inputElement);
    fragment.appendChild(buttonElement);

    formElement.appendChild(fragment);
  };
  this.render();
}
