import React from 'react'
import { Provider } from 'react-redux'
import { AppRputer } from './router/AppRputer'
import { store } from './store/store'

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRputer />
    </Provider>
  )
}
