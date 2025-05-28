# Міні-бекенд для Angular проекту

Простий бекенд на Node.js з Express для роботи з Angular додатком.

## Встановлення

```bash
npm install
```

## Запуск

Для розробки (з автоперезавантаженням):

```bash
npm run dev
```

Для продакшену:

```bash
npm start
```

## API Endpoints

### Аутентифікація

- POST `/api/register` - Реєстрація нового користувача

  ```json
  {
    "username": "user123",
    "password": "password123",
    "email": "user@example.com",
    "fullName": "Іван Іванов",
    "dateOfBirth": "1990-01-25",
    "presentAddress": "Київ, Україна",
    "address": "Київ, Україна",
    "city": "Київ",
    "postalCode": "01001",
    "country": "Україна"
  }
  ```

- POST `/api/login` - Вхід в систему
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

### Профіль користувача

- GET `/api/profile` - Отримання профілю користувача

  ```json
  // Приклад відповіді
  {
    "id": "1234567890",
    "username": "user123",
    "email": "user@example.com",
    "profile": {
      "fullName": "Іван Іванов",
      "dateOfBirth": "1990-01-25",
      "presentAddress": "Київ, Україна",
      "address": "Київ, Україна",
      "city": "Київ",
      "postalCode": "01001",
      "country": "Україна",
      "avatarUrl": null,
      "createdAt": "2024-01-28T12:30:00Z",
      "updatedAt": "2024-01-28T12:30:00Z"
    }
  }
  ```

- PUT `/api/profile` - Оновлення профілю користувача

  ```json
  {
    "email": "new.email@example.com",
    "fullName": "Іван Іванов",
    "dateOfBirth": "1990-01-25",
    "presentAddress": "Нова адреса",
    "address": "Постійна адреса",
    "city": "Нове місто",
    "postalCode": "12345",
    "country": "Україна"
  }
  ```

- PUT `/api/profile/password` - Зміна пароля
  ```json
  {
    "currentPassword": "поточний_пароль",
    "newPassword": "новий_пароль"
  }
  ```

### Кредитні картки

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/cards` - Отримання списку карток користувача

  ```json
  // Приклад відповіді
  [
    {
      "id": "1234567890",
      "cardType": "Classic",
      "nameOnCard": "ІВАН ІВАНОВ",
      "cardNumber": "************1234",
      "expirationDate": "01/25"
    }
  ]
  ```

- POST `/api/cards` - Додавання нової картки
  ```json
  {
    "cardType": "Classic",
    "nameOnCard": "ІВАН ІВАНОВ",
    "cardNumber": "1234567890123456",
    "expirationDate": "01/25"
  }
  ```

### Транзакції

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/transactions` - Отримання списку транзакцій з фільтрацією

  ```
  Параметри запиту:
  - type: "income" | "expense" - фільтр за типом (дохід/витрата)
  - startDate: "YYYY-MM-DD" - початкова дата
  - endDate: "YYYY-MM-DD" - кінцева дата
  - minAmount: number - мінімальна сума
  - maxAmount: number - максимальна сума
  ```

  ```json
  // Приклад відповіді
  {
    "transactions": [
      {
        "id": "1234567890",
        "transactionId": "#ABC12345",
        "description": "Spotify Підписка",
        "type": "Shopping",
        "cardNumber": "************1234",
        "amount": -82.5,
        "date": "2024-01-28T12:30:00Z"
      }
    ],
    "summary": {
      "total": -82.5,
      "income": 0,
      "expense": 82.5
    }
  }
  ```

- POST `/api/transactions` - Додавання нової транзакції
  ```json
  {
    "description": "Spotify Підписка",
    "type": "Shopping",
    "cardId": "1234567890",
    "amount": -82.5,
    "date": "2024-01-28T12:30:00Z"
  }
  ```

### Кредити

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/loans` - Отримання списку кредитів

  ```
  Параметри запиту:
  - status: "active" | "completed" - фільтр за статусом кредиту
  ```

  ```json
  // Приклад відповіді
  {
    "loans": [
      {
        "id": "1234567890",
        "loanNumber": "L1A2B3C4",
        "amount": 100000,
        "duration": 12,
        "interestRate": 12,
        "status": "active",
        "paidAmount": 25000,
        "leftToRepay": 85000,
        "installment": 9166.67,
        "startDate": "2024-01-01T00:00:00Z",
        "nextPaymentDate": "2024-02-01T00:00:00Z"
      }
    ],
    "summary": {
      "totalAmount": 100000,
      "totalLeftToRepay": 85000,
      "totalMonthlyPayment": 9166.67
    }
  }
  ```

- POST `/api/loans` - Створення нового кредиту

  ```json
  {
    "amount": 100000,
    "duration": 12,
    "interestRate": 12
  }
  ```

- POST `/api/loans/:loanId/payment` - Внесення платежу за кредитом
  ```json
  {
    "amount": 9166.67
  }
  ```

## Налаштування

За замовчуванням сервер запускається на порту 3000.
Для зміни порту створіть файл `.env` і вкажіть в ньому:

```
PORT=ваш_порт
```
