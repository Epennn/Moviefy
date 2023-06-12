// Media Queries

function changeRowtoCol(width) {
    if(width.matches) {
        document.getElementById("changeDir").classList.remove('row');
        document.getElementById("changeDir").classList.add('col');
        console.log('rowtocol');
    } else {
        document.getElementById("changeDir").classList.remove('col');
        document.getElementById("changeDir").classList.add('row');
        console.log('coltorow');
    }
}

function changeRowtoCol2(width) {
    if(width.matches) {
        document.getElementById("changeDir2").classList.remove('row');
        document.getElementById("changeDir2").classList.add('col');
        console.log('rowtocol');
    } else {
        document.getElementById("changeDir2").classList.remove('col');
        document.getElementById("changeDir2").classList.add('row');
        console.log('coltorow');
    }
}