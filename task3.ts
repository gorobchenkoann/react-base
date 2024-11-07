// Типы
type DateNullable = Date | null | undefined;
type canWithdrawFuncType = (a: number, b: number) => boolean;
// --Типы
  
// Интерфейсы
interface Account {
  accountNumber: string, //номер счета
  balance: number, //баланс
  replenish(amount: number): void, //пополнение счета
  withdraw(amount: number): void, //снятие средств
  checkBalance(): void,
}
// --Интерфейсы

// Вспомогательная функция для проверки возможности снятия средств
const canWithdraw: canWithdrawFuncType = (amount: number, balance: number) => {
  console.log(`Снять ${amount}р.`);
  
  if (amount <= 0) {
    console.log('Введите корректную сумму для снятия.');
    return false;
  } else if (amount > balance) {
    console.log(`Недостаточно средств.`);
    return false;
  } else {
    return true;
  }
}
// --


// Классы, имплементирующие интерфейсы

//Дебетовый счет
class DebitAccount implements Account {
  readonly accountNumber: string;
  balance: number;
  
  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    console.log(`Создан счёт №${this.accountNumber}.`);
  }

  replenish(amount: number) {
    if (amount <= 0) {
      console.log('Введите корректную сумму');
    } else {
      this.balance = this.balance + amount;
      console.log(`Вы пополнили счёт на ${amount}р.`);
    }
  }

  withdraw(amount: number) {
    const isAmountValid = canWithdraw(amount, this.balance);
    
    if (isAmountValid) {
      this.balance = this.balance - amount;
      console.log(`Вы сняли со счёта ${amount}р.`)
    }
  }

  checkBalance() {
    console.log(`Ваш баланс: ${this.balance}р.`)
  }
}

const debitAccount = new DebitAccount('123456789'); // Создание дебетового счёта
debitAccount.replenish(4000); // Пополнение баланса
debitAccount.checkBalance();
debitAccount.withdraw(5000); // Попытка снять сумму, которая больше, чем баланс
debitAccount.withdraw(-5000); // Попытка снять отрицательную сумму
debitAccount.withdraw(500); // Корректное пополнение баланса
debitAccount.checkBalance();

// Кредитный счет
class CreditAccount implements Account {
  readonly accountNumber: string;  
  private debt: number;
  private nextPayment: DateNullable;
  balance: number;

  constructor(accountNumber: string, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.debt = 0;
    this.nextPayment = null;
    console.log(`Создан счёт №${this.accountNumber}.`)
  }

  replenish(amount: number) {
    if (amount <= 0) {
      console.log('Введите корректную сумму');
    } else {
      this.balance = this.balance + amount;
      this.debt = amount > this.debt ? 0 : this.debt - amount;
    }
    
    if (this.nextPayment && !this.debt) this.nextPayment = null;

    console.log(`Вы пополнили счёт на ${amount}р.`);
  }

  withdraw(amount: number) {
    const isAmountValid = canWithdraw(amount, this.balance);    
    if (!isAmountValid) return;
    
    this.balance = this.balance - amount;
    this.debt = this.debt + amount;
    
    if (!this.nextPayment) {
      const nextPayment = new Date();
      nextPayment.setDate(nextPayment.getDate() + 50);
      this.nextPayment = nextPayment;
    }

    console.log(`Вы сняли ${amount}р.`);
  }

  checkBalance() {
    console.log(`Ваш баланс составляет ${this.balance}р.`);
    
    if (this.debt) {
      console.log(`Ваша задолженность составляет ${this.debt}р.`);
      console.log(`Необходимо оплатить долг до ${this.nextPayment?.toLocaleDateString()}`);
    }
  }
}

const creditAccount = new CreditAccount('543219876', 120000); // Создание кредитного счёта с лимитом 120000
creditAccount.withdraw(40000); // Снятие со счёта
creditAccount.checkBalance();
creditAccount.withdraw(-40000); // Снятие отрицательной суммы
creditAccount.replenish(10000); // Пополнение счёта
creditAccount.checkBalance();
creditAccount.replenish(30000); // Пополнение до закрытия долга
creditAccount.checkBalance();
// --Классы, имплементирующие интерфейсы

