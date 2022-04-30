import { getStudentsInfoResponse } from '../types/types';
import { instance } from './api';


export const studentsAPI = {
    getStudentsInfo(page: number, size: number, search: string = '') {
        return instance.get<getStudentsInfoResponse>(`?page=${page}&size=${size}&search=${search}`).then(response => response.data)
    }
}