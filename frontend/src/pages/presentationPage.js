import Page from "../components/common/page";
import {useEffect, useMemo, useState} from "react";
import {Button, Collapse, Grid, IconButton, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {loginUser} from "../requests/user";
import "./presentationPage.scss";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const PresentationPage = () => {

    const { register, handleSubmit, getValues, trigger, formState: { isValid, errors } } = useForm({mode: "onBlur"});
    const onSubmit = data => console.log(data);

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


    const handleSpeechInput = () => {
        const command = transcript.split(' ')[0];
        const content = transcript.split(' ').splice(1, transcript.length).join(' ')

        if(command === 'search')
        {
            setSearchBarOpened(true);
            return 'Searching for: ' + content;
        }
        if(command === 'stop')
        {
            toggleSpeechRecognition();
            return 'Close voice!';
        }

        return 'Command not found';
    }

    const [speechStatus, setSpeechStatus] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [recognition, setRecognition] = useState(() => {return (new SpeechRecognition());})
    const [searchBarOpened, setSearchBarOpened] = useState(false)
    const inputHandler = useMemo(() => handleSpeechInput(), [transcript])

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



    const toggleSpeechRecognition = () => {
        const recogn = new SpeechRecognition()
        recogn.interimResults = true;

        recogn.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('').toLowerCase()
            setTranscript(transcript)
        });

        if(!speechStatus)
        {
            recogn.start();
        }
        else {
            recogn.addEventListener('end', recogn.start);
        }

        setSpeechStatus((ant) => {return (!ant)});
    }

    const toggleSearchBar = () => {
        setSearchBarOpened((ant) => {return (!ant);})
    }

    return (<>
        <Page>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container item xs={12} gap={1} p={1}>
                    <Grid container item xs={12} className={"row-styled-elem search_bar_container" + (searchBarOpened ? " opened" : "")}>
                        <Grid item xs={8} sx={{display: "flex"}}>
                            <IconButton onClick={toggleSearchBar}>
                                <SearchIcon/>
                            </IconButton>
                            <TextField id="search_bar"
                                       className="text_container"
                                       required
                                       type="text"
                                       variant="standard"
                                       defaultValue=""
                                       placeholder="Find anything..."
                                       {...register("search")}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} className="row-styled-elem">
                        <Grid item xs={8} className="card_styled">
                            <h3>Press button to activate vocal commands:</h3>
                            <ul>
                                <li>"Search" - find the product</li>
                                <li>"Next" - shows next item in search</li>
                                <li>"Previous" - shows previous item in search</li>
                                <li>"Open" - opens item in search</li>
                                <li>"Order" - order</li>
                                <li>"Stop" - turn off vocal commands</li>
                            </ul>
                            <Button variant="contained"
                                    onClick={toggleSpeechRecognition}
                                    sx={{float: "right"}}
                                    endIcon={<KeyboardVoiceIcon/>}
                            > {speechStatus ? "Listening..." : "Speak"}</Button>
                        </Grid>

                    </Grid>

                    <p>Here is the transcript: {inputHandler} </p>




                </Grid>
                <Grid item xs={12}>
                    {/*<Button type="submit"*/}
                    {/*        color="primary"*/}
                    {/*        variant="contained"*/}
                    {/*        onClick={verifyFormData}>Send</Button>*/}
                </Grid>
            </form>
        </Page>
    </>);
}

export default PresentationPage;