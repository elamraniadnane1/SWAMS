// notifications.js

// Notification System with Voice Support
class NotificationSystem {
    static instance = null;

    constructor() {
        if (NotificationSystem.instance) {
            return NotificationSystem.instance;
        }

        this.notifications = [];
        this.voiceEnabled = false;
        this.currentLanguage = 'en';
        this.translations = {
            en: {
                threshold_exceeded: 'Water consumption exceeded at',
                task_assigned: 'New task assigned',
                maintenance_reminder: 'Maintenance due for',
                weather_alert: 'Weather alert'
            },
            fr: {
                threshold_exceeded: 'Consommation d\'eau dépassée à',
                task_assigned: 'Nouvelle tâche assignée',
                maintenance_reminder: 'Maintenance prévue pour',
                weather_alert: 'Alerte météo'
            },
            es: {
                threshold_exceeded: 'Consumo de agua excedido en',
                task_assigned: 'Nueva tarea asignada',
                maintenance_reminder: 'Mantenimiento debido para',
                weather_alert: 'Alerta meteorológica'
            },
            ar: {
                threshold_exceeded: 'تجاوز استهلاك المياه في',
                task_assigned: 'تم تعيين مهمة جديدة',
                maintenance_reminder: 'موعد الصيانة',
                weather_alert: 'تنبيه الطقس'
            }
        };

        this.initialize();
        NotificationSystem.instance = this;
    }

    initialize() {
        // Request notification permissions
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        // Set up notification display
        this.notificationElement = document.getElementById('notifications');
        this.notificationCount = document.getElementById('notificationCount');

        // Create notification panel
        this.createNotificationPanel();
        this.setupEventListeners();

        // Load voice preference from local storage
        const voicePref = localStorage.getItem('voiceNotificationsEnabled');
        this.voiceEnabled = voicePref === 'true';
        const voiceButton = document.getElementById('voiceNotifications');
        if (this.voiceEnabled) {
            voiceButton.classList.add('active');
        }
    }

    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.className = 'notifications-dropdown';
        panel.innerHTML = `
            <ul id="notificationItems">
                <li>No notifications</li>
            </ul>
            <button id="clearNotifications" class="btn btn-secondary">Clear All</button>
        `;
        this.notificationElement.appendChild(panel);
        this.notificationPanel = panel;
        this.notificationList = panel.querySelector('#notificationItems');

        // Hide panel initially
        this.notificationPanel.style.display = 'none';
    }

    setupEventListeners() {
        // Toggle notification panel
        this.notificationElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleNotificationPanel();
        });

        // Close notification panel when clicking outside
        document.addEventListener('click', () => {
            this.notificationPanel.style.display = 'none';
        });

        // Clear all notifications
        const clearButton = this.notificationPanel.querySelector('#clearNotifications');
        clearButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clearAllNotifications();
        });
    }

    toggleNotificationPanel() {
        if (this.notificationPanel.style.display === 'none') {
            this.notificationPanel.style.display = 'block';
        } else {
            this.notificationPanel.style.display = 'none';
        }
    }

    addNotification(notification) {
        // Add timestamp if not present
        notification.timestamp = notification.timestamp || new Date().toISOString();

        // Add to notifications array
        this.notifications.unshift(notification);

        // Update display
        this.updateNotificationCount();
        this.addNotificationToPanel(notification);

        // Show system notification
        this.showSystemNotification(notification);

        // Speak notification if voice is enabled
        if (this.voiceEnabled) {
            this.speakNotification(notification);
        }
    }

    addNotificationToPanel(notification) {
        // Remove "No notifications" message if present
        const noNotificationsItem = this.notificationList.querySelector('li');
        if (noNotificationsItem && this.notifications.length === 1) {
            noNotificationsItem.remove();
        }

        const li = document.createElement('li');
        li.className = 'notification-item';

        const message = this.translations[this.currentLanguage][notification.type] || 'Notification';
        li.innerHTML = `
            <div class="notification-message">
                <strong>${message}</strong>: ${notification.message}
            </div>
            <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
        `;

        // Add click event to handle notification action
        li.addEventListener('click', () => {
            // Handle notification click action
            alert(`Notification clicked: ${notification.message}`);
            // Optionally remove notification after action
            this.removeNotification(notification);
            li.remove();
        });

        this.notificationList.insertBefore(li, this.notificationList.firstChild);
    }

    showSystemNotification(notification) {
        if (Notification.permission === 'granted') {
            const message = this.translations[this.currentLanguage][notification.type] || 'Notification';
            new Notification('SWAMS', {
                body: `${message}: ${notification.message}`,
                icon: '/icons/notification-icon.png'
            });
        }
    }

    speakNotification(notification) {
        const message = this.translations[this.currentLanguage][notification.type] || 'Notification';
        const textToSpeak = `${message}: ${notification.message}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = this.getLanguageCode(this.currentLanguage);
        speechSynthesis.speak(utterance);
    }

    removeNotification(notification) {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
            this.updateNotificationCount();
        }
    }

    clearAllNotifications() {
        this.notifications = [];
        this.notificationList.innerHTML = '<li>No notifications</li>';
        this.updateNotificationCount();
    }

    updateNotificationCount() {
        const count = this.notifications.length;
        this.notificationCount.textContent = count;
        if (count > 0) {
            this.notificationCount.style.display = 'inline';
        } else {
            this.notificationCount.style.display = 'none';
        }
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString(this.currentLanguage, {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setLanguage(language) {
        this.currentLanguage = language;
        // Refresh all displayed notifications with new language
        this.notificationList.innerHTML = '';
        if (this.notifications.length > 0) {
            this.notifications.forEach(notification => {
                this.addNotificationToPanel(notification);
            });
        } else {
            this.notificationList.innerHTML = '<li>No notifications</li>';
        }
    }

    setVoiceEnabled(enabled) {
        this.voiceEnabled = enabled;
        localStorage.setItem('voiceNotificationsEnabled', this.voiceEnabled);
    }

    getLanguageCode(language) {
        const languageCodes = {
            en: 'en-US',
            fr: 'fr-FR',
            es: 'es-ES',
            ar: 'ar-SA'
        };
        return languageCodes[language] || 'en-US';
    }
}

// Instantiate NotificationSystem
document.addEventListener('DOMContentLoaded', () => {
    const notificationSystem = new NotificationSystem();

    // Example: Add a test notification
    setTimeout(() => {
        notificationSystem.addNotification({
            type: 'threshold_exceeded',
            message: 'Building A',
            timestamp: new Date().toISOString()
        });
    }, 2000);

    // Example: Add another notification
    setTimeout(() => {
        notificationSystem.addNotification({
            type: 'maintenance_reminder',
            message: 'Water Pump 3',
            timestamp: new Date().toISOString()
        });
    }, 5000);
});
