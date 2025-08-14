class UserManager {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.initUser();
    }

    initUser() {
        const user = this.tg.initDataUnsafe?.user;
        const userContainer = document.getElementById('user-container');
        const usernameElement = document.getElementById('username');
        const avatarElement = document.getElementById('user-avatar');

        if (user) {
            // Установка имени пользователя
            usernameElement.textContent = user.first_name || 'Пользователь';
            
            // Установка аватара
            if (user.photo_url) {
                avatarElement.src = user.photo_url;
            } else {
                // Генерация аватара по умолчанию
                this.setDefaultAvatar(user, avatarElement);
            }
            
            // Добавляем ID пользователя в контейнер
            userContainer.dataset.userId = user.id;
        } else {
            // Гостевой режим
            usernameElement.textContent = 'Гость';
            this.setDefaultAvatar({}, avatarElement);
        }
    }

    setDefaultAvatar(user, element) {
        const name = user.first_name || 'G';
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
        const color = colors[name.charCodeAt(0) % colors.length];
        
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Рисуем фон
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем инициалы
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name.charAt(0).toUpperCase(), canvas.width/2, canvas.height/2);
        
        element.src = canvas.toDataURL();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new UserManager();
});
