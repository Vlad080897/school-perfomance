import { makeStyles } from '@material-ui/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox, Collapse, Container, IconButton, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import InnerTable from './InnerTable';
import { StudentInfoForCreateData } from './StudentsInfo';
import './StudentsInfo.css';

const useStyle = makeStyles({
  collapse_select: {
    '& div': {
      padding: '10px 15px 10px 15px',
      backgroundColor: 'white',
      fontWeight: 'bold',
      color: '#5B5B5B'
    }
  }
})

const Row = (props: {
  row: StudentInfoForCreateData,
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const [date, setDate] = React.useState<Date | null>(
    new Date(),
  );
  const { row, handleChecked } = props;
  const [open, setOpen] = React.useState(false);
  const score = Number(row.score.split('%').join(''));  // score to Number
  const classes = useStyle();

  const getScore = (score: number) => {
    if (score >= 90) {
      return 'highest'
    } else if (score >= 80 && score < 90) {
      return 'good'
    } else if (score >= 70 && score < 80) {
      return 'avarage'
    } else if (score < 70) {
      return 'bad'
    }
  }

  const getSpeed = (speed: string) => {
    if (speed === 'Below Expected') {
      return 'bad'
    } else if (speed === 'Above Expected') {
      return 'highest'
    } else if (speed === 'As Expected') {
      return 'good'
    }
  }

  const getRowColor = (id: number) => {
    if (id % 2 === 0) {
      return 'light'
    } else if (id % 2 !== 0) {
      return 'gray'
    }
  }

  // change of date in datepicker
  const handleChange = (newValue: Date | null) => {
    setDate(newValue);
  };
  return (
    <>
      <TableRow sx={{ '& th': { border: 'none' } }} className={`${getRowColor(row.id)}`}>
        <TableCell>
          <Checkbox
            color="primary"
            onChange={handleChecked}
            id={`${row.id}`}
            checked={row.isChecked}
          />
        </TableCell>
        <TableCell component="th" scope="row" >
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row" align='right' >
          {row.id}
        </TableCell>
        <TableCell component="th" scope="row" align='right'>
          {row.studentClass}
        </TableCell>
        <TableCell
          component="th" scope="row"
          align="right"
          sx={{ fontWeight: 'bold' }}
          className={`${getScore(score)}`}
        >
          {row.score}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
          sx={{ fontWeight: 'bold' }}
          className={`${getSpeed(row.speed)}`}
        >
          {row.speed}
        </TableCell>
        <TableCell component="th" scope="row" align="right" >
          {row.parents.map((parent, index) => {
            if (index + 1 === row.parents.length) {
              return (
                <span>{parent}</span>
              )
            }
            return (
              <span>{parent},</span>
            )
          })}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableCell colSpan={8} sx={{ padding: 0, border: 'none' }} >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Container maxWidth={false} sx={{ backgroundColor: '#F2F2F2', padding: '20px 0' }}>
            <Box sx={{ width: '85%', margin: '0 auto' }}>
              <Box sx={{ mb: '1rem' }}>
                <Typography gutterBottom component="span" sx={{ textTransform: 'uppercase', mr: '1rem', color: '#777777' }}>
                  Student:
                  <Typography
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold', ml: '0.5rem', color: '#5B5B5B' }}
                    component={'span'} >
                    {row.name}
                  </Typography>
                </Typography>
                <Typography gutterBottom component="span" sx={{ textTransform: 'uppercase', color: '#777777' }}>
                  ID:
                  <Typography
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold', ml: '0.5rem', color: '#5B5B5B' }}
                    component={'span'} >
                    {row.id}
                  </Typography>
                </Typography>
              </Box>
              <Box sx={{ borderBottom: '2px solid #A6192E', pb: '1rem' }}>
                <Select
                  variant='outlined'
                  sx={{ borderRadius: '0px', mr: '0.5rem' }}
                  className={classes.collapse_select}
                  value={'All concepts'}
                >
                  <MenuItem value={'All concepts'} sx={{ display: 'none' }}>All concepts</MenuItem>
                </Select>
                <Select
                  variant='outlined'
                  sx={{ borderRadius: '0px', mr: '0.5rem' }}
                  className={classes.collapse_select}
                  value={'All score'}
                >
                  <MenuItem value={'All score'} sx={{ display: 'none' }}>All score</MenuItem>
                </Select>
                <Select
                  variant='outlined'
                  sx={{ borderRadius: '0px', mr: '0.5rem' }}
                  className={classes.collapse_select}
                  value={'All speed'}
                >
                  <MenuItem value={'All speed'} sx={{ display: 'none' }}>All speed</MenuItem>
                </Select>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    components={{
                      OpenPickerIcon: CalendarMonthIcon
                    }}
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => <TextField
                      {...params}
                      variant='standard'
                    />}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ textTransform: 'uppercase' }}>
                <Typography gutterBottom component="span" mr={2}>Score</Typography>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#4285F4', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#4285F4' }}>90% + ACCURACY</Typography>
                </Box>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#0F9D58', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#0F9D58' }}>80 - 89% accuracy</Typography>
                </Box>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#E2B534', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#E2B534' }}>50 - 79% accuracy</Typography>
                </Box>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#DB4437', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#DB4437' }}>below 50% accuracy</Typography>
                </Box>

              </Box>
              <Box sx={{ textTransform: 'uppercase' }}>
                <Typography gutterBottom component="span" mr={2}>Speed</Typography>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#4285F4', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#4285F4' }}>above expected</Typography>
                </Box>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#0F9D58', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#0F9D58' }}>as expected</Typography>
                </Box>
                <Box display={'inline-block'} mr={1}>
                  <Box
                    display={'inline-block'}
                    mr={0.5}
                    sx={{ width: '12px', height: '12px', background: '#DB4437', borderRadius: '40px', }} />
                  <Typography gutterBottom component="span" sx={{ color: '#DB4437' }}>below expected</Typography>
                </Box>
              </Box>
              <InnerTable tests={row.tests} score={row.score} speed={row.speed} getScore={getScore} getSpeed={getSpeed} />
            </Box>
          </Container>
        </Collapse>
      </TableCell>
    </>
  )
}

export default Row