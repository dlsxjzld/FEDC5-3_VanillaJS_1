import { LOCAL_STORAGE_CHANGED } from '../../constants/event.js'
import checkNewComponent from '../../utils/checkNewComponent.js'
import validation from '../../utils/validation.js'

export default function TodoCount({ targetElement, initialState }) {
  // 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드 넣기
  const self = this
  checkNewComponent(TodoCount, self)

  // state에 대한 validation을 추가
  const isValid = validation(initialState)
  if (isValid) {
    this.state = initialState
  } else {
    throw new Error('잘못된 데이터 값이 들어가 있습니다.')
  }

  // todo 의 상태 변화에 따라 todoCount의 상태도 실시간으로 변함
  this.setState = (nextState) => {
    const isValid = validation(nextState)

    if (isValid) {
      this.state = nextState
      this.render()
    } else {
      throw new Error('잘못된 데이터 값이 들어가 있습니다.')
    }
  }

  this.render = () => {
    const completedTodos = this.state.filter(
      ({ isCompleted }) => isCompleted === true
    ).length
    const allTodos = this.state.length

    const fragment = document.createDocumentFragment()
    fragment.appendChild(
      document.createTextNode(`
            완료된 Todo / 전체 Todo : ${completedTodos} / ${allTodos}
        `)
    )

    if (document.querySelector('#todoCountElement')) {
      document.querySelector('#todoCountElement').remove()
    }
    const todoCountElement = document.createElement('div')
    todoCountElement.id = 'todoCountElement'

    todoCountElement.appendChild(fragment)
    targetElement.appendChild(todoCountElement)
  }

  window.addEventListener(LOCAL_STORAGE_CHANGED, (event) => {
    const nextState = event.detail.localStorage
    this.setState(nextState)
  })

  this.render()
}
