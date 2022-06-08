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
    console.log(teamInputText)
}




