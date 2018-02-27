import './style/inline.css'
import './style/main.css'

import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'

import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render((
  <App />
), document.getElementById('app'))

// @if NODE_ENV='production'
(function () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/marvel/sw.js', {
      scope: '/'
    })
  }
 }())
// @endif
