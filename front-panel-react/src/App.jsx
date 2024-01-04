import './stylesheets/app.scss'
import redishketchLogo from './assets/redishketch-full.png'
function App() {

  return (
    <>
       <div className={'app-name'}>
           <img  className={'bounceIn'} src={redishketchLogo} alt=""/>
       </div>
    </>
  )
}

export default App
