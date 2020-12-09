// import page styling
require('./home.css')
require('./../../style/base.css')

// // import component styling
require('../../components/canvas/canvas.css')


// // external scripts

// import { logout } from '../../components/canvas/canvas.js';
// import { canvas } from '../../components/canvas/canvas.js';

// canvas()

const contactNameInput = document.querySelector('[contact-name]')
const contactMessageInput = document.querySelector('[contact-message]')
const contactButton = document.querySelector('[contact-button]')


const createTextMessage = (event) => {
  const body = encodeURI(contactMessageInput.value)
  const name = encodeURI(contactNameInput.value)

  const message = name && body ? `${body}%0A%0A${name}` : ''
  const url = `https://wa.me/31648811989?text=${message}`

  const newWindow = window.open(url, '_blank');
  newWindow.focus()
}

contactButton.addEventListener('click', createTextMessage)
