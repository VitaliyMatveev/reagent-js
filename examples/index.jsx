import React from 'react'
import { render } from 'react-dom'
//import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'
import App from './example.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

injectTapEventPlugin()
const hotRender = (Component) => {
  render(
    <AppContainer>
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <Component/>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('container')
  )
}

hotRender(App)

if (module.hot) {
  console.log('hot', App);
  module.hot.accept('./index.jsx', () => {
    hotRender (App)
  })
}
