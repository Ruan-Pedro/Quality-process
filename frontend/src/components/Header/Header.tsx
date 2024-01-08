'use client'
import { useRouter } from 'next/navigation';
import logo from '../../../public/images/logo-quality.png';
import './header.css';

export default function Header(){
  const router = useRouter();
    return (
      <header className='header w-screen flex items-center flex-row justify-around bg-primary py-5 text-white'>
        <img className='w-16' src={logo.src} alt="" />
        <div onClick={() => router.push('/')} className='text-3xl cursor-pointer font-semibold transition-all duration-300 hover:text-blue-800'>Início</div>
      </header>
    );
  };
  