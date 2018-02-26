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
