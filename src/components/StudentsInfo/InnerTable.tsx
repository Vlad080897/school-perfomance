import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Checkbox, Typography } from '@mui/material'
import { TestType } from '../../types/types'

const InnerTable: React.FC<innerTableProps> = (props) => {
  const { tests, score, speed, getSpeed, getScore } = props;
  const scoreNumber = Number(score.split('%').join(''));  // score to number

  // color if student absent
  const getColor = (absent: boolean) => {
    if (absent) {
      return 'absent';
    };
    if (!!absent) {
      return '';
    };
  };


  return (
    <TableContainer component={Paper} sx={{ background: 'none' }} elevation={0}>
      <Table sx={{ background: 'none' }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Test Label</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Speed</TableCell>
            <TableCell>Total Q-ns</TableCell>
            <TableCell>Exp. Speed</TableCell>
            <TableCell>Concept</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Absent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test, index) => {
            return (
              <>
                <TableRow key={index} sx={{ color: '#C0C0C0' }}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.label}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.score}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.speed}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.total}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.expSpeed}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.concept}</TableCell>
                  <TableCell className={`${getColor(test.absent)}`}>{test.date}</TableCell>
                  <TableCell>
                    <Checkbox checked={test.absent} />
                  </TableCell>
                </TableRow>
              </>
            )
          })}
          <TableRow >
            <TableCell></TableCell>
            <TableCell>
              <Typography
                sx={{ color: '#777777', textTransform: 'uppercase', fontSize: '1rem', fontWeight: 'bold' }}>
                Avarage
              </Typography>
            </TableCell>
            <TableCell
              className={`${getScore(scoreNumber)}`}
            >
              <Typography sx={{ fontWeight: 'bold' }}>{score}</Typography>
            </TableCell>
            <TableCell
              className={`${getSpeed(speed)}`}
            >
              <Typography sx={{ fontWeight: 'bold' }}>{speed}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InnerTable

type innerTableProps = {
  tests: TestType[]
  score: string
  speed: string
  getScore: (score: number) => "highest" | "good" | "avarage" | "bad" | undefined
  getSpeed: (speed: string) => "highest" | "good" | "bad" | undefined
}