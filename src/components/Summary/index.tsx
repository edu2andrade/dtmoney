import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg'

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return(
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="income img" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Expenses</p>
          <img src={outcomeImg} alt="outcome img" />
        </header>
        <strong>
          - 
          {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-bg">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total img" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}