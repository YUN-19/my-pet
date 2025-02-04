// 初始化宠物状态（从本地存储读取或创建默认值）
let petState = JSON.parse(localStorage.getItem('petState')) || {
    hunger: 100,
    mood: 100,
    health: 100,
    level: 1
};

// 更新界面显示
function updateUI() {
    document.getElementById('hunger').textContent = petState.hunger;
    document.getElementById('mood').textContent = petState.mood;
    document.getElementById('health').textContent = petState.health;
}

// 喂食功能
function feed() {
    if (petState.hunger < 100) {
        petState.hunger += 10;
        petState.health = Math.min(petState.health + 5, 100);
        saveState();
    }
}

// 清洁功能
function clean() {
    petState.health = Math.min(petState.health + 15, 100);
    saveState();
}

// 玩耍功能
function play() {
    if (petState.mood < 100) {
        petState.mood += 20;
        petState.hunger = Math.max(petState.hunger - 5, 0);
        saveState();
    }
}

// 保存状态到本地存储
function saveState() {
    localStorage.setItem('petState', JSON.stringify(petState));
    updateUI();
}

// 每10秒自动减少状态（模拟时间流逝）
setInterval(() => {
    petState.hunger = Math.max(petState.hunger - 2, 0);
    petState.mood = Math.max(petState.mood - 1, 0);
    if (petState.hunger < 30 || petState.mood < 30) {
        petState.health = Math.max(petState.health - 3, 0);
    }
    saveState();
}, 10000);

// 初始化界面
updateUI();