'use client';
import { FormEvent } from "react";

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    // https://nextjs.org/docs/pages/building-your-application/authentication
  }
  
  return (
    <main className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <h1 className="font-sans text-5xl">Benvenuto nel gestionale DB-Prigione</h1>
      </div>
      <form className="bg-blue-50 pt-10 p-10 m-auto rounded-lg" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <div className="p-3">
            <input className="py-2 px-2" placeholder="Inserisci il tuo badge" type="text" id="fname" name="badge"/>
          </div>
          <div className="p-3">
            <input className="py-2 px-2" placeholder="Inserisci la tua password" type="password" name="password"/>
          </div>
          <div className="p-3 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Entra</button>
          </div>
        </div>      
      </form>
    </main>
  );
}
