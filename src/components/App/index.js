import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// import PrivateRoute from '../../containers/PrivateRoute'
// import AccessLazy from '../../containers/AccessLazy'
// import CheckAccess from '../../containers/CheckAccess'

import CharactersContainer from '../../containers/CharactersContainer'
import NoMatch from '../NoMatch'
import Footer from '../Footer'

import style from './index.css'

export default function App () {
  return (
    <Router>
      <div className={style.app}>
        <Switch>
          <Route exact path="/" component={CharactersContainer} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

/*
<CheckAccess />
<PrivateRoute path="/bio" component={About} />
<Route path="/access/:token?" component={AccessLazy} />
*/
