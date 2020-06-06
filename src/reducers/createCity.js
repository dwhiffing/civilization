import { createPerson } from './createPerson'
import { createBuilding } from './createBuilding'
import sample from 'lodash/sample'
import { CITIES } from '../data'

export const createCity = (sess, payload) => {
  const {
    continentId,
    label = sample(CITIES),
    people = [{}],
    resources = [],
    buildings = [],
  } = payload

  const continent = sess.Continent.withId(continentId)
  const allResources = sess.Resource.all().toModelArray()
  const allBuildings = sess.BuildingType.all().toModelArray()
  const cityInstance = sess.City.create({ label })
  const cityId = cityInstance.ref.id

  allResources.forEach(({ id }) => {
    const _resource = resources.find((r) => r.resourceId === id)
    const amount = _resource ? _resource.amount : 0
    cityInstance.resources.add(
      sess.ResourceStockpile.create({ resourceId: id, amount }),
    )
  })
  people.forEach((person) => createPerson(sess, { cityId, person }))
  allBuildings.forEach(({ id }) => {
    const _building = buildings.find((r) => r.buildingId === id) || {}
    createBuilding(sess, { cityId, building: { buildingId: id, ..._building } })
  })
  continent.cities.add(cityInstance)

  return sess.state
}
