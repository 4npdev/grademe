const DEFAULT_DATA = {
    gpa: 0.0,
    subjects: []
};

let appData = loadFromLocalStorage();

function loadFromLocalStorage() {
    const savedData = localStorage.getItem("gradeMe_userStore");
    return savedData ? JSON.parse(savedData) : JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveToLocalStorage() {
    localStorage.setItem('gradeMe_userStore', JSON.stringify(appData));
}