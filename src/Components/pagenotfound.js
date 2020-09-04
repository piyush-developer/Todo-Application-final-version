import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class pagenotfound extends Component {
    render() {
        return (
            <div>
            <Link to="/">
             <h3>Go To Login</h3>
            </Link>
                <h1 style={{ color: 'black',textAlign:'center' }}>Page Not Found</h1>
            </div>
        )
    }
}

export default pagenotfound
