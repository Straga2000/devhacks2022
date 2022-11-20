import {useMemo, useState} from "react";
import {userDefault} from "./contexts";


function Provider()
{
    const [user, setUser] = useState(userDefault)
    const userValue = useMemo(() => ({user, setUser}), [user, setUser])

}