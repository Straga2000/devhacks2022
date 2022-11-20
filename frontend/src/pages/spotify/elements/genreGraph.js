import React, {Suspense, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import variables from "../../../styling/theme.module.scss";
import ReactECharts from '../../../components/common/chart';

const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

const ageOptionsLight = {
    grid: {
        left: '60px',
        right: '50px',
        top: '10px',
        bottom: '10px',
    },

    xAxis: {
        type: 'value',
        show: false,
        splitLine: {
            show: false,
        },
        boundaryGap: [0, 0.01],
    },
    yAxis: {
        show: true,
        boundaryGap: false,
        type: 'category',
        data: [],
        splitLine: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: 'white',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: variables.Avenir,
            fontSize: 16,
        }
    },
    series: [
        {
            name: 'Age',
            type: 'bar',
            roundCap: true,
            colorBy: "data",
            data: [],
            barWidth: 20,
            barGap: '20%',
            barCategoryGap: '50%',
            label: {
                formatter: '{c}%',
                show: true,
                position: 'outside',
                distance: 4,
                color: 'white',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: variables.Avenir,
                fontSize: 16,
            },
        },
    ]
};

const ageOptionsDark = {
    grid: { containLabel: true },

    xAxis: {
        type: 'value',
        show: false,
        splitLine: {
            show: false,
        },
        boundaryGap: [0, 0.01],
    },
    yAxis: {
        show: true,
        boundaryGap: false,
        type: 'category',
        data: [],
        splitLine: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            color: 'black',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: variables.RobotoRegular,
            fontSize: 16,
        }
    },
    series: [
        {
            name: 'Genres',
            type: 'bar',
            roundCap: true,
            colorBy: "data",
            data: [],
            barWidth: 16,
            barGap: '20%',
            barCategoryGap: '50%',
            label: {
                formatter: '{c}%',
                show: true,
                position: 'outside',
                distance: 4,
                color: 'black',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: variables.RobotoRegular,
                fontSize: 16,
            },
        },
    ]
};

const GenreGraph = (props) => {
    let [width, setWidth] = useState(getWidth());
    const [refreshValues, setRefreshValues] = useState(0);
    const [genreNumber, setGenreNumber] = useState(0);

    useEffect(()=>{
        let genre_range = []
        let genre_values = []
        let genre_labels = []

        if(props.data){
            let counter = 0;
            props.data && Object.keys(props.data).map(function (range) {
                genre_range.push({
                    label: range,
                    value: props.data[range]
                });
                counter += 1;
            });

            genre_range.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));

            if(props.top)
                genre_range = genre_range.slice(genre_range.length - 1 - props.top, genre_range.length - 1)

            console.log('Gender range', genre_range)

            genre_range.map(item => {
                console.log('This is a genre object', item.label, item.value)
                genre_values.push(Math.trunc(item.value))
                genre_labels.push(item.label)
            })

            let ageOptions = props.variant === "dark" ? ageOptionsDark : ageOptionsLight;
            ageOptions['yAxis']['data'] = genre_labels;
            ageOptions['series'][0]['data'] = genre_values;

            setRefreshValues(refreshValues + 1);
            setGenreNumber(props.top ? props.top : counter);
        }
        return () => {
            setGenreNumber(0);
            setRefreshValues(0);
        };
    },[props.data]);

    useEffect(() => {
        // timeoutId for debounce mechanism
        let timeoutId = null;
        const resizeListener = () => {
            // prevent execution of previous setTimeout
            clearTimeout(timeoutId);
            // change width from the state object after 150 milliseconds
            timeoutId = setTimeout(() => setWidth(getWidth()), 30);
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        }
    }, []);

    useEffect(() => {
        setRefreshValues(refreshValues+1);
    }, [width]);

    return props.data ? <Grid container item sx={{minHeight: (genreNumber * 30 + 40) + 'px', maxHeight: "200px"}} alignItems="center">
        <Suspense fallback={<></>}>
            {
                props.variant === "dark" ?
                    <ReactECharts options={ageOptionsDark} refresh={refreshValues}/> :
                    <ReactECharts options={ageOptionsLight} refresh={refreshValues}/>
            }
        </Suspense>
    </Grid> : <Grid container item sx={{height: "50%", minHeight: "100px"}}>
        Loading...
    </Grid>
};

export default GenreGraph;
