import ClientDetails from "@/components/ClientDetails/ClientDetails";
import Header from "@/components/Header/Header";

interface Params {
    params: {
        id:number
    }
}

export default function Client({ params }:Params) {
    const id = params.id
  return (
    <section>
      <Header />
      <ClientDetails id={id}/>
    </section>
  );
}