import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Button, Checkbox, Container, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from 'react-redux';
import { getStudentsInfo } from '../../redux/StudentsInfo';
import { getStudentsSelector, getStudentsTotalCount } from '../../selectors/selectors';
import { TestType } from '../../types/types';
import Row from './Row';

const StudentsInfo: React.FC = () => {
  const [exportCSV, setExportCSV] = useState<StudentInfoForCreateData[]>([])
  const [rows, setRows] = useState<StudentInfoForCreateData[]>([])
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const students = useSelector(getStudentsSelector);
  const totalCount = useSelector(getStudentsTotalCount);
  const dispatch = useDispatch();

  //csv export
  const headers = [
    { label: "Name", key: "name" },
    { label: "Score", key: "score" },
    { label: "Speed", key: "speed" },
    { label: "Class", key: "studentClass" },
    { label: 'Parents', key: 'parents' }
  ];

  const csvReport = {
    data: exportCSV.length === 0 ? rows : exportCSV,
    headers: headers,
    filename: 'students_info.csv'
  };

  //func for students update
  const updateRows = () => {
    const newRows: StudentInfoForCreateData[] = []
    students.forEach(el => {
      newRows.push(createData(el.class, el.id, el.name, el.parents, el.score, el.speed, el.tests));
    });
    setRows(newRows)
  }

  //first request for students
  useEffect(() => {
    //@ts-ignore
    dispatch(getStudentsInfo(page, amount, ''));
  }, [dispatch, page, amount]);

  //students update
  useEffect(() => {
    updateRows()
  }, [students])

  //create data object
  function createData(
    studentClass: string,
    id: number,
    name: string,
    parents: Array<string>,
    score: string,
    speed: string,
    tests: Array<TestType>,
  ) {
    return {
      studentClass,
      id,
      name,
      parents: [...parents],
      score,
      speed,
      tests: [...tests],
      isChecked: false,
      sortedBy: '',
      sortedDir: 1
    };
  }

  //handle checkbox
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExportCSV: StudentInfoForCreateData[] = []
    const newRows = rows.map(el => {
      if (el.id === Number(event.target.id)) {
        el.isChecked = !el.isChecked
      }
      if (el.isChecked) {
        newExportCSV.push(el)
      }
      return el
    })
    setRows(newRows);
    setExportCSV(newExportCSV);

  }
  const handleAllChecked = () => {
    let newRows: StudentInfoForCreateData[] = []
    setAllChecked(!allChecked);
    if (allChecked) {
      newRows = rows.map(el => {
        el.isChecked = false
        return el
      })
    }
    if (!allChecked) {
      newRows = rows.map(el => {
        el.isChecked = true
        return el
      })
    }
    setRows(newRows)
  }

  //pagination
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAmount(parseInt(event.target.value, 10));
  };

  //form, form validation
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values: { search: string }) => {
      //@ts-ignore
      dispatch(getStudentsInfo(1, 20, values.search))
    },
  });

  // sort each field
  const sortID = () => {
    let sortedRows: StudentInfoForCreateData[] = []
    if (rows[0].sortedDir === 1) {
      sortedRows = rows.sort((a, b) => b.id - a.id).map((row) => {
        row.sortedDir = -1
        return row
      })
      return setRows(sortedRows)
    }
    if (rows[0].sortedDir === -1) {
      updateRows()
    }
  }
  const sortName = () => {
    let sortedRows: StudentInfoForCreateData[] = []
    if (rows[0].sortedBy !== 'name') {
      sortedRows = rows.sort((row1, row2) => row1.name.localeCompare(row2.name)).map((row) => {
        row.sortedBy = 'name'
        return row
      })
      return setRows(sortedRows)
    }
    if (rows[0].sortedBy === 'name') {
      rows.map(row => row.sortedBy = '')
      updateRows()
    }
  }
  const sortClass = () => {
    let sortedRows: StudentInfoForCreateData[] = []
    if (rows[0].sortedBy !== 'class') {
      sortedRows = rows.sort((row1, row2) => row1.studentClass.localeCompare(row2.studentClass)).map((row) => {
        row.sortedBy = 'class'
        return row
      })
      return setRows(sortedRows)
    }
    if (rows[0].sortedBy === 'class') {
      rows.map(row => row.sortedBy = '')
      updateRows()
    }
  }
  const sortScore = () => {
    let sortedRows: StudentInfoForCreateData[] = []
    if (rows[0].sortedBy !== 'score') {
      sortedRows = rows.sort((row1, row2) => Number(row1.score.split('%').join('')) - Number(row2.score.split('%').join(''))).map((row) => {
        row.sortedBy = 'score'
        return row
      })
      return setRows(sortedRows)
    }
    if (rows[0].sortedBy === 'score') {
      sortedRows = rows.sort((row1, row2) => Number(row2.score.split('%').join('')) - Number(row1.score.split('%').join(''))).map((row) => {
        row.sortedBy = ''
        return row
      })
      return setRows(sortedRows)
    }
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ paddingTop: '0.5rem', width: '95%', margin: '0 auto' }}>
        <Box
          sx={{ display: 'flex', width: '90%', justifyContent: 'space-between', }}
        >
          <Typography sx={{ color: '#5B5B5B', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '1.5rem', }}>Students</Typography>
          <Box sx={{ width: '500px' }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="search"
                name='search'
                value={formik.values.search}
                onChange={formik.handleChange}
                variant="standard"
                placeholder='Enter Student Name, Parent or ID here'
                sx={{ padding: '5px 0px 5px 15px', bgcolor: '#F2F2F2', }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button sx={{ padding: '5px 0', }} type='submit'>
                        <SearchIcon sx={{ color: '#C0C0C0' }} />
                      </Button>
                    </InputAdornment>
                  ),
                  disableUnderline: true
                }}

              />
            </form>
          </Box>
          <Box sx={{ '& a': { textDecoration: 'none' } }} >
            <CSVLink {...csvReport} separator={";"}>
              <Button sx={{ color: '#C0C0C0', fontWeight: 'bold' }} startIcon={<UpgradeIcon />}>
                Export CSV
              </Button>
            </CSVLink>
          </Box>
        </Box>
      </Container>
      <TableContainer component={Paper} sx={{ width: '95%', margin: '0 auto', mt: '1rem' }}>
        <Table sx={{ '& th': { border: 'none' }, '& td': { border: 'none' } }} >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  onChange={handleAllChecked}
                />
              </TableCell>
              <TableCell>
                <Typography sx={{ display: 'inline-flex' }}>Name</Typography>
                <Button onClick={sortName}>
                  <SortByAlphaIcon sx={{ color: '#C0C0C0' }} />
                </Button>
              </TableCell>
              <TableCell align="right" sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', }}>
                <Button onClick={sortID} sx={{ paddingRight: '0', minWidth: '30px', paddingLeft: '0' }}>
                  <FilterListIcon sx={{ color: '#C0C0C0' }} />
                </Button>
                <Typography component={'div'}>ID</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component={'span'}>Class</Typography>
                <Button onClick={sortClass} sx={{ minWidth: '30px' }}>
                  <FilterListIcon sx={{ color: '#C0C0C0' }} />
                </Button>
              </TableCell>
              <TableCell align="right">
                <Typography component={'span'}>Av.Score,%</Typography>
                <Button onClick={sortScore} sx={{ minWidth: '30px' }}>
                  <FilterListIcon sx={{ color: '#C0C0C0' }} />
                </Button>
              </TableCell>
              <TableCell align="right">Av.Speed</TableCell>
              <TableCell align="right">Parents</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.id}
                row={row}
                handleChecked={handleChecked}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length < 10 ?
        ''
        :
        (
          < TablePagination
            component="div"
            count={totalCount}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={amount}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20]}
          />

        )
      }
    </>
  )
}

export default StudentsInfo

export type StudentInfoForCreateData = {
  studentClass: string
  id: number
  name: string
  parents: Array<string>
  score: string
  speed: string
  tests: TestType[]
  isChecked: boolean
  sortedBy: string
  sortedDir: number
}
