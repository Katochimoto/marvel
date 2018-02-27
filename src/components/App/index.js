import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import CharactersContainer from '../../containers/CharactersContainer'
import CharacterContainer from '../../containers/CharacterContainer'
import NoMatch from '../NoMatch'
import Footer from '../Footer'

import style from './index.css'

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={CharactersContainer} />
          <Route path="/character/:id" component={CharacterContainer} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}
