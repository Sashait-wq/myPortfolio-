const bcrypt = require("bcryptjs");

// Генерация случайного числа в диапазоне
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Генерация случайной даты в диапазоне
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Украинские имена и фамилии
const firstNames = [
  "Олександр",
  "Максим",
  "Дмитро",
  "Данило",
  "Михайло",
  "Іван",
  "Артем",
  "Андрій",
  "Владислав",
  "Богдан",
];
const lastNames = [
  "Шевченко",
  "Бондаренко",
  "Ковальчук",
  "Мельник",
  "Коваленко",
  "Бойко",
  "Ткаченко",
  "Кравченко",
  "Олійник",
  "Шевчук",
];

// Украинские города
const cities = [
  "Київ",
  "Львів",
  "Харків",
  "Одеса",
  "Дніпро",
  "Запоріжжя",
  "Вінниця",
  "Полтава",
  "Черкаси",
  "Житомир",
];

// Типы карт
const cardTypes = ["Classic", "Gold", "Platinum", "World"];

// Типы транзакций
const transactionTypes = [
  "Продукти",
  "Комунальні послуги",
  "Розваги",
  "Транспорт",
  "Одяг",
  "Здоров'я",
  "Подарунки",
  "Техніка",
];

// Генерация случайного пользователя
const generateUser = async (index) => {
  const firstName = firstNames[randomInt(0, firstNames.length - 1)];
  const lastName = lastNames[randomInt(0, lastNames.length - 1)];
  const city = cities[randomInt(0, cities.length - 1)];

  const user = {
    id: Date.now().toString() + index,
    username: `user${index}`,
    password: await bcrypt.hash("password123", 10),
    email: `user${index}@example.com`,
    profile: {
      fullName: `${firstName} ${lastName}`,
      dateOfBirth: randomDate(new Date(1980, 0, 1), new Date(2000, 11, 31))
        .toISOString()
        .split("T")[0],
      presentAddress: `вул. ${lastName}а, ${randomInt(1, 100)}`,
      address: `вул. ${lastName}а, ${randomInt(1, 100)}`,
      city: city,
      postalCode: `${randomInt(10000, 99999)}`,
      country: "Україна",
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  return user;
};

// Генерация случайной карты
const generateCard = (userId, index) => {
  const cardNumber = Array.from({ length: 4 }, () =>
    randomInt(1000, 9999)
  ).join("");

  return {
    id: Date.now().toString() + index,
    userId: userId,
    cardType: cardTypes[randomInt(0, cardTypes.length - 1)],
    nameOnCard: `${firstNames[randomInt(0, firstNames.length - 1)]} ${
      lastNames[randomInt(0, lastNames.length - 1)]
    }`,
    cardNumber: cardNumber,
    expirationDate: `${randomInt(1, 12)
      .toString()
      .padStart(2, "0")}/${randomInt(24, 28)}`,
    createdAt: new Date().toISOString(),
  };
};

// Генерация случайной транзакции
const generateTransaction = (userId, cardId, cardNumber, index) => {
  const isIncome = Math.random() > 0.7;
  const amount = isIncome ? randomInt(1000, 15000) : -randomInt(100, 5000);

  return {
    id: Date.now().toString() + index,
    transactionId: "#" + Math.random().toString(36).substr(2, 8).toUpperCase(),
    userId: userId,
    description: transactionTypes[randomInt(0, transactionTypes.length - 1)],
    type: isIncome ? "Income" : "Expense",
    cardId: cardId,
    cardNumber: cardNumber.replace(/\d(?=\d{4})/g, "*"),
    amount: amount,
    date: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    createdAt: new Date().toISOString(),
  };
};

// Генерация случайного кредита
const generateLoan = (userId, index) => {
  const amount = randomInt(10000, 200000);
  const duration = randomInt(6, 36);
  const interestRate = randomInt(10, 25);
  const startDate = randomDate(new Date(2023, 0, 1), new Date());
  const paidAmount = randomInt(0, amount);

  return {
    id: Date.now().toString() + index,
    userId: userId,
    loanNumber: "L" + Math.random().toString(36).substr(2, 8).toUpperCase(),
    amount: amount,
    duration: duration,
    interestRate: interestRate,
    status: paidAmount >= amount ? "completed" : "active",
    paidAmount: paidAmount,
    startDate: startDate.toISOString(),
    nextPaymentDate: new Date(
      startDate.getTime() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    createdAt: new Date().toISOString(),
  };
};

module.exports = {
  generateUser,
  generateCard,
  generateTransaction,
  generateLoan,
};
