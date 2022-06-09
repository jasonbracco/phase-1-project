const playerSubmit = document.getElementById("player-search")
const teamSubmit = document.getElementById("team-search")

playerSubmit.addEventListener("submit", handlePlayerSubmit)
teamSubmit.addEventListener("submit", handleTeamSubmit)

let grabPlayers = document.getElementsByClassName("player")
let grabTeams = document.getElementsByClassName('team')

function removePlayers(grabPlayers){
    for(let i=grabPlayers.length-1;i >= 0;i--) {
        grabPlayers[i].remove();
    }
}

function removeTeams(grabTeams){
    for(let i=grabTeams.length-1;i >= 0;i--) {
        grabTeams[i].remove();
    }
}

function handlePlayerSubmit(event){
    event.preventDefault()
    let playerInputText = document.getElementById('player-text').value
    fetchPlayer(playerInputText)
}

function handleTeamSubmit(event){
    event.preventDefault()
    let teamInputText = document.getElementById('team-text').value 
    fetchTeam(teamInputText)
}

function fetchPlayer(playerInputText) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerInputText}&per_page=100`)
    .then(response => response.json())
    .then(playerData => {
        if(playerData.data.length !==0){
        removePlayers(grabPlayers)
        playerData.data.forEach(player => renderPlayer(player)) //each one is an object
        } 
        else{
            removePlayers(grabPlayers)
            alert("No player matches this criteria!  Please enter another search")
        }
    })
}

function fetchTeam(teamInputText) {
    fetch(`https://www.balldontlie.io/api/v1/teams?search`)
    .then(response => response.json())
    .then(teamData => {
        let teamArray = [] //this API does not allow a search by team
        let teamInformation = teamData.data
        teamData.data.forEach(object =>teamArray.push(object.full_name.toUpperCase()))
        renderTeam(teamInputText,teamInformation, teamArray)
    })
}

function renderPlayer(player){
    let playerList = document.getElementById('player-list')
    newPlayer = document.createElement('li')
    newPlayer.className = "player"
    newPlayer.innerHTML =`${player.first_name} ${player.last_name}</li>`
    playerList.appendChild(newPlayer)

}


function renderTeam(teamInputText, teamInformation, teamArray){
    removeTeams(grabTeams)
    let transformedTeamText = teamInputText.toUpperCase()
    let requestedTeam = teamArray.filter(team => team.includes(transformedTeamText))
    if(requestedTeam.length !==0){
        requestedTeam.forEach(element =>{
        let teamList = document.getElementById('team-list')
        newTeam = document.createElement('li')
        newTeam.className = 'team'
        newTeam.innerHTML = `${element}`
        teamList.appendChild(newTeam)
        })
    }
    else{
        alert("No team matches this criteria!  Please enter another search")
        removeTeams(grabTeams)
    }
}







