import React from 'react'
import numeral from 'numeral'
import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getUnlocks } from '../selectors'
import ReactTooltip from 'react-tooltip'

// TODO: needs to get color properly
export const ResourceText = ({ resource }) => {
  return (
    <Box data-tip={resource.resourceId} display="flex">
      <Box>
        <Typography style={{ color: resource.color, fontWeight: 'bold' }}>
          {resource.resourceId}:
        </Typography>
      </Box>
      <Box ml={1} display="flex" flexDirection="row" alignItems="center">
        <Typography>
          {numeral(resource.amount).format('0,0.0')}/
          {numeral(resource.limit).format('0,0')}
        </Typography>
      </Box>
    </Box>
  )
}

export const Resources = ({ hide, resources }) => {
  const unlocks = useSelector(getUnlocks)

  if (hide) {
    return null
  }

  let _resources = resources
  if (!Array.isArray(resources)) {
    _resources = Object.entries(resources).map(([k, v]) => ({
      resourceId: k,
      ...v,
    }))
  }
  return (
    <Box className="flex flex-column" my={1}>
      {_resources
        .filter((r) => unlocks.includes(r.resourceId))
        .map((resource) => (
          <Box key={resource.resourceId} display="flex" flexDirection="row">
            <ResourceText resource={resource} />
          </Box>
        ))}
      <ReactTooltip></ReactTooltip>
    </Box>
  )
}
