import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import "./Aluno.css"

function Aluno() {
    return (
     <div className='containerAluno'>
        <Header/>
        <Sidebar/>
     </div>
    );
  }

  export default Aluno;