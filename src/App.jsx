import { use, useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(5);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [symbolAllowed,setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passRef = useRef(null);
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed) str += "0123456789";
    if(symbolAllowed) str += "!@#$%^&*()_+";
    for(let i = 0; i < length; i++){
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  },[length,numberAllowed,symbolAllowed,setPassword]);
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,symbolAllowed,passwordGenerator])

  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  },[password]);
  return (
    <div className="Box">
      <h2>Generate a Password</h2>
      <input type="text"
        value={password}
        placeholder='password'
        readOnly
        ref={passRef}
      />
      <div className="length">
        <input type="range"
          min={6}
          max={120}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          />
        <label htmlFor="Length">Length:{length}</label>
      </div>
      <div className="numberAllowed">
        <label htmlFor="numberA">Numbers:</label>
        <input id="numberA" type="checkbox" defaultChecked={numberAllowed} 
        onChange={()=>setNumberAllowed((prev)=>!prev)}/>
      </div>
      <div className="charAllowed">
        <label htmlFor="charA">Special Chars:</label>
        <input id="charA" type="checkbox" defaultChecked={symbolAllowed}
        onChange={()=>setSymbolAllowed((prev)=>!prev)}/>
      </div>
      <button onClick={copyPassword} >
        Copy
      </button>
    </div>
  )
}

export default App
