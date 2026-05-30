if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered completely!', reg))
            .catch(err => console.error('Service Worker registration failed', err));
    });
}

const homeScreen = document.getElementById("home");
const gradesScreen = document.getElementById("grades");
const timetableScreen = document.getElementById("timetable");
const eventsScreen = document.getElementById("events");
const addSubjectScreen = document.getElementById("add-subject-screen");
const addSubjectInput = document.getElementById("add-subject-input");
const subjectContainer = document.getElementById("subject-container");
const subjectMenuScreen = document.getElementById("subject-menu-screen");
const subjectMenuH2 = document.getElementById("subject-menu-h2");
const subjectMenuGrades = document.getElementById("subject-menu-grades");

let currentSelectedSubjectIndex = null;

goHome();
renderSubjects();

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

function openAddSubject() {
    addSubjectScreen.classList.add("show");
}

function closeAddSubject() {
    addSubjectScreen.classList.remove("show");
}

addSubjectInput.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        addSubject();
    }
})

function addSubject() {
    if (addSubjectInput.value.trim() === "") return;
    
    const newSubject = {
        name: addSubjectInput.value,
        grades: [],
        average: null
    }

    appData.subjects.push(newSubject);
    saveToLocalStorage();
    renderSubjects();

    addSubjectInput.value = "";
    closeAddSubject();
}

function renderSubjects() {
    subjectContainer.innerHTML = "";

    appData.subjects.forEach((subject, index) => {
        let gradesText = "No grades yet.";
        if(subject.grades.length > 0) {
            gradesText = subject.grades.join(", ");
        }

        let averageText = "";
        if (subject.average !== null) {
            averageText = subject.average;
        }

        const subjectCardHTML = `
            <div class="subject" onclick="openSubjectsMenu(${index})">
                <div class="subject-left">
                    <h2>${subject.name}</h2>
                    <p>${gradesText}</p>
                </div>
                <div class="subject-right">
                    <p>${averageText}</p>
                </div>
            </div>
        `
        subjectContainer.innerHTML += subjectCardHTML;
    })
}

function openSubjectsMenu(index) {
    currentSelectedSubjectIndex = index;
    const subject = appData.subjects[index];
    
    subjectMenuH2.innerText = subject.name;
    
    if (subject.grades.length > 0) {
        subjectMenuGrades.innerHTML = subject.grades.map(g => `<li>${g}</li>`).join("");
    } else {
        subjectMenuGrades.innerHTML = "<li>No grades recorded.</li>";
    }
    
    subjectMenuScreen.classList.add("show");
}

function closeSubjectsMenu() {
    subjectMenuScreen.classList.remove("show");
    currentSelectedSubjectIndex = null;
}

function removeSubject() {
    if (currentSelectedSubjectIndex !== null) {
        appData.subjects.splice(currentSelectedSubjectIndex, 1);
        saveToLocalStorage();
        renderSubjects();
        closeSubjectsMenu();
    }
}

subjectMenuScreen.addEventListener("click", (e) => {
    if (e.target === subjectMenuScreen) {
        closeSubjectsMenu();
    }
});

addSubjectScreen.addEventListener("click", (e) => {
    if (e.target === addSubjectScreen) {
        closeAddSubject();
    }
});