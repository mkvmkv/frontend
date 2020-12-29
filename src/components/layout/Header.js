import React from 'react'
import {Link} from 'react-router-dom';
import AuthOptions from "../Auth/AuthOptions";
export default function Header() {
    return (
        <header id="header">
            <Link to="/">MERN AUTH APP</Link>
            <AuthOptions/>
        </header>
    )
}
