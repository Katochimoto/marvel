import { Container } from 'flux/utils'
import { getCharacters } from '../data/services'
import Characters from '../components/Characters'
import store from '../data/store'

function getStores () {
  return [
    store,
  ]
}

function getState () {
  const { list } = store.getState()

  return {
    list,
    getCharacter: id => store.getCharacter(id),
    getCharacters,
  }
}

export default Container.createFunctional(Characters, getStores, getState)
