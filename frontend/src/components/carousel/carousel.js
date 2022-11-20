import {useSpringCarousel} from "react-spring-carousel";
import {useState, useEffect} from "react";
import {Grid, IconButton} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./carousel.scss"

const GenericCarousel = ({hasControls, hasFeatured, hasLoop, itemsPerSlide, innerProps, items, slideShowTime, buttonProps, centered}) => {

    if(hasFeatured && itemsPerSlide % 2 === 0)
        throw Error('A carousel with featured element can\'t have an even number of items');

    if(!itemsPerSlide)
        itemsPerSlide = hasFeatured ? 3 : 2;

    console.log('Items per slide is', itemsPerSlide)
    const {slideToNextItem, slideToPrevItem, carouselFragment, useListenToCustomEvent} = useSpringCarousel({
        itemsPerSlide: itemsPerSlide,
        withLoop: hasLoop ?? false,
        enableFreeScrollDrag: true,
        gutter: 16,
        initialStartingPosition: "center",
        initialActiveItem: Math.trunc(items.length / 2 + 1),
        items: items.map((child, index)=> ({
            id: index,
            renderItem: child,
        })),
        ...innerProps,
    })

    useEffect(() => {
        // TODO on hover just make the slideshow stop
        if(slideShowTime)
        {
            const timer = setInterval(() => {
                slideToNextItem();
            }, slideShowTime);

            return () => {
                window.clearInterval(timer);
            };
        }

    }, [slideToNextItem]);

    return (
        <Grid item container xs={12} className={"default-carousel" + (centered ? " centered-carousel" : "")}>
                    {hasControls &&
                    <Grid container item xs={1} className="button-wrapper">
                        <Grid item>
                            <IconButton variant="contained" color="primary" onClick={slideToPrevItem} {...buttonProps}>
                                <ChevronLeftIcon width="90%"/>
                            </IconButton>
                        </Grid>
                    </Grid>}
                    <Grid item xs={hasControls ? 10 : 12} sx={{overflowX: "hidden"}}>
                        {carouselFragment}
                    </Grid>
                    {hasControls &&
                    <Grid container item xs={1} className="button-wrapper">
                        <Grid item>
                            <IconButton variant="contained" color="primary" onClick={slideToNextItem} {...buttonProps}>
                                <ChevronRightIcon width="90%"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    }
        </Grid>);
}

export default GenericCarousel;