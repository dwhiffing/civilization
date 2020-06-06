import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { getPlanets, getPlanetResourceTotals } from '../selectors'
import { createContinent } from '../actions'
import { Purchase } from '../components/Purchase'
import { useParams } from 'react-router'

export const Planet = () => {
  const { id } = useParams()
  const planets = useSelector(getPlanets)
  const totals = useSelector(getPlanetResourceTotals(id))
  const planet = planets.find((c) => `${c.id}` === id)
  if (!planet) {
    return null
  }
  return (
    <Box>
      <a href={`#/`}>Back to System</a>
      <br />
      <p>Planet: {planet.label}</p>
      <p>
        Resource Totals:
        {Object.entries(totals).reduce(
          (sum, [key, value]) => sum + ` ${key}: ${value} `,
          '',
        )}
      </p>
      <br />
      <span>Continents:</span>

      <Box display="flex" flexDirection="column">
        {planet.continents.map((c) => {
          const things = c.cities.map((c) => c.resources).flat()
          return (
            <Box my={1} key={c.id} display="flex" alignItems="center">
              <a href={`#/continent/${c.id}`} style={{ marginRight: 8 }}>
                {c.label}
              </a>
              <span key={`resource-${c.id}`}>
                {Object.entries(
                  things.reduce((sum, r) => {
                    sum[r.resourceId] = sum[r.resourceId] || 0
                    sum[r.resourceId] += r.amount
                    return sum
                  }, {}),
                ).reduce((sum, [key, value]) => sum + `${key}: ${value} `, '')}
              </span>
            </Box>
          )
        })}
      </Box>

      <Purchase
        planetId={id}
        id="buyContinent"
        action={createContinent({ planetId: planet.id })}
      />
    </Box>
  )
}
