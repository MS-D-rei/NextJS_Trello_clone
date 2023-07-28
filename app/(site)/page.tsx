import Header from "@/app/(site)/components/Header";
import Board from "@/app/(site)/components/Board";
import ConfirmModal from "../components/modals/ConfirmModal";
import AddTodoModal from "../components/modals/AddTodoModal";

export default function Home() {
  return (
    <main>
      <Header />

      <Board />

      <ConfirmModal />
      <AddTodoModal />
    </main>
  )
}
