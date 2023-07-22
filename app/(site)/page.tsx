import Header from "@/app/(site)/components/Header";
import Board from "@/app/(site)/components/Board";
import ConfirmModal from "../components/ConfirmModal";

export default function Home() {
  return (
    <main>
      <Header />

      <Board />

      <ConfirmModal />
    </main>
  )
}
