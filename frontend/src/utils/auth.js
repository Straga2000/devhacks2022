import {createContext, useContext, useEffect, useState} from "react";
import {getCookie, removeCookie, setCookie} from "./cookies";
import {useLocation, useNavigate} from "react-router-dom";


export const UserContext = createContext(null)
export const useAuth = () => {
    return useContext(UserContext)
};

export const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserInfo().then(r => {
            console.log(r)
        })
    }, [])

    const setUserInfo = (data) => {
        setUser(data)
        setCookie('user', JSON.stringify(data), 12);
    }

    const getUserInfo = async () => {
        if(!user)
        {
            let userInfo = getCookie('user')
            if(userInfo !== '')
                setUser(JSON.parse(userInfo))
            return userInfo;
        }
    };

    const removeUserInfo = () => {
        setUser(null)
        removeCookie('user');
    };

    const value = {
        user: user,
        setAuth: setUserInfo,
        getAuth: getUserInfo,
        removeAuth: removeUserInfo,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};