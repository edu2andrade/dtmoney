import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";
import Modal from 'react-modal'; 

import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement('#root'); 

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionsModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionsModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionsModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} 
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
