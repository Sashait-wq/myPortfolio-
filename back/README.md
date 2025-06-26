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

  ```typescript
  // Request
  interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    fullName?: string;
    dateOfBirth?: string;
    presentAddress?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }
  // Response
  interface RegisterResponse {
    message: string;
    user: {
      id: string;
      username: string;
      email: string;
      profile: UserProfile;
    };
  }
  interface UserProfile {
    fullName: string;
    dateOfBirth: string | null;
    presentAddress: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
  }
  ```

- POST `/api/login` - Вхід в систему
  ```typescript
  // Request
  interface LoginRequest {
    username: string;
    password: string;
  }
  // Response
  interface LoginResponse {
    token: string;
    user: {
      id: string;
      username: string;
    };
  }
  ```

### Профіль користувача

- GET `/api/profile` - Отримання профілю користувача

  ```typescript
  // Response
  interface ProfileResponse {
    id: string;
    username: string;
    email: string;
    profile: UserProfile;
  }
  ```

- PUT `/api/profile` - Оновлення профілю користувача

  ```typescript
  // Request
  interface UpdateProfileRequest {
    email?: string;
    fullName?: string;
    dateOfBirth?: string;
    presentAddress?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }
  // Response
  interface UpdateProfileResponse {
    message: string;
    user: {
      id: string;
      username: string;
      email: string;
      profile: UserProfile;
    };
  }
  ```

- PUT `/api/profile/password` - Зміна пароля
  ```typescript
  // Request
  interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
  }
  // Response
  interface ChangePasswordResponse {
    message: string;
  }
  ```

### Кредитні картки

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/cards` - Отримання списку карток користувача

  ```typescript
  // Response
  export interface Card {
    id: string;
    cardType: string;
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
    createdAt?: string;
    userId?: string;
  }
  export type GetCardsResponse = Card[];
  ```

- POST `/api/cards` - Додавання нової картки
  ```typescript
  // Request
  interface AddCardRequest {
    cardType: string;
    nameOnCard: string;
    cardNumber: string;
    expirationDate: string;
  }
  // Response
  type AddCardResponse = Card;
  ```

### Транзакції

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/transactions` - Отримання списку транзакцій з фільтрацією

  ```typescript
  // Query params
  interface GetTransactionsQuery {
    type?: "income" | "expense";
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
  }
  // Response
  export interface Transaction {
    id: string;
    transactionId: string;
    description: string;
    type: string;
    cardId?: string;
    cardNumber?: string;
    amount: number;
    date: string;
    createdAt?: string;
    userId?: string;
    loanId?: string;
  }
  export interface TransactionsSummary {
    total: number;
    income: number;
    expense: number;
  }
  export interface GetTransactionsResponse {
    transactions: Transaction[];
    summary: TransactionsSummary;
  }
  ```

- POST `/api/transactions` - Додавання нової транзакції
  ```typescript
  // Request
  interface AddTransactionRequest {
    description: string;
    type: string;
    cardId: string;
    amount: number;
    date: string;
  }
  // Response
  type AddTransactionResponse = Transaction;
  ```

### Кредити

Всі endpoints потребують авторизацію (Bearer token)

- GET `/api/loans` - Отримання списку кредитів

  ```typescript
  // Query params
  export interface GetLoansQuery {
    status?: "active" | "completed";
  }
  export interface Loan {
    id: string;
    userId: string;
    loanNumber: string;
    amount: number;
    duration: number;
    interestRate: number;
    status: string;
    paidAmount: number;
    leftToRepay: number;
    installment: number;
    startDate: string;
    nextPaymentDate: string;
    createdAt?: string;
  }
  export interface LoansSummary {
    totalAmount: number;
    totalLeftToRepay: number;
    totalMonthlyPayment: number;
  }
  export interface GetLoansResponse {
    loans: Loan[];
    summary: LoansSummary;
  }
  ```

- POST `/api/loans` - Створення нового кредиту
  ```typescript
  // Request
  interface CreateLoanRequest {
    amount: number;
    duration: number;
    interestRate: number;
  }
  // Response
  interface CreateLoanResponse extends Loan {
    leftToRepay: number;
    installment: number;
  }
  ```

- POST `/api/loans/:loanId/payment` - Внесення платежу за кредитом
  ```typescript
  // Request
  interface LoanPaymentRequest {
    amount: number;
  }
  // Response
  interface LoanPaymentResponse {
    message: string;
    loan: Loan & { leftToRepay: number; installment: number };
    transaction: Transaction;
  }
  ```

### Додаткові ендпоінти

- GET `/api/users` — Отримання списку всіх користувачів (без паролів)

  ```typescript
  // Response
  export interface GetUsersResponse {
    users: Array<{
      id: string;
      username: string;
      email: string;
      profile: UserProfile;
    }>;
  }
  ```

- GET `/api/test` — Тестовий маршрут (для перевірки роботи бекенду)

  ```typescript
  // Response
  export interface TestResponse {
    message: string;
  }
  ```

- GET `/api/dashboard` — Дашборд користувача (агреговані дані, потрібен Bearer token)

  ```typescript
  // Response
  export interface DashboardCard extends Card {
    balance: number;
  }
  export interface DashboardTransaction extends Transaction {}
  export interface WeeklyActivity {
    days: string[];
    deposit: number[];
    withdraw: number[];
  }
  export interface ExpenseStat {
    category: string;
    percent: number;
  }
  export interface QuickTransfer {
    name: string;
    count: number;
  }
  export interface BalanceHistory {
    month: string;
    balance: number;
  }
  export interface DashboardResponse {
    cards: DashboardCard[];
    recentTransactions: DashboardTransaction[];
    balance: number;
    weeklyActivity: WeeklyActivity;
    expenseStats: ExpenseStat[];
    quickTransfer: QuickTransfer[];
    balanceHistory: BalanceHistory[];
  }
  ```

## Налаштування

За замовчуванням сервер запускається на порту 3000.
Для зміни порту створіть файл `.env` і вкажіть в ньому:

```
PORT=ваш_порт
```

## Примітки

- Для всіх ендпоінтів, окрім `/api/register`, `/api/login`, `/api/users`, `/api/test`, потрібен Bearer token (авторизація).
- Всі дати повертаються у форматі ISO 8601.
- У разі помилки API повертає об'єкт з ключем `message` та описом помилки.
