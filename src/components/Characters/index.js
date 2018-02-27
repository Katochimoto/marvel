import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import CharactersItem from '../CharactersItem'

import style from './index.css'

export default class Characters extends React.Component {

  componentDidMount () {
    window.scrollTo(0, this.props.scroll)
  }

  render() {
    const {
      list,
      getCharacter,
      getCharacters,
    } = this.props

    const items = list.items.map(id => (
      <CharactersItem key={`character-${id}`} {...getCharacter(id)} />
    ))

    return (
      <div className={style.characters}>
        <InfiniteScroll
          className={style.charactersScroll}
          pageStart={0}
          loadMore={getCharacters}
          hasMore={list.hasMore}
          loader={<div className={style.charactersLoader} key={0}>Loading ...</div>}>

          <div className={style.charactersList}>
            {items}
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

