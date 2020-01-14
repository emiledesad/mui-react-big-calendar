import PropTypes from 'prop-types'
import React from 'react'

import { Link, Typography, Box } from '@material-ui/core'

const DateHeader = ({ label, drilldownView, onDrillDown }) => {
  if (!drilldownView) {
    return <span>{label}</span>
  }

  return (
    <Box ml={2} mr={2}>
      <Typography align="right">
        <Link component="button" onClick={onDrillDown}>
          {label}
        </Link>
      </Typography>
    </Box>
  )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drilldownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool,
}

export default DateHeader
