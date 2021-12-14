import api from './api'

// Helper functions from the api docs for converting board to formData because the api doesn't support JSON.
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');


export async function getBoard(difficulty = 'medium', saveBoard = console.log) {
    let res = null
    if(!difficulty){
        difficulty = ['easy', 'medium','hard'][Math.floor(Math.random()*3)]
        await api.get('/board?difficulty=' + difficulty).then(
            (response) => {
                saveBoard(response.data.board, difficulty);
            }
        );
        return
    }
    await api.get('/board?difficulty=' + difficulty).then(
        (response) => {
            saveBoard(response.data.board);
        }
    );
}
export function solve(board, saveBoard = console.log) {
    api.post('/solve', encodeParams({board: board})).then((response) => {
        saveBoard(response.data.solution)
    })
}
export function grade(board, saveGrade = console.log) {
    api.post('/grade', encodeParams({board: board})).then((response) => {
        saveGrade(response.data.difficulty)
    })
}
export function validate(board, saveValidate = console.log) {
    api.post('/validate', encodeParams({board: board})).then((response) => {
        saveValidate(response.data.status)
    })
}
