import PropTypes from 'prop-types'
import React from 'react'
import { navigate } from './utils/constants'

import {
  Button,
  Grid,
  Box,
  ButtonGroup,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core'

import { NavigateNext, NavigateBefore } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  columnLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  columnRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  columnCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Toolbar = props => {
  const thisNavigate = action => {
    props.onNavigate(action)
  }

  const thisView = view => {
    props.onView(view)
  }

  const viewNamesGroup = messages => {
    let viewNames = props.views
    const view = props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => {
        const color = view === name ? 'primary' : 'default'
        return (
          <Button
            variant="contained"
            key={name}
            color={color}
            onClick={thisView.bind(null, name)}
          >
            {messages[name]}
          </Button>
        )
      })
    }
  }

  let {
    localizer: { messages },
    label,
  } = props
  const classes = useStyles()

  return (
    <Box>
      <Box marginBottom={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.columnCenter}>
            <ButtonGroup>{viewNamesGroup(messages)}</ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={2}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.columnLeft}>
            <Typography variant="h5" component="h5">
              {label}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.columnRight}>
            <IconButton onClick={thisNavigate.bind(null, navigate.PREVIOUS)}>
              <NavigateBefore />
            </IconButton>
            <Button onClick={thisNavigate.bind(null, navigate.TODAY)}>
              {messages.today}
            </Button>
            <IconButton onClick={thisNavigate.bind(null, navigate.NEXT)}>
              <NavigateNext />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
