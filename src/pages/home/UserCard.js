import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './UserCard.css'

const CardUser = (data) => {
    const user = data.data

    return (
        <>
            {user.length !== 0 ?
                <>
                    <div class="card user-Card">
                        <img src={user.image} alt={user.name} class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">{user.name}</h5>
                        </div>

                        <Link class="btn btn-outline-dark" to={{
                            pathname: `/transactions/${user.id}`,
                        }}>view profile</Link>
                    </div>
                </>
                : null}
        </>
    )

}

export default CardUser