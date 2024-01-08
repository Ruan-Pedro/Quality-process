import ClientsTable from "@/components/ClientTable/ClientTable";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-16">
      <Header/>   
      <ClientsTable/>   
      <Footer/>
    </main>
  )
}