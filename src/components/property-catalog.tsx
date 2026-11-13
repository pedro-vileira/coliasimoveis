'use client';
import { useMemo, useState } from 'react';
import type { Property } from '@/types/property';
import { PropertyCard } from '@/components/property-card';
const PAGE_SIZE = 6;
export function PropertyCatalog({ properties }: { properties: Property[] }) {
  const [query,setQuery]=useState(''),[type,setType]=useState('Todos'),[transaction,setTransaction]=useState('Todos'),[city,setCity]=useState('Todas'),[neighborhood,setNeighborhood]=useState('Todos');
  const [minPrice,setMinPrice]=useState(''),[maxPrice,setMaxPrice]=useState(''),[bedrooms,setBedrooms]=useState(''),[suites,setSuites]=useState(''),[minBuilt,setMinBuilt]=useState(''),[minLand,setMinLand]=useState(''),[sort,setSort]=useState('recent'),[page,setPage]=useState(1);
  const cities=useMemo(()=>[...new Set(properties.map(p=>p.city))].sort(),[properties]);
  const neighborhoods=useMemo(()=>[...new Set(properties.map(p=>p.neighborhood))].sort(),[properties]);
  const filtered=useMemo(()=>properties.filter(p=>{
    const term=query.trim().toLowerCase(); const textMatch=!term||`${p.title} ${p.neighborhood} ${p.code} ${p.city}`.toLowerCase().includes(term);
    return textMatch&&(type==='Todos'||p.type===type)&&(transaction==='Todos'||p.transaction===transaction)&&(city==='Todas'||p.city===city)&&(neighborhood==='Todos'||p.neighborhood===neighborhood)&&(!minPrice||p.price>=Number(minPrice))&&(!maxPrice||p.price<=Number(maxPrice))&&(!bedrooms||(p.bedrooms??0)>=Number(bedrooms))&&(!suites||(p.suites??0)>=Number(suites))&&(!minBuilt||(p.builtArea??0)>=Number(minBuilt))&&(!minLand||(p.landArea??0)>=Number(minLand));
  }).sort((a,b)=>sort==='low'?a.price-b.price:sort==='high'?b.price-a.price:0),[properties,query,type,transaction,city,neighborhood,minPrice,maxPrice,bedrooms,suites,minBuilt,minLand,sort]);
  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE)),visible=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  const clear=()=>{setQuery('');setType('Todos');setTransaction('Todos');setCity('Todas');setNeighborhood('Todos');setMinPrice('');setMaxPrice('');setBedrooms('');setSuites('');setMinBuilt('');setMinLand('');setSort('recent');setPage(1)};
  const update=(setter:(v:string)=>void)=>(v:string)=>{setter(v);setPage(1)};
  return <>
    <div className="catalog-tools"><label className="search-field"><span>⌕</span><input value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} placeholder="Busque por imóvel, bairro ou código" aria-label="Buscar imóveis"/></label><label className="sort-field"><span>ORDENAR</span><select value={sort} onChange={e=>update(setSort)(e.target.value)}><option value="recent">Mais recentes</option><option value="low">Menor preço</option><option value="high">Maior preço</option></select></label></div>
    <details className="filter-panel" open><summary><span>REFINAR BUSCA</span><span className="filter-summary-note">TIPO · LOCALIZAÇÃO · VALOR · DIMENSÕES</span></summary><div className="filter-grid">
      <label>NEGOCIAÇÃO<select value={transaction} onChange={e=>update(setTransaction)(e.target.value)}><option>Todos</option><option>Venda</option><option>Locação</option></select></label>
      <label>TIPO DE IMÓVEL<select value={type} onChange={e=>update(setType)(e.target.value)}><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Comercial</option><option>Terreno</option></select></label>
      <label>CIDADE<select value={city} onChange={e=>update(setCity)(e.target.value)}><option>Todas</option>{cities.map(v=><option key={v}>{v}</option>)}</select></label>
      <label>BAIRRO<select value={neighborhood} onChange={e=>update(setNeighborhood)(e.target.value)}><option>Todos</option>{neighborhoods.map(v=><option key={v}>{v}</option>)}</select></label>
      <label>PREÇO MÍNIMO<input type="number" min="0" value={minPrice} onChange={e=>update(setMinPrice)(e.target.value)} placeholder="R$ mínimo"/></label>
      <label>PREÇO MÁXIMO<input type="number" min="0" value={maxPrice} onChange={e=>update(setMaxPrice)(e.target.value)} placeholder="R$ máximo"/></label>
      <label>QUARTOS<select value={bedrooms} onChange={e=>update(setBedrooms)(e.target.value)}><option value="">Qualquer</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}+ quartos</option>)}</select></label>
      <label>SUÍTES<select value={suites} onChange={e=>update(setSuites)(e.target.value)}><option value="">Qualquer</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}+ suítes</option>)}</select></label>
      <label>ÁREA CONSTRUÍDA<input type="number" min="0" value={minBuilt} onChange={e=>update(setMinBuilt)(e.target.value)} placeholder="Mín. m²"/></label>
      <label>ÁREA DO TERRENO<input type="number" min="0" value={minLand} onChange={e=>update(setMinLand)(e.target.value)} placeholder="Mín. m²"/></label>
    </div><div className="filter-actions"><button type="button" className="clear-filters" onClick={clear}>LIMPAR FILTROS <span>×</span></button><span>Resultados atualizados automaticamente.</span></div></details>
    <div className="results-line"><span>{filtered.length.toString().padStart(2,'0')} IMÓVEIS ENCONTRADOS</span><span>PÁGINA {page.toString().padStart(2,'0')} / {pages.toString().padStart(2,'0')}</span></div>
    {visible.length?<div className="catalog-grid">{visible.map((p,i)=><PropertyCard key={p.id} property={p} large={i===0&&page===1}/>)}</div>:<div className="empty-state"><span>SEM RESULTADOS.</span><p>Não encontramos imóveis com esses critérios. Ajuste os filtros e tente novamente.</p><button type="button" className="text-link" onClick={clear}>Limpar busca ↗</button></div>}
    {pages>1&&<nav className="pagination" aria-label="Paginação">{Array.from({length:pages},(_,i)=>i+1).map(n=><button key={n} aria-current={page===n?'page':undefined} onClick={()=>{setPage(n);document.querySelector('.results-line')?.scrollIntoView({behavior:'smooth',block:'start'})}}>{String(n).padStart(2,'0')}</button>)}<button onClick={()=>setPage(p=>Math.min(pages,p+1))} aria-label="Próxima página">↗</button></nav>}
    <p className="demo-note">IMÓVEIS E IMAGENS DEMONSTRATIVOS — NÃO REPRESENTAM OFERTAS REAIS.</p>
  </>;
}
