// Import billboard images - Static
import GHA358055 from "@/assets/GHA358055-02.png";
import GHA358042 from "@/assets/GHA358042-02.png";
import GHA111259 from "@/assets/GHA111259-01.png";
import GHA111258 from "@/assets/GHA111258-01.png";
import GHA357980 from "@/assets/GHA357980-01.png";
import GHA111097 from "@/assets/GHA111097-01.png";
import GHA358038 from "@/assets/GHA358038-02.png";
import GHA141751 from "@/assets/GHA141751-02.png";
import GHA358037 from "@/assets/GHA358037-02.png";
import GHA111179 from "@/assets/GHA111179-01.png";

// Import billboard images - Digital
import DzorwuluJunction from "@/assets/Dzorwulu_Junction_-_Achimota.png";
import NationalTheatre from "@/assets/National_Theatre.png";
import ShangrilaPoloHeights from "@/assets/Shangrila_Polo_Heights.png";
import LiberationCircle from "@/assets/Liberation_Circle.png";
import AfrikikoRestaurant from "@/assets/Afrikiko_Restaurant.png";

export interface Billboard {
  id: number;
  name: string;
  type: string;
  latitude: string;
  longitude: string;
  address: string;
  mediaOwner: string;
  image: string;
  cost: number;
  currency: string;
  startTime?: string;
  endTime?: string;
  maxVideoSize?: string;
  status?: "Available" | "Occupied" | "Needs Service";
  needsService?: boolean;
}

export const billboardsData: Billboard[] = [
  // Static Billboards
  { id: 1, name: "GHA358055-02", type: "Static", latitude: "5.6037", longitude: "-0.1870", address: "Ring Road Central, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA358055, cost: 2500, currency: "GHS" },
  { id: 2, name: "GHA358042-02", type: "Static", latitude: "5.6145", longitude: "-0.2058", address: "Independence Avenue, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA358042, cost: 3000, currency: "GHS" },
  { id: 3, name: "GHA111259-01", type: "Static", latitude: "5.6280", longitude: "-0.1732", address: "Spintex Road, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA111259, cost: 2800, currency: "GHS" },
  { id: 4, name: "GHA111258-01", type: "Static", latitude: "5.6510", longitude: "-0.1820", address: "Madina Highway, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA111258, cost: 2200, currency: "GHS" },
  { id: 5, name: "GHA357980-01", type: "Static", latitude: "5.5893", longitude: "-0.2320", address: "Tema Motorway, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA357980, cost: 3500, currency: "GHS" },
  { id: 6, name: "GHA111097-01", type: "Static", latitude: "5.5600", longitude: "-0.2012", address: "Liberation Road, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA111097, cost: 2600, currency: "GHS" },
  { id: 7, name: "GHA358038-02", type: "Static", latitude: "5.6190", longitude: "-0.1675", address: "Achimota Road, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA358038, cost: 2400, currency: "GHS" },
  { id: 8, name: "GHA141751-02", type: "Static", latitude: "5.6430", longitude: "-0.1950", address: "Legon Bypass, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA141751, cost: 2900, currency: "GHS" },
  { id: 9, name: "GHA358037-02", type: "Static", latitude: "5.6055", longitude: "-0.2145", address: "Kwame Nkrumah Avenue, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA358037, cost: 3100, currency: "GHS" },
  { id: 10, name: "GHA111179-01", type: "Static", latitude: "5.5785", longitude: "-0.2398", address: "Tema Station Road, Accra, Ghana", mediaOwner: "Allianz Media", image: GHA111179, cost: 2300, currency: "GHS" },
  // Digital Billboards
  { id: 11, name: "AFRIKIKO RESTAURANT", type: "Digital", latitude: "5.5600", longitude: "-0.2012", address: "LIBERATION RD.", mediaOwner: "Allianz Media", image: AfrikikoRestaurant, startTime: "06:00", endTime: "23:00", maxVideoSize: "5 MB", cost: 4500, currency: "GHS" },
  { id: 12, name: "Liberation Circle", type: "Digital", latitude: "5.5620", longitude: "-0.2030", address: "LIBERATION RD.", mediaOwner: "Allianz Media", image: LiberationCircle, startTime: "06:00", endTime: "23:00", maxVideoSize: "5 MB", cost: 5000, currency: "GHS" },
  { id: 13, name: "Shangrila Polo Heights", type: "Digital", latitude: "5.5640", longitude: "-0.2050", address: "LIBERATION RD.", mediaOwner: "Allianz Media", image: ShangrilaPoloHeights, startTime: "06:00", endTime: "23:00", maxVideoSize: "5 MB", cost: 4800, currency: "GHS" },
  { id: 14, name: "National Theatre", type: "Digital", latitude: "5.6145", longitude: "-0.2058", address: "INDEPENDENCE AVENUE", mediaOwner: "Allianz Media", image: NationalTheatre, startTime: "06:00", endTime: "23:00", maxVideoSize: "5 MB", cost: 5500, currency: "GHS" },
  { id: 15, name: "DZORWULU JUNCTION-ACHIMOTA", type: "Digital", latitude: "5.6190", longitude: "-0.1675", address: "ACHIMOTA RD.", mediaOwner: "Allianz Media", image: DzorwuluJunction, startTime: "06:00", endTime: "23:00", maxVideoSize: "5 MB", cost: 4200, currency: "GHS" },
  // Nigerian Billboards
  { id: 100, name: "Lagos - Falomo Roundabout", type: "Digital", latitude: "6.5039", longitude: "3.3566", address: "Falomo Roundabout Opposite MTN Plaza", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 5000000, currency: "NGN" },
  { id: 101, name: "Lagos - Ahmadu Bello Way", type: "Digital", latitude: "6.5467", longitude: "3.3942", address: "FTF Adeola Odeku, by Federal Palace Hotel, Victoria Island", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 4000000, currency: "NGN" },
  { id: 102, name: "Lagos - Maryland", type: "Digital", latitude: "6.5191", longitude: "3.3543", address: "MBA by Maryland Intersection", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 7000000, currency: "NGN" },
  { id: 103, name: "Lagos - Costain Roundabout", type: "Digital", latitude: "6.5069", longitude: "3.3916", address: "Costain Roundabout, Along Ikorodu road, Western Avenue", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 4500000, currency: "NGN" },
  { id: 104, name: "Lagos - Onikan Roundabout", type: "Digital", latitude: "6.5469", longitude: "3.3869", address: "Onikan Roundabout descending from TMB towards Lagos Island, Ikoyi and Victoria Island", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 4500000, currency: "NGN" },
  { id: 105, name: "Lagos - MMA2 Airport", type: "Digital", latitude: "6.5491", longitude: "3.3541", address: "MMA2 Departure Hall by all Check-In Counters", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 3500000, currency: "NGN" },
  { id: 106, name: "Lagos - Ikoyi", type: "Digital", latitude: "6.5059", longitude: "3.3670", address: "Along Kingsway road by Gerrard Junction", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 6000000, currency: "NGN" },
  { id: 107, name: "Lagos - Badagry Expressway", type: "Digital", latitude: "6.5168", longitude: "3.3914", address: "Along Badagry Exp. Way by Festac 1st Gate", mediaOwner: "MOTOMEDIA", image: GHA358055, startTime: "06:00", endTime: "22:00", maxVideoSize: "10 MB", cost: 5000000, currency: "NGN" },
  { id: 108, name: "Lagos - Ahmadu Bello Way", type: "Static", latitude: "6.5467", longitude: "3.3567", address: "Noun Building Ahmadu Bello, VI", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 15000000, currency: "NGN" },
  { id: 109, name: "Lagos - Ahmadu Bello Way", type: "Static", latitude: "6.5095", longitude: "3.3666", address: "Noun Building Ahmadu Bello, VI", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 15000000, currency: "NGN" },
  { id: 110, name: "Lagos - Ikoyi", type: "Static", latitude: "6.5318", longitude: "3.3913", address: "Ikoyi Tower, Awolowo Road Opposite Ikoyi Boat Club", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 15000000, currency: "NGN" },
  { id: 111, name: "Lagos - Ikoyi", type: "Static", latitude: "6.5168", longitude: "3.3940", address: "Ikoyi Tower, Awolowo Road Opposite Ikoyi Boat Club (with laser lighting)", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 19500000, currency: "NGN" },
  { id: 112, name: "Lagos - Lagos Island", type: "Static", latitude: "6.5468", longitude: "3.3942", address: "Great Nigeria House", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 20000000, currency: "NGN" },
  { id: 113, name: "Lagos - Lagos Island", type: "Static", latitude: "6.5019", longitude: "3.3567", address: "Great Nigeria House facing traffic from TMB", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 13000000, currency: "NGN" },
  { id: 114, name: "Lagos - Marina", type: "Static", latitude: "6.5318", longitude: "3.3915", address: "Old Defense building, Marina", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 20000000, currency: "NGN" },
  { id: 115, name: "Lagos - Ikeja", type: "Static", latitude: "6.5168", longitude: "3.3666", address: "Etiebets Place Along Mobolaji Bank Anthony Way", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 15000000, currency: "NGN" },
  { id: 116, name: "Lagos - Allen Avenue", type: "Static", latitude: "6.5095", longitude: "3.3791", address: "Along Allen Avenue by Oshopey Plaza", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 10000000, currency: "NGN" },
  { id: 117, name: "Abuja - Ahmadu Bello Way", type: "Digital", latitude: "9.0616", longitude: "7.3861", address: "Along Ahmadu Bello Way by Aminu Kano Crescent", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 118, name: "Abuja - Nnamdi Azikiwe Way", type: "Digital", latitude: "9.0765", longitude: "7.4111", address: "Nnamdi Azikiwe Way by Area 1 Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 119, name: "Abuja - Herbert Macaulay", type: "Digital", latitude: "9.0890", longitude: "7.4111", address: "Herbert Macaulay by Berger Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 120, name: "Abuja - Shehu Shagari Way", type: "Digital", latitude: "9.0914", longitude: "7.3861", address: "Shehu Shagari Way by Police Force HQ", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 121, name: "Abuja - Nnamdi Azikiwe Way", type: "Digital", latitude: "9.0890", longitude: "7.3986", address: "Nnamdi Azikiwe Way", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 122, name: "Abuja - Airport Road", type: "Digital", latitude: "9.0765", longitude: "7.3861", address: "Airport Road by Dantata Bridge", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 123, name: "Abuja - Nnamdi Azikiwe Intl Airport", type: "Digital", latitude: "9.0890", longitude: "7.3986", address: "Airport Entrance by Toll Gate", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 124, name: "Abuja - Aminu Kano Crescent", type: "Digital", latitude: "9.0616", longitude: "7.3861", address: "Aminu Kano Crescent close to Glo Office", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 125, name: "Abuja - Ahmadu Bello Way", type: "Digital", latitude: "9.0765", longitude: "7.4111", address: "Ahmadu Bello Way by Mohammed Buhari Way by Old CBN Junction", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 126, name: "Ibadan - Bodija", type: "Static", latitude: "7.3775", longitude: "3.9595", address: "Bodija Market", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 127, name: "Ibadan - Iwo Road", type: "Static", latitude: "7.3775", longitude: "3.9345", address: "By Mobil filling station", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 128, name: "Ibadan - Iwo Road", type: "Static", latitude: "7.3650", longitude: "3.9470", address: "Monatan Market Iwo Road", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 129, name: "Ibadan - Sango", type: "Static", latitude: "7.3900", longitude: "3.9470", address: "Along Polytechnic Ibadan Elewure Market Sango", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 130, name: "Ibadan - Jericho", type: "Static", latitude: "7.3650", longitude: "3.9345", address: "Along Magazines Road, Jericho", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 131, name: "Ibadan - Dugbe", type: "Static", latitude: "7.3900", longitude: "3.9595", address: "Adamasigba Stadium Dugbe", mediaOwner: "MOTOMEDIA", image: GHA358055, cost: 1000000, currency: "NGN" },
  { id: 132, name: "Kano - Katsina Road", type: "Digital", latitude: "12.0176", longitude: "8.6025", address: "Katsina Rd by Kano Airport Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 133, name: "Kano - BUK Road", type: "Digital", latitude: "12.0264", longitude: "8.5759", address: "Along BUK Rd by Sabowar Kofa opp Govt Senior Sec School", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 134, name: "Kaduna - Kachia Road", type: "Digital", latitude: "10.5012", longitude: "7.4192", address: "Kachia Road by Peugeot Junction", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 135, name: "Sokoto - Aliu Flyover", type: "Digital", latitude: "13.0144", longitude: "5.2228", address: "Along Aliu Flyover by CBN", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 136, name: "Makurdi - High Level Roundabout", type: "Digital", latitude: "7.7338", longitude: "8.5029", address: "High Level Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 137, name: "Jos - Yakubu Gowon Way", type: "Digital", latitude: "9.8816", longitude: "8.8557", address: "Yakubu Gowon Way by National Library", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 138, name: "Minna - Paico Road", type: "Digital", latitude: "9.6033", longitude: "6.5395", address: "Along Paico Road by City Gate", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 139, name: "Bauchi - Elephant Roundabout", type: "Digital", latitude: "10.2960", longitude: "9.8475", address: "Elephant Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 140, name: "Katsina - Airport Roundabout", type: "Digital", latitude: "12.9861", longitude: "7.6020", address: "Airport R/about opp High Court", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 141, name: "Yola - Airport Roundabout", type: "Digital", latitude: "9.1948", longitude: "12.5045", address: "Airport R/about by NNPC Filling Station", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 142, name: "Gombe - Rainbow Roundabout", type: "Digital", latitude: "10.2887", longitude: "11.1543", address: "Rainbow Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 143, name: "Onitsha - Enugu Ridge Rd", type: "Digital", latitude: "6.1630", longitude: "6.7825", address: "Enugu Ridge Rd intersection near DMGS Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 144, name: "Onitsha - Head Bridge", type: "Digital", latitude: "6.1380", longitude: "6.7815", address: "Head Bridge", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 145, name: "Onitsha - Head Bridge", type: "Digital", latitude: "6.1397", longitude: "6.7655", address: "Head Bridge", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 146, name: "Nnewi - Old Onitsha Road", type: "Digital", latitude: "6.0226", longitude: "6.8926", address: "Old Onitsha Road by Nkwo Triangle", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 147, name: "Owerri - Orlu Road", type: "Digital", latitude: "5.4836", longitude: "7.0062", address: "Along Orlu Road by ICC Centre/Freedom Square Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 2333333, currency: "NGN" },
  { id: 148, name: "Enugu - Abakaliki Road", type: "Digital", latitude: "6.4336", longitude: "7.5439", address: "Abakaliki Road by Ogui Roundabout", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 149, name: "Enugu - WAEC Roundabout", type: "Digital", latitude: "6.4608", longitude: "7.5473", address: "WAEC Roundabout by UBA", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 150, name: "Port Harcourt - Aba Road", type: "Digital", latitude: "4.8280", longitude: "7.0626", address: "Aba Rd by Market Junction opp Poma Clinic", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 151, name: "Port Harcourt - Airport Road", type: "Digital", latitude: "4.8216", longitude: "7.0450", address: "Airport Rd by Aviation Medical Clinic", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 152, name: "Port Harcourt - Airport Road", type: "Digital", latitude: "4.8192", longitude: "7.0613", address: "Airport Road by Hotel De Ella", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 153, name: "Port Harcourt - Aba Road", type: "Digital", latitude: "4.8271", longitude: "7.0498", address: "By Pleasure Park along PH-Aba Road", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 154, name: "Benin - Ikpoba Hill", type: "Digital", latitude: "6.3186", longitude: "5.6223", address: "Along Ikpoba Hill by Oregbeni Army Barracks Mammy Market", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 155, name: "Benin - Ikpoba Hill", type: "Digital", latitude: "6.3522", longitude: "5.6192", address: "Along Ikpoba Hill by Oregbeni Army Barracks", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 156, name: "Aba - Aba-Owerri Road", type: "Digital", latitude: "5.1233", longitude: "7.3851", address: "Aba Owerri Rd by Abayi Girls School", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
  { id: 157, name: "Calabar - Mary Slessor", type: "Digital", latitude: "4.9740", longitude: "8.3228", address: "Mary Slessor by Calabar Road Junction opp FCMB", mediaOwner: "NEW CRYSTAL", image: GHA358055, cost: 0, currency: "NGN" },
];
