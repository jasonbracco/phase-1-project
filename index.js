const playerSubmit = document.getElementById("player-search")
playerSubmit.addEventListener("submit", handlePlayerSubmit)

let grabPlayers = document.getElementsByClassName("player")
let grabTable = document.getElementsByClassName('new-table')

document.addEventListener('keydown', handleRemove)

function handlePlayerSubmit(event){
    event.preventDefault()
    let playerInputText = document.getElementById('player-text').value
    fetchPlayer(playerInputText)
}

function fetchPlayer(playerInputText) {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerInputText}&per_page=100`)
    .then(response => response.json())
    .then(playerData => {
        if(playerData.data.length !==0){
        removePlayers(grabPlayers)
        playerData.data.forEach(player => renderPlayer(player))
        } 
        else{
            removePlayers(grabPlayers)
            alert("No player matches this criteria!  Please enter another search")
        }
    })
}

function renderPlayer(player){
    let playerList = document.getElementById('player-list')
    newPlayer = document.createElement('li')
    newPlayer.addEventListener('click', event =>{
        getStats(player)
    })
    newPlayer.className = "player"
    newPlayer.innerHTML =`${player.first_name} ${player.last_name}`
    playerList.appendChild(newPlayer)
}

function getStats(player){
    fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${player.id}&per_page=100`)
    .then(response => response.json())
    .then(playerStats => {
        renderStats(playerStats)})
}

function renderStats(playerStats){
    let statObject = {
    'Player Name':`${playerStats.data[0].player.first_name} ${playerStats.data[0].player.last_name}`,
    'Total Points': playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.pts}, 0),
    'Total Rebounds': playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.reb}, 0),
    'Total Assists': playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.ast}, 0),
    'Total Blocks': playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.blk}, 0),
    'Total Steals': playerStats.data.reduce(function(acc, gameObject){return acc + gameObject.stl}, 0),
    }
    let grabColumn= document.getElementById("column2")
    newTable = document.createElement('table')
    newTable.className = 'new-table'
    newHead = document.createElement('thead')
    newBody = document.createElement('tbody')
    let row1 = document.createElement('tr')
    let row2 = document.createElement('tr')
    newTable.appendChild(newHead)
    newTable.appendChild(newBody)
    for (key in statObject){
        let th = document.createElement("th")
        let cellText = document.createTextNode(key)
        th.appendChild(cellText);
        row1.appendChild(th);
    }
    newHead.appendChild(row1)
    for (value in statObject) {
        let td = document.createElement("td")
        let cellText = document.createTextNode(statObject[value])
        td.appendChild(cellText)
        row2.appendChild(td);
    }
    newBody.appendChild(row2)
    grabColumn.appendChild(newTable)
}

function removePlayers(grabPlayers){
    for(let i=grabPlayers.length-1;i >= 0;i--) {
        grabPlayers[i].remove();
    }
}

function handleRemove(event){
    if(event.key === 'Backspace')
        for(let i=grabTable.length-1;i >= 0;i--) {
            grabTable[i].remove();
        }
}







