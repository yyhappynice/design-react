import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import {
  Switch,
  HashRouter as Router,
  Route,
  IndexRoute,
  Link
} from 'react-router-dom'
import Pages from './pages/index.js'
import './assets/styles/base.scss'

const { Home, Button, } = Pages.components

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/button', component: Button },
]

const App = (props, context) =>
(
  <Router>
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Design-React</h1>
          <ul className="nav">
            <li>指南</li>
            <li>组件</li>
            <li>日志</li>
            <li>中文/EN</li>
          </ul>
        </div>
      </header>
      <div className="main container">
        <nav className="side-nav">
          <ul>
            <li className="nav-item">
              <a>Components</a>
              {
                Object.keys(Pages.Nav).map(group => {
                  return (
                    <div className="nav-group" key={group}>
                      <div className="nav-group-title">{group}</div>
                      <ul className="pure-menu-list">
                        {
                          Object.keys(Pages.Nav[group]).map(page => {
                            return (
                              <li className="nav-item" key={page}>
                                <a href={`#${page}`}>{Pages.Nav[group][page]}</a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </li>
          </ul>
        </nav>
        <div className="content">
          <Switch>
            {
              routes.map( route=> (
                <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
              ))
            }
          </Switch>
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">Design-React</div>
          <div className="footer-social"><a href="https://github.com/yi-cli/design-react" target="_blank" rel="noreferrer"></a></div>
        </div>
      </footer>
    </div>
  </Router>
)
ReactDOM.render(<App/>, document.getElementById('app'))