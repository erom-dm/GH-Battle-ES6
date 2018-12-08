let axios = require('axios');
let id = "YOUR_CLIENT_ID";
let sec = "YOUR_SECRET_ID";
let params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username){
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then((user) => user.data);
}

function getRepos(username){
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount({data}){
    return data.reduce((count,{stargazers_count}) => count + stargazers_count, 0);
}

function calculateScore({followers}, repos){
    return (followers * 3) + getStarCount(repos);
}

function handleError (error){
    console.warn(error);
    return null;
}

function getUserData (player){
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        let profile = data[0];
        let repos = data[1];

        return{
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

function sortPlayers(players){
    return players.sort((a,b) => b.score - a.score);
}


module.exports = {

    battle: function (players){
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos: function (language) {
        let encodeURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

        return axios.get(encodeURI)
            .then(function (response) {
                return response.data.items;
            });
    }
};
