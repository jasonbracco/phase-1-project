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
    let playerList = document.getElementById('player-list')
    newPlayer = document.createElement('li')
    newPlayer.className = 'player'
    newPlayer.id = `${player.id}`
    newPlayer.innerHTML = `${player.first_name} ${player.last_name}`
    playerList.appendChild(newPlayer)
}


function renderTeam(teamInputText, teamInformation, teamArray){
    //take the input text and run it through the array
    //if it matches anything in the array, create a list element with that team
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
        setTimeout(function() { alert("No team matches this criteria!  Please enter another search"); }, 3000)
    }
}







