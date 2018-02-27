import React from 'react'
import { Container } from 'flux/utils'
import { getCharacters } from '../data/services'
import Characters from '../components/Characters'
import store from '../data/store'

class CharactersContainer extends React.Component {
  static getStores() {
    return [
      store,
    ]
  }

  static calculateState() {
    const {
      list,
      scroll,
    } = store.getState()

    return {
      list,
      scroll,
      getCharacter: id => store.getCharacter(id),
      getCharacters,
    }
  }

  render() {
    return <Characters {...this.state} />
  }
}

export default Container.create(CharactersContainer, {
  withProps: true
})
