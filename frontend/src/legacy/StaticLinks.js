let baseLink = 'http://localhost:8000/'
let linksDict = {
    'default login': baseLink + 'default/login/?',
    'default register': baseLink + 'default/register/?',
    'get profile': baseLink + 'user/get/profile/',
    'get spotify auth': baseLink + 'spotify/register/',
    'get spotify callback': baseLink + 'spotify/callback/?',
    'get spotify tracks': baseLink + 'spotify/tracks/?'
}

function getLink(key){
    if(key in linksDict)
        return linksDict[key]
    else
        throw new Error('There is no link with this key name')
}

export {getLink}
