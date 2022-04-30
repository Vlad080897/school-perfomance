import CloseIcon from '@mui/icons-material/Close';
import { Button, List, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction } from 'react';

const useStyle: any = makeStyles({
  container: {
    height: 40,
    backgroundColor: '#5B5B5B'
  },
  box: {
    width: '60%',
    margin: '0 auto',
    height: '100%'
  },
  select: {
    '& .MuiSelect-filled': {
      color: '#C0C0C0',

    },
    '&': {
      background: 'none !important',
    },
    '& div': {
      padding: 0,
      background: 'none !important'
    },
    '& .MuiSelect-iconFilled': {
      color: '#C0C0C0'
    },
  },
  menu: {
    '& .MuiMenu-paper': {
      color: 'black',
      top: '95px !important'

    }
  }

})

const SubHeader = () => {
  const classes = useStyle();
  const [all, setAll] = React.useState('Show All');
  const [grades, setGrades] = React.useState('All Grades');
  const [allClasses, setAllClasses] = React.useState('All classes');
  const [avScore, setAvScore] = React.useState('Av.Score');
  const [avSpeed, setAvSpeed] = React.useState('Av.Speed');


  const changeObject: changeObject = {
    "showAll": setAll,
    "allGrades": setGrades,
    "allClasses": setAllClasses,
    "avScore": setAvScore,
    "avSpeed": setAvSpeed,


  }

  const handleChange = (e: SelectChangeEvent) => {
    const func = changeObject[e.target.name]
    func(e.target.value)
  }
  return (
    <Container
      className={classes.container}
      maxWidth={false}
    >
      <Box className={classes.box}>
        <List
          disablePadding
          sx={{ pt: '3px', display: 'flex', justifyContent: 'space-around' }}
        >
          <Select
            labelId="demo-simple-select-label"
            variant='filled'
            label={'Show All'}
            name={'showAll'}
            value={all}
            defaultValue={all}
            disableUnderline
            className={classes.select}
            MenuProps={{ classes: { root: classes.menu } }}
            onChange={handleChange}
          >
            <MenuItem value={'Show All'} sx={{ display: 'none' }}>Show All</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
            <MenuItem value={'Test2'}>Test2</MenuItem>
            <MenuItem value={'Test3'}>Test3</MenuItem>
          </Select>
          <Select
            variant='filled'
            defaultValue={'All Grades'}
            value={grades}
            name='allGrades'
            disableUnderline
            className={classes.select}
            MenuProps={{ classes: { root: classes.menu } }}
            onChange={handleChange}
          >
            <MenuItem value={'All Grades'} sx={{ display: 'none' }}>All Grades</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
            <MenuItem value={'Test2'}>Test2</MenuItem>
            <MenuItem value={'Test3'}>Test3</MenuItem>
          </Select>
          <Select
            variant='filled'
            defaultValue={'All classes'}
            value={allClasses}
            name='allClasses'
            disableUnderline
            className={classes.select}
            MenuProps={{ classes: { root: classes.menu } }}
            onChange={handleChange}
          >
            <MenuItem value={'All classes'} sx={{ display: 'none' }}>All classes</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
            <MenuItem value={'Test2'}>Test2</MenuItem>
            <MenuItem value={'Test3'}>Test3</MenuItem>
          </Select>
          <Select
            variant='filled'
            defaultValue={'Av.Score'}
            value={avScore}
            disableUnderline
            name='avScore'
            className={classes.select}
            MenuProps={{ classes: { root: classes.menu } }}
            onChange={handleChange}
          >
            <MenuItem value={'Av.Score'} sx={{ display: 'none' }}>Av.Score</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
            <MenuItem value={'Test2'}>Test2</MenuItem>
            <MenuItem value={'Test3'}>Test3</MenuItem>
          </Select>
          <Select
            variant='filled'
            defaultValue={'Av.Speed'}
            value={avSpeed}
            name='avSpeed'
            disableUnderline
            className={classes.select}
            MenuProps={{ classes: { root: classes.menu } }}
            onChange={handleChange}
          >
            <MenuItem value={'Av.Speed'} sx={{ display: 'none' }}>Av.Speed</MenuItem>
            <MenuItem value={'Test'}>Test</MenuItem>
            <MenuItem value={'Test2'}>Test2</MenuItem>
            <MenuItem value={'Test3'}>Test3</MenuItem>
          </Select>
          <Button
            startIcon={<CloseIcon sx={{ color: '#C0C0C0' }} />}
            sx={{ color: '#C0C0C0' }}
            onClick={() => {
              setAll('Show All');
              setGrades('All Grades');
              setAllClasses('All classes');
              setAvScore('Av.Score');
              setAvSpeed('Av.Speed')
            }}
          >
            clear all
          </Button>
        </List>
      </Box>

    </Container >
  )
}

export default SubHeader

type changeObject = {
  [key: string]: Dispatch<SetStateAction<string>>
}