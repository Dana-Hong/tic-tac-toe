export default function Square(id) {
    const square = document.createElement('button');
    square.classList.add('square');
    square.id = id;
    document.body.append(square);
    return square;
}
