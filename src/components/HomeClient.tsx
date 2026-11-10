'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react';
import {faComment} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';



const HomeClient = ({ email }: { email: string }) => {

  const firstletter = email ? email[0]?.toUpperCase() : '';
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const features = [
    {
      title: '24/7 Availability',
      description: 'Our AI customer support solution is available around the clock, ensuring that your customers can get assistance whenever they need it.'},
    {
      title: 'Instant Responses',
      description: 'With our AI-powered system, customers receive immediate responses to their inquiries, reducing wait times and improving overall satisfaction.'},
    {
      title: 'Cost-Effective',
      description: 'By automating customer support, businesses can reduce operational costs while still providing high-quality assistance to their customers.'},  
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleLogin = async () => {
    window.location.href = '/api/auth/login'
  }

  const handleLogout = async () => {
    window.location.href = '/api/auth/logout'
  }

  return (
    <div className=" min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">

      {/* header */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl
     border-b border-zinc-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='text-lg font-semibold tracking-tight'>Support <span className='text-zinc-400 italic'>AI</span></div>

          {email ? <div className='relative' ref={popupRef}>
            <button className=' w-10 h-10 rounded-full bg-black text-white
            text-lg font-semibold hover:scale-105 transition cursor-pointer'
              onClick={() => setOpen(!open)}>
              {firstletter}</button>
            <AnimatePresence>
              {open && (<motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}

                className='absolute top-13 right-0 w-50 bg-white rounded-lg shadow-md p-2 flex flex-col items-start justify-center gap-1'>
                <button className='text-sm text-zinc-700  hover:bg-zinc-200 transition cursor-pointer p-2 w-full text-start rounded-md'
                onClick={() => navigate.push('/dashboard')}>
                  Dashboard</button>
                <button className='text-sm font-medium text-red-600  hover:bg-zinc-200 transition cursor-pointer p-2 w-full text-start rounded-md'
                  onClick={handleLogout}>
                  Logout</button>
              </motion.div>)}
            </AnimatePresence>
          </div> :

            <button className='px-5 py-2 rounded-full bg-black text-white
            text-sm font-medium hover:bg-zinc-700 transition disabled:opacity-60 flex items-center gap-2 cursor-pointer'
              onClick={handleLogin}>
              Login</button>}
        </div>

      </motion.div>

      {/* main content */}
      <section className='px-20 pt-36 pb-28'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
          
          <motion.div initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            >
              <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
              AI Customer Support <br />
              Built For Modern Businesses
              </h1>
              <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                Fast integration of chatbot functionality into your website or application.
                Helping users to get frequent questions answered quickly and efficiently,
                 while also providing a seamless user experience.
              </p>

              <div>
                {email ?  <button className='mt-8 px-6 py-3 rounded-xl bg-black text-white cursor-pointer hover:bg-zinc-800 transition'
                onClick={() => navigate.push('/dashboard')}>
                  Go to Dashboard</button> :
                <button className='mt-8 px-6 py-3 rounded-xl bg-black text-white cursor-pointer hover:bg-zinc-800 transition'
                onClick={handleLogin}>
                  Get Started</button>}

                  <a  href='#features' className='mt-8 ml-4 px-6 py-3 rounded-xl bg-zinc-100 text-zinc-900 cursor-pointer hover:bg-zinc-200 transition'>
                    Learn More
                  </a>
              </div>
            </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='relative'>
              <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                <div className='text-sm text-zinc-500 mb-3'>Live Chat</div>
                <div className='space-y-5'>
                  <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>Hi! I placed an order three days ago.
                    Can you check its status?</div>
                  <div className='bg-zinc-100 text-zinc-900 rounded-lg px-4 py-2 text-sm mr-auto w-fit'>Of course! Could you please share your order ID?</div>
                  <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-50'>Sure, it's ORD-82941.</div>
                  <div className='bg-zinc-100 text-zinc-900 rounded-lg px-4 py-2 text-sm mr-auto w-fit'>Thank you! I see that your order is currently being processed and should be shipped within the next 24 hours.</div>
                </div>
                <motion.div 
                  animate={{ y:[0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className='absolute -bottom-6 -right-6 flex items-center justify-center w-12 h-12 bg-black rounded-full'>
                    <FontAwesomeIcon icon={faComment} className='text-white text-2xl'/>
                  </motion.div>
              </div>
            
          </motion.div>
        </div>
      </section>


      {/* Features */}

      <section id='features' className='h-120 px-20 py-6 bg-zinc-50 border-t border-zinc-200 flex items-center justify-center flex-col gap-6'>
        <div className='max-w-7xl mx-auto '>
          <motion.h2 initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className='text-3xl md:text-4xl font-semibold text-center'>
              Why Choose Our AI Customer Support Solution?
          </motion.h2>
        </div>

        <div className='max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          
            className=' bg-white rounded-2xl shadow-md border border-zinc-200 p-6 flex flex-col items-start justify-start gap-3'>
              <h3 className='text-xl font-semibold'>{feature.title}</h3>
              <p className='text-zinc-600 text-sm'>{feature.description}</p>
            </motion.div>
          ))}
            </div>  

      </section>

      {/* Footer */}

      <footer className='px-20 py-2 bg-zinc-100 border-t border-zinc-200'>
        <div className='max-w-7xl mx-auto text-center text-sm text-zinc-500'>
          &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
        </div>
      </footer> 
    </div>
  )
}

export default HomeClient