import React, { useState, useCallback, useEffect, useRef } from 'react'

export default function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (charAllow) str += "!@#$%^&*-_[]{}~`\|"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)

    }

    setPassword(pass)


  }, [length, number, charAllow, setPassword])

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Copied to Clipboard")
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, number, charAllow, passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className="text-4xl text-center text-white py-4"> Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-2 px-3 ' placeholder='Password' readOnly ref={passwordRef} />
          <button className='outline-none bg-orange-800 text-white px-3 py-0.5  shrink-0 ' onClick={copyToClipBoard}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} className='cusrsor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>Length : {length}</label></div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number} id="numberInput" onChange={() => { setNumber((prev) => !prev) }} />
            <label htmlFor="numberTnput"> Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id="charChange" onChange={() => { setCharAllow((prev) => !prev) }} />
            <label htmlFor="charTnput"> Character</label>
          </div>
        </div>
      </div>
    </>
  )
}
