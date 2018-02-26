import InfiniteScroll from 'react-infinite-scroller'
import Character from '../Character'

import style from './index.css'

export default function Characters ({
  list,
  getCharacter,
  getCharacters,
}) {

  return (
    <div className={style.characters}>
      <InfiniteScroll
        className={style.charactersScroll}
        pageStart={0}
        loadMore={getCharacters}
        hasMore={list.hasMore}
        loader={<div className={style.charactersLoader} key={0}>Loading ...</div>}>

        <div className={style.charactersList}>
          {list.items.map(id => (
            <Character key={`character-${id}`} {...getCharacter(id)} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
