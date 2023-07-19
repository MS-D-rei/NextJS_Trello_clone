import Header from "@/app/(site)/components/Header";
import Board from "@/app/(site)/components/Board";
import Modal from "@/app/components/Modal";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Board */}
      <Board />

      {/* Modal */}
      <Modal />
    </main>
  )
}
