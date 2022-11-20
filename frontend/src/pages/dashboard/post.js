import {Grid} from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import "./post.scss";

const Post = (props) => {
    const [expanded, setExpanded] = useState(false)

    const handleCardExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid container item className="post-wrapper" sx={{backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("+ props.image +")", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
            <div className="post-details">
                <div className="line">
                    <Avatar sx={{ backgroundColor: red[500] }} aria-label="recipe">R</Avatar>
                    <div>
                        <p>Shrimp and Chorizo Paella</p>
                        <p>September 14, 2016</p>
                    </div>
                </div>
                <div className="line">

                </div>
            </div>
            <img src={props.image} alt="post image" className="post-image"/>
        </Grid>
    );
}

export default Post;


// <Card sx={{ maxWidth: 345 }}>
//     <CardHeader
//         avatar={
//             <Avatar sx={{ backgroundColor: red[500] }} aria-label="recipe">
//                 R
//             </Avatar>
//         }
//         action={
//             <IconButton aria-label="settings">
//                 <MoreVertIcon />
//             </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//     />
//     <Grid sx={{backgroundImage: " linear-gradient(to bottom, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.73)), url(https://picsum.photos/200/300)", backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
//         <CardMedia
//             component="img"
//             height="250px"
//             image="https://picsum.photos/200/300"
//             alt="Random image"
//             sx={{objectFit: "contain"}}
//         />
//     </Grid>
//     <CardContent>
//         <Typography variant="body2" color="text.secondary">
//             This impressive paella is a perfect party dish and a fun meal to cook
//             together with your guests. Add 1 cup of frozen peas along with the mussels,
//             if you like.
//         </Typography>
//     </CardContent>
//     <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//             <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//             <ShareIcon />
//         </IconButton>
//         <IconButton
//             expand={expanded}
//             onClick={handleCardExpansion}
//             aria-expanded={expanded}
//             aria-label="show more"
//         >
//             <ExpandMoreIcon />
//         </IconButton>
//     </CardActions>
//     <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//             <Typography paragraph>Method:</Typography>
//             <Typography paragraph>
//                 Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
//                 aside for 10 minutes.
//             </Typography>
//             <Typography paragraph>
//                 Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
//                 medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
//                 occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
//                 large plate and set aside, leaving chicken and chorizo in the pan. Add
//                 pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
//                 stirring often until thickened and fragrant, about 10 minutes. Add
//                 saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//             </Typography>
//             <Typography paragraph>
//                 Add rice and stir very gently to distribute. Top with artichokes and
//                 peppers, and cook without stirring, until most of the liquid is absorbed,
//                 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
//                 mussels, tucking them down into the rice, and cook again without
//                 stirring, until mussels have opened and rice is just tender, 5 to 7
//                 minutes more. (Discard any mussels that don&apos;t open.)
//             </Typography>
//             <Typography>
//                 Set aside off of the heat to let rest for 10 minutes, and then serve.
//             </Typography>
//         </CardContent>
//     </Collapse>
// </Card>