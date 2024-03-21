const readline = require("readline-sync");

const teachers = [];
const subjects = [];
const students = [];

console.log("--> Welcome to Academic Management! <--\n");

function menu() {
    console.log("1 - Register Teachers");
    console.log("2 - Register Subjects");
    console.log("3 - Register Students");
    console.log("4 - List Subjects");
    console.log("5 - List Teachers");
    console.log("6 - List Students");
    console.log("7 - List Students by Subject");
    console.log("8 - List Subjects by Teachers");
    console.log("9 - List Students by Teachers");
    console.log("0 - Exit");
    console.log("\n");

    let option = readline.questionInt("Enter the desired option: ");

    switch (option) {
        case 1:
            registerTeacher();
            break;

        case 2:
            registerSubject();
            break;

        case 3:
            registerStudents();
            break;

        case 4:
            listSubjects();
            break;

        case 5:
            listTeachers();
            break;

        case 6:
            listStudents();
            break;

        case 7:
            listStudentsBySubject();
            break;

        case 8:
            listSubjectsByTeacher();
            break;

        case 9:
            listStudentsByTeacher();
            break;

        case 0:
            console.log("Exiting...");
            break;

        default:
            console.log("Invalid option!");
            setTimeout(() => { menu() }, 1500);
    }
}

// Teacher Registration:
function registerTeacher() {
    console.clear();
    console.log("-> TEACHER REGISTRATION <-");
    let teacherName = readline.question("\nEnter the teacher's name: ");
    let exists = false;

    for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].name == teacherName) {
            exists = true;
            break;
        }
    }

    if (exists) {
        console.log("This teacher is already registered!");
    } else {
        let teacher = {
            name: teacherName
        }

        teachers.push(teacher);

        console.log("Teacher registered successfully!");
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}

// Subject Registration:
function registerSubject() {
    // Check for the existence of teachers:
    if (teachers.length == 0) {
        console.log("No teachers registered! Register a teacher first.");

    } else {
        console.clear();
        console.log("-> SUBJECT REGISTRATION <-");
        let subjectName = readline.question("\nEnter the name of the subject: ");

        // Check if the subject exists:
        let exists = false;

        for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].name == subjectName) {
                exists = true;
                break;
            }
        }

        if (exists) {
            console.log("This subject is already registered!");

        } else {
            let teacherCode = readline.question("Enter the teacher's code: ");

            // Check for the existence of a teacher with this index:
            if (teachers[teacherCode] == undefined) {
                console.log("No teacher registered with this index.");

            } else {
                let subject = {
                    name: subjectName,
                    teacher: teacherCode
                }

                subjects.push(subject);
                console.log("Subject registered successfully!");
            }
        }
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}

// Student Registration:
function registerStudents() {
    // Check if there are subjects
    if (subjects.length == 0) {
        console.log("No subjects registered! Register a subject first.");

    } else {
        console.clear();
        console.log("-> STUDENT REGISTRATION <-");
        let studentName = readline.question("\nEnter the student's name: ");

        // Check if the student is already registered:
        let existsStudent = false;

        for (let i = 0; i < students.length; i++) {
            if (students[i].name == studentName) {
                existsStudent = true;
                break;
            }
        }

        if (existsStudent) {
            console.log("This student is already registered!");

        } else {
            let numSubjects = readline.questionInt(`How many subjects will ${studentName} take? `);

            if (numSubjects <= 0 || numSubjects > subjects.length) {
                console.log("Error... Invalid number of subjects!");

            } else {
                let subjectList = [];
                for (let i = 0; i < numSubjects; i++) {
                    let subjectNum = readline.questionInt("Enter the subject code: ");

                    // Fill the array with the codes:
                    subjectList.push(subjectNum);

                    // Check if there is a subject with this index:
                    if (subjects[subjectNum] == undefined) {
                        console.log("No subject registered with this index.");
                    }
                }

                // Generating a random enrollment number:
                let enrollmentCode = Math.floor(Math.random() * (10000 - 0 + 0)) + 0;

                let student = {
                    name: studentName,
                    subjects: subjectList,
                    enrollment: enrollmentCode
                }
                students.push(student);
                console.log("Student registered successfully");
            }
        }
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}

// List Subjects:
function listSubjects() {
    if (subjects.length == 0) {
        console.log("No subjects registered! Register a subject first.");

    } else {
        console.clear();
        console.log("-> SUBJECT LISTING <-");
        console.log("\n");
        console.log("Registered Subjects:");

        for (let i = 0; i < subjects.length; i++) {
            console.log(`${i} - ${subjects[i].name} - Prof ${teachers[subjects[i].teacher].name}`);
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}

// List Teachers:
function listTeachers() {
    if (teachers.length == 0) {
        console.log("No teachers registered! Register a teacher first.");

    } else {
        console.clear();
        console.log("-> TEACHER LISTING <-");
        console.log("\n");
        console.log("Registered Teachers:");

        for (let i = 0; i < teachers.length; i++) {
            console.log(`\nCode: ${i} \nName: ${teachers[i].name}`);

            // Listing the teachers' subjects:
            console.log("Subjects:");
            for (let j = 0; j < subjects.length; j++) {
                if (subjects[j].teacher == i) {
                    console.log(`- ${subjects[j].name}`);
                }
            }
        }
        setTimeout(() => { menu() }, 2000);
        console.clear();
    }
}

// List Students:
function listStudents() {
    if (students.length === 0) {
        console.log("No students registered! Register a student first.");

    } else {
        console.clear();
        console.log("-> STUDENT LISTING <-");
        console.log("\n");
        console.log("Registered Students:");

        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            console.log(`\nEnrollment: ${student.enrollment} \nName: ${student.name}`);

            // Listing the subjects of the students:
            console.log("Subjects:");
            for (let x = 0; x < student.subjects.length; x++) {
                const code = student.subjects[x];
                const subject = subjects[code];
                console.log("-", subject.name);
            }
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}

// List Students by Subject:
function listStudentsBySubject() {
    if (students.length === 0) {
        console.log("No students registered! Register a student first.\n");

    } else {
        console.clear();
        console.log("-> LISTING STUDENTS BY SUBJECT <-");
        const subjectCode = readline.questionInt("\nEnter the subject code to see its students: ");
        if (subjectCode >= 0 && subjectCode < subjects.length) {

            const enrolledStudents = [];

            for (let i = 0; i < students.length; i++) {
                const student = students[i];

                if (student.subjects.includes(subjectCode)) {
                    enrolledStudents.push(student);
                }
            }

            if (enrolledStudents.length === 0) {
                console.log("There are no students enrolled in this subject yet!");

            } else {
                console.log(`\nStudents enrolled in ${subjectCode} - ${subjects[subjectCode].name}:`);
                for (let i = 0; i < enrolledStudents.length; i++) {
                    const student = enrolledStudents[i];
                    console.log(`\nEnrollment: ${student.enrollment} \nName: ${student.name}`);

                    // Listing the subjects of the students:
                    console.log("Subjects:");
                    for (let x = 0; x < student.subjects.length; x++) {
                        const code = student.subjects[x];
                        const subject = subjects[code];
                        console.log("-", subject.name);
                    }
                }
            }
        } else {
            console.log("There are no registered subjects with this code!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}

// List Subjects by Teacher:
function listSubjectsByTeacher() {
    if (subjects.length === 0) {
        console.log("No subjects registered! Register a subject first.\n");

    } else {
        console.clear();
        console.log("-> LISTING SUBJECTS BY TEACHER <-");
        const teacherCode = readline.questionInt("\nEnter the teacher code to see their subjects: ");
        if (teacherCode >= 0 && teacherCode < teachers.length) {

            const subjectsOfTeacher = [];

            for (let i = 0; i < subjects.length; i++) {
                const subject = subjects[i];

                if (subject.teacher == teacherCode) {
                    subjectsOfTeacher.push(subject);
                }
            }

            if (subjectsOfTeacher.length === 0) {
                console.log(`Prof ${teachers[teacherCode].name} is not associated with any subjects yet.`);

            } else {
                console.log(`\nSubjects of Prof ${teachers[teacherCode].name}:`);
                for (let i = 0; i < subjectsOfTeacher.length; i++) {
                    const subject = subjectsOfTeacher[i];
                    const subjectCode = subjects.indexOf(subject);
                    console.log(`${subjectCode} - ${subject.name}`);
                }
            }
        } else {
            console.log("There are no registered teachers with this code!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}

// List Students by Teacher:
function listStudentsByTeacher() {
    if (students.length === 0) {
        console.log("No students registered! Register a student first.\n");

    } else {
        console.clear();
        console.log("-> LISTING STUDENTS BY TEACHER <-");
        const teacherCode = readline.questionInt("\nEnter the teacher code to see their students: ");

        if (teacherCode >= 0 && teacherCode < teachers.length) {

            const studentsOfTeacher = [];

            for (let i = 0; i < students.length; i++) {
                const student = students[i];

                if (student.subjects.some((subjectCode) => subjects[subjectCode].teacher == teacherCode)) {
                    studentsOfTeacher.push(student);
                }
            }

            if (studentsOfTeacher.length === 0) {
                console.log(`There are no students enrolled in subjects of Prof ${teachers[teacherCode].name}.`);
            } else {
                console.log(`\nStudents of Prof ${teachers[teacherCode].name}: `);
                for (let i = 0; i < studentsOfTeacher.length; i++) {
                    const student = studentsOfTeacher[i];
                    console.log(`${student.enrollment} - ${student.name}`);
                }
            }
        } else {
            console.log("There are no registered teachers with this code!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}

menu();

