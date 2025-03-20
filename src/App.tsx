
import './App.css'
import SearchCommentsComponent from './components/SearchCommentsComponent'
import React from 'react'

function App() {
    React.useEffect(() => {
      console.log("Test: Il componente è stato montato!");
    }, []);

  return (
    <>
    <SearchCommentsComponent />
    </>
  )
}

export default App
