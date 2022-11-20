import {Container} from "@mui/material";
import './page.scss'
import {useEffect} from "react";

const Page = (props) => {
    useEffect(() => {
        document.title = props.title ? 'Reaction - ' + props.title : 'Reaction';
        window.scrollTo(0,0);
    }, [])

    return <Container maxWidth="xl" sx={{p: {xs: 1, sm: 1, md: 1, lg: 2, xl: 2}}}>{props.children}</Container>
}

export default Page;