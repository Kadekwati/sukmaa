const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let basket = { x: 175, y: 350, width: 50, height: 20 };
let fruits = [];
let score = 0;
let gameInterval;
const appleImage = new Image();
appleImage.src = 'appel.png'; // Pastikan nama file sesuai dengan gambar yang Anda simpan

function startGame() {
    score = 0;
    fruits = [];
    document.getElementById("score").innerText = "Skor: " + score;

    if (gameInterval) clearInterval(gameInterval);
    
    gameInterval = setInterval(updateGame, 100);
    spawnFruit();
}

function spawnFruit() {
    const fruitX = Math.floor(Math.random() * (canvas.width - 30));
    fruits.push({ x: fruitX, y: 0, width: 30, height: 30 });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas

    // Gambar keranjang
    ctx.fillStyle = "brown";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Gambar buah
    for (let i = 0; i < fruits.length; i++) {
        ctx.drawImage(appleImage, fruits[i].x, fruits[i].y, fruits[i].width, fruits[i].height); // Menggunakan gambar apel
        fruits[i].y += 5; // Buah jatuh ke bawah

        // Cek tabrakan dengan keranjang
        if (fruits[i].y + fruits[i].height >= basket.y && 
            fruits[i].x + fruits[i].width >= basket.x && 
            fruits[i].x <= basket.x + basket.width) {
            score++;
            document.getElementById("score").innerText = "Skor: " + score;
            fruits.splice(i, 1); // Hapus buah yang ditangkap
            i--; // Sesuaikan indeks setelah penghapusan
        }

        // Cek jika buah jatuh ke bawah tanpa ditangkap
        if (fruits[i].y > canvas.height) {
            clearInterval(gameInterval);
            alert("Game Over! Skor akhir Anda adalah " + score);
            return;
        }
    }

    // Spawn buah baru setiap beberapa detik
    if (Math.random() < 0.05) {
        spawnFruit();
    }
}

// Kontrol keranjang dengan mouse
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    
    if (mouseX > 0 && mouseX < canvas.width) {
        basket.x = mouseX - basket.width / 2; // Pindahkan keranjang mengikuti mouse
    }
});

document.getElementById("startButton").addEventListener("click", startGame);
