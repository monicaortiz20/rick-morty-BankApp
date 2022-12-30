const apiUrl = process.env.REACT_APP_rickmortyapi

export async function getMainCharacters() {
    return fetch(`${apiUrl}/character/1,2,3,4,5`)
}

export async function getCharacterById(id) {
    console.log(id);
    return fetch(`${apiUrl}/character/${id}`)
}


