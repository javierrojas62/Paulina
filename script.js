/* ============================================
   EFECTO DE ESCRITURA DEL NOMBRE
   ============================================ */

// Cambia este nombre por el que quieras
const nombreQuinceañera = "Paulina";

// Función para crear el efecto de escritura
function typeWriterEffect() {
    const typingElement = document.getElementById('typingName');
    let i = 0;
    
    function type() {
        if (i < nombreQuinceañera.length) {
            typingElement.textContent += nombreQuinceañera.charAt(i);
            i++;
            // Velocidad de escritura (en milisegundos)
            setTimeout(type, 200);
        } else {
            // Remover el cursor después de terminar de escribir
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 500);
        }
    }
    
    // Iniciar el efecto después de un pequeño delay
    setTimeout(type, 500);
}

// Ejecutar cuando la página carga
window.addEventListener('load', typeWriterEffect);

/* ============================================
   REPRODUCTOR DE MÚSICA
   ============================================ */

const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const audioPlayer = document.getElementById('audioPlayer');

// Control de reproducción de música
playBtn.addEventListener('click', function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playBtn.classList.add('playing');
    } else {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playBtn.classList.remove('playing');
    }
});

/* ============================================
   CONTADOR REGRESIVO
   ============================================ */

// Configurar la fecha del evento (1 de noviembre de 2025 a las 21:00)
const fechaEvento = new Date('2025-11-01T21:00:00').getTime();

// Actualizar el contador cada segundo
const countdownInterval = setInterval(function() {
    
    // Obtener la fecha y hora actual
    const ahora = new Date().getTime();
    
    // Calcular la diferencia entre la fecha del evento y ahora
    const distancia = fechaEvento - ahora;
    
    // Cálculos de tiempo para días, horas, minutos y segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
    // Mostrar el resultado en los elementos correspondientes
    document.getElementById('days').textContent = dias.toString().padStart(2, '0');
    document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = segundos.toString().padStart(2, '0');
    
    // Si el contador llega a cero, mostrar mensaje
    if (distancia < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<h2 style="color: #d89baa;">¡El gran día ha llegado! 🎉</h2>';
    }
    
}, 1000); // Actualizar cada 1000ms (1 segundo)

/* ============================================
   FUNCIÓN PARA COPIAR TEXTO (CBU Y ALIAS)
   ============================================ */

function copiarTexto(elementId, mensaje) {
    // Obtener el elemento que contiene el texto
    const elemento = document.getElementById(elementId);
    const texto = elemento.textContent;
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(texto).then(function() {
        // Mostrar notificación de copiado
        mostrarNotificacion(mensaje);
    }).catch(function(err) {
        // Si falla, intentar método alternativo
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            mostrarNotificacion(mensaje);
        } catch (err) {
            alert('No se pudo copiar. Por favor, cópialo manualmente.');
        }
        
        document.body.removeChild(textArea);
    });
}

/* ============================================
   MOSTRAR NOTIFICACIÓN DE COPIADO
   ============================================ */

function mostrarNotificacion(mensaje) {
    const notification = document.getElementById('copyNotification');
    notification.textContent = mensaje;
    notification.classList.add('show');
    
    // Ocultar después de 2 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

/* ============================================
   ANIMACIONES SUAVES AL HACER SCROLL
   ============================================ */

// Observador para animar elementos cuando entran en la vista
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación de entrada a todas las secciones
window.addEventListener('load', function() {
    const sections = document.querySelectorAll('section, .divider');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

/* ============================================
   FUNCIÓN PARA PREVENIR ERRORES DE AUDIO
   ============================================ */

// Algunos navegadores requieren interacción del usuario antes de reproducir audio
document.addEventListener('DOMContentLoaded', function() {
    audioPlayer.volume = 0.5; // Volumen al 50%
    
    // Manejar errores de carga de audio
    audioPlayer.addEventListener('error', function() {
        console.log('Error al cargar el archivo de audio. Verifica la ruta del archivo.');
        playBtn.style.display = 'none'; // Ocultar botón si hay error
    });
});

/* ============================================
   EFECTO PARALLAX SUAVE EN MARIPOSAS Y FLORES
   ============================================ */

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const butterflies = document.querySelectorAll('.butterfly');
    const flowers = document.querySelectorAll('.flower');
    
    // Aplicar efecto parallax a las mariposas
    butterflies.forEach((butterfly, index) => {
        const speed = 0.5 + (index * 0.1);
        butterfly.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Aplicar efecto parallax a las flores emoji
    flowers.forEach((flower, index) => {
        const speed = 0.3 + (index * 0.05);
        flower.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});
