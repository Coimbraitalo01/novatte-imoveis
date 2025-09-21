import React from 'react'

export default function CardImovel({imovel}){
  const img = imovel.images && imovel.images[0] ? imovel.images[0] : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80';
  return (
    <article style={{background:'#fff', borderRadius:10, overflow:'hidden', boxShadow:'0 5px 15px rgba(0,0,0,0.1)'}}>
      <div style={{height:180, overflow:'hidden'}}><img src={img} alt={imovel.title} style={{width:'100%', height:'100%', objectFit:'cover'}}/></div>
      <div style={{padding:15}}>
        <h3 style={{color:'#003602', margin:'0 0 8px'}}>{imovel.title}</h3>
        <p style={{color:'#86450A', margin:'0 0 8px'}}><i className="fas fa-map-marker-alt"></i> {imovel.city}</p>
        <p style={{color:'#FE4700', fontWeight:700, margin:'0 0 8px'}}>R$ {imovel.price ? imovel.price.toLocaleString() : '—'}</p>
        <div style={{display:'flex', justifyContent:'space-between', color:'#555', fontSize:14}}>
          <span><i className="fas fa-bed"></i> {imovel.bedrooms || '-'}</span>
          <span><i className="fas fa-bath"></i> {imovel.bathrooms || '-'}</span>
          <span><i className="fas fa-ruler-combined"></i> {imovel.area || '-'}</span>
        </div>
      </div>
    </article>
  )
}
