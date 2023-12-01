import React, { useState } from 'react'

export default function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>
            <form className="d-flex" role="search" onSubmit={searchMovies}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchKey(e.target.value)}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
  )
}
