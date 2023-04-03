var Ball, database;
var position;
function setup() {
    database = firebase.database();
    console.log(database);
    createCanvas(500, 500);
    Ball = createSprite(250, 250, 10, 10); //cria o sprite da bola
    Ball.shapeColor = "red"; //dá cor a bola
    var BallPosition = database.ref("bola/posicao"); //pega a referencia do nó posição do banco de dados
    BallPosition.on("value", readPosition, showError); //lê o valor que está em x e y
}
function draw() {
    background("white");
    if (keyDown(LEFT_ARROW)) {
        writePosition(-1, 0);
    } else if (keyDown(RIGHT_ARROW)) {
        writePosition(1, 0);
    } else if (keyDown(UP_ARROW)) {
        writePosition(0, -1);
    } else if (keyDown(DOWN_ARROW)) {
        writePosition(0, +1);
    }    drawSprites();
}
function writePosition(x, y) { //escreve a posição do x e y conforme movimentado
    database.ref("bola/posicao").set({ // set = troca
        x: position.x + x,        y: position.y + y,
    });             }
function readPosition(data) { // lê a posição do banco de dados 
    position = data.val();
    Ball.x = position.x;
    Ball.y = position.y;
}
function showError() {
    console.log("Dados não recebidos do banco de dados");
}
