// Funções de modal
const showModal = (modal) => modal?.classList.add('show');
const hideModal = (modal) => modal?.classList.remove('show');

// Modal de Boas-vindas
const setupWelcomeModal = () => {
    const welcomeModal = document.getElementById('welcomeModal');
    const closeModal = document.getElementById('closeModal');

    if (welcomeModal && closeModal) {
        window.addEventListener('load', () => showModal(welcomeModal));
        closeModal.addEventListener('click', () => hideModal(welcomeModal));
    }
};

// Modal de Logout
const setupLogoutModal = () => {
    const logoutButton = document.getElementById('logoutButton');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    if (logoutButton && logoutModal) {
        logoutButton.addEventListener('click', () => showModal(logoutModal));
        confirmLogout?.addEventListener('click', () => {
            hideModal(logoutModal);
            window.location.href = 'login.html';
        });
        cancelLogout?.addEventListener('click', () => hideModal(logoutModal));
    }
};

// Função de Login
const setupLogin = () => {
    const loginForm = document.getElementById('loginForm');
    const loadingIcon = document.getElementById('loadingIcon');
    const modalErro = document.getElementById('modalErro');
    const fecharErro = document.getElementById('fecharErro');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        // Exibir ícone de carregamento
        loadingIcon?.classList.add('show');

        setTimeout(() => {
            loadingIcon?.classList.remove('show');

            if (usuario === 'admin' && senha === 'admin') {
                window.location.href = 'dashboard.html';
            } else {
                showModal(modalErro);
            }
        }, 2000);
    });

    fecharErro?.addEventListener('click', () => hideModal(modalErro));
};

// Cadastro de Usuários
const setupCadastro = () => {
    const formCadastro = document.getElementById('form-cadastro');
    const senhaInput = document.querySelector('.senha');
    const feedbackSenha = document.getElementById('feedbackSenha');

    if (!formCadastro) return;

    // Validação de senha em tempo real
    senhaInput?.addEventListener('input', () => {
        if (senhaInput.value.length >= 6) {
            feedbackSenha.textContent = 'Senha válida';
            feedbackSenha.style.color = 'green';
        } else {
            feedbackSenha.textContent = 'Senha muito curta';
            feedbackSenha.style.color = 'red';
        }
    });

    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(formCadastro);
        const response = await fetch('backend/cadastrar.php', {
            method: 'POST',
            body: formData,
        });
        alert(await response.text());
        formCadastro.reset();
    });
};

// Listagem de Usuários
const setupListagem = () => {
    const userList = document.getElementById('user-list');

    if (!userList) return;

    const fetchUsers = async () => {
        try {
            const response = await fetch('backend/listar.php');
            if (!response.ok) throw new Error('Erro ao buscar usuários');
            const users = await response.json();
            userList.innerHTML = users.length
                ? users.map(user => `
                    <tr>
                        <td>${user.nome}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="editUser(${user.id})">Editar</button>
                            <button onclick="deleteUser(${user.id})">Excluir</button>
                        </td>
                    </tr>`).join('')
                : '<tr><td colspan="3">Nenhum usuário encontrado.</td></tr>';
        } catch (error) {
            console.error('Erro ao carregar a lista de usuários:', error);
            alert('Erro ao carregar a lista de usuários.');
        }
    };

    fetchUsers();

    window.editUser = (id) => {
        const newName = prompt('Novo nome:');
        const newEmail = prompt('Novo email:');
        if (newName && newEmail) {
            fetch('backend/editar.php', {
                method: 'POST',
                body: new URLSearchParams({ id, nome: newName, email: newEmail }),
            }).then(() => fetchUsers());
        }
    };

    window.deleteUser = (id) => {
        if (confirm('Deseja excluir este usuário?')) {
            fetch('backend/excluir.php', {
                method: 'POST',
                body: new URLSearchParams({ id }),
            }).then(() => fetchUsers());
        }
    };
};

// Inicializar funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    setupWelcomeModal();
    setupLogoutModal();
    setupLogin();
    setupCadastro();
    setupListagem();
});
