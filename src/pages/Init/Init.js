import React from 'react';
import Logo from '../../../src/assets/images/rickpic.png'
import './init.css'

const Init = () => {
    return (
        <>
            <div class="jumbotron">
                <h1 class="display-4">Rick & Morty's BankApp!</h1>
                <hr class="my-4"></hr>
            </div>
                <img src={Logo} class="rounded mx-auto d-block" className='img-init' alt="gif-rick-morty"></img>
        </>
    )

}
export default Init;