import { ReduceStore } from 'flux/utils'
import { isFSA } from 'flux-standard-action'
import dispatcher from './dispatcher'

class Store extends ReduceStore {
  getInitialState () {
    return {
      scroll: 0,
      list: {
        hasMore: true,
        items: [],
      },
      character: {}
    }
  }

  getCharacter (id) {
    const { character } = this.getState()
    return character[id]
  }

  reduce (state, action) {
    if (!isFSA(action)) {
      return state
    }

    const {
      error,
      payload,
      type,
    } = action

    switch (type) {
      case 'UPDATE_CHARACTERS_LIST':
        return {
          ...state,
          list: {
            ...state.list,
            hasMore: payload.hasMore,
            items: state.list.items.concat(payload.items),
          }
        }
      case 'UPDATE_CHARACTERS_DATA':
        return {
          ...state,
          character: {
            ...state.character,
            ...payload,
          }
        }
      case 'UPDATE_SCROLL_INFO':
        return {
          ...state,
          scroll: payload
        }
      default:
        return state
    }
  }
}

export default new Store(dispatcher)
