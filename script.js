// Данные номеров
const roomsData = [
    {
        id: 1,
        category: 'standard',
        categoryName: 'Standard',
        price: 5000,
        characteristics: '2 спальных места, TV, Wi-Fi, душ',
        image: 'img/room-standard-1.png'
    },
    {
        id: 2,
        category: 'lux',
        categoryName: 'Lux',
        price: 8500,
        characteristics: '2 спальных места, TV, Wi-Fi, ванна, мини-бар',
        image: 'img/room-lux-1.png'
    },
    {
        id: 3,
        category: 'premium',
        categoryName: 'Premium',
        price: 12000,
        characteristics: '3 спальных места, TV, Wi-Fi, джакузи, балкон',
        image: 'img/room-premium-1.png'
    },
    {
        id: 4,
        category: 'lux',
        categoryName: 'Lux',
        price: 15000,
        characteristics: '4 спальных места, гостиная, TV, Wi-Fi, мини-бар, вид на море',
        image: 'img/room-lux-2.png'
    },
    {
        id: 5,
        category: 'standard',
        categoryName: 'Standard',
        price: 5500,
        characteristics: '2 спальных места, TV, Wi-Fi, кондиционер',
        image: 'img/room-standard-2.png'
    },
    {
        id: 6,
        category: 'premium',
        categoryName: 'Premium',
        price: 13000,
        characteristics: '2 спальных места, TV, Wi-Fi, сауна, завтрак',
        image: 'img/room-premium-1.png'
    }
];

let currentRoom = null;

// Отображение номеров
function displayRooms(rooms) {
    const grid = document.getElementById('rooms-grid');
    grid.innerHTML = '';

    rooms.forEach(room => {
        const card = document.createElement('div');
        card.className = 'room-card';
        
        card.innerHTML = `
            <div class="room-image">
                <img src="${room.image}" alt="${room.categoryName}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ecf0f1%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%237f8c8d%22 x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2216%22>Фото номера ${room.id}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="room-info">
                <div class="room-category">${room.categoryName}</div>
                <div class="room-price">${room.price.toLocaleString()} ₽/ночь</div>
                <div class="room-characteristics">${room.characteristics}</div>
                <button class="btn btn-blue" onclick="openBooking(${room.id})">
                    Забронировать
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Применение фильтра
function applyFilter() {
    const filter = document.getElementById('category-filter').value;
    
    if (filter === 'all') {
        displayRooms(roomsData);
    } else {
        const filtered = roomsData.filter(room => room.category === filter);
        displayRooms(filtered);
    }
}

// Сброс фильтра
function resetFilter() {
    document.getElementById('category-filter').value = 'all';
    displayRooms(roomsData);
}

// Открытие страницы бронирования
function openBooking(roomId) {
    currentRoom = roomsData.find(r => r.id === roomId);
    document.getElementById('catalog-page').classList.add('hidden');
    document.getElementById('booking-page').classList.add('active');
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('booking-form').reset();
    
    // Очищаем все ошибки
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.style.display = 'none';
    });
    
    window.scrollTo(0, 0);
}

// Возврат к каталогу
function goBack() {
    document.getElementById('booking-page').classList.remove('active');
    document.getElementById('catalog-page').classList.remove('hidden');
    currentRoom = null;
}

// Валидация имени (кириллица, пробелы, точки, тире)
function validateName(name) {
    const regex = /^[а-яА-ЯёЁ\s.\-]+$/;
    return regex.test(name);
}

// Валидация телефона (формат +7(XXX)XXX-XX-XX)
// ИСПРАВЛЕНО: добавлены экранирования \+ и \(
function validatePhone(phone) {
    const regex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    return regex.test(phone);
}

// Валидация email
// ИСПРАВЛЕНО: добавлено экранирование \.
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Валидация даты (формат ДД.ММ.ГГГГ)
// ИСПРАВЛЕНО: добавлено экранирование \.
function validateDate(date) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(date)) return false;
    
    const parts = date.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getDate() === day && 
           dateObj.getMonth() === month - 1 && 
           dateObj.getFullYear() === year;
}

// Отправка формы
function submitBooking(event) {
    event.preventDefault();
    
    let isValid = true;
    
    // Валидация имени
    const name = document.getElementById('name');
    if (!validateName(name.value.trim())) {
        name.classList.add('error');
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    } else {
        name.classList.remove('error');
        name.classList.add('success');
        document.getElementById('name-error').style.display = 'none';
    }
    
    // Валидация фамилии
    const surname = document.getElementById('surname');
    if (!validateName(surname.value.trim())) {
        surname.classList.add('error');
        document.getElementById('surname-error').style.display = 'block';
        isValid = false;
    } else {
        surname.classList.remove('error');
        surname.classList.add('success');
        document.getElementById('surname-error').style.display = 'none';
    }
    
    // Валидация телефона
    const phone = document.getElementById('phone');
    if (!validatePhone(phone.value)) {
        phone.classList.add('error');
        document.getElementById('phone-error').style.display = 'block';
        isValid = false;
    } else {
        phone.classList.remove('error');
        phone.classList.add('success');
        document.getElementById('phone-error').style.display = 'none';
    }
    
    // Валидация email
    const email = document.getElementById('email');
    if (!validateEmail(email.value.trim())) {
        email.classList.add('error');
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else {
        email.classList.remove('error');
        email.classList.add('success');
        document.getElementById('email-error').style.display = 'none';
    }
    
    // Валидация даты заезда
    const checkin = document.getElementById('checkin');
    if (!validateDate(checkin.value)) {
        checkin.classList.add('error');
        document.getElementById('checkin-error').style.display = 'block';
        isValid = false;
    } else {
        checkin.classList.remove('error');
        checkin.classList.add('success');
        document.getElementById('checkin-error').style.display = 'none';
    }
    
    // Валидация даты выезда
    const checkout = document.getElementById('checkout');
    if (!validateDate(checkout.value)) {
        checkout.classList.add('error');
        document.getElementById('checkout-error').style.display = 'block';
        isValid = false;
    } else {
        checkout.classList.remove('error');
        checkout.classList.add('success');
        document.getElementById('checkout-error').style.display = 'none';
    }
    
    if (isValid) {
        // Показываем сообщение об успехе
        document.getElementById('success-message').style.display = 'block';
        
        // Очищаем форму
        document.getElementById('booking-form').reset();
        document.querySelectorAll('.form-group input').forEach(input => {
            input.classList.remove('success');
        });
        
        // Прокручиваем к сообщению
        document.getElementById('success-message').scrollIntoView({ behavior: 'smooth' });
        
        // Через 3 секунды возвращаемся к каталогу
        setTimeout(() => {
            goBack();
        }, 3000);
    }
}

// Сохранение скриншота (упрощенная версия)
function saveScreenshot() {
    alert('Для сохранения скриншота:\n\n' +
          '1. Нажмите Ctrl+Shift+S (Firefox)\n' +
          '2. Или используйте Print Screen\n' +
          '3. Или сделайте скриншот через систему (Win+Shift+S)\n\n' +
          'Функция автоматического сохранения требует подключения библиотеки html2canvas');
}

// Маска для телефона
function setupPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formattedValue = '+7';
                
                if (value.length > 0) {
                    formattedValue += '(' + value.substring(0, 3);
                }
                if (value.length >= 3) {
                    formattedValue += ')' + value.substring(3, 6);
                }
                if (value.length >= 6) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                if (value.length >= 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                e.target.value = formattedValue;
            }
        });
        
        // Удаляем символы при фокусе для удобного редактирования
        phoneInput.addEventListener('focus', function(e) {
            if (e.target.value === '+7()--') {
                e.target.value = '';
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Отображаем все номера
    displayRooms(roomsData);
    
    // Настраиваем маску для телефона
    setupPhoneMask();
    
    console.log('Сервис бронирования загружен успешно!');
});