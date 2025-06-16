require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authMiddleware, JWT_SECRET } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;
const USERS_FILE = "./users.json";
const CARDS_FILE = "./cards.json";
const TRANSACTIONS_FILE = "./transactions.json";
const LOANS_FILE = "./loans.json";

// Middleware
app.use(cors());
app.use(express.json());

// Вспомогательные функции для работы с файлами
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readCards() {
  try {
    const data = await fs.readFile(CARDS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { cards: [] };
  }
}

async function writeCards(cards) {
  await fs.writeFile(CARDS_FILE, JSON.stringify(cards, null, 2));
}

async function readTransactions() {
  try {
    const data = await fs.readFile(TRANSACTIONS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { transactions: [] };
  }
}

async function writeTransactions(transactions) {
  await fs.writeFile(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
}

async function readLoans() {
  try {
    const data = await fs.readFile(LOANS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { loans: [] };
  }
}

async function writeLoans(loans) {
  await fs.writeFile(LOANS_FILE, JSON.stringify(loans, null, 2));
}

// Функция для маскировки номера карты
function maskCardNumber(cardNumber) {
  return cardNumber.replace(/\d(?=\d{4})/g, "*");
}

// Регистрация с расширенным профилем
app.post("/api/register", async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      fullName,
      dateOfBirth,
      presentAddress,
      address,
      city,
      postalCode,
      country,
    } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Необхідно вказати ім'я користувача, пароль та email",
      });
    }

    const usersData = await readUsers();

    if (usersData.users.some((user) => user.username === username)) {
      return res.status(400).json({ message: "Користувач вже існує" });
    }

    if (usersData.users.some((user) => user.email === email)) {
      return res.status(400).json({ message: "Email вже використовується" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      username,
      password: password,
      email,
      profile: {
        fullName: fullName || username,
        dateOfBirth: dateOfBirth || null,
        presentAddress: presentAddress || "",
        address: address || "",
        city: city || "",
        postalCode: postalCode || "",
        country: country || "",
        avatarUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    usersData.users.push(newUser);
    await writeUsers(usersData);

    res.status(201).json({
      message: "Користувача успішно зареєстровано",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profile: {
          ...newUser.profile,
          password: undefined,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при реєстрації" });
  }
});

// Логин
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });
    const usersData = await readUsers();
    const user = usersData.users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "Невірні облікові дані" });
    }
    const isValidPassword = password === user.password;

    if (!isValidPassword) {
      return res.status(401).json({ message: "Невірні облікові дані" });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Помилка при вході" });
  }
});
// Получение карт пользователя
app.get("/api/cards", authMiddleware, async (req, res) => {
  try {
    const cardsData = await readCards();
    const userCards = cardsData.cards
      .filter((card) => card.userId === req.user.userId)
      .map((card) => ({
        ...card,
        cardNumber: maskCardNumber(card.cardNumber),
      }));

    res.json(userCards);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні карток" });
  }
});

// Добавление новой карты
app.post("/api/cards", authMiddleware, async (req, res) => {
  try {
    const { cardType, nameOnCard, cardNumber, expirationDate } = req.body;

    if (!cardType || !nameOnCard || !cardNumber || !expirationDate) {
      return res.status(400).json({
        message: "Необхідно вказати всі дані картки",
      });
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      return res.status(400).json({
        message: "Невірний формат номера картки",
      });
    }

    const cardsData = await readCards();

    if (cardsData.cards.some((card) => card.cardNumber === cardNumber)) {
      return res.status(400).json({
        message: "Така картка вже існує",
      });
    }

    const newCard = {
      id: Date.now().toString(),
      userId: req.user.userId,
      cardType,
      nameOnCard,
      cardNumber,
      expirationDate,
      createdAt: new Date().toISOString(),
    };

    cardsData.cards.push(newCard);
    await writeCards(cardsData);

    res.status(201).json({
      ...newCard,
      cardNumber: maskCardNumber(cardNumber),
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при додаванні картки" });
  }
});

// Добавление транзакции
app.post("/api/transactions", authMiddleware, async (req, res) => {
  try {
    const { description, type, cardId, amount, date } = req.body;

    if (!description || !type || !cardId || !amount || !date) {
      return res.status(400).json({
        message: "Необхідно вказати всі дані транзакції",
      });
    }

    // Проверяем существование карты и принадлежность пользователю
    const cardsData = await readCards();
    const card = cardsData.cards.find(
      (c) => c.id === cardId && c.userId === req.user.userId,
    );

    if (!card) {
      return res.status(404).json({
        message: "Картку не знайдено",
      });
    }

    const transactionsData = await readTransactions();

    const newTransaction = {
      id: Date.now().toString(),
      transactionId:
        "#" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      userId: req.user.userId,
      description,
      type,
      cardId,
      cardNumber: maskCardNumber(card.cardNumber),
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      createdAt: new Date().toISOString(),
    };

    transactionsData.transactions.push(newTransaction);
    await writeTransactions(transactionsData);

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Помилка при додаванні транзакції" });
  }
});

// Получение транзакций с фильтрацией
app.get("/api/transactions", authMiddleware, async (req, res) => {
  try {
    const { type, startDate, endDate, minAmount, maxAmount } = req.query;

    const transactionsData = await readTransactions();
    let userTransactions = transactionsData.transactions.filter(
      (transaction) => transaction.userId === req.user.userId,
    );

    // Применяем фильтры
    if (type) {
      switch (type) {
        case "income":
          userTransactions = userTransactions.filter((t) => t.amount > 0);
          break;
        case "expense":
          userTransactions = userTransactions.filter((t) => t.amount < 0);
          break;
      }
    }

    if (startDate) {
      userTransactions = userTransactions.filter(
        (t) => new Date(t.date) >= new Date(startDate),
      );
    }

    if (endDate) {
      userTransactions = userTransactions.filter(
        (t) => new Date(t.date) <= new Date(endDate),
      );
    }

    if (minAmount) {
      userTransactions = userTransactions.filter(
        (t) => Math.abs(t.amount) >= parseFloat(minAmount),
      );
    }

    if (maxAmount) {
      userTransactions = userTransactions.filter(
        (t) => Math.abs(t.amount) <= parseFloat(maxAmount),
      );
    }

    // Сортируем по дате (новые сверху)
    userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      transactions: userTransactions,
      summary: {
        total: userTransactions.reduce((sum, t) => sum + t.amount, 0),
        income: userTransactions
          .filter((t) => t.amount > 0)
          .reduce((sum, t) => sum + t.amount, 0),
        expense: Math.abs(
          userTransactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0),
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні транзакцій" });
  }
});

// Получение активных кредитов пользователя
app.get("/api/loans", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    const loansData = await readLoans();
    let userLoans = loansData.loans.filter(
      (loan) => loan.userId === req.user.userId,
    );

    // Фильтрация по статусу
    if (status) {
      userLoans = userLoans.filter((loan) => loan.status === status);
    }

    // Добавляем расчетные поля
    userLoans = userLoans.map((loan) => {
      const monthlyInterest = (loan.amount * (loan.interestRate / 100)) / 12;
      const totalAmount = loan.amount + monthlyInterest * loan.duration;
      const leftToRepay = totalAmount - loan.paidAmount;

      return {
        ...loan,
        leftToRepay: Math.round(leftToRepay * 100) / 100,
        installment: Math.round((totalAmount / loan.duration) * 100) / 100,
      };
    });

    // Считаем общую статистику
    const totalStats = userLoans.reduce(
      (acc, loan) => {
        acc.totalAmount += loan.amount;
        acc.totalLeftToRepay += loan.leftToRepay;
        acc.totalMonthlyPayment += loan.installment;
        return acc;
      },
      {
        totalAmount: 0,
        totalLeftToRepay: 0,
        totalMonthlyPayment: 0,
      },
    );

    res.json({
      loans: userLoans,
      summary: {
        totalAmount: Math.round(totalStats.totalAmount * 100) / 100,
        totalLeftToRepay: Math.round(totalStats.totalLeftToRepay * 100) / 100,
        totalMonthlyPayment:
          Math.round(totalStats.totalMonthlyPayment * 100) / 100,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні кредитів" });
  }
});

// Добавление нового кредита
app.post("/api/loans", authMiddleware, async (req, res) => {
  try {
    const { amount, duration, interestRate } = req.body;

    if (!amount || !duration || !interestRate) {
      return res.status(400).json({
        message: "Необхідно вказати суму, термін та відсоткову ставку кредиту",
      });
    }

    const loansData = await readLoans();

    const newLoan = {
      id: Date.now().toString(),
      userId: req.user.userId,
      loanNumber: "L" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      amount: parseFloat(amount),
      duration: parseInt(duration),
      interestRate: parseFloat(interestRate),
      status: "active",
      paidAmount: 0,
      startDate: new Date().toISOString(),
      nextPaymentDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      createdAt: new Date().toISOString(),
    };

    loansData.loans.push(newLoan);
    await writeLoans(loansData);

    // Рассчитываем дополнительные поля
    const monthlyInterest =
      (newLoan.amount * (newLoan.interestRate / 100)) / 12;
    const totalAmount = newLoan.amount + monthlyInterest * newLoan.duration;

    res.status(201).json({
      ...newLoan,
      leftToRepay: totalAmount,
      installment: Math.round((totalAmount / newLoan.duration) * 100) / 100,
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при створенні кредиту" });
  }
});

// Внесение платежа по кредиту
app.post("/api/loans/:loanId/payment", authMiddleware, async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Необхідно вказати суму платежу",
      });
    }

    const loansData = await readLoans();
    const loanIndex = loansData.loans.findIndex(
      (loan) => loan.id === loanId && loan.userId === req.user.userId,
    );

    if (loanIndex === -1) {
      return res.status(404).json({
        message: "Кредит не знайдено",
      });
    }

    const loan = loansData.loans[loanIndex];

    // Обновляем информацию о платеже
    loan.paidAmount += parseFloat(amount);
    loan.nextPaymentDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toISOString();

    // Проверяем, погашен ли кредит полностью
    const monthlyInterest = (loan.amount * (loan.interestRate / 100)) / 12;
    const totalAmount = loan.amount + monthlyInterest * loan.duration;

    if (loan.paidAmount >= totalAmount) {
      loan.status = "completed";
    }

    await writeLoans(loansData);

    // Создаем транзакцию для платежа
    const transactionsData = await readTransactions();
    const paymentTransaction = {
      id: Date.now().toString(),
      transactionId:
        "#" + Math.random().toString(36).substr(2, 8).toUpperCase(),
      userId: req.user.userId,
      description: `Платіж за кредитом ${loan.loanNumber}`,
      type: "Loan Payment",
      amount: -parseFloat(amount),
      date: new Date().toISOString(),
      loanId: loan.id,
      createdAt: new Date().toISOString(),
    };

    transactionsData.transactions.push(paymentTransaction);
    await writeTransactions(transactionsData);

    res.json({
      message: "Платіж успішно внесено",
      loan: {
        ...loan,
        leftToRepay: totalAmount - loan.paidAmount,
        installment: Math.round((totalAmount / loan.duration) * 100) / 100,
      },
      transaction: paymentTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при внесенні платежу" });
  }
});

// Получение профиля пользователя
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const usersData = await readUsers();
    const user = usersData.users.find((u) => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profile: {
        ...user.profile,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні профілю" });
  }
});

// Обновление профиля пользователя
app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    const {
      email,
      fullName,
      dateOfBirth,
      presentAddress,
      address,
      city,
      postalCode,
      country,
    } = req.body;

    const usersData = await readUsers();
    const userIndex = usersData.users.findIndex(
      (u) => u.id === req.user.userId,
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const user = usersData.users[userIndex];

    // Проверка email на уникальность, если он изменился
    if (email && email !== user.email) {
      if (usersData.users.some((u) => u.id !== user.id && u.email === email)) {
        return res.status(400).json({ message: "Email вже використовується" });
      }
      user.email = email;
    }

    // Обновляем профиль
    user.profile = {
      ...user.profile,
      fullName: fullName || user.profile.fullName,
      dateOfBirth: dateOfBirth || user.profile.dateOfBirth,
      presentAddress: presentAddress || user.profile.presentAddress,
      address: address || user.profile.address,
      city: city || user.profile.city,
      postalCode: postalCode || user.profile.postalCode,
      country: country || user.profile.country,
      updatedAt: new Date().toISOString(),
    };

    await writeUsers(usersData);

    res.json({
      message: "Профіль успішно оновлено",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile: {
          ...user.profile,
          password: undefined,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні профілю" });
  }
});

// Изменение пароля
app.put("/api/profile/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Необхідно вказати поточний та новий пароль",
      });
    }

    const usersData = await readUsers();
    const userIndex = usersData.users.findIndex(
      (u) => u.id === req.user.userId,
    );

    if (userIndex === -1) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const user = usersData.users[userIndex];

    // Проверяем текущий пароль
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Невірний поточний пароль" });
    }

    // Хешируем и сохраняем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.profile.updatedAt = new Date().toISOString();

    await writeUsers(usersData);

    res.json({ message: "Пароль успішно змінено" });
  } catch (error) {
    res.status(500).json({ message: "Помилка при зміні пароля" });
  }
});

// Получение списка пользователей (моковые данные, без паролей)
app.get("/api/users", async (req, res) => {
  try {
    const usersData = await readUsers();
    // Возвращаем только id, username, email и профиль (без пароля)
    const users = usersData.users.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      profile: u.profile,
    }));
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении пользователей" });
  }
});

// Тестовый маршрут
app.get("/api/test", (req, res) => {
  res.json({ message: "Бэкенд работает!" });
});

// Дашборд: агрегированные данные пользователя
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const cardsData = await readCards();
    const userCards = cardsData.cards.filter(card => card.userId === req.user.userId);
    const transactionsData = await readTransactions();
    const userTransactions = transactionsData.transactions.filter(t => t.userId === req.user.userId);
    const balance = userTransactions.reduce((sum, t) => sum + t.amount, 0);
    const recentTransactions = [...userTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map(t => ({
        id: t.id,
        description: t.description,
        type: t.type,
        amount: t.amount,
        date: t.date,
        cardNumber: t.cardNumber || null
      }));
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyActivity = {
      days: weekDays,
      deposit: Array(7).fill(0),
      withdraw: Array(7).fill(0),
    };
    userTransactions.forEach(t => {
      const day = new Date(t.date).getDay();
      if (t.amount > 0) weeklyActivity.deposit[day] += t.amount;
      if (t.amount < 0) weeklyActivity.withdraw[day] += Math.abs(t.amount);
    });
    const categoryMap = {};
    let totalExpense = 0;
    userTransactions.forEach(t => {
      if (t.amount < 0) {
        const cat = t.type || "Others";
        categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(t.amount);
        totalExpense += Math.abs(t.amount);
      }
    });
    const expenseStats = Object.entries(categoryMap).map(([category, value]) => ({
      category,
      percent: totalExpense ? Math.round((value / totalExpense) * 100) : 0,
    }));
    const transferMap = {};
    userTransactions.forEach(t => {
      if ((t.type || "").toLowerCase().includes("transfer") && t.description) {
        transferMap[t.description] = (transferMap[t.description] || 0) + 1;
      }
    });
    const quickTransfer = Object.entries(transferMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
    const balanceHistoryMap = {};
    userTransactions.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
      balanceHistoryMap[key] = (balanceHistoryMap[key] || 0) + t.amount;
    });
    const months = Object.keys(balanceHistoryMap).sort();
    const balanceHistory = months.map(month => ({
      month,
      balance: Math.round(balanceHistoryMap[month] * 100) / 100,
    }));
    res.json({
      cards: userCards.map(card => ({
        id: card.id,
        cardType: card.cardType,
        nameOnCard: card.nameOnCard,
        cardNumber: maskCardNumber(card.cardNumber),
        expirationDate: card.expirationDate,
        balance: balance,
      })),
      recentTransactions,
      balance: Math.round(balance * 100) / 100,
      weeklyActivity,
      expenseStats,
      quickTransfer,
      balanceHistory,
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных дашборда" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
