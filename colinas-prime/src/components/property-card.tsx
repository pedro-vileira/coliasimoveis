import Link from 'next/link';
import type { Property } from '@/types/property';
import {formatPrice} from '@/lib/properties';
export function PropertyCard({property,large=false}:{property:Property;large?:boolean}){
  return <article className={`property-card ${large?'property-card-large':''}`}>
    <Link href={`/imovel/${property.slug}`} className="property-image" style={{backgroundImage:`url('${property.image}')`}} aria-label={`Ver ${property.title}`}>
      <span className="image-index">{property.code}</span>{property.featured&&<span className="featured-label">SELEÇÃO COLINAS</span>}<span className="image-arrow">↗</span>
    </Link>
    <div className="property-info"><div><span className="eyebrow">{property.type} <i>·</i> {property.neighborhood}</span><h3><Link href={`/imovel/${property.slug}`}>{property.title}</Link></h3><p>{property.city} — SP</p></div><div className="property-price">{formatPrice(property.price,property.transaction)}</div></div>
    <div className="property-meta">{property.builtArea&&<span>{property.builtArea} m² construídos</span>}{property.landArea&&<span>{property.landArea} m² terreno</span>}{property.suites?<span>{property.suites} suítes</span>:property.bedrooms?<span>{property.bedrooms} quartos</span>:null}{property.parking&&<span>{property.parking} vagas</span>}</div>
  </article>
}
