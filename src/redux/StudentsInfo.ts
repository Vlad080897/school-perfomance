import { studentsAPI } from './../api/students-api';
import { StudentInfoType } from './../types/types';
import { BaseThunkType } from './redux-store';

const GET_USER_INFO = 'GET_USER_INFO'

const initialstate = {
    currentPage: 1,
    amount: 10,
    totalPages: 1,
    totalCount: 10,
    students: [] as StudentInfoType[]
}

const StudentInfoReducer = (state = initialstate, action: ActionsTypes): initialStudentsInfoState => {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                totalPages: action.totalPages,
                totalCount: action.totalCount,
                students: [...action.students]
            }
        default: return state
    }
}

const actions = {
    getUserInfoAC: (students: StudentInfoType[], totalCount: number, totalPages: number) => {
        return {
            type: GET_USER_INFO,
            totalPages,
            totalCount,
            students
        } as const
    }
}

export const getStudentsInfo = (page: number, amount: number, search: string): ThunkType => async (dispatch) => {
    const studentsInfo = await studentsAPI.getStudentsInfo(page, amount, search)
    dispatch(actions.getUserInfoAC(studentsInfo.data, studentsInfo.totalCount, studentsInfo.totalPages))
}

export default StudentInfoReducer

type initialStudentsInfoState = typeof initialstate;
type ThunkType = BaseThunkType<ActionsTypes>
type InferValueType<T> = T extends { [key: string]: infer U } ? U : never;
type ActionsTypes = ReturnType<InferValueType<typeof actions>>; 