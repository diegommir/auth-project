import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <main className="containe-fluid">
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/signup" exact={true} component={Signup} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/logout" exact={true} />
        </Switch>
      </Router>
    </main>
  )
}

export default App
