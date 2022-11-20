import {createContext, useContext} from "react";
import {getRequest} from "../Helpers/mainHelpers";

let userObject = localStorage.getItem('userObject')

export const userDefault = userObject !== undefined && userObject !== null? JSON.parse(userObject): {
    isLoggedIn: false,
}

export const UserContext = createContext(userDefault);

export const AudioContext = createContext({"ended": true, "playing": false, "link": null})