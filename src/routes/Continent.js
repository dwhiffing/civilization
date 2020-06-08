import React from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { getContinents, getContinentResourceTotals } from '../selectors'
import { Purchase } from '../components/Purchase'
import { createCity, explore } from '../actions'
import { useParams } from 'react-router'
import { Sidebar, Frame } from '../components/Frame'
import { Resources } from '../components/Resources'

export const Continent = () => {
  const { id } = useParams()
  const continent = useSelector(getContinents).find((c) => `${c.id}` === id)
  const resources = useSelector(getContinentResourceTotals(+id))

  if (!continent) {
    return null
  }

  return (
    <Frame
      sidebar={
        <Sidebar
          uri={`#/planet/${continent.planet.id}`}
          linkText={`Back to ${continent.planet.label}`}
          label={`Continent: ${continent.label}`}
          resources={resources}
        />
      }
    >
      <span>Cities:</span>

      <Box display="flex" flexDirection="column">
        {continent.cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </Box>

      {continent.plots
        .filter((p) => !p.city && p.explored)
        .map((plot) => (
          <Purchase
            key={`${plot.id}-explore`}
            continentId={+id}
            id="buyCity"
            action={createCity({ plotId: plot.id })}
          />
        ))}

      {continent.plots.filter((p) => !p.city && !p.explored).length > 0 && (
        <Purchase
          continentId={+id}
          id="exploreContinent"
          action={explore({ continentId: continent.id })}
        />
      )}
    </Frame>
  )
}

const CityItem = ({ city }) => (
  <Box my={1} display="flex" alignItems="center">
    <a
      href={`#/city/${city.id}`}
      style={{
        marginRight: 8,
      }}
    >
      {city.label}
    </a>
    <Resources hide resources={city.resources} />
  </Box>
)
