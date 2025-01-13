document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const resetButton = document.getElementById('reset');
    const form = document.getElementById('cadastroForm');

    // Validação em tempo real do campo de email
    emailInput.addEventListener('input', function () {
        if (emailInput.validity.valid) {
            emailInput.classList.add('valid');
        } else {
            emailInput.classList.remove('valid');
        }
    });

    // Adiciona transição no carregamento da página
    document.body.style.opacity = '0';
    window.addEventListener('load', function () {
        document.body.style.transition = 'opacity 1s';
        document.body.style.opacity = '1';
    });

    // Pop-up de confirmação ao clicar no botão de reset
    resetButton.addEventListener('click', function () {
        const confirmReset = confirm('Você tem certeza que deseja excluir os dados informados?');
        if (confirmReset) {
            form.reset();

            // Ajusta os rótulos manualmente após o reset
            const labels = document.querySelectorAll('.labelinput');
            labels.forEach(label => {
                label.style.top = '10px';
                label.style.fontSize = '16px';
                label.style.color = 'white';
            });

            // Atualiza a página após o reset
            location.reload();
        }
    });
});


