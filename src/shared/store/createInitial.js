import { createCityReducer } from '../../city/store/createCity'
import random from 'lodash/random'
import times from 'lodash/times'
import { tasks } from '../../city/data'
import {
  SYSTEM_COUNT_RANGE,
  UNLOCK_ALL,
  UNLOCKS,
  buyables,
  resources,
} from '../data'
import { districtTypes } from '../../city/data'
import { createSystemReducer } from '../../system/store/createSystem'
import { unlockReducer } from './unlock'
import { updateResourceReducer } from './updateResource'
import { createAction } from '@reduxjs/toolkit'

export const createInitial = createAction('INIT')
export const createInitialReducer = (sess) => {
  buyables.forEach((b) => sess.Buyable.upsert(b))
  tasks.forEach((t) => sess.Task.upsert(t))
  resources.forEach((r) => sess.Resource.upsert({ ...r, amount: 0 }))
  districtTypes.forEach((dt) => sess.DistrictType.upsert(dt))

  if (sess.System.all().toRefArray().length === 0) {
    times(random(...SYSTEM_COUNT_RANGE), () => createSystemReducer(sess, {}))
    createCityReducer(sess, { plotId: sess.Plot.first().id })
    unlockReducer(sess, 'center')
    updateResourceReducer(sess, { resourceId: 'food', id: 0, value: 100 })

    if (UNLOCK_ALL) {
      UNLOCKS.forEach((id) => unlockReducer(sess, id))
    }
  }

  return sess.state
}