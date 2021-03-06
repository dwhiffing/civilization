import { createSelector } from 'redux-orm'
import orm from '../orm'

export const getBuyables = createSelector(orm.Buyable)
export const getTechnologies = createSelector(orm, (session) =>
  session.Technology.all()
    .toModelArray()
    .map((tech) => tech.ref),
)
export const getCivics = createSelector(orm, (session) =>
  session.Civic.all()
    .toModelArray()
    .map((civic) => civic.ref),
)
export const getBeliefs = createSelector(orm, (session) =>
  session.Belief.all()
    .toModelArray()
    .map((belief) => belief.ref),
)
export const getUnlocks = createSelector(orm, (session) =>
  session.Unlock.all()
    .toModelArray()
    .map((unlock) => unlock.ref.id),
)

const getStockpiles = createSelector(orm.ResourceStockpile)

export const getResourceTotals = createSelector(
  orm,
  getStockpiles,
  (_, stockpiles) => totalResources(stockpiles),
)

export const totalResources = (piles) => {
  let resources = {}
  piles
    // .filter((p) => !/science|faith|culture/.test(p.resourceId))
    .forEach((pile) => {
      const { amount, limit, resourceId, color } = pile
      resources[resourceId] = resources[resourceId] || {
        amount: 0,
        limit: 0,
        color,
      }
      resources[resourceId].amount += amount
      resources[resourceId].limit += limit
    })
  return resources
}
