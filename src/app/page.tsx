import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Header />
      <GameBoard />
    </main>
  );
}
