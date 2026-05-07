type Aircraft = {
  name: string;
  wiki: string;
  use: string;
  subUse: string;
  maker: string;
  origin: string;
  firstFlight: string;
  status: string;
  license: string;
};

const aircraft: Aircraft[] = [
  { name: "F-22 Raptor", wiki: "F-22 Raptor", use: "Militar", subUse: "Caza furtivo", maker: "Lockheed Martin", origin: "Estados Unidos", firstFlight: "1997", status: "Activo", license: "Piloto militar avanzado" },
  { name: "F-35 Lightning II", wiki: "Lockheed Martin F-35 Lightning II", use: "Militar", subUse: "Caza multirrol", maker: "Lockheed Martin", origin: "Estados Unidos", firstFlight: "2006", status: "Activo", license: "Piloto militar avanzado" },
  { name: "F-16 Fighting Falcon", wiki: "General Dynamics F-16 Fighting Falcon", use: "Militar", subUse: "Caza multirrol", maker: "General Dynamics / Lockheed Martin", origin: "Estados Unidos", firstFlight: "1974", status: "Activo", license: "Piloto militar avanzado" },
  { name: "F-15 Eagle", wiki: "McDonnell Douglas F-15 Eagle", use: "Militar", subUse: "Superioridad aérea", maker: "McDonnell Douglas / Boeing", origin: "Estados Unidos", firstFlight: "1972", status: "Activo", license: "Piloto militar avanzado" },
  { name: "Eurofighter Typhoon", wiki: "Eurofighter Typhoon", use: "Militar", subUse: "Caza multirrol", maker: "Eurofighter", origin: "Europa", firstFlight: "1994", status: "Activo", license: "Piloto militar avanzado" },
  { name: "Dassault Rafale", wiki: "Dassault Rafale", use: "Militar", subUse: "Caza multirrol", maker: "Dassault Aviation", origin: "Francia", firstFlight: "1986", status: "Activo", license: "Piloto militar avanzado" },
  { name: "Sukhoi Su-57", wiki: "Sukhoi Su-57", use: "Militar", subUse: "Caza furtivo", maker: "Sukhoi", origin: "Rusia", firstFlight: "2010", status: "Activo", license: "Piloto militar avanzado" },
  { name: "MiG-29 Fulcrum", wiki: "Mikoyan MiG-29", use: "Militar", subUse: "Caza multirrol", maker: "Mikoyan", origin: "Rusia", firstFlight: "1977", status: "Activo", license: "Piloto militar avanzado" },
  { name: "B-2 Spirit", wiki: "Northrop Grumman B-2 Spirit", use: "Militar", subUse: "Bombardero furtivo", maker: "Northrop Grumman", origin: "Estados Unidos", firstFlight: "1989", status: "Activo", license: "Piloto militar avanzado" },
  { name: "C-130 Hercules", wiki: "Lockheed C-130 Hercules", use: "Militar", subUse: "Transporte táctico", maker: "Lockheed Martin", origin: "Estados Unidos", firstFlight: "1954", status: "Activo", license: "Piloto militar avanzado" },

  { name: "Airbus A320", wiki: "Airbus A320 family", use: "Comercial", subUse: "Narrow-body", maker: "Airbus", origin: "Europa", firstFlight: "1987", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Airbus A321neo", wiki: "Airbus A321neo", use: "Comercial", subUse: "Narrow-body", maker: "Airbus", origin: "Europa", firstFlight: "2016", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Airbus A330", wiki: "Airbus A330", use: "Comercial", subUse: "Wide-body", maker: "Airbus", origin: "Europa", firstFlight: "1992", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Airbus A350", wiki: "Airbus A350", use: "Comercial", subUse: "Wide-body", maker: "Airbus", origin: "Europa", firstFlight: "2013", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Airbus A380", wiki: "Airbus A380", use: "Comercial", subUse: "Wide-body", maker: "Airbus", origin: "Europa", firstFlight: "2005", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Boeing 737", wiki: "Boeing 737", use: "Comercial", subUse: "Narrow-body", maker: "Boeing", origin: "Estados Unidos", firstFlight: "1967", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Boeing 747", wiki: "Boeing 747", use: "Comercial", subUse: "Wide-body", maker: "Boeing", origin: "Estados Unidos", firstFlight: "1969", status: "Retirado parcial", license: "ATPL + Type Rating" },
  { name: "Boeing 777", wiki: "Boeing 777", use: "Comercial", subUse: "Wide-body", maker: "Boeing", origin: "Estados Unidos", firstFlight: "1994", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Boeing 787 Dreamliner", wiki: "Boeing 787 Dreamliner", use: "Comercial", subUse: "Wide-body", maker: "Boeing", origin: "Estados Unidos", firstFlight: "2009", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Embraer E-Jet", wiki: "Embraer E-Jet family", use: "Comercial", subUse: "Regional jet", maker: "Embraer", origin: "Brasil", firstFlight: "2002", status: "Activo", license: "ATPL + Type Rating" },
  { name: "ATR 72", wiki: "ATR 72", use: "Comercial", subUse: "Turbohélice regional", maker: "ATR", origin: "Francia / Italia", firstFlight: "1988", status: "Activo", license: "ATPL + Type Rating" },

  { name: "Cessna 172", wiki: "Cessna 172", use: "Privada / General", subUse: "Monomotor", maker: "Cessna", origin: "Estados Unidos", firstFlight: "1955", status: "Activo", license: "PPL" },
  { name: "Cessna 182 Skylane", wiki: "Cessna 182 Skylane", use: "Privada / General", subUse: "Monomotor", maker: "Cessna", origin: "Estados Unidos", firstFlight: "1956", status: "Activo", license: "PPL" },
  { name: "Piper PA-28 Cherokee", wiki: "Piper PA-28 Cherokee", use: "Privada / General", subUse: "Monomotor", maker: "Piper", origin: "Estados Unidos", firstFlight: "1960", status: "Activo", license: "PPL" },
  { name: "Beechcraft Bonanza", wiki: "Beechcraft Bonanza", use: "Privada / General", subUse: "Monomotor", maker: "Beechcraft", origin: "Estados Unidos", firstFlight: "1945", status: "Activo", license: "PPL" },
  { name: "Cirrus SR22", wiki: "Cirrus SR22", use: "Privada / General", subUse: "Monomotor moderno", maker: "Cirrus Aircraft", origin: "Estados Unidos", firstFlight: "2000", status: "Activo", license: "PPL" },
  { name: "Pilatus PC-12", wiki: "Pilatus PC-12", use: "Privada / General", subUse: "Turbohélice ejecutivo", maker: "Pilatus", origin: "Suiza", firstFlight: "1991", status: "Activo", license: "PPL avanzado / CPL" },
  { name: "Gulfstream G650", wiki: "Gulfstream G650", use: "Privada / General", subUse: "Jet ejecutivo", maker: "Gulfstream", origin: "Estados Unidos", firstFlight: "2009", status: "Activo", license: "Type Rating" },
  { name: "HondaJet", wiki: "Honda HA-420 HondaJet", use: "Privada / General", subUse: "Jet ejecutivo ligero", maker: "Honda Aircraft", origin: "Japón / Estados Unidos", firstFlight: "2003", status: "Activo", license: "Type Rating" },

  { name: "Antonov An-225 Mriya", wiki: "Antonov An-225 Mriya", use: "Carga", subUse: "Carga superpesada", maker: "Antonov", origin: "Ucrania", firstFlight: "1988", status: "Destruido", license: "Tripulación especializada" },
  { name: "Antonov An-124 Ruslan", wiki: "Antonov An-124 Ruslan", use: "Carga", subUse: "Carga pesada", maker: "Antonov", origin: "Ucrania", firstFlight: "1982", status: "Activo", license: "Tripulación especializada" },
  { name: "Boeing 747-8F", wiki: "Boeing 747-8", use: "Carga", subUse: "Carguero wide-body", maker: "Boeing", origin: "Estados Unidos", firstFlight: "2010", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Airbus Beluga", wiki: "Airbus Beluga", use: "Carga", subUse: "Carga sobredimensionada", maker: "Airbus", origin: "Europa", firstFlight: "1994", status: "Activo", license: "ATPL + Type Rating" },
  { name: "Ilyushin Il-76", wiki: "Ilyushin Il-76", use: "Carga", subUse: "Transporte pesado", maker: "Ilyushin", origin: "Rusia", firstFlight: "1971", status: "Activo", license: "Tripulación especializada" },

  { name: "Beechcraft T-6 Texan II", wiki: "Beechcraft T-6 Texan II", use: "Entrenamiento", subUse: "Entrenador turbohélice", maker: "Beechcraft", origin: "Estados Unidos", firstFlight: "1998", status: "Activo", license: "Entrenamiento militar" },
  { name: "Pilatus PC-21", wiki: "Pilatus PC-21", use: "Entrenamiento", subUse: "Entrenador avanzado", maker: "Pilatus", origin: "Suiza", firstFlight: "2002", status: "Activo", license: "Entrenamiento militar" },
  { name: "Aero L-39 Albatros", wiki: "Aero L-39 Albatros", use: "Entrenamiento", subUse: "Entrenador jet", maker: "Aero Vodochody", origin: "Checoslovaquia", firstFlight: "1968", status: "Activo", license: "Entrenamiento militar" },
  { name: "Cessna 152", wiki: "Cessna 152", use: "Entrenamiento", subUse: "Entrenador civil", maker: "Cessna", origin: "Estados Unidos", firstFlight: "1977", status: "Activo", license: "PPL" },

  { name: "Wright Flyer", wiki: "Wright Flyer", use: "Histórica", subUse: "Pionero", maker: "Wright Company", origin: "Estados Unidos", firstFlight: "1903", status: "Museo", license: "Experimental histórica" },
  { name: "Blériot XI", wiki: "Blériot XI", use: "Histórica", subUse: "Pionero", maker: "Blériot", origin: "Francia", firstFlight: "1909", status: "Histórico", license: "Experimental histórica" },
  { name: "Supermarine Spitfire", wiki: "Supermarine Spitfire", use: "Histórica", subUse: "Caza WWII", maker: "Supermarine", origin: "Reino Unido", firstFlight: "1936", status: "Histórico operativo", license: "Licencia histórica" },
  { name: "P-51 Mustang", wiki: "North American P-51 Mustang", use: "Histórica", subUse: "Caza WWII", maker: "North American Aviation", origin: "Estados Unidos", firstFlight: "1940", status: "Histórico operativo", license: "Licencia histórica" },
  { name: "Messerschmitt Bf 109", wiki: "Messerschmitt Bf 109", use: "Histórica", subUse: "Caza WWII", maker: "Messerschmitt", origin: "Alemania", firstFlight: "1935", status: "Histórico", license: "Licencia histórica" },
  { name: "Douglas DC-3", wiki: "Douglas DC-3", use: "Histórica", subUse: "Clásico comercial", maker: "Douglas", origin: "Estados Unidos", firstFlight: "1935", status: "Histórico operativo", license: "CPL / ATPL" },

  { name: "Bell X-1", wiki: "Bell X-1", use: "Experimental", subUse: "Supersónico experimental", maker: "Bell", origin: "Estados Unidos", firstFlight: "1946", status: "Museo", license: "Piloto de pruebas" },
  { name: "North American X-15", wiki: "North American X-15", use: "Experimental", subUse: "Hipersonico experimental", maker: "North American Aviation", origin: "Estados Unidos", firstFlight: "1959", status: "Museo", license: "Piloto de pruebas" },
  { name: "X-59 QueSST", wiki: "Lockheed Martin X-59 QueSST", use: "Experimental", subUse: "Supersónico silencioso", maker: "Lockheed Martin / NASA", origin: "Estados Unidos", firstFlight: "2024", status: "Experimental", license: "Piloto de pruebas" },
  { name: "SpaceShipOne", wiki: "SpaceShipOne", use: "Experimental", subUse: "Suborbital", maker: "Scaled Composites", origin: "Estados Unidos", firstFlight: "2003", status: "Museo", license: "Piloto de pruebas" },
  { name: "Solar Impulse", wiki: "Solar Impulse", use: "Experimental", subUse: "Avión solar", maker: "Solar Impulse", origin: "Suiza", firstFlight: "2009", status: "Museo", license: "Experimental" }
];

const groups = ["Militar", "Comercial", "Privada / General", "Carga", "Entrenamiento", "Histórica", "Experimental"];

async function getImage(title: string) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

export default async function EnciclopediaPage() {
  const withImages = await Promise.all(aircraft.map(async (plane) => ({ ...plane, image: await getImage(plane.wiki) })));

  return (
    <main className="page">
      <section className="container hero compactHero">
        <a className="back" href="/">← Volver</a>
        <p className="gold">WIKIAIR V4 DEFINITIVA</p>
        <h1>Enciclopedia por uso</h1>
        <p>
          {aircraft.length} aeronaves iniciales separadas por uso. Cada tarjeta incluye imagen real desde Wikipedia/Wikimedia cuando está disponible y una ficha técnica resumida.
        </p>
      </section>

      <section className="container categoryNav">
        {groups.map((group) => (
          <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}>{group}</a>
        ))}
      </section>

      {groups.map((group) => {
        const list = withImages.filter((plane) => plane.use === group);
        return (
          <section className="container groupBlock" id={group.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")} key={group}>
            <div className="groupTitle">
              <p className="gold">{list.length} aeronaves</p>
              <h2>{group}</h2>
            </div>

            <div className="aircraftGrid">
              {list.map((plane) => (
                <article className="aircraftCard" key={plane.name}>
                  <div className="imageBox">
                    {plane.image ? <img src={plane.image} alt={plane.name} /> : <div className="imageFallback">WikiAir</div>}
                  </div>
                  <div className="aircraftBody">
                    <span className="pill">{plane.subUse}</span>
                    <h3>{plane.name}</h3>
                    <p>{plane.maker} · {plane.origin}</p>
                    <div className="specList">
                      <span>Primer vuelo: {plane.firstFlight}</span>
                      <span>Estado: {plane.status}</span>
                      <span>Licencia: {plane.license}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
