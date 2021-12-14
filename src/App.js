import './App.css';
import { getBoard, solve, grade, validate } from './js/helpers'
import { useEffect, useState } from 'react';
import { logo, base, ssj, ssb2, ssg } from './images'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null).map((u, i) => Array(9).fill(null)))
  const [gradeResult, setGrade] = useState('medium')
  const [validateResult, setValidate] = useState('unsolved')

  function source() {
    if (gradeResult === 'easy') {
      return ssj;
    } else if (gradeResult === 'medium') {
      return ssg;
    } else if (gradeResult === 'hard') {
      return ssb2
    } else {
      return base;
    }
  }
  function generateByDifficulty(difficulty) {
    if (difficulty) {
      getBoard(difficulty, (x) => { setBoard(x); setGrade(difficulty) })
    }
    else {
      getBoard(null, (x, y) => { setBoard(x); setGrade(y) })
    }
    setValidate('unsolved')
  }

  useEffect(() => getBoard("medium", setBoard), [])

  return (
    <div className="App">
      <div className='goku'>
        <img src={source()} width={500} />
      </div>
      <div className='main'>
        <h1>SuG<span><img src={logo} height={50} style={{
          position: 'relative',
          top: 14
        }} /></span>KU</h1>
        <div className='row'>
          <div className="board">
            {board?.map((d, i) =>
              d?.map((e, j) =>
                <input
                  className={"board-item " + ((i === 0) ? "border-top " : "") + ((j === 0) ? "border-left " : "") + (((i + 1) % 3 === 0) ? "border-bottom-thick" : "")}
                  value={e}
                  onChange={({ target }) => {
                    let copyBoard = board.map(d => d);
                    copyBoard[i][j] = parseInt(target.value)
                    setBoard(copyBoard)
                  }}
                />)
            )}
          </div>
        </div>
        <div className='row'>
          <button onClick={() => generateByDifficulty('easy')} className='easyButton'>Easy</button>
          <button onClick={() => generateByDifficulty('medium')} className='mediumButton'>Medium</button>
          <button onClick={() => generateByDifficulty('hard')} className='hardButton'>Hard</button>
          <button onClick={() => generateByDifficulty(null)} className='randomButton'>Random</button>
          <button onClick={() => { setBoard(Array(9).fill(null).map((u, i) => Array(9).fill(0))); setGrade(''); setValidate('') }} className='clearButton'>Clear</button>
        </div>
        <div className='row inputRow'>
          <button onClick={() => grade(board, setGrade)} className='gradeButton'>Grade</button><input value={gradeResult} />
          <input value={validateResult} /><button onClick={() => validate(board, setValidate)}>Validate</button>
        </div>
        <div className='row'>
          <button onClick={() => solve(board, setBoard)} className="solveButton">Solve</button>
        </div>
      </div>
    </div>
  );
}

export default App;
