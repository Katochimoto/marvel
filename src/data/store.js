import { ReduceStore } from 'flux/utils'
import { isFSA } from 'flux-standard-action'
import dispatcher from './dispatcher'

class BioStore extends ReduceStore {
  getInitialState () {
    return {
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
      default:
        return state
    }
  }
}

export default new BioStore(dispatcher)
