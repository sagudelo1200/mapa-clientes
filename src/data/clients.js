const CITIES = [
  { name: 'Bogotá', lat: 4.6097, lng: -74.0817 },
  { name: 'Medellín', lat: 6.2518, lng: -75.5636 },
  { name: 'Cali', lat: 3.4516, lng: -76.532 },
  { name: 'Barranquilla', lat: 10.9685, lng: -74.7813 },
  { name: 'Cartagena', lat: 10.391, lng: -75.5144 },
  { name: 'Bucaramanga', lat: 7.1254, lng: -73.1198 },
  { name: 'Pereira', lat: 4.8133, lng: -75.6961 },
  { name: 'Manizales', lat: 5.0689, lng: -75.5174 },
  { name: 'Santa Marta', lat: 11.2404, lng: -74.199 },
  { name: 'Cúcuta', lat: 7.8891, lng: -72.4967 },
];

const FIRST_NAMES = [
  'Santiago',
  'Valentina',
  'Mateo',
  'Sofía',
  'Samuel',
  'Isabella',
  'Nicolás',
  'Mariana',
  'Alejandro',
  'Gabriela',
  'Sebastián',
  'Camila',
  'Daniel',
  'Laura',
  'Andrés',
  'Daniela',
  'Felipe',
  'Paula',
  'Juan',
  'Carolina',
  'David',
  'Andrea',
  'Carlos',
  'María',
  'Miguel',
  'Natalia',
  'José',
  'Diana',
  'Luis',
  'Catalina',
  'Fernando',
  'Paola',
  'Ricardo',
  'Claudia',
  'Jorge',
  'Lorena',
  'Mauricio',
  'Marcela',
  'Óscar',
  'Viviana',
];

const LAST_NAMES = [
  'García',
  'Rodríguez',
  'Martínez',
  'López',
  'González',
  'Hernández',
  'Díaz',
  'Moreno',
  'Muñoz',
  'Álvarez',
  'Romero',
  'Ruiz',
  'Torres',
  'Ramírez',
  'Sánchez',
  'Vargas',
  'Castro',
  'Ortiz',
  'Gutiérrez',
  'Rojas',
  'Restrepo',
  'Ospina',
  'Cárdenas',
  'Mejía',
  'Valencia',
  'Ríos',
  'Castaño',
  'Giraldo',
  'Arango',
  'Londoño',
];

const VENDEDORES = [
  'Carlos López',
  'María García',
  'Juan Rodríguez',
  'Ana Martínez',
  'Pedro Sánchez',
];

const TIPOS = ['VIP', 'frecuente', 'nuevo'];

const CALLES = ['Calle', 'Carrera', 'Avenida', 'Diagonal', 'Transversal'];

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateClients(count = 220) {
  const rand = seededRandom(42);
  const clients = [];

  for (let i = 1; i <= count; i++) {
    const city = CITIES[Math.floor(rand() * CITIES.length)];
    const lat = city.lat + (rand() - 0.5) * 0.1;
    const lng = city.lng + (rand() - 0.5) * 0.1;
    const tipo = TIPOS[Math.floor(rand() * TIPOS.length)];
    const vendedor = VENDEDORES[Math.floor(rand() * VENDEDORES.length)];
    const calle = CALLES[Math.floor(rand() * CALLES.length)];
    const firstName = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];

    clients.push({
      id: i,
      nombre: `${firstName} ${lastName}`,
      direccion: `${calle} ${Math.floor(rand() * 100) + 1} #${Math.floor(rand() * 80) + 1}-${Math.floor(rand() * 99) + 1}`,
      ciudad: city.name,
      vendedor,
      tipo_cliente: tipo,
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
    });
  }

  return clients;
}

export const clients = generateClients();
export const vendedores = VENDEDORES;
export const tiposCliente = TIPOS;
