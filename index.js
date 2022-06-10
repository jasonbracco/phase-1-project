const playerSubmit = document.getElementById("player-search")
const teamSubmit = document.getElementById("team-search")

let grabPlayers = document.getElementsByClassName("player")
let grabTeams = document.getElementsByClassName('team')
let grabButton = document.querySelector('button')

playerSubmit.addEventListener("submit", handlePlayerSubmit)
teamSubmit.addEventListener("submit", handleTeamSubmit)
grabButton.addEventListener('click', handleRemove)

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

function handleRemove(event){
    event.preventDefault()
    console.log(document.getElementsByClassName('table'))

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
        teamData.data.forEach(object =>teamArray.push(object.full_name.toUpperCase()))
        renderTeam(teamInputText, teamArray)
    })
}

function renderPlayer(player){
    let playerList = document.getElementById('player-list')
    newPlayer = document.createElement('li')
    newPlayer.addEventListener('click', event =>{
        getStats(player)
    })
    newPlayer.className = "player"
    newPlayer.innerHTML =`${player.first_name} ${player.last_name}</li>`
    playerList.appendChild(newPlayer)
}


function renderTeam(teamInputText, teamArray){
    removeTeams(grabTeams)
    let transformedTeamText = teamInputText.toUpperCase()
    let requestedTeam = teamArray.filter(team => team.includes(transformedTeamText))
    if(requestedTeam.length !==0){
        requestedTeam.forEach(element =>{
        let teamList = document.getElementById('team-list')
        newTeam = document.createElement('li')
        newTeam.className = 'team'
        newTeam.innerHTML = `
        ${element}
        `
        teamList.appendChild(newTeam)
        })
    }
    else{
        alert("No team matches this criteria!  Please enter another search")
        removeTeams(grabTeams)
    }
}

function getStats(player){
    fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${player.id}&per_page=100`)
    .then(response => response.json())
    .then(playerStats => {
        renderStats(playerStats)})
}

function renderStats(playerStats){
    let totalPoints = playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.pts}, 0)
    let totalRebounds = playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.reb}, 0)
    let totalAssists = playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.ast}, 0)
    let totalBlocks = playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.blk}, 0)
    let totalSteals = playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.stl}, 0)
    let statTable = document.getElementById("column2")
    newTable = document.createElement('table')
    newTable.className = 'table'
    newHead = document.createElement('thead')
    newBody = document.createElement('tbody')
    newTable.appendChild(newHead)
    newTable.appendChild(newBody)
    statTable.appendChild(newTable)
    let row1 = document.createElement('tr')
    let heading1 = document.createElement('th')
    // heading1.innerHTML = `${playerStats.data[0].player.first_name} ${playerStats.data[0].player.last_name}`
    heading1.innerHTML = 'Player Name'
    let heading2 = document.createElement('th')
    heading2.innerHTML = 'Points'
    let heading3 = document.createElement('th')
    heading3.innerHTML = 'Rebounds'
    let heading4 = document.createElement('th')
    heading4.innerHTML = 'Assists'
    let heading5 = document.createElement('th')
    heading5.innerHTML = 'Blocks'
    let heading6 = document.createElement('th')
    heading6.innerHTML = 'Steals'
    row1.appendChild(heading1)
    row1.appendChild(heading2)
    row1.appendChild(heading3)
    row1.appendChild(heading4)
    row1.appendChild(heading5)
    row1.appendChild(heading6)
    newHead.appendChild(row1);
    let row2 = document.createElement('tr')
    let row2data1 = document.createElement('td')
    row2data1.innerHTML = `${playerStats.data[0].player.first_name} ${playerStats.data[0].player.last_name}`
    let row2data2 = document.createElement('td')
    row2data2.innerHTML = `${totalPoints}`
    let row2data3 = document.createElement('td')
    row2data3.innerHTML = `${totalRebounds}`
    let row2data4 = document.createElement('td')
    row2data4.innerHTML = `${totalAssists}`
    let row2data5 = document.createElement('td')
    row2data5.innerHTML = `${totalBlocks}`
    let row2data6 = document.createElement('td')
    row2data6.innerHTML = `${totalSteals}`
    row2.appendChild(row2data1)
    row2.appendChild(row2data2)
    row2.appendChild(row2data3)
    row2.appendChild(row2data4)
    row2.appendChild(row2data5)
    row2.appendChild(row2data6)
    newBody.appendChild(row2)
}






