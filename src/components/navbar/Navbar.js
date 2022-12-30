import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/pngwing.com.png'

const Navbar = () => {
  return (
    <>
      <div class="navbar navbar-expand-lg navbar-light bg-light navbar navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">Rick & Morty<span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/home">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;