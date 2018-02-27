import React from 'react'
import { Container } from 'flux/utils'
import Character from '../components/Character'
import store from '../data/store'


class CharacterContainer extends React.Component {
  static getStores() {
    return [
      store,
    ]
  }

  static calculateState(prevState, props) {
    const {
      history,
      match: { params: { id } }
    } = props

    return store.getCharacter(id)
  }

  render() {
    return <Character {...this.state} />
  }
}

export default Container.create(CharacterContainer, {
  withProps: true
})
