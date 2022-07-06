import { useEffect, useState } from 'react'
import './styles.css'
import { Card } from '../../components/Card'

export const Home = () => {
  /*  const [count, setCount] = useState(0) */
  const [studentName, setStudentName] = useState('Amanda');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''});

  const handleAddStudent = () => {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString(
        "pt-Br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    // Corpo do useEffect
    /* console.log("Use Effect foi chamado!") */
    fetch('https://api.github.com/users/master-jr')
    .then(res => res.json())
    .then(data => {
      /* console.log(data) */
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <div className="grid">
      <header className="header">
        {/* <h1 className="grid-title">Nome: {studentName}</h1> */}
        <h1 className="title">Lista de Presença</h1>
        <strong>
          {user.name}
        </strong>
        <img src={user.avatar} alt="Foto de Perfil" />
      </header>

      <input
        type="text"
        placeholder="Digite o nome: "
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent} >Adicionar</button>

      {/* <Card name="Leonardo" time="10:55:25" /> */}

      {students.map(student =>
        <Card
          key={student.randomNumber}
          name={student.name}
          time={student.time}
        />)
      }
    </div>
  )
}
