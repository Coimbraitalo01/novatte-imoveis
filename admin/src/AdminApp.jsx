import React, {useEffect, useState} from 'react'

export default function AdminApp(){
  const [imoveis, setImoveis] = useState([]);
  const [form, setForm] = useState({title:'', city:'', price:'', bedrooms:'', bathrooms:'', area:'', images:''});

  useEffect(()=> {
    fetch('http://localhost:5000/api/imoveis').then(r=>r.json()).then(setImoveis).catch(()=>{})
  },[])

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {...form, images: form.images.split(',').map(s=>s.trim())};
    await fetch('http://localhost:5000/api/imoveis', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
    window.location.reload();
  }

  return (
    <div style={{padding:20}}>
      <h1>Admin Novatte</h1>
      <form onSubmit={handleSubmit} style={{maxWidth:600}}>
        <input placeholder="Título" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Cidade" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Preço" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Quartos" value={form.bedrooms} onChange={e=>setForm({...form,bedrooms:Number(e.target.value)})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Banheiros" value={form.bathrooms} onChange={e=>setForm({...form,bathrooms:Number(e.target.value)})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Área" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <input placeholder="Imagens (vírgula separado URLs)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}}/>
        <button type="submit" style={{padding:10,background:'#F39700',color:'#fff',border:'none',borderRadius:6}}>Adicionar</button>
      </form>

      <h2 style={{marginTop:20}}>Imóveis Cadastrados</h2>
      <ul>
        {imoveis.map(i=> <li key={i._id} style={{marginBottom:8}}>{i.title} — R$ {i.price?.toLocaleString()}</li>)}
      </ul>
    </div>
  )
}
