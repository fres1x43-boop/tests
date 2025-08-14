class TelegramApp {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.initApp();
    }

    initApp() {
        // Растягиваем WebApp на весь экран
        this.tg.expand();
        
        // Настраиваем кнопку "Назад"
        this.setupBackButton();
        
        // Настраиваем обработчики навигации
        this.setupNavigation();
    }

    setupBackButton() {
        this.tg.BackButton.show();
        this.tg.BackButton.onClick(() => {
            this.tg.close();
        });
    }

    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('active')) {
                    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Здесь можно добавить логику переключения страниц
                    if (item.querySelector('.nav-icon').textContent === '👤') {
                        this.tg.showAlert('Переход в профиль будет добавлен в следующем обновлении');
                    }
                }
            });
        });
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new TelegramApp();
});
