import React from 'react'

export default function Navbar(){
  return (
    <header style={{position:'fixed', top:0, left:0, right:0, background:'#fff', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', zIndex:1000}}>
      <div style={{maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'15px'}}>
        <div style={{color:'#003602', fontWeight:700, fontSize:20}}>Nova<span style={{color:'#F39700'}}>tte</span></div>
        <nav>
          <a href="#" style={{marginRight:15, color:'#333'}}>Início</a>
          <a href="#" style={{marginRight:15, color:'#333'}}>Imóveis</a>
          <a href="#" style={{color:'#333'}}>Contato</a>
        </nav>
      </div>
    </header>
  )
}
