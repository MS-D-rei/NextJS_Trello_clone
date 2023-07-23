import Header from "@/app/(site)/components/Header";
import Board from "@/app/(site)/components/Board";
import ConfirmModal from "@/app/components/ConfirmModal";
import AddTodoModal from "@/app/components/AddTodoModal";

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
