import dispatcher from './dispatcher'

export function updateCharactersList (data) {
  dispatcher.dispatch({
    type: 'UPDATE_CHARACTERS_LIST',
    payload: data,
  })
}

export function updateCharactersData (data) {
  dispatcher.dispatch({
    type: 'UPDATE_CHARACTERS_DATA',
    payload: data,
  })
}

export function updateScrollInfo () {
  dispatcher.dispatch({
    type: 'UPDATE_SCROLL_INFO',
    payload: window.pageYOffset || document.documentElement.scrollTop,
  })
}
