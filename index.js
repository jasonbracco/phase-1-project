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

function fetchPlayer(playerInputText) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerInputText}`)
    .then(response => response.json())
    .then(playerData => {
        console.log(playerData.data[0].first_name)
        console.log(playerData.data[0].last_name)
    })
}


