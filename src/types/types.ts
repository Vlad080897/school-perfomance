export type getStudentsInfoResponse = {
    totalCount: number
    totalPages: number
    data: StudentInfoType[]
}
export type StudentInfoType = {
    class: string
    id: number
    name: string
    parents: Array<string>
    score: string
    speed: string
    tests: TestType[]
    sortedBy: string
}
export type TestType = {
    absent: boolean
    concept: string
    date: string
    expSpeed: string
    label: string
    score: number
    speed: string
    total: number
}