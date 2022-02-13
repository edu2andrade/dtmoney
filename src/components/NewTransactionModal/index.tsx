import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,

    })

    setTitle('');
    setCategory('');
    setAmount(0);
    setType('deposit');
    
    onRequestClose();
  }

  return (
    <Modal 
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close" 
      >
        <img src={closeImg} alt="close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register new transaction</h2>
        <input 
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
       />
        <input 
          placeholder="Value"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {setType('deposit')}}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="income" />
            <span>Income</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {setType('withdraw')}}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="outcome" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input 
          placeholder="Category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Register</button>
      </Container>
    </Modal>
  )
}