import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, getAccountBalance, updateBankAccount } from '../../api/Firebase';
import { getCharacterById } from '../../api/RickMorty';
import './Transactions.css'

const Transactions = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getUser()
    getAccountBalance(id)
  }, [])



  const getUser = async () => {
    try {
      await getCharacterById(id).then((res) => {
        res.json().then((user) => {
          const data = user
          console.log(data);
          setUser(data)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }



  const getAccountBalance = async (user_id) => {
    const colRef = collection(db, 'bankAccount')
    const q = query(colRef, where('userApp_id', '==', parseInt(user_id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const balance = doc.data()
      console.log(balance);

    });
  }



  return (
    <>
      <div class='container dimensions'>
        <div class='row'>
          <h1> Let's move money!</h1>
        </div>
        <div class='row'>
          <div class='col-xs-12 col-md-6'>
          <form>
          <div class="form-group">
            <h3>Send transaction</h3>
            <label for="exampleFormControlInput1">Amount of money</label>
            <input type="number" class="form-control" placeholder="introduce amount of money" />
          </div>
          <div class="form-group">
            <label>Select the person</label>
            <select class="form-control">
              <option>Rick</option>
              <option>Morty</option>
              <option>Beth</option>
              <option>Summer</option>
              <option>Jerry</option>
            </select>
            <button class="btn btn-outline-dark dimensions-button">Send</button>
          </div>
        </form>
        <form className=' dimensions-foms'>
          <div class="form-group">
            <h3>Deposit money</h3>
            <label for="exampleFormControlInput1">Amount of money</label>
            <input type="number" class="form-control" placeholder="introduce amount of money" />
          </div>
          <div class="form-group">
            <button class="btn btn-outline-dark dimensions-button">Send</button>
          </div>
        </form>
          </div>
          <div class='col-xs-12 col-md-6'>
            <div class="card dimension-card">
              <img src={user.image} alt={user.name} class="card-img-top img-profile" />
              <div class="card-body">
                <h5 class="card-title">{user.name}</h5>
                <p class="card-text">{user.gender}</p>
                <p class="card-text">{user.species}</p>
                <p class="card-text">{user.status}</p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}

export default Transactions;