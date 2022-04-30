import ArchiveIcon from '@mui/icons-material/Archive';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Button, Grid, Link, List, MenuItem, Select, Toolbar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import { makeStyles } from '@mui/styles';
import React from 'react';
import SubHeader from './SubHeader';

const useStyle: any = makeStyles({
  container: {
    backgroundColor: 'none',
    height: '60px',
  },
  test: {
    outline: 'none',
    background: "red"
  },
  select: {
    '&': {
      backgroundColor: 'white !important'
    },
    "& div": {
      padding: '8px',
      backgroundColor: 'white'
    },
    "& div:focus": {
      backgroundColor: 'white',
    },
    textTransform: 'uppercase',
    marginRight: '5rem'
  },
  list: {
    color: 'inherit',
    "& a": {
      marginRight: '1rem',
      padding: '10px 7px',

    },
    '& a:hover': {
      backgroundColor: '#A6192E',
      color: '#FFF',
      fontWeight: 'bold',
    }
  }
})

const Header = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        className={classes.container}
      >
        <Toolbar>
          <Grid container >
            <Grid item xs={2}></Grid>
            <Grid item display={'flex'} xs={8}>
              <Select
                variant='filled'
                disableUnderline
                className={classes.select}
                defaultValue='School1'

              >
                <MenuItem value={'School1'}>School1</MenuItem>
              </Select>
              <List disablePadding={false} classes={{ root: classes.list }}>
                <Link
                  href='#'
                  variant='button'
                  underline='none'
                  color='inherit'
                  fontSize='1rem'
                  mr={2}
                >
                  Analytics
                </Link>
                <Link
                  href='#'
                  variant='button'
                  underline='none'
                  color='inherit'
                  fontSize='1rem'
                  mr={2}
                >
                  Gradebooks
                </Link>
                <Link
                  href='#'
                  variant='button'
                  underline='none'
                  color='inherit'
                  fontSize='1rem'
                  mr={2}
                >
                  Tests
                </Link>
                <Link
                  href='#'
                  variant='button'
                  underline='none'
                  color='inherit'
                  fontSize='1rem'
                  mr={2}
                >
                  Students
                </Link>
                <Link
                  href='#'
                  variant='button'
                  underline='none'
                  color='inherit'
                  fontSize='1rem'
                  mr={2}
                >
                  Teachers
                </Link>
              </List>
            </Grid>
            <Grid item marginLeft='auto'>
              <Button
                startIcon={<Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>}
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon sx={{ color: '#777777' }} />}
                disableElevation
              >
              </Button>
              <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <FileCopyIcon />
                  Duplicate
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <ArchiveIcon />
                  Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  More
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
      <SubHeader />
    </>
  )
}

export default Header