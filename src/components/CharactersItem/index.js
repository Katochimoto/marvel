import { Link } from 'react-router-dom';
import {
  updateScrollInfo,
} from '../../data/actions'

import style from './index.css'

export default function CharactersItem ({
  id,
  name,
  description,
  photo,
}) {

  return (
    <Link className={style.charactersItem}
      to={`/character/${id}`}
      onClick={() => updateScrollInfo()}>
      <img className={style.charactersItemPhoto}
        src={photo}
        alt={name} />
      <span className={style.charactersItemName}>{name}</span>
    </Link>
  )
}
