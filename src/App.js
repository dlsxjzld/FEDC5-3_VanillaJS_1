import { Header } from './components/index.js'
import { TodoForm, TodoList, TodoCount } from './components/Todo/index.js'
import checkNewComponent from './utils/checkNewComponent.js'
import { localStorage } from './utils/storage/localStorage.js'

export default function App({ targetElement, initialState }) {
  // 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드 넣기
  const self = this
  checkNewComponent(App, self)

  // state 값을 갱신 후 로컬 스토리지에 새로운 값을 추가하며 새롭게 그려줍니다.
  const updateState = function (nextState) {
    localStorage.setItem(nextState)
  }

  // Header
  new Header({ targetElement, text: 'Simple Todo List' })

  // TodoForm
  new TodoForm({
    targetElement,
    onSubmit: (text, todoId) => {
      const nextState = [
        ...todoList.state,
        {
          text,
          id: todoId,
          isCompleted: false,
        },
      ]
      // 로컬 스토리지에 새로운 값을 갱신하며 새롭게 그려줍니다.
      updateState(nextState)
    },
  })

  // TodoList
  const todoList = new TodoList({
    targetElement,
    initialState,
    // onToggle : TodoList의 Todo를 클릭하면 해당 값이 토글 되도록 만듭니다.
    onToggle: (todoId) => {
      // const nextState = [...todoList.state];
      // immutable 하게 만들기

      // todo의 isCompleted 값을 토글합니다.
      const nextState = todoList.state.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )

      updateState(nextState)
    },
    // todo 삭제 기능 추가
    onDelete: (todoId) => {
      // todo 삭제 기능
      // immutable 하게 만들기
      const nextState = todoList.state
        .map((v) => Object.assign({}, v))
        .filter(({ id }) => id !== todoId)

      // 로컬 스토리지에 새로운 값을 갱신하며 새롭게 그려줍니다.
      updateState(nextState)
    },
  })

  // TodoCount
  // TodoList 아래에 렌더링 되어야 하며,
  // 완료된 Todo의 갯수 / 전제 Todo 갯수
  // 이때 TodoCount에서 TodoList에 직접 접근해서 데이터를 가져오면 안 됩니다.
  // -> 토글 혹은 삭제 되서 todoList 가 render 되면 TodoCount도 재 렌더링 되야함.
  const todoCount = new TodoCount({ targetElement, initialState })
}
