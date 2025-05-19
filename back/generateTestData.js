const fs = require('fs').promises;
const { 
  generateUser, 
  generateCard, 
  generateTransaction, 
  generateLoan 
} = require('./testData');

async function generateTestData() {
  try {
    // Генерируем 5 пользователей
    const users = [];
    for (let i = 1; i <= 5; i++) {
      const user = await generateUser(i);
      users.push(user);
    }
    await fs.writeFile('users.json', JSON.stringify({ users }, null, 2));
    console.log('✓ Користувачів створено');

    // Генерируем карты для каждого пользователя (2-4 карты)
    const cards = [];
    for (const user of users) {
      const numCards = Math.floor(Math.random() * 3) + 2; // 2-4 карты
      for (let i = 0; i < numCards; i++) {
        const card = generateCard(user.id, cards.length);
        cards.push(card);
      }
    }
    await fs.writeFile('cards.json', JSON.stringify({ cards }, null, 2));
    console.log('✓ Картки створено');

    // Генерируем транзакции для каждой карты (5-10 транзакций)
    const transactions = [];
    for (const card of cards) {
      const numTransactions = Math.floor(Math.random() * 6) + 5; // 5-10 транзакций
      for (let i = 0; i < numTransactions; i++) {
        const transaction = generateTransaction(
          card.userId, 
          card.id, 
          card.cardNumber, 
          transactions.length
        );
        transactions.push(transaction);
      }
    }
    await fs.writeFile('transactions.json', JSON.stringify({ transactions }, null, 2));
    console.log('✓ Транзакції створено');

    // Генерируем кредиты для каждого пользователя (0-2 кредита)
    const loans = [];
    for (const user of users) {
      const numLoans = Math.floor(Math.random() * 3); // 0-2 кредита
      for (let i = 0; i < numLoans; i++) {
        const loan = generateLoan(user.id, loans.length);
        loans.push(loan);
      }
    }
    await fs.writeFile('loans.json', JSON.stringify({ loans }, null, 2));
    console.log('✓ Кредити створено');

    console.log('\nТестові дані успішно згенеровано!');
    console.log(`Створено:\n- ${users.length} користувачів\n- ${cards.length} карток\n- ${transactions.length} транзакцій\n- ${loans.length} кредитів`);
    
    // Выводим данные для тестового входа
    console.log('\nДані для входу в систему:');
    users.forEach(user => {
      console.log(`\nКористувач: ${user.username}`);
      console.log(`Пароль: password123`);
      console.log(`Email: ${user.email}`);
      console.log(`Ім'я: ${user.profile.fullName}`);
      console.log(`Місто: ${user.profile.city}`);
    });

  } catch (error) {
    console.error('Помилка при генерації тестових даних:', error);
  }
}

generateTestData(); 