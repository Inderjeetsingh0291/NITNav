const blockCoordinates = {
  // ── Gates ───────────────────────────────────────────────
  main_gate: "31.394179125328094, 75.53302048140624",

  // ── Administrative ──────────────────────────────────────
  admin_block: "31.39584990210338, 75.53577719992205",
  director_office: "31.395757531255935, 75.53590838418994",


  // ── Academic Departments ─────────────────────────────────
  cse_dept: "31.395068954423795, 75.53576948723979",
  it_dept: "31.39689956218259, 75.53407465666596",
  ece_dept: "31.396150933371963, 75.53689386564817",
  me_dept: "31.397221260103354, 75.53645676146992",
  civil_dept: "31.39573386939521, 75.53712612948996",
  chemical_dept: "31.39553399599111, 75.53744026957648",
  biotech_dept: "31.39801696107953, 75.53556336828458",
  textile_dept: "31.39559622522024, 75.53799572104921",
  ipe_dept: "31.395234891281792, 75.5364060442533", // Industrial & Production Engg
  ice_dept: "31.396150933371963, 75.53689386564817", // Instrumentation & Control Engg

  // ── Science & Humanities ─────────────────────────────────
  physics_dept: "31.39702066647376, 75.53459056204197",
  chemistry_dept: "31.39702066647376, 75.53459056204197",
  maths_dept: "31.397252567662047, 75.53584060555335",
  humanities_dept: "31.397347411813232, 75.53445679777575",

  // ── Central Facilities ───────────────────────────────────
  
  NITJ_Library: "31.39651062453397, 75.53536171988944",

  Central_Seminar_Hall: "31.396277689376824, 75.53446778495783",
  reading_hall: "31.396734259193725, 75.5348263548789",
  Manufacturing_Workshop: "31.39776814416046, 75.53477883646876",
  
  sports_complex: "31.396623695050952, 75.53328345602668",
  Dispensary_NITJ: "31.394193836731215, 75.53756607848071",
  sbi_bank: "31.393970606003784, 75.5373515017615",
  atm_sbi: "31.393970606003784, 75.5373515017615",

  // ── Hostels ──────────────────────────────────────────────
  hostel_1: "31.39711335081291, 75.53352697376381",
  hostel_2: "31.397922445007445, 75.5331976542899",
  hostel_3: "31.39800361750484, 75.53323740647635",
  hostel_4: "31.399045540635516, 75.53243221837756",
  hostel_5: "31.398579800274618, 75.53264441307722",
  hostel_6: "31.398443012133598, 75.5363812440316",
  hostel_7: "31.398945821035493, 75.53716962341447",
  hostel_7E: "31.398945821035493, 75.53716962341447",
  girls_hostel_a: "31.3949702378911, 75.53816202508087",
  girls_hostel_b: "31.3949702378911, 75.53816202508087",
  Mega_Boys_Hostel_A_Block: "31.39917888840491, 75.53541245569498",
  Mega_Boys_Hostel_B_Block: "31.39935588290885, 75.5361552182012",
  Mega_Boys_Hostel_F_Block: "31.399828901871025, 75.5347929821518",

  // ── Food & Social ────────────────────────────────────────


  // ── Residences ───────────────────────────────────────────
  
  guest_house: "31.39386495096488, 75.53647025470457",

  // ── Near Campus ─────────────────────────────────────────
  railway_station: "31.33091189666475, 75.59079364100988", // Jalandhar City Rly Station
};

const locationLabels = {
  main_gate: "Main Gate",
  admin_block: "Administrative Block",
  director_office: "Director's Office",


  cse_dept: "Dept. of Computer Science & Engineering",
  it_dept: "Dept. of Information Technology",
  ece_dept: "Dept. of Electronics & Communication Engg",
  eee_dept: "Dept. of Electrical Engineering",
  me_dept: "Dept. of Mechanical Engineering",
  civil_dept: "Dept. of Civil Engineering",
  chemical_dept: "Dept. of Chemical Engineering",
  biotech_dept: "Dept. of Biotechnology",
  textile_dept: "Dept. of Textile Technology",
  ipe_dept: "Dept. of Industrial & Production Engg",
  ice_dept: "Dept. of Instrumentation & Control Engg",
  physics_dept: "Dept. of Physics",
  chemistry_dept: "Dept. of Chemistry",
  maths_dept: "Dept. of Mathematics & Computing",
  humanities_dept: "Dept. of Humanities & Management",
  NITJ_Library: "NITJ Library",
  Manufacturing_Workshop: "Manufacturing Workshop",

  Central_Seminar_Hall: "Central Seminar Hall",
  reading_hall: "Reading Hall",
  
  sports_complex: "Sports Complex & Ground",
  Dispensary_NITJ: "Dispensary NITJ",
  sbi_bank: "SBI Bank Branch",
  atm_sbi: "SBI ATM",

  // Hostels

  hostel_1: "Boys Hostel - 1",
  hostel_2: "Boys Hostel – 2",
  hostel_3: "Boys Hostel – 3",
  hostel_4: "Boys Hostel – 4",
  hostel_5: "Boys Hostel – 5",
  hostel_6: "Boys Hostel – 6",
  hostel_7: "Boys Hostel - 7",
  hostel_7E: "Boys Hostel - 7E",
  Mega_Boys_Hostel_A_Block: "Mega Boys Hostel A Block",
  Mega_Boys_Hostel_B_Block: "Mega Boys Hostel B Block",
  Mega_Boys_Hostel_F_Block: "Mega Boys Hostel F Block",
  girls_hostel_a: "Girls Hostel – Block A",
  girls_hostel_b: "Girls Hostel – Block B",




 

 
  guest_house: "Guest House",
  
  railway_station: "Jalandhar City Railway Station",
};

const locationCategories = {
  main_gate: "gate",
  admin_block: "admin",
  director_office: "admin",


  cse_dept: "dept",
  it_dept: "dept",
  ece_dept: "dept",

  eee_dept: "dept",
  me_dept: "dept",
  civil_dept: "dept",
  chemical_dept: "dept",
  biotech_dept: "dept",
  textile_dept: "dept",
  ipe_dept: "dept",
  ice_dept: "dept",
  physics_dept: "dept",
  chemistry_dept: "dept",
  maths_dept: "dept",
  humanities_dept: "dept",
  NITJ_Library: "facility",

  Central_Seminar_Hall: "facility",
  reading_hall: "facility",
  Manufacturing_Workshop: "facility",
  sports_complex: "facility",
  Dispensary_NITJ: "facility",
  sbi_bank: "facility",
  atm_sbi: "facility",
  hostel_1: "hostel",
  hostel_2: "hostel",
  hostel_3: "hostel",
  hostel_4: "hostel",
  hostel_5: "hostel",
  hostel_6: "hostel",
  Mega_Boys_Hostel_A_Block: "hostel",
  Mega_Boys_Hostel_B_Block: "hostel",
  Mega_Boys_Hostel_F_Block: "hostel",
  hostel_7E: "hostel",
  hostel_7: "hostel",


  girls_hostel_a: "hostel",
  girls_hostel_b: "hostel",

 
  director_residence: "residence",
  guest_house: "residence",

  railway_station: "transport",
};

const categoryIcons = {
  gate: "🚪",
  admin: "🏛️",
  dept: "🎓",
  facility: "🏢",
  hostel: "🏠",
  food: "🍽️",
  residence: "🏡",
  transport: "🚌",
};

module.exports = {
  blockCoordinates,
  locationLabels,
  locationCategories,
  categoryIcons,
};
