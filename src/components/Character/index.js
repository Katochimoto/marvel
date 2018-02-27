import React from 'react'
import {
  Link,
  Redirect,
} from 'react-router-dom'

import style from './index.css'

export default function Character ({
  id,
  name,
  photo,
  description,
  urls = [],
}) {

  if (!id) {
    return (
      <Redirect to={{
        pathname: '/'
      }} />
    )
  }

  return (
    <section className={style.character}>
      <header className={style.characterHead}>
        <img className={style.characterPhoto}
          src={photo}
          alt={name} />
        <div className={style.characterAbout}>
          <h1 className={style.characterName}>{name}</h1>
          {urls.map(item => (
            <a key={item.type} href={item.url} className={style.characterPersonal} target="_blank">{item.type}</a>
          ))}
        </div>
      </header>
      <div className={style.characterContent}>{description}</div>
      <footer>
        <Link  className={style.characterBack} to="/">
          ALL CHARACTERS
        </Link>
      </footer>
    </section>
  )
}
