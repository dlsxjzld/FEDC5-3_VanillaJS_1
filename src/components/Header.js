import checkNewComponent from '../utils/checkNewComponent.js'

export default function Header({ targetElement, text }) {
  // 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드 넣기
  const self = this
  checkNewComponent(Header, self)

  const headerElement = document.createElement('h1')
  headerElement.classList.add('header')
  targetElement.appendChild(headerElement)

  this.render = () => {
    headerElement.textContent = text
  }
  this.render()
}
