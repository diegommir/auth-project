import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  return (
    <main className="container-fluid">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact={true} component={Signin} />
          <Route path="/signup" exact={true} component={Signup} />
          <Route path="/signin" exact={true} component={Signin} />
          <Route path="/signout" exact={true} />
        </Switch>
      </Router>
    </main>
  )
}

export default App
