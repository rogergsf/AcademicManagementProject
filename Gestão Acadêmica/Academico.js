const leitor = require("readline-sync");

const professores = [];
const disciplinas = [];
const alunos = [];

console.log("--> Bem vindo a gestao academica! <--\n");

function menu() {
    console.log("1 - Cadastrar professores");
    console.log("2 - Cadastrar disciplinas");
    console.log("3 - Cadastrar alunos");
    console.log("4 - Listar disciplinas");
    console.log("5 - Listar professores");
    console.log("6 - Listar alunos");
    console.log("7 - Listar alunos por disciplina");
    console.log("8 - Listar disciplinas por professores");
    console.log("9 - Listar alunos por disciplinas");
    console.log("0 - Sair");
    console.log("\n");

    let opcao = leitor.questionInt("Digite a opcao desejada: ");

    switch (opcao) {
        case 1:
            cadastrarProfessor();
            break;

        case 2:
            cadastrarDisciplina();
            break;

        case 3:
            cadastrarAlunos();
            break;

        case 4:
            listarDisciplinas();
            break;

        case 5:
            listarProfessores();
            break;

        case 6:
            listarAlunos();
            break;

        case 7:
            listarAlunosPorDisciplina();
            break;

        case 8:
            listarDisciplinasPorProfessor();
            break;

        case 9:
            listarAlunosPorProfessor();
            break;

        case 0:
            console.log("Saindo...");
            break;

        default:
            console.log("Opção inválida!");
            setTimeout(() => { menu() }, 1500);
    }
}


// Cadastro de professores:
function cadastrarProfessor() {
    console.clear();
    console.log("-> CADASTRO DE PROFESSORES <-");
    let nomeProf = leitor.question("\nDigite o nome do professor: ");
    let existe = false;

    for (let i = 0; i < professores.length; i++) {
        if (professores[i].nome == nomeProf) {
            existe = true;
            break;
        }
    }

    if (existe) {
        console.log("Este professor já está cadastrado!");
    } else {
        let professor = {
            nome: nomeProf
        }

        professores.push(professor);

        console.log("Professor cadastrado com sucesso!");
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}


// Cadastro de disciplinas:
function cadastrarDisciplina() {
    // Verificação da existência de professores:
    if (professores.length == 0) {
        console.log("Não há professores cadastrados! Cadastre um professor primeiro.");

    } else {
        console.clear();
        console.log("-> CADASTRO DE DISCIPLINAS <-");
        let nomeDisciplina = leitor.question("\nDigite o nome da disciplina: ");

        // Verificação de existência da disciplina:
        let existe = false;

        for (let i = 0; i < disciplinas.length; i++) {
            if (disciplinas[i].nome == nomeDisciplina) {
                existe = true;
                break;
            }
        }

        if (existe) {
            console.log("Está disciplina já está cadastrada!");

        } else {
            let codProfessor = leitor.question("Digite o código do professor: ");

            // Verificação da existência de professor com esse índice:
            if (professores[codProfessor] == undefined) {
                console.log("Não há professor cadastrado com esse índice.");

            } else {
                let disciplina = {
                    nome: nomeDisciplina,
                    professor: codProfessor
                }

                disciplinas.push(disciplina);
                console.log("Disciplina cadastrada com sucesso!");
            }
        }
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}


// Cadastro de Alunos:
function cadastrarAlunos() {
    // Verificar se existe disciplinas
    if (disciplinas.length == 0) {
        console.log("Não há disciplinas cadastradas! Cadastre uma disciplina primeiro.");

    } else {
        console.clear();
        console.log("-> CADASTRO DE ALUNOS <-");
        let nomeAluno = leitor.question("\nDigite o nome do aluno: ");

        // Verificação de se o aluno já está cadastrado:
        let existeAluno = false;

        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].nome == nomeAluno) {
                existeAluno = true;
                break;
            }
        }

        if (existeAluno) {
            console.log("Este aluno já está cadastrado!");

            // Pergunta de quantas disciplinas o aluno irá cursar:
        } else {
            let qtdDisciplinas = leitor.questionInt(`Quantas disciplinas ${nomeAluno} irá cursar? `);

            if (qtdDisciplinas <= 0 || qtdDisciplinas > disciplinas.length) {
                console.log("Erro... Quantidade de disciplinas inválida!");

            } else {
                let listaDisciplinas = [];
                for (let i = 0; i < qtdDisciplinas; i++) {
                    let numDisciplina = leitor.questionInt("Digite o código da disciplina: ");

                    // Preenchimento do array com os codigos:
                    listaDisciplinas.push(numDisciplina);

                    // Verificação de se existe disciplina com esse índice:
                    if (disciplinas[numDisciplina] == undefined) {
                        console.log("Não há disciplina cadastrada com esse índice.");
                    }
                }

                // Geração de número aleatório de matrícula:
                codMatricula = Math.floor(Math.random() * (10000 - 0 + 0)) + 0;

                let aluno = {
                    nome: nomeAluno,
                    disciplinas: listaDisciplinas,
                    matricula: codMatricula
                }
                alunos.push(aluno);
                console.log("Aluno cadastrado com sucesso");
            }
        }
    }
    setTimeout(() => { menu() }, 1500);
    console.clear();
}


// Listagem de Disciplinas:
function listarDisciplinas() {
    if (disciplinas.length == 0) {
        console.log("Não há disciplinas cadastradas! Cadastre uma disciplina primeiro.");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE DISCIPLINAS <-");
        console.log("\n");
        console.log("Disciplinas cadastradas:");

        for (let i = 0; i < disciplinas.length; i++) {
            console.log(`${i} - ${disciplinas[i].nome} - Prof ${professores[disciplinas[i].professor].nome}`);
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}


// Listagem de Professores:
function listarProfessores() {
    if (professores.length == 0) {
        console.log("Não há professores cadastrados! cadastre um professor primeiro.");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE PROFESSORES <-");
        console.log("\n");
        console.log("Professores cadastrados:");

        for (let i = 0; i < professores.length; i++) {
            console.log(`\nCódigo: ${i} \nNome: ${professores[i].nome}`);

            // Listagem das disciplinas dos professores:
            console.log("Disciplinas:");
            for (let j = 0; j < disciplinas.length; j++) {
                if (disciplinas[j].professor == i) {
                    console.log(`- ${disciplinas[j].nome}`);
                }
            }
        }
        setTimeout(() => { menu() }, 2000);
        console.clear();
    }
}


// Listagem de Alunos:
function listarAlunos() {
    if (alunos.length === 0) {
        console.log("Não há alunos cadastrados! Cadastre um aluno primeiro.");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE ALUNOS <-"); 
        console.log("\n");
        console.log("Alunos cadastrados:");

        for (let i = 0; i < alunos.length; i++) {
            const aluno = alunos[i];
            console.log(`\nMatrícula: ${aluno.matricula} \nNome: ${aluno.nome}`);

            // Listagem das disciplinas dos alunos:
            console.log("Disciplinas:");
            for (let x = 0; x < aluno.disciplinas.length; x++) {
                const cod = aluno.disciplinas[x];
                const disciplina = disciplinas[cod];
                console.log("-", disciplina.nome);
            }
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}


// Listagem de Alunos por Disciplina:
function listarAlunosPorDisciplina() {
    if (alunos.length === 0) {
        console.log("Não há alunos cadastrados! Cadastre um aluno primeiro.\n");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE ALUNOS POR DISCIPLINA <-");
        const codDisciplina = leitor.questionInt("\nDigite o código da disciplina para ver seus alunos: ");
        if (codDisciplina >= 0 && codDisciplina < disciplinas.length) {

            const alunosMatriculados = [];

            for (let i = 0; i < alunos.length; i++) {
                const aluno = alunos[i];

                if (aluno.disciplinas.includes(codDisciplina)) {
                    alunosMatriculados.push(aluno);
                }
            }

            if (alunosMatriculados.length === 0) {
                console.log("Ainda não há alunos matriculados nesta disciplina!");

            } else {
                console.log(`\nAlunos matriculados em ${codDisciplina} - ${disciplinas[codDisciplina].nome}:`);
                for (let i = 0; i < alunosMatriculados.length; i++) {
                    const aluno = alunosMatriculados[i];
                    console.log(`\nMatrícula: ${aluno.matricula} \nNome: ${aluno.nome}`);

                    // Listagem das disciplinas dos alunos:
                    console.log("Disciplinas:");
                    for (let x = 0; x < aluno.disciplinas.length; x++) {
                        const cod = aluno.disciplinas[x];
                        const disciplina = disciplinas[cod];
                        console.log("-", disciplina.nome);
                    }
                }
            }
        } else {
            console.log("Não há disciplinas cadastradas com este código!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}


// Listagem de Disciplinas por Professor:
function listarDisciplinasPorProfessor() {
    if (disciplinas.length === 0) {
        console.log("Não há disciplinas cadastradas! Cadastre uma disciplina primeiro.\n");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE DISCIPLINAS POR PROFESSOR <-");
        const codProfessor = leitor.questionInt("\nDigite o código do professor para ver suas disciplinas: ");
        if (codProfessor >= 0 && codProfessor < professores.length) {

            const disciplinasDoProf = [];

            for (let i = 0; i < disciplinas.length; i++) {
                const disciplina = disciplinas[i];

                if (disciplina.professor == codProfessor) {
                    disciplinasDoProf.push(disciplina);
                }
            }

            if (disciplinasDoProf.length === 0) {
                console.log(`Prof ${professores[codProfessor].nome} ainda não está associado(a) a nenhuma disciplina.`);

            } else {
                console.log(`\nDisciplinas de prof ${professores[codProfessor].nome}:`);
                for (let i = 0; i < disciplinasDoProf.length; i++) {
                    const disciplina = disciplinasDoProf[i];
                    const codDisciplina = disciplinas.indexOf(disciplina);
                    console.log(`${codDisciplina} - ${disciplina.nome}`);
                }
            }
        } else {
            console.log("Não há professores cadastrados com este código!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}


// Listagem de Alunos por Professor:
function listarAlunosPorProfessor() {
    if (alunos.length === 0) {
        console.log("Não há alunos cadastrados! Cadastre um aluno primeiro.\n");

    } else {
        console.clear();
        console.log("-> LISTAGEM DE ALUNOS POR PROFESSOR <-");
        const codProf = leitor.questionInt("\nDigite o código do professor para ver seus alunos: ");

        if (codProf >= 0 && codProf < professores.length) {

            const alunosDoProfessor = [];

            for (let i = 0; i < alunos.length; i++) {
                const aluno = alunos[i];

                if (aluno.disciplinas.some((codDisciplina) => disciplinas[codDisciplina].professor == codProf)) {
                    alunosDoProfessor.push(aluno);
                }
            }

            if (alunosDoProfessor.length === 0) {
                console.log(`Ainda não há alunos matriculados em disciplinas de Prof ${professores[codProf].nome}.`);
            } else {
                console.log(`\nAlunos de Prof ${professores[codProf].nome}: `);
                for (let i = 0; i < alunosDoProfessor.length; i++) {
                    const aluno = alunosDoProfessor[i];
                    console.log(`${aluno.matricula} - ${aluno.nome}`);
                }
            }
        } else {
            console.log("Não há professores cadastrados com este código!\n");
        }
    }
    setTimeout(() => { menu() }, 2000);
    console.clear();
}
menu();