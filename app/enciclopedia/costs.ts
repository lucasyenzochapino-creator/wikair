import type { Aircraft } from "./types";

export type Economics = {
  price: string;
  productionTime: string;
  note: string;
};

export const economicsByName: Record<string, Economics> = {
  "F-22 Raptor": { price: "USD 150M aprox. flyaway histórico; más de USD 300M si se prorratea desarrollo", productionTime: "Producción finalizada en 2011", note: "No exportable. Costo histórico público aproximado." },
  "F-35 Lightning II": { price: "F-35A USD 82,5M aprox.; F-35B USD 109M aprox.; F-35C USD 102,1M aprox.", productionTime: "18-36 meses aprox. desde contrato a entrega", note: "Precio flyaway público aproximado; no incluye ciclo de vida completo." },
  "F-16 Fighting Falcon": { price: "USD 25M-70M aprox. según bloque, modernización y contrato", productionTime: "18-36 meses aprox.", note: "Varía entre usado, nuevo, modernización y paquete de armas." },
  "F-15 Eagle": { price: "F-15EX moderno: USD 90M-100M+ aprox.", productionTime: "24-48 meses aprox.", note: "Defensa incluye soporte, repuestos, entrenamiento y armamento." },
  "F/A-18 Super Hornet": { price: "USD 67M-75M aprox. según lote y paquete", productionTime: "18-36 meses aprox.", note: "Precio aproximado por contrato militar." },
  "Eurofighter Typhoon": { price: "USD 90M-120M+ aprox. según país y paquete", productionTime: "24-48 meses aprox.", note: "El costo varía por armas, soporte y acuerdos industriales." },
  "Dassault Rafale": { price: "USD 100M-120M+ aprox. por avión equipado; contrato total varía mucho", productionTime: "24-48 meses aprox.", note: "Los contratos incluyen armas, simuladores, repuestos y soporte." },
  "C-130 Hercules": { price: "C-130J moderno USD 80M-110M aprox.", productionTime: "18-36 meses aprox.", note: "El precio depende de versión, sensores y contrato." },

  "Chengdu J-20": { price: "No publicado / clasificado", productionTime: "No publicado; producción militar por lotes", note: "China no publica precio unitario oficial confiable." },
  "Chengdu J-10": { price: "Estimación abierta: USD 25M-45M aprox.", productionTime: "No publicado; producción por lotes", note: "Estimación no oficial; no existe precio público confiable." },
  "Shenyang J-11": { price: "No publicado / clasificado", productionTime: "No publicado; producción por lotes", note: "Sin precio unitario oficial confiable." },
  "Shenyang J-15": { price: "No publicado / clasificado", productionTime: "No publicado; producción naval por lotes", note: "Sin precio oficial público." },
  "Shenyang J-16": { price: "No publicado / clasificado", productionTime: "No publicado; producción por lotes", note: "Sin precio oficial público." },
  "Xian H-6": { price: "No publicado / clasificado", productionTime: "No publicado; modernización por lotes", note: "Costos militares chinos no transparentes." },
  "Xian Y-20": { price: "No publicado / clasificado", productionTime: "No publicado; producción por lotes", note: "Sin precio oficial público." },
  "Comac C919": { price: "USD 90M-100M aprox. precio de lista estimado", productionTime: "9-18 meses aprox. según lote", note: "Contratos pueden diferir." },

  "Airbus A320": { price: "A320 USD 101M; A320neo USD 110,6M lista histórica 2018", productionTime: "9-12 meses aprox. de ensamble final", note: "Precio de lista histórico; contratos reales tienen descuentos." },
  "Airbus A321neo": { price: "USD 129,5M lista histórica 2018", productionTime: "9-12 meses aprox. de ensamble final", note: "Entrega puede demorar por cola de pedidos." },
  "Airbus A350": { price: "A350-900 USD 317,4M; A350-1000 USD 366,5M lista histórica 2018", productionTime: "12-18 meses aprox.", note: "Depende de contrato, soporte y configuración." },
  "Airbus A380": { price: "USD 445,6M lista histórica 2018", productionTime: "18-24 meses aprox.; producción finalizada", note: "Ya no se fabrica nuevo." },
  "Boeing 737": { price: "USD 102M-130M lista histórica 2018 según versión", productionTime: "9-12 meses aprox. de ensamble final", note: "Precio de lista histórico y negociado." },
  "Boeing 747": { price: "747-8 USD 402,9M; 747-8F USD 403,6M lista histórica 2018", productionTime: "18-24 meses aprox.; producción finalizada", note: "Valor usado varía mucho." },
  "Boeing 787 Dreamliner": { price: "787-8 USD 239M; 787-9 USD 281,6M; 787-10 USD 325,8M lista histórica 2018", productionTime: "12-18 meses aprox.", note: "Precio real depende de contrato." },
  "ATR 72": { price: "ATR 72-600: USD 26M-28M aprox.", productionTime: "9-18 meses aprox.", note: "Precio aproximado según configuración." },
  "Concorde": { price: "Sin precio comercial actual; valor patrimonial/museístico", productionTime: "Desarrollo de años; 20 aeronaves entre prototipos y serie", note: "No existe mercado nuevo regular." },

  "Cessna 172": { price: "USD 450k-550k nuevo; usado USD 70k-300k+ aprox.", productionTime: "Varios meses", note: "Depende de año, motor, aviónica y horas." },
  "Cirrus SR22": { price: "USD 900k-1,2M nuevo aprox.", productionTime: "Varios meses", note: "Depende de aviónica y equipamiento." },
  "Pilatus PC-12": { price: "USD 5M-7M nuevo aprox.", productionTime: "9-18 meses aprox.", note: "Turbohélice ejecutivo/utilitario." },
  "Gulfstream G650": { price: "USD 65M-75M nuevo histórico aprox.", productionTime: "18-24 meses aprox.", note: "Interior personalizado cambia mucho el costo." },

  "Antonov An-225 Mriya": { price: "Sin precio comercial actual; costo de reconstrucción estimado públicamente en cientos de millones de USD", productionTime: "No se fabrica; reconstrucción tomaría años", note: "Aeronave única destruida; no existe mercado regular." },
  "Antonov An-124 Ruslan": { price: "Usado/contrato especial: no publicado; estimaciones abiertas superiores a USD 150M", productionTime: "Producción muy limitada/no regular", note: "Mercado extremadamente específico." },
  "Boeing 747-8F": { price: "USD 403,6M lista histórica 2018", productionTime: "18-24 meses aprox.; producción finalizada", note: "Precio nuevo histórico; usado varía." },
  "Airbus BelugaXL": { price: "No vendido al mercado; costo de programa interno Airbus", productionTime: "Producción especial 2018-2023", note: "Aeronave interna para logística Airbus." },
  "Ilyushin Il-76": { price: "No publicado de forma regular; estimaciones abiertas USD 50M-100M+ según versión", productionTime: "18-36 meses aprox. si hay contrato", note: "Contratos estatales/militares." },
  "Embraer C-390 Millennium": { price: "USD 80M-100M aprox. según contrato", productionTime: "18-36 meses aprox.", note: "Transporte militar táctico moderno." },

  "Beechcraft T-6 Texan II": { price: "USD 5M-7M aprox.", productionTime: "9-18 meses aprox.", note: "Entrenador militar turbohélice." },
  "Pilatus PC-21": { price: "USD 9M-12M aprox.", productionTime: "9-18 meses aprox.", note: "Entrenador avanzado." },
  "Aero L-39 Albatros": { price: "Usado USD 200k-800k+ aprox.; nuevo L-39NG varios millones USD", productionTime: "Histórico usado o producción moderna por pedido", note: "Depende de variante y estado." },
  "KAI T-50 Golden Eagle": { price: "USD 25M-35M aprox.", productionTime: "18-36 meses aprox.", note: "Entrenador supersónico/ataque ligero." },

  "Wright Flyer": { price: "Sin precio comercial actual; valor histórico incalculable", productionTime: "Construcción original artesanal", note: "Pieza fundacional de la aviación, de museo." },
  "Supermarine Spitfire": { price: "Mercado histórico operativo: USD 3M-6M+ aprox.", productionTime: "No se fabrica; restauración puede tomar años", note: "Valor depende de procedencia, motor y condición." },
  "P-51 Mustang": { price: "Mercado histórico operativo: USD 2M-4M+ aprox.", productionTime: "No se fabrica; restauración puede tomar años", note: "Warbird de colección." },
  "Douglas DC-3": { price: "Usado/restaurado: USD 500k-2M+ aprox.", productionTime: "No se fabrica; restauración variable", note: "Valor depende de condición, certificación y motores." },
  "Mitsubishi A6M Zero": { price: "Sin precio estándar; unidades originales operativas pueden valer varios millones USD", productionTime: "No se fabrica; restauración histórica", note: "Muy escaso, valor de colección." },
  "Mikoyan MiG-21": { price: "Usado/desmilitarizado: USD 100k-1M+ aprox. según estado", productionTime: "No se fabrica; modernizaciones por contrato", note: "Mercado limitado y regulado." },
  "PBY Catalina": { price: "Histórico operativo: USD 1M-4M+ aprox.", productionTime: "No se fabrica; restauración puede tomar años", note: "Hidroavión histórico de colección." },

  "Bell X-1": { price: "Sin precio comercial actual; pieza histórica/museística", productionTime: "Prototipo experimental; no se fabrica", note: "Valor patrimonial." },
  "North American X-15": { price: "Sin precio comercial actual; pieza histórica/museística", productionTime: "Prototipo experimental; no se fabrica", note: "Programa de investigación histórica." },
  "X-59 QueSST": { price: "Programa NASA/Lockheed: costo de desarrollo, no precio unitario comercial", productionTime: "Prototipo experimental; desarrollo plurianual", note: "No está a la venta." },
  "SpaceShipOne": { price: "Sin precio comercial actual; pieza histórica/museística", productionTime: "Prototipo privado; no producción regular", note: "Valor patrimonial/espacial." },

  "FMA IA-58 Pucará": { price: "Costo histórico estimado: alrededor de USD 2M por unidad; sin mercado nuevo", productionTime: "Producción 1974-1993; hoy restauración/modernización", note: "Dato histórico/estimado." },
  "FMA IA-63 Pampa": { price: "No publicado de forma regular; estimaciones públicas varían por contrato", productionTime: "Producción por lotes; entrega según FAdeA y contrato", note: "No hay precio unitario oficial estable de mercado civil." },
  "FMA I.Ae. 27 Pulqui I": { price: "Sin precio comercial actual; pieza histórica/museística", productionTime: "Prototipo histórico; no se fabrica", note: "No tiene mercado regular." },
  "FMA I.Ae. 33 Pulqui II": { price: "Sin precio comercial actual; pieza histórica/museística", productionTime: "Prototipo histórico; no se fabrica", note: "No tiene mercado regular." },
  "A-4AR Fightinghawk": { price: "Programa argentino histórico: costo unitario modernizado estimado en varios millones USD", productionTime: "Conversión/modernización por contrato; no producción nueva", note: "No se fabrica nuevo." },
  "Dassault Mirage III": { price: "Sin precio nuevo; usados históricos/desmilitarizados varían ampliamente", productionTime: "Producción finalizada; restauración/modernización variable", note: "Caza histórico de mercado limitado." },
  "Dassault Super Étendard": { price: "Sin precio nuevo; mercado militar usado por contrato estatal", productionTime: "Producción finalizada", note: "Valor depende de lote, repuestos y estado." },

  "Sukhoi Su-27": { price: "No publicado actual; estimaciones usadas/modernizadas USD 30M-50M+", productionTime: "Producción/modernización por contrato", note: "Mercado militar estatal." },
  "Sukhoi Su-30": { price: "USD 35M-60M+ aprox. según versión/contrato", productionTime: "18-36 meses aprox.", note: "Contrato estatal con soporte y armas." },
  "Sukhoi Su-35": { price: "USD 80M-100M+ aprox. según contrato", productionTime: "24-48 meses aprox.", note: "Precio abierto estimado." },
  "HAL Tejas": { price: "USD 35M-45M aprox.", productionTime: "18-36 meses aprox.", note: "Estimación pública por contrato nacional/exportación." },
  "KAI KF-21 Boramae": { price: "Estimación abierta USD 65M-75M aprox. objetivo", productionTime: "En desarrollo/producción inicial", note: "Precio definitivo depende de producción en serie." },
  "Mitsubishi F-2": { price: "Costo unitario histórico alto: aprox. USD 100M+", productionTime: "Producción finalizada", note: "Programa japonés de producción limitada." },

  "Sikorsky UH-60 Black Hawk": { price: "USD 25M-40M aprox.", productionTime: "12-24 meses aprox.", note: "Contrato militar: soporte, repuestos y entrenamiento cambian el costo final." },
  "Boeing AH-64 Apache": { price: "USD 35M-60M aprox.", productionTime: "18-36 meses aprox.", note: "Sensores, armas y soporte definen el costo real." },
  "Mil Mi-24 Hind": { price: "Usado/modernizado: USD 1M-12M+ aprox. según estado", productionTime: "Producción histórica; modernización variable", note: "Mercado militar usado." },
  "Mil Mi-8 / Mi-17": { price: "USD 5M-17M+ aprox. según versión y estado", productionTime: "12-24 meses aprox. si nuevo/modernizado", note: "Muy usado; precios varían mucho." },
  "CH-47 Chinook": { price: "USD 35M-70M aprox.", productionTime: "18-36 meses aprox.", note: "Helicóptero pesado con costo dependiente de configuración militar." },
  "Airbus H145": { price: "USD 9M-12M aprox.", productionTime: "9-18 meses aprox.", note: "HEMS/rescate puede aumentar el precio final." },
  "Sikorsky S-92": { price: "USD 27M-32M aprox. nuevo histórico", productionTime: "12-24 meses aprox.", note: "SAR/offshore agrega equipamiento." },
  "Canadair CL-415": { price: "USD 30M-40M aprox.", productionTime: "12-24 meses aprox.", note: "Avión anfibio antiincendio especializado." },
  "ShinMaywa US-2": { price: "USD 100M+ aprox. por unidad según contrato", productionTime: "24-48 meses aprox.", note: "Hidroavión SAR especializado de producción limitada." },
  "Grumman HU-16 Albatross": { price: "Histórico usado/restaurado: USD 300k-1,5M+ aprox.", productionTime: "No se fabrica; restauración variable", note: "Valor depende de estado y certificación." },
  "HC-130 Hercules": { price: "USD 80M-100M+ aprox.", productionTime: "18-36 meses aprox.", note: "Versión SAR con sensores/equipos especiales." }
};

export function getEconomics(plane: Aircraft): Economics {
  if (economicsByName[plane.name]) return economicsByName[plane.name];
  if (plane.group === "Militar") return { price: "No publicado / clasificado", productionTime: "18-48 meses aprox. si existe contrato", note: "No se inventa precio: muchos programas militares no publican precio unitario confiable." };
  if (plane.group === "Histórica" || plane.group === "Experimental") return { price: "Sin precio comercial actual", productionTime: "Variable: desarrollo, prototipo, museo o restauración", note: "Se muestra precio solo cuando hay referencia pública confiable." };
  return { price: "No publicado para esta ficha", productionTime: "6-36 meses aprox. según fabricante/configuración", note: "Pendiente de fuente pública confiable específica." };
}
