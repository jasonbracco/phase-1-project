const playerSubmit = document.getElementById("player-search")
const teamSubmit = document.getElementById("team-search")

playerSubmit.addEventListener("submit", handlePlayerSubmit)
teamSubmit.addEventListener("submit", handleTeamSubmit)

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
    .then(playerData => {playerData.data.forEach(player => renderPlayer(player)) //each one is an object
    })
}

function fetchTeam(teamInputText) {
    fetch(`https://www.balldontlie.io/api/v1/teams?search${teamInputText}`)
    .then(response => response.json())
    .then(teamData => {teamData.data.forEach(team => renderTeam(team))
    })
}

function renderPlayer(player){
    let playerList = document.getElementById('player-list')
    newPlayer = document.createElement('li')
    newPlayer.className = 'player'
    newPlayer.id = `${player.id}`
    newPlayer.innerHTML = `
    ${player.first_name} ${player.last_name}
    `
    playerList.appendChild(newPlayer)
}


