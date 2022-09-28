export default function Player(name, marker) {
    const player = {
        name,
        turn: false,
        marker,
        placements: []
    }
    
    return player;
}