import type { Metadata } from 'next'; import {Geologica} from 'next/font/google'; import './globals.css'; import {Header} from '@/components/header'; import {Footer} from '@/components/footer';
const geologica=Geologica({subsets:['latin'],variable:'--font-geologica',display:'swap'});
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'Colinas Imóveis Prime | Espaços que atravessam o tempo',template:'%s | Colinas Imóveis Prime'},description:'Uma curadoria de imóveis residenciais e comerciais em São José dos Campos.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={geologica.variable}><Header/><main>{children}</main><Footer/></body></html>}
