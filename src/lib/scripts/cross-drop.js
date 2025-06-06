// Add this data array
const tableData = [
{ date: "09.12.2025", time: "12:16", address: "Av. Libertador Bernardo O'Higgins 2151", city: "Santiago", state: "Región Metropolitana", zip: "8320000", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "09.01.2025", time: "9:04", address: "Calle Cochrane 207", city: "Valparaíso", state: "Región de Valparaíso", zip: "2340000", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
    { date: "08.14.2025", time: "5:52", address: "Av. Pedro Montt 619", city: "Antofagasta", state: "Región de Antofagasta", zip: "1240000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "07.09.2025", time: "2:40", address: "Ruta 5 Norte Km 2901", city: "La Serena", state: "Región de Coquimbo", zip: "1700000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "06.30.2025", time: "23:28", address: "Av. Arturo Prat 6321", city: "Iquique", state: "Región de Tarapacá", zip: "1100000", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "06.24.2025", time: "20:16", address: "Calle Baquedano 6321", city: "Calama", state: "Región de Antofagasta", zip: "1390000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "06.03.2025", time: "17:04", address: "Av. Costanera 11102", city: "Concepción", state: "Región del Biobío", zip: "4030000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.19.2025", time: "13:52", address: "Camino Los Aromos 2202", city: "Temuco", state: "Región de La Araucanía", zip: "4780000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "05.14.2025", time: "10:40", address: "Ruta 5 Sur Km 9111", city: "Osorno", state: "Región de Los Lagos", zip: "5290000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "7", preventedDelivery: "DIESEL" },
    { date: "04.23.2025", time: "7:28", address: "Av. Las Condes 16555", city: "Las Condes", state: "Región Metropolitana", zip: "7550000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "3", preventedDelivery: "DIESEL" },
    { date: "04.22.2025", time: "4:16", address: "Calle Esmeralda 1301", city: "Valdivia", state: "Región de Los Ríos", zip: "5090000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "6", preventedDelivery: "DIESEL" },
    { date: "04.04.2025", time: "1:04", address: "Av. Paicaví 720", city: "Talcahuano", state: "Región del Biobío", zip: "4260000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "02.22.2025", time: "21:52", address: "Calle Maipú 3225", city: "Rancagua", state: "Región de O'Higgins", zip: "2820000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "02.11.2025", time: "18:40", address: "Av. Angol 101", city: "Los Ángeles", state: "Región del Biobío", zip: "4440000", tankGrade: "GAS 91 NO ETH 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "01.29.2025", time: "15:28", address: "Calle Freire 9", city: "Chillán", state: "Región de Ñuble", zip: "3780000", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
    { date: "01.18.2025", time: "12:16", address: "Av. Bernardo O'Higgins 9", city: "Talca", state: "Región del Maule", zip: "3460000", tankGrade: "High Ethanol ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.12.2025", time: "9:04", address: "Ruta 68 Km 15513", city: "Curicó", state: "Región del Maule", zip: "3340000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "01.03.2025", time: "5:52", address: "Av. Colón 5202", city: "Puerto Montt", state: "Región de Los Lagos", zip: "5500000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.22.2024", time: "2:40", address: "Camino Melipilla 12200", city: "Melipilla", state: "Región Metropolitana", zip: "9580000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "12.21.2024", time: "23:28", address: "Av. Punta Arenas 905", city: "Punta Arenas", state: "Región de Magallanes", zip: "6200000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "12.13.2024", time: "20:16", address: "Calle Linares 101", city: "Linares", state: "Región del Maule", zip: "3580000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "12.02.2024", time: "17:04", address: "Av. Providencia 16222", city: "Providencia", state: "Región Metropolitana", zip: "7500000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "11.09.2024", time: "13:52", address: "Calle Viña del Mar 27137", city: "Viña del Mar", state: "Región de Valparaíso", zip: "2520000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
    { date: "10.30.2024", time: "10:40", address: "Av. Maipú 6406", city: "Maipú", state: "Región Metropolitana", zip: "9250000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "09.09.2024", time: "7:28", address: "Ruta 160 Km 21997", city: "Copiapó", state: "Región de Atacama", zip: "1530000", tankGrade: "High Ethanol ", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "08.10.2024", time: "4:16", address: "Av. San Martín 9157", city: "Arica", state: "Región de Arica y Parinacota", zip: "1000000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
    { date: "06.28.2024", time: "1:04", address: "Calle Quillota 10537", city: "Quillota", state: "Región de Valparaíso", zip: "2260000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
    { date: "05.01.2024", time: "21:52", address: "Av. Castro 1303", city: "Castro", state: "Región de Los Lagos", zip: "5700000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
    { date: "04.28.2024", time: "18:40", address: "Camino Ovalle 31700", city: "Ovalle", state: "Región de Coquimbo", zip: "1840000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" }
];

export function disableBrowserAutocomplete() {
    // Get all input fields in the search fields section
    const inputs = document.querySelectorAll('.search-fields input');
    
    inputs.forEach(input => {
        // Set attributes to prevent browser autocomplete
        
        // Add a random name to prevent browser autocomplete
        const randomName = input.id + '_' + Math.random().toString(36).substring(2, 9);
        input.setAttribute('name', randomName); 
        if (input.id === 'State' || input.id === 'Zip' || input.id === 'Date' || input.id === 'ST-address' || input.id ==='City' || input.id ==='Fuel') {
            input.setAttribute('autocomplete', 'new-password');
            input.setAttribute('data-lpignore', 'true');
            input.setAttribute('data-form-type', 'other');
        }
    });
}
export async function fetchPreventions() {
    return tableData;
}