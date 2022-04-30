import { AppStateType } from './../redux/redux-store';
export const getStudentsSelector = (state: AppStateType) => {
    return state.studentsInfo.students
}

export const getStudentsTotalCount = (state: AppStateType) => {
    return state.studentsInfo.totalCount
}

export const getStudentsTotalPages = (state: AppStateType) => {
    return state.studentsInfo.totalPages
}