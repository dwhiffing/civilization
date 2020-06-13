import { createAction } from '@reduxjs/toolkit'

export const createInitial = createAction('INIT')
export const tick = createAction('TICK')
export const drag = createAction('DRAG')
export const updateResource = createAction('UPDATE_RESOURCE')
export const explore = createAction('EXPLORE')
export const settle = createAction('SETTLE')
export const createDistrict = createAction('CREATE_BUILDING')
export const createSeat = createAction('CREATE_SEAT')
export const unlock = createAction('UNLOCK')
