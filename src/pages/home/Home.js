import React, { useState, useEffect } from 'react';
import { logout } from '../../api/Firebase';
import CardUser from './UserCard';
import { getMainCharacters } from '../../api/RickMorty';
import './Home.css'

const Home = () => {
  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    try {
      getMainCharacters().then((res) => {
        res.json().then((users) => {
          const data = users
          setallUsers(data)
        })
      })


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button onClick={logout}>Salir</button>
      <div class='container'>
        <h3>Users</h3>
        <div class='row'>

          {
            allUsers.length !== 0 ? allUsers.map((data, i) =>
              <>
                <div class='col-xs-12 col-md-4'>
                  <CardUser data={data} key={i} />
                </div>
              </>
            )
              : null
          }
        </div>

      </div>
    </>
  )
}





export default Home;