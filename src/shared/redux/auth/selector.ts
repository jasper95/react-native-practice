import { createSelector } from '@reduxjs/toolkit'
import { GlobalState } from '../reducer'

export const authSelector = createSelector(
  (state: GlobalState) => state.auth.user,
  state => state.auth.sessionLoading,
  state => state.auth.sessionRequested,
  state => state.auth.token,
  (user, sessionLoading, sessionRequested, token) => ({
    user,
    sessionLoading,
    sessionRequested,
    token
  }),
)

export const locationSelector = createSelector(
  (state: GlobalState) => state.auth.location,
  (location) => ({
    location
  })
)