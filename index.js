const playerSubmit = document.getElementById("player-search")
const teamSubmit = document.getElementById("team-search")

playerSubmit.addEventListener("submit", handlePlayerSubmit)
teamSubmit.addEventListener("submit", handleTeamSubmit)

let playerList = document.getElementById('player-list')
let grabPlayers = document.getElementsByClassName("player")

function handlePlayerSubmit(event){
    event.preventDefault()
    let playerInputText = document.getElementById('player-text').value
    fetchPlayer(playerInputText)
}

function handleTeamSubmit(event){
    event.preventDefault()
    let teamInputText = document.getElementByClassName('team-text').value 
    fetchTeam(teamInputText)
}

function fetchPlayer(playerInputText) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerInputText}&per_page=100`)
    .then(response => response.json())
    .then(playerData => {
        if(playerData.data.length !==0){
            console.log(grabPlayers)
        for(let i=grabPlayers.length-1;i >= 0;i--) {
            grabPlayers[i].remove();
        }
        playerData.data.forEach(player => renderPlayer(player)) //each one is an object
        } 
        else{
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
        console.log(teamArray)
    })
}

function renderPlayer(player){
    newPlayer = document.createElement('li')
    newPlayer.className = "player"
    newPlayer.innerHTML =`${player.first_name} ${player.last_name}</li>`
    playerList.appendChild(newPlayer)

}


function renderTeam(teamInputText, teamInformation, teamArray){
    console.log(teamInformation)
    let transformedTeamText = teamInputText.toUpperCase()
    let requestedTeam = teamArray.filter(team => team.includes(transformedTeamText))
    console.log(requestedTeam)
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
    }
}







