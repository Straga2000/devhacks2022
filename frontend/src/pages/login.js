import {Button, Card, Grid, InputBase, InputLabel, TextField} from "@mui/material";
import {ReactComponent as SpotifyLogo} from "../images/spotify/SpotifyLogoNew.svg";
import Page from "../components/common/page";
import { useForm } from "react-hook-form";
import {Alert} from "@mui/lab";
import {loginUser} from "../requests/user";
import {useAuth} from "../utils/auth";

const Login = () => {
    const { register, handleSubmit, getValues, trigger, formState: { isValid, errors } } = useForm({mode: "onBlur"});
    const onSubmit = data => console.log(data);
    const auth = useAuth()

    const verifyFormData = () => {
        trigger().then((data)=>{
            console.log('Is this valid?', isValid)
            if(isValid) {
                loginUser(getValues()).then(response => {
                    console.log('Here is the valid data', response)
                    if(response.data?.token)
                    {
                        console.log('The token was set')
                        auth.setAuth({"token": response.data.token})
                    }
                })
            }
        })
    }

    // console.log(auth.user)
    return <>
        <Page>
            <Grid container item xs={12}>
                <h1>Login page</h1>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={6}>
                    <Card elevation={8}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container item p={1} gap={1} xs={12}>
                                <Grid container item xs={12} flexDirection="column" gap={1}>
                                    {errors.email && <Alert severity="error">The email is required</Alert>}
                                    <TextField id="email"
                                               required
                                               label="email"
                                               type="email"
                                               variant="outlined"
                                               defaultValue=""
                                               placeholder="email@example.com"
                                               error={!!errors.email}
                                               {...register("email", {required: true})}/>
                                </Grid>
                                <Grid container item xs={12} flexDirection="column" gap={1}>
                                    {errors.password && <Alert severity="error">The password is required</Alert>}
                                    <TextField id="password"
                                               required
                                               label="password"
                                               type="password"
                                               variant="outlined"
                                               defaultValue=""
                                               error={!!errors.password}
                                               {...register("password", {required: true})}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit"
                                            color="primary"
                                            variant="contained"
                                            className="media-kit-button"
                                            onClick={verifyFormData}>Send</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={4}/>
            </Grid>

            {/*<Button variant="contained"*/}
            {/*        startIcon={<SpotifyLogo/>}*/}
            {/*/>*/}
        </Page>
    </>
}

export default Login;
