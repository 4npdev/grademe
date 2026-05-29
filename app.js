//Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered completely!', reg))
            .catch(err => console.error('Service Worker registration failed', err));
    });
}

//Variables
const homeScreen = document.getElementById("home");
const gradesScreen = document.getElementById("grades");
const timetableScreen = document.getElementById("timetable");
const eventsScreen = document.getElementById("events");

goHome()

function goHome() {
    homeScreen.classList.add("show");
    gradesScreen.classList.remove("show");
    timetableScreen.classList.remove("show");
    eventsScreen.classList.remove("show");
}

function goGrades() {
    homeScreen.classList.remove("show");
    gradesScreen.classList.add("show");
    timetableScreen.classList.remove("show");
    eventsScreen.classList.remove("show");
}

function goTimetable() {
    homeScreen.classList.remove("show");
    gradesScreen.classList.remove("show");
    timetableScreen.classList.add("show");
    eventsScreen.classList.remove("show");
}

function goEvents() {
    homeScreen.classList.remove("show");
    gradesScreen.classList.remove("show");
    timetableScreen.classList.remove("show");
    eventsScreen.classList.add("show");
}
