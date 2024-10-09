// Lógica do carrossel de imagens
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;

    // Atualizar o índice do slide atual
    currentSlide += direction;

    // Verificar limites do carrossel
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Volta para o último slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Volta para o primeiro slide
    }

    // Mover a galeria de imagens
    const offset = -currentSlide * 100; // Calcular o deslocamento
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}


    // Exibir botões radio ao selecionar Agendar Procedimento

document.getElementById('appointment-type').addEventListener('change', function() {
    var timeButtons = document.getElementById('time-buttons');
    if (this.value === 'procedure') {
        timeButtons.style.display = 'block';  // Mostra os botões de horário
    } else {
        timeButtons.style.display = 'none';   // Oculta os botões de horário
    }
});

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none'; // Fecha o menu se estiver aberto
    } else {
        dropdownMenu.style.display = 'block'; // Abre o menu
    }
}

// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}

document.getElementById('appointment-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    // Obtém os elementos dos campos de registro
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var appointmentInput = document.getElementById('appointment-type');
    var descriptionInput = document.getElementById('description');
    var dataInput = document.getElementById('data');

    // Obtém os valores dos campos de registro
    var name = nameInput.value;
    var phone = phoneInput.value;
    var appointment = appointmentInput.value;
    var description = descriptionInput.value;
    var data = dataInput.value;

    console.log(appointment)

    if (appointment === 'selecione') {
      appointmentInput.classList.add('invalid-input');
      alert('Por favor, preencha o tipo de agendamento.');
      return;
    } else {
      appointmentInput.classList.remove('invalid-input');
    }

    // Objeto com os dados a serem enviados
    var data = {
      nome: name,
      telefone: phone,
      tipoAgendamento: appointment,
      descricao: description,
      dataAgendamento: data
    };

    // Envia os dados para o servidor usando Fetch API
    fetch('https://sleepy-everglades-97802-cdc3033e6535.herokuapp.com/agendamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Erro ao registrar');
        }
        // Se o registro foi bem-sucedido, redireciona para a página de login
        alert('Registro realizado com sucesso!');
        window.location.href = 'index.html';
      })
      .catch(function (error) {
        console.error('Erro:', error);
        // Aqui você pode exibir uma mensagem de erro para o usuário, se desejar
      });
  });

//   function formatDate(dateStr) {
//     // Divide a string da data em dia, mês e ano
//     const [day, month, year] = dateStr.split('/');
    
//     // Reorganiza a data no formato yyyy-MM-dd
//     return `${year}-${month}-${day}`;
// }
