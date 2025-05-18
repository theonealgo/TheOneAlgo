/* components/Header.tsx */
'use client';

import Link      from 'next/link';
import Image     from 'next/image';
import {useState,useRef,useEffect} from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User as UserIcon, ChevronDown } from 'lucide-react';

const menus = [
  { key:'product',   label:'Product',  items:[{href:'/pricing',label:'Pricing'},{href:'/features',label:'Features'}] },
  { key:'resources', label:'Resources',items:[{href:'/documentation',label:'Documentation'},{href:'/tutorials',label:'Tutorials'}] },
  { key:'company',   label:'Company',  items:[{href:'/about',label:'About'},{href:'/contact',label:'Contact'}] }
];

export default function Header() {
  const { data:session, status } = useSession();
  const [open,setOpen]          = useState(false);
  const dropRef                 = useRef<HTMLDivElement>(null);

  /* close profile dropdown on outside click */
  useEffect(()=>{
    const h = (e:MouseEvent)=>{ if(dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown',h); return ()=>document.removeEventListener('mousedown',h);
  },[]);

  return (
    <header
   className="
     fixed inset-x-0 top-0 z-50 flex items-center justify-between
     px-6 py-4
     bg-transparent           /* no bar at all */
   "
 >
      {/* ───── Logo ───── */}
      <Link href="/" className="flex items-center">
        <Image
          src="/images/theonelogo.png"
          alt="TheOneAlgo logo"
          width={128}
          height={128}
          className="h-10 w-auto"
          priority
        />
      </Link>

      {/* ───── Primary navigation ───── */}
      <nav className="flex items-center gap-8 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
        {menus.map(({key,label,items})=>(
          <div key={key} className="relative group">
            <button className="hover:text-teal-300 transition">{label}</button>

            {/* simple hover dropdown */}
            <div
              className="
                absolute left-0 top-full mt-1 w-44 rounded bg-gray-900/90 shadow-lg py-2
                opacity-0 pointer-events-none translate-y-1
                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0
                transition-all duration-150
              "
            >
              {items.map(({href,label})=>(
                <Link key={href} href={href} className="block px-4 py-2 text-sm hover:bg-gray-800/70">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <Link
          href="/pricing"
          className="ml-4 whitespace-nowrap rounded-lg px-4 py-2 font-semibold text-black
                     bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500
                     hover:brightness-110 transition"
        >
          Get&nbsp;Started
        </Link>

        {/* Profile dropdown */}
        <div ref={dropRef} className="relative">
          <button
            onClick={()=>setOpen(o=>!o)}
            className="flex items-center rounded-full bg-black/50 p-2 hover:bg-black/60"
          >
            <UserIcon className="h-5 w-5"/>
            <ChevronDown className="h-4 w-4 ml-1"/>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded bg-gray-900/90 shadow-lg py-1">
              <Link href="/help" className="block px-4 py-2 text-sm hover:bg-gray-800/70">Help</Link>

              {status === 'unauthenticated' && (
                <button
                  onClick={()=>signIn(undefined,{callbackUrl:'/dashboard'})}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800/70"
                >
                  Sign&nbsp;In
                </button>
              )}

              {status === 'authenticated' && session?.user && (
                <>
                  <span className="block px-4 py-2 text-sm truncate">{session.user.name ?? session.user.email}</span>
                  <button
                    onClick={()=>signOut({callbackUrl:'/'})}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-800/70"
                  >
                    Sign&nbsp;Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
