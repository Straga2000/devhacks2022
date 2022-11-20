export const getSpotifyImage = (isMosaic, size, id) => {
    if(isMosaic)
        return 'https://mosaic.scdn.co/' + id;
    return 'https://i.scdn.co/image/'  + id;
}