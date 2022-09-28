function Square(selected=false, position) {
    const square = {
        selected,
        placeMarker: () => {this.selected = true},
        position
    }
    
    return square;
}

export default Square();