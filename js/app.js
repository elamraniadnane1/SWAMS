// app.js

// Global Variables
let currentUser = null;
let userRole = null;
let voiceNotificationsEnabled = false;
let currentLanguage = 'en';

// Initialize the application
function initializeApp() {
    // Check if user is authenticated
    if (!currentUser) {
        showAuthModal();
    } else {
        // Load user-specific data
        loadUserData();
        initializeNavigation();
        initializeEventListeners();
        initializeCharts();
        initializeMap();
        initializeVoiceNotifications();
        initializeFeedbackForm();
    }
}

// Show authentication modal
function showAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.style.display = 'block';

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
}

// Handle user login
function handleLogin(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Mock authentication (replace with real authentication logic)
    authenticateUser(username, password)
        .then(user => {
            currentUser = user;
            userRole = user.role;
            document.getElementById('userName').textContent = user.name;
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('appWrapper').style.display = 'flex';
            initializeApp();
        })
        .catch(err => {
            document.getElementById('loginError').style.display = 'block';
        });
}

// Mock authentication function
function authenticateUser(username, password) {
    return new Promise((resolve, reject) => {
        // Simulate an API call to authenticate the user
        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                resolve({ name: 'Admin User', role: 'admin' });
            } else if (username === 'staff' && password === 'password') {
                resolve({ name: 'Staff User', role: 'staff' });
            } else if (username === 'resident' && password === 'password') {
                resolve({ name: 'Resident User', role: 'resident' });
            } else {
                reject('Invalid credentials');
            }
        }, 1000);
    });
}

// Load user-specific data
function loadUserData() {
    // Adjust UI based on user role
    adjustUIForRole();
    // Load dashboard data
    loadDashboardData();
    // Load tasks
    loadTasks();
    // Load alerts
    loadAlerts();
    // Load reports
    loadReports();
}

// Adjust UI elements based on user role
function adjustUIForRole() {
    // Hide or show elements based on user role
    const adminElements = document.querySelectorAll('[data-role="admin"]');
    const staffElements = document.querySelectorAll('[data-role="staff admin"]');
    const residentElements = document.querySelectorAll('[data-role="resident"]');

    if (userRole === 'admin') {
        showElements(adminElements);
        showElements(staffElements);
        showElements(residentElements);
    } else if (userRole === 'staff') {
        hideElements(adminElements);
        showElements(staffElements);
        showElements(residentElements);
    } else if (userRole === 'resident') {
        hideElements(adminElements);
        hideElements(staffElements);
        showElements(residentElements);
    }
}

// Helper functions to show or hide elements
function showElements(elements) {
    elements.forEach(element => {
        element.style.display = 'block';
    });
}

function hideElements(elements) {
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

// Initialize navigation
function initializeNavigation() {
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Handle navigation
            const target = link.getAttribute('href').substring(1);
            showContentSection(target);
        });
    });

    // Initialize default section
    showContentSection('dashboard');
}

// Function to show content sections
function showContentSection(sectionId) {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    const targetSection = document.getElementById(sectionId + 'Content');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // User Info Dropdown Toggle
    const userInfo = document.getElementById('userInfo');
    const userDropdown = document.getElementById('userDropdown');
    userInfo.addEventListener('click', () => {
        userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Logout
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    // Language Selector Change Event
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', (e) => {
        // Handle language change
        currentLanguage = e.target.value;
        // Implement i18n switch logic here
        switchLanguage(currentLanguage);
    });

    // Take Photo Modal
    const takePhotoButton = document.getElementById('takePhoto');
    const takePhotoModal = document.getElementById('takePhotoModal');
    const closeTakePhotoModal = document.getElementById('closeTakePhotoModal');
    takePhotoButton.addEventListener('click', () => {
        takePhotoModal.style.display = 'block';
        initializeCamera();
    });
    closeTakePhotoModal.addEventListener('click', () => {
        takePhotoModal.style.display = 'none';
    });

    // Configure Alerts Modal
    const configureAlertsButton = document.getElementById('configureAlerts');
    const configureAlertsModal = document.getElementById('configureAlertsModal');
    const closeConfigureAlertsModal = document.getElementById('closeConfigureAlertsModal');
    configureAlertsButton.addEventListener('click', () => {
        configureAlertsModal.style.display = 'block';
    });
    closeConfigureAlertsModal.addEventListener('click', () => {
        configureAlertsModal.style.display = 'none';
    });

    // Voice Notifications Toggle
    const voiceNotificationsButton = document.getElementById('voiceNotifications');
    voiceNotificationsButton.addEventListener('click', () => {
        voiceNotificationsEnabled = !voiceNotificationsEnabled;
        voiceNotificationsButton.classList.toggle('active', voiceNotificationsEnabled);
        if (voiceNotificationsEnabled) {
            enableVoiceNotifications();
        } else {
            disableVoiceNotifications();
        }
    });

    // Assign Task Button
    const assignTaskButton = document.getElementById('assignTask');
    if (assignTaskButton) {
        assignTaskButton.addEventListener('click', () => {
            assignTask();
        });
    }

    // Generate Report Button
    const generateReportButton = document.getElementById('generateReport');
    if (generateReportButton) {
        generateReportButton.addEventListener('click', () => {
            generateReport();
        });
    }

    // Feedback Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', handleFeedbackSubmission);
}

// Logout user
function logoutUser() {
    currentUser = null;
    userRole = null;
    document.getElementById('appWrapper').style.display = 'none';
    showAuthModal();
}

// Switch application language (simplified example)
function switchLanguage(language) {
    // Implement language switching logic
    console.log(`Language switched to ${language}`);
}

// Initialize charts
function initializeCharts() {
    // Water Consumption Chart
    const ctxWater = document.getElementById('waterConsumptionChart').getContext('2d');
    const waterConsumptionChart = new Chart(ctxWater, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Water Consumption (m³)',
                data: [500, 600, 550, 700, 650, 600],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Historical Data Chart
    const ctxHistorical = document.getElementById('historicalDataChart').getContext('2d');
    const historicalDataChart = new Chart(ctxHistorical, {
        type: 'bar',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Annual Consumption (m³)',
                data: [7000, 6800, 7200, 7100, 7300, 7500],
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
        }
    });
}

// Initialize map
function initializeMap() {
    const map = L.map('campusMap').setView([33.5395, -5.1051], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers or layers as needed
}

// Initialize voice notifications
function initializeVoiceNotifications() {
    if (voiceNotificationsEnabled) {
        // Check for speech synthesis support
        if ('speechSynthesis' in window) {
            // Ready to use voice notifications
        } else {
            alert('Voice notifications are not supported in your browser.');
        }
    }
}

// Enable voice notifications
function enableVoiceNotifications() {
    // Play a test message
    speak(`Voice notifications enabled`, currentLanguage);
}

// Disable voice notifications
function disableVoiceNotifications() {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
}

// Function to speak messages
function speak(message, language) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = getLanguageCode(language);
    window.speechSynthesis.speak(utterance);
}

// Get language code for speech synthesis
function getLanguageCode(language) {
    switch (language) {
        case 'en':
            return 'en-US';
        case 'fr':
            return 'fr-FR';
        case 'es':
            return 'es-ES';
        default:
            return 'en-US';
    }
}

// Initialize feedback form
function initializeFeedbackForm() {
    // Any additional initialization for feedback form
}

// Handle feedback submission
function handleFeedbackSubmission(event) {
    event.preventDefault();
    const feedbackText = event.target.feedbackText.value;
    // Submit feedback (replace with real submission logic)
    console.log(`Feedback submitted: ${feedbackText}`);
    event.target.reset();
    alert('Thank you for your feedback!');
}

// Initialize camera for taking photos
function initializeCamera() {
    // Access the user's camera and display the video stream
    const cameraInterface = document.getElementById('cameraInterface');
    // For simplicity, we'll assume this functionality is handled elsewhere
    cameraInterface.innerHTML = '<p>Camera interface initialized.</p>';
}

// Load dashboard data
function loadDashboardData() {
    // Load data from APIs or data sources
    // For example, fetch real-time water consumption data
}

// Load tasks
function loadTasks() {
    const taskList = document.getElementById('taskList');
    // Fetch tasks assigned to the user
    const tasks = getTasksForUser(currentUser.name);
    taskList.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.description;
            taskList.appendChild(taskItem);
        });
    } else {
        taskList.innerHTML = '<li>No tasks assigned</li>';
    }
}

// Mock function to get tasks for the user
function getTasksForUser(username) {
    // Replace with real API call
    return [
        { description: 'Check water meter in Building A' },
        { description: 'Inspect leak reported in Building B' }
    ];
}

// Load alerts
function loadAlerts() {
    const alertItems = document.getElementById('alertItems');
    // Fetch alerts
    const alerts = getAlerts();
    alertItems.innerHTML = '';
    if (alerts.length > 0) {
        alerts.forEach(alert => {
            const alertItem = document.createElement('li');
            alertItem.textContent = alert.message;
            alertItems.appendChild(alertItem);
        });
    } else {
        alertItems.innerHTML = '<li>No active alerts</li>';
    }
}

// Mock function to get alerts
function getAlerts() {
    // Replace with real API call
    return [
        { message: 'Water consumption exceeded threshold in Building C' },
        { message: 'Scheduled maintenance due in Pump Station' }
    ];
}

// Load reports
function loadReports() {
    const reportItems = document.getElementById('reportItems');
    // Fetch reports
    const reports = getReports();
    reportItems.innerHTML = '';
    if (reports.length > 0) {
        reports.forEach(report => {
            const reportItem = document.createElement('li');
            reportItem.textContent = report.title;
            reportItems.appendChild(reportItem);
        });
    } else {
        reportItems.innerHTML = '<li>No reports available</li>';
    }
}

// Mock function to get reports
function getReports() {
    // Replace with real API call
    return [
        { title: 'Monthly Water Usage Report - November' },
        { title: 'Annual Sustainability Report - 2024' }
    ];
}

// Assign a task
function assignTask() {
    // Open a modal or form to assign a new task
    alert('Assign Task functionality not implemented yet.');
}

// Generate a report
function generateReport() {
    // Trigger report generation
    alert('Generate Report functionality not implemented yet.');
}

// Export data
function exportData() {
    // Export data to a file
    alert('Export Data functionality not implemented yet.');
}

// Show details
function showDetails() {
    // Show detailed information
    alert('Show Details functionality not implemented yet.');
}

// Report an issue
function reportIssue() {
    // Open the take photo modal
    document.getElementById('takePhotoModal').style.display = 'block';
    initializeCamera();
}

// Show flow details
function showFlowDetails() {
    // Show detailed flow monitoring data
    alert('Flow Details functionality not implemented yet.');
}

// Start the application
initializeApp();
