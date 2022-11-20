import logo from './logo.svg';
import './legacy/Styles/App.css';
import {Fragment, useEffect, useState, createContext, useMemo, useContext} from "react";
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'
// import Form from "react-bootstrap/Form";
// import {callAPI, getRequest, makeFormDict} from "./legacy/Helpers/mainHelpers";
// import Login from "./legacy/Components/Login";
// import Register from "./legacy/Components/Register";
// import PrivateRoute from "./legacy/Components/PrivateRoute"
// import {BrowserRouter as Router, Link, Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
// import {UserContext, userDefault} from "./legacy/Config/contexts";
// import Profile from "./legacy/Components/Profile";
// import Error from "./legacy/Components/Error"
// import Spotify from "./legacy/Components/Spotify"
// import {Container, Nav, Navbar} from "react-bootstrap";
// import './legacy/Styles/Utils.css'

function App() {

    const [user, setUser] = useState(userDefault)
    const userValue = useMemo(() => ({user, setUser}), [user, setUser])
    const [routes, setRoutes] = useState({'/': <Login/>, '/login': <Login/>, '/register': <Register/>, '/*': <Error/>, '/spotify/*': <Spotify/>})

    useEffect(() => {

        let provideUser = JSON.parse(localStorage.getItem('userObject'))

        if (!user.isLoggedIn)
        {
            if(provideUser)
                setUser(provideUser)
            else
                console.log('This case is the first time on the app')
                /// we could add session here
        }
        else
        {
            // if (!provideUser)
            localStorage.setItem('userObject', JSON.stringify(user))

            setRoutes((prevRoutes) => {
                let newRoutes = {...prevRoutes}
                newRoutes['/profile'] = <Profile/>
                return newRoutes
            })
        }

    }, [])

        return (
        <div>
            {/*<div>*/}
            {/*    {Object.keys(routes).map(key =>*/}
            {/*        <p>{key}</p>)*/}
            {/*    }*/}
            {/*</div>*/}
            <UserContext.Provider value={userValue}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light pl-4">
                    <a className="navbar-brand" href="/login">Reaction</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {Object.keys(routes).map(key =>
                                {
                                    let name = key.split('/')[1]
                                    if (name === "")
                                        return null
                                    else {
                                        name = name[0].toUpperCase() + name.substring(1);
                                        return key !== '/*' && key !== '/' &&
                                            <li className="nav-item" key={key}>
                                                <a className="nav-link" href={key}>{name}</a>
                                            </li>
                                    }
                                })
                            }
                        </ul>
                    </div>
                </nav>
                <Router>
                    <Routes children={
                        Object.keys(routes).map(key => {
                                    return (<Route key={key} path={key} element={routes[key]}/>)
                        })
                    }/>
                </Router>
            </UserContext.Provider>

        </div>

    );
}

export {App, };
