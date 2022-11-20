import Page from "../../components/common/page";
import {Grid} from "@mui/material";
import Post from "./post";

const Dashboard = (props) => {
    return (<>
        <Page>
            <Grid item xs={12}>
                <Post image={"https://picsum.photos/800/500"}/>
            </Grid>
        </Page>
    </>);
}

export default Dashboard;