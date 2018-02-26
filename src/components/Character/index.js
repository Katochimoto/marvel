import { Link } from 'react-router-dom';

import style from './index.css'

export default function Character ({
  id,
  name,
  description,
  photo,
}) {

  return (
    <Link className={style.character} to={`/character/${id}`}>
      <img className={style.characterPhoto}
        src={photo}
        alt={name}
        width={150}
        height={150} />
      <span className={style.characterName}>{name}</span>
    </Link>
  )
}
