// Add this data array
const tableData = [
  { date: "09.12.2025", time: "12:16", address: "İnönü Caddesi 123", city: "Ankara", state: "Ankara", zip: "06000", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
  { date: "09.01.2025", time: "9:04", address: "Cumhuriyet Caddesi 45", city: "İstanbul", state: "İstanbul", zip: "34400", tankGrade: "Diesel #2", tankNo: "1", preventedDelivery: "GASOLINE" },
  { date: "08.14.2025", time: "5:52", address: "Gazi Bulvarı 89", city: "İzmir", state: "İzmir", zip: "35000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "6", preventedDelivery: "DIESEL" },
  { date: "07.09.2025", time: "2:40", address: "Atatürk Bulvarı 678", city: "Bursa", state: "Bursa", zip: "16000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "06.30.2025", time: "23:28", address: "Fatih Sultan Mehmet Caddesi 102", city: "Antalya", state: "Antalya", zip: "07000", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
  { date: "06.24.2025", time: "20:16", address: "Yıldırım Beyazıt Caddesi 321", city: "Konya", state: "Konya", zip: "42000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
  { date: "06.03.2025", time: "17:04", address: "Gazi Osman Paşa Bulvarı 250", city: "Eskişehir", state: "Eskişehir", zip: "26000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "05.19.2025", time: "13:52", address: "Dumlupınar Bulvarı 78", city: "Samsun", state: "Samsun", zip: "55000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "05.14.2025", time: "10:40", address: "Milli Egemenlik Caddesi 110", city: "Kayseri", state: "Kayseri", zip: "38000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "7", preventedDelivery: "DIESEL" },
  { date: "04.23.2025", time: "7:28", address: "Zafer Caddesi 505", city: "Trabzon", state: "Trabzon", zip: "61000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "3", preventedDelivery: "DIESEL" },
  { date: "04.22.2025", time: "4:16", address: "Yenişehir Mahallesi 24", city: "Mersin", state: "Mersin", zip: "33000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "6", preventedDelivery: "DIESEL" },
  { date: "04.04.2025", time: "1:04", address: "Hükümet Caddesi 220", city: "Adana", state: "Adana", zip: "01000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
  { date: "02.22.2025", time: "21:52", address: "Mevlana Caddesi 390", city: "Diyarbakır", state: "Diyarbakır", zip: "21000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
  { date: "02.11.2025", time: "18:40", address: "Cumhuriyet Bulvarı 50", city: "Gaziantep", state: "Gaziantep", zip: "27000", tankGrade: "GAS 91 NO ETH 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "01.29.2025", time: "15:28", address: "Kazım Karabekir Caddesi 15", city: "Erzurum", state: "Erzurum", zip: "25000", tankGrade: "Diesel #2", tankNo: "2", preventedDelivery: "GASOLINE" },
  { date: "01.18.2025", time: "12:16", address: "Atatürk Caddesi 9", city: "Sivas", state: "Sivas", zip: "58000", tankGrade: "High Ethanol ", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "01.12.2025", time: "9:04", address: "İstiklal Caddesi 150", city: "Kocaeli", state: "Kocaeli", zip: "41000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "01.03.2025", time: "5:52", address: "Anadolu Bulvarı 20", city: "Malatya", state: "Malatya", zip: "44000", tankGrade: "Gas 93 OCTANE 10% ETH 9.0RVP", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "12.22.2024", time: "2:40", address: "Sakarya Mahallesi 200", city: "Van", state: "Van", zip: "65000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
  { date: "12.21.2024", time: "23:28", address: "Mithat Paşa Caddesi 905", city: "Şanlıurfa", state: "Şanlıurfa", zip: "63000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "12.13.2024", time: "20:16", address: "Kurtuluş Caddesi 101", city: "Çorum", state: "Çorum", zip: "19000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "12.02.2024", time: "17:04", address: "Zafer Mahallesi 45", city: "Aydın", state: "Aydın", zip: "09000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
  { date: "11.09.2024", time: "13:52", address: "Cengiz Topel Caddesi 312", city: "Balıkesir", state: "Balıkesir", zip: "10000", tankGrade: "Diesel #2", tankNo: "5", preventedDelivery: "GASOLINE" },
  { date: "10.30.2024", time: "10:40", address: "Şehitler Caddesi 77", city: "Manisa", state: "Manisa", zip: "45000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "09.09.2024", time: "7:28", address: "Fatih Mahallesi 55", city: "Elazığ", state: "Elazığ", zip: "23000", tankGrade: "High Ethanol ", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "08.10.2024", time: "4:16", address: "Bahçelievler Mahallesi 120", city: "Kahramanmaraş", state: "Kahramanmaraş", zip: "46000", tankGrade: "GAS 87 OCTANE 10.0% ETHANOL 9.0 RVP", tankNo: "5", preventedDelivery: "DIESEL" },
  { date: "06.28.2024", time: "1:04", address: "Cumhuriyet Caddesi 15", city: "Uşak", state: "Uşak", zip: "64000", tankGrade: "Diesel #2", tankNo: "4", preventedDelivery: "GASOLINE" },
  { date: "05.01.2024", time: "21:52", address: "Cumhuriyet Meydanı 45", city: "Ordu", state: "Ordu", zip: "52000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" },
  { date: "04.28.2024", time: "18:40", address: "Yunus Emre Caddesi 170", city: "Denizli", state: "Denizli", zip: "20000", tankGrade: "GAS 87 NO ETH 9.0 RVP ", tankNo: "4", preventedDelivery: "DIESEL" }
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