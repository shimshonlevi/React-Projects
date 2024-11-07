import Counter from "/components/Counter"

interface CounterStore {
  value: number
}

interface User{
  isSignedIn: boolean
}

const incrementByAmount = {
  type: 'INCREMENT',
  payload: 10
}

const decrement = {
  type: 'DECREMENT'
}

const App = () => {
  return (
    <div>
      <h2>Redux Complete Tutoral</h2>
      <Counter />
    </div>
  )
}

export default App