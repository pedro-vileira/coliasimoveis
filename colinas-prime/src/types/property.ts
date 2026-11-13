export type Property = {
  id: string; slug: string; code: string; title: string; type: 'Casa'|'Apartamento'|'Comercial'|'Terreno'; transaction: 'Venda'|'Locação'; city: string; neighborhood: string; price: number; builtArea?: number; landArea?: number; bedrooms?: number; suites?: number; bathrooms?: number; parking?: number; description: string; image: string; gallery: string[]; featured: boolean; demo: boolean;
};
