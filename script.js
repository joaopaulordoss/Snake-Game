const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const score = document.getElementById("score");
const rand = () => Math.floor(Math.random() * 15);
let snake = [{ x: 7, y: 7 }];
let dir = { x: 0, y: 0 };
let food = { x: rand(), y: rand() };
let canChangeDirection = true;

setInterval(() => {
    if (dir.x !== 0 || dir.y !== 0) {
        const x = (snake[0].x + dir.x + 15) % 15;
        const y = (snake[0].y + dir.y + 15) % 15;

        if (snake.some((s) => s.x === x && s.y === y)) {
            location.reload();
            return;
        }

        snake.unshift({ x, y });

        if (x === food.x && y === food.y) {
            food = { x: rand(), y: rand() }
        } else {
            snake.pop();
        }
    }
    ctx.clearRect(0, 0, 300, 300);

    [food, ...snake].forEach((c, i) => {
        ctx.fillStyle = i ? "#22c55e" : "#f43f5e";
        ctx.fillRect(c.x * 20, c.y * 20, 18, 18);

    });

    score.textContent = snake.length - 1;
    canChangeDirection = true;
}, 150);

onkeydown = (e) => {
    if (!canChangeDirection) return;
    
    if (e.key === "ArrowUp" && dir.y !== 1) {
        dir = { x: 0, y: -1 }; canChangeDirection = false; 
    }

    if (e.key === "ArrowDown" && dir.y !== -1) {
        dir = { x: 0, y: 1 }; canChangeDirection = false; 
    }
    if (e.key === "ArrowLeft" && dir.x !== 1) {
        dir = { x: -1, y: 0 }; canChangeDirection = false; 
    }
    if (e.key === "ArrowRight" && dir.x !== -1) {
        dir = { x: 1, y: 0 }; canChangeDirection = false; 
    }
};

