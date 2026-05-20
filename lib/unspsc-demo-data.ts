export interface UNSPSCCommodity {
  code: string;
  title: string;
  description: string;
  exampleItems: string[];
}

export interface UNSPSCClass {
  code: string;
  title: string;
  commodities: UNSPSCCommodity[];
}

export interface UNSPSCFamily {
  code: string;
  title: string;
  classes: UNSPSCClass[];
}

export interface UNSPSCSegment {
  code: string;
  title: string;
  color: string;
  families: UNSPSCFamily[];
}

export const demoData: UNSPSCSegment[] = [
  {
    code: "72",
    title: "Building and Construction Services",
    color: "#2563eb",
    families: [
      {
        code: "7210",
        title: "General building construction",
        classes: [
          {
            code: "721011",
            title: "Residential construction",
            commodities: [
              { code: "72101101", title: "Single family home construction", description: "Construction of detached single-family residential dwellings from foundation to finish.", exampleItems: ["New build detached house", "Self-build home project", "Bungalow construction", "Timber frame home", "Eco passivhaus build"] },
              { code: "72101102", title: "Multi-unit residential construction", description: "Construction of apartment blocks, terraced housing and multi-unit residential schemes.", exampleItems: ["Apartment complex", "Student accommodation block", "Retirement village", "Affordable housing scheme", "Mixed-tenure development"] },
              { code: "72101103", title: "Social housing construction", description: "Construction of council and housing association properties under public or grant-funded schemes.", exampleItems: ["Council house new build", "Housing association scheme", "Key worker housing", "Temporary modular housing", "Regeneration housing"] },
            ],
          },
          {
            code: "721012",
            title: "Commercial building construction",
            commodities: [
              { code: "72101201", title: "Office building construction", description: "Design and build of commercial office environments including fit-out.", exampleItems: ["Corporate HQ build", "Business park unit", "Grade A office tower", "Co-working conversion", "Open-plan office fit-out"] },
              { code: "72101202", title: "Retail construction", description: "Construction of retail stores, shopping centres, showrooms and outlet units.", exampleItems: ["Supermarket new build", "Retail park unit", "Drive-through restaurant", "Showroom construction", "Pop-up retail unit"] },
              { code: "72101203", title: "Industrial building construction", description: "Warehouses, distribution centres, manufacturing plants and logistics hubs.", exampleItems: ["Logistics warehouse", "Cold store facility", "Distribution centre", "Light industrial unit", "Manufacturing plant"] },
            ],
          },
          {
            code: "721013",
            title: "Civil engineering works",
            commodities: [
              { code: "72101301", title: "Road and highway construction", description: "Construction and resurfacing of roads, access roads and highway infrastructure.", exampleItems: ["Access road construction", "Car park surfacing", "Highway junction works", "Road resurfacing", "Traffic calming scheme"] },
              { code: "72101302", title: "Drainage and groundworks", description: "Excavation, drainage installation and below-ground infrastructure works.", exampleItems: ["Surface water drainage", "Foul sewer installation", "Soakaway construction", "Attenuation tank", "French drain system"] },
              { code: "72101303", title: "Landscaping and external works", description: "Hard and soft landscaping, boundary works and external site improvements.", exampleItems: ["Paving and block work", "Boundary fencing", "Planting and seeding", "Retaining wall", "Cycle shelter installation"] },
            ],
          },
        ],
      },
      {
        code: "7211",
        title: "Building renovation and repair",
        classes: [
          {
            code: "721111",
            title: "Interior renovation",
            commodities: [
              { code: "72111101", title: "Partition and drylining works", description: "Installation and modification of internal partition walls and drylining systems.", exampleItems: ["Office refit partitioning", "Meeting room creation", "Drylining works", "Stud wall installation", "Acoustic partition system"] },
              { code: "72111102", title: "Flooring installation and repair", description: "Supply and installation of hard and soft floor coverings across all building types.", exampleItems: ["Carpet installation", "Vinyl floor laying", "Ceramic tile replacement", "Raised access floor", "Epoxy resin floor coating"] },
              { code: "72111103", title: "Ceiling works", description: "Installation and repair of suspended, plastered and specialist ceiling systems.", exampleItems: ["Suspended ceiling grid", "Plasterboard ceiling", "Acoustic tile ceiling", "Exposed services ceiling", "Fire-rated ceiling system"] },
              { code: "72111104", title: "Decoration and painting", description: "Internal painting, decorating and specialist finishes.", exampleItems: ["Office redecoration", "Emulsion painting", "Feature wall finish", "Anti-graffiti coating", "Specialist floor paint"] },
            ],
          },
          {
            code: "721112",
            title: "Exterior renovation",
            commodities: [
              { code: "72111201", title: "Facade restoration", description: "Cleaning, repair and treatment of external building facades and cladding systems.", exampleItems: ["Stone facade cleaning", "Cladding replacement", "Render repair", "Pointing works", "Curtain wall remediation"] },
              { code: "72111202", title: "Roofing services", description: "Repair, replacement and maintenance of all roofing systems.", exampleItems: ["Flat roof replacement", "Pitched roof repair", "Green roof installation", "Roof light replacement", "Bituminous felt re-roofing"] },
              { code: "72111203", title: "Waterproofing and tanking", description: "Application of waterproof membranes and tanking systems to prevent water ingress.", exampleItems: ["Basement tanking", "Wet room waterproofing", "Balcony membrane system", "Podium deck waterproofing", "Bridge deck waterproofing"] },
            ],
          },
        ],
      },
      {
        code: "7212",
        title: "Specialist building services",
        classes: [
          {
            code: "721211",
            title: "Fire protection works",
            commodities: [
              { code: "72121101", title: "Passive fire protection", description: "Fire stopping, intumescent seals and compartmentation to limit fire spread.", exampleItems: ["Fire stopping works", "Intumescent seal installation", "Compartmentation upgrade", "Fire door installation", "Fire-resistant glazing"] },
              { code: "72121102", title: "Active fire suppression", description: "Sprinkler systems, gaseous suppression and foam systems.", exampleItems: ["Sprinkler system install", "Gaseous suppression system", "Foam deluge system", "Mist suppression system", "Kitchen suppression system"] },
            ],
          },
          {
            code: "721212",
            title: "Structural repair and strengthening",
            commodities: [
              { code: "72121201", title: "Concrete repair", description: "Diagnosis and repair of concrete structures including carbonation and chloride attack.", exampleItems: ["Concrete spalling repair", "Carbonation treatment", "Car park deck repair", "Bridge soffit repair", "RC frame remediation"] },
              { code: "72121202", title: "Structural steel works", description: "Fabrication and erection of structural steelwork for new and existing buildings.", exampleItems: ["Steel mezzanine floor", "Structural frame erection", "Steel beam replacement", "Steelwork refurbishment", "Portal frame building"] },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "76",
    title: "Industrial Cleaning Services",
    color: "#16a34a",
    families: [
      {
        code: "7610",
        title: "General cleaning services",
        classes: [
          {
            code: "761011",
            title: "Office and commercial cleaning",
            commodities: [
              { code: "76101101", title: "Daily office cleaning", description: "Routine cleaning of office environments including desks, floors, kitchens and sanitary areas.", exampleItems: ["Daily office clean", "Desk wipe-down service", "Kitchen area clean", "Reception cleaning", "Meeting room prep clean"] },
              { code: "76101102", title: "Window cleaning", description: "Internal and external window, glazing and facade cleaning at all heights.", exampleItems: ["External facade window clean", "Internal glass partition clean", "Atrium glazing clean", "Rope access window clean", "MEWP window clean"] },
              { code: "76101103", title: "Deep cleaning services", description: "Periodic intensive cleaning of all surfaces, fixtures and inaccessible areas.", exampleItems: ["Annual deep clean", "Post-construction clean", "End-of-tenancy clean", "Kitchen deep clean", "Void property clean"] },
              { code: "76101104", title: "Washroom services", description: "Cleaning, consumable replenishment and hygiene unit management in washrooms.", exampleItems: ["Washroom hygiene contract", "Sanitary unit service", "Air freshener units", "Hand dryer maintenance", "Feminine hygiene service"] },
            ],
          },
          {
            code: "761012",
            title: "Industrial and specialist cleaning",
            commodities: [
              { code: "76101201", title: "High-pressure jetting", description: "High-pressure water jetting for drains, tanks, vessels and plant equipment.", exampleItems: ["Drain jetting", "Tank cleaning", "Pipework decontamination", "Gully cleansing", "Interceptor emptying"] },
              { code: "76101202", title: "Graffiti removal", description: "Removal of graffiti from internal and external surfaces using specialist products.", exampleItems: ["External wall graffiti removal", "Roller shutter clean", "Anti-graffiti coating application", "Fly-posting removal", "Tag removal"] },
              { code: "76101203", title: "Floor scrubbing and polishing", description: "Machine scrubbing, buffing and polishing of hard floor surfaces.", exampleItems: ["Warehouse floor scrub", "Hospital corridor polish", "Supermarket floor buff", "Showroom floor treatment", "Car park floor scrub"] },
              { code: "76101204", title: "External hard standing cleaning", description: "Pressure washing and treatment of external paved and concrete areas.", exampleItems: ["Car park pressure wash", "Loading bay clean", "Pedestrian precinct clean", "Patio and path treatment", "Algae removal"] },
            ],
          },
        ],
      },
      {
        code: "7611",
        title: "Specialised decontamination",
        classes: [
          {
            code: "761111",
            title: "Hazardous material removal",
            commodities: [
              { code: "76111101", title: "Asbestos removal and disposal", description: "Licensed removal, encapsulation and safe disposal of asbestos-containing materials.", exampleItems: ["ACM removal", "Asbestos encapsulation", "Licensed disposal", "AIB removal", "Artex treatment"] },
              { code: "76111102", title: "Legionella treatment", description: "Water system disinfection, thermal flushing and Legionella risk management.", exampleItems: ["Cooling tower clean and dose", "Water system shock chlorination", "L8 compliance treatment", "Dead-leg removal", "Calorifier clean"] },
              { code: "76111103", title: "Mould and damp remediation", description: "Treatment and removal of mould growth and resolution of damp causes.", exampleItems: ["Black mould treatment", "Rising damp remedy", "Condensation control", "Cavity wall investigation", "Mould biocide spray"] },
            ],
          },
          {
            code: "761112",
            title: "Clinical and biohazard cleaning",
            commodities: [
              { code: "76111201", title: "Terminal ward cleaning", description: "Deep cleaning and decontamination of clinical environments to infection control standards.", exampleItems: ["Terminal ward clean", "Isolation room decontamination", "UV-C fogging", "HTM 71 clean", "Theatre deep clean"] },
              { code: "76111202", title: "Crime scene and trauma cleaning", description: "Specialist cleaning following trauma events including biohazard safe disposal.", exampleItems: ["Trauma clean", "Blood remediation", "Drug lab decontamination", "Hoarding clearance", "Needle sweep"] },
            ],
          },
        ],
      },
      {
        code: "7612",
        title: "Waste management services",
        classes: [
          {
            code: "761211",
            title: "General waste collection",
            commodities: [
              { code: "76121101", title: "Residual waste collection", description: "Regular collection and disposal of non-recyclable general commercial waste.", exampleItems: ["Weekly bin collection", "240L wheelie bin contract", "Compactor service", "Bulk bag collection", "Trade waste agreement"] },
              { code: "76121102", title: "Recycling collection", description: "Segregated collection of paper, card, plastic, glass and metal for recycling.", exampleItems: ["Mixed recycling collection", "Paper and card service", "Glass bottle bank", "Plastic stream collection", "Can recycling service"] },
              { code: "76121103", title: "Food waste collection", description: "Dedicated collection of organic and food waste for anaerobic digestion or composting.", exampleItems: ["Caddy collection service", "Food waste bin contract", "Kitchen scraps service", "Restaurant organics", "School food waste"] },
            ],
          },
          {
            code: "761212",
            title: "Specialist waste disposal",
            commodities: [
              { code: "76121201", title: "Hazardous waste disposal", description: "Licensed collection and disposal of hazardous and special category wastes.", exampleItems: ["Chemical waste disposal", "Fluorescent tube disposal", "Pharmaceutical waste", "Paint and solvent waste", "Battery disposal service"] },
              { code: "76121202", title: "WEEE disposal", description: "Collection and recycling of waste electrical and electronic equipment.", exampleItems: ["IT asset disposal", "Printer recycling", "Monitor and screen disposal", "Kitchen appliance removal", "Data destruction service"] },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "80",
    title: "Management and Business Services",
    color: "#9333ea",
    families: [
      {
        code: "8010",
        title: "Management advisory services",
        classes: [
          {
            code: "801011",
            title: "Procurement and supply chain consulting",
            commodities: [
              { code: "80101101", title: "Spend analysis services", description: "Analysis, enrichment and cleansing of procurement spend data to drive category insight.", exampleItems: ["Annual spend cube build", "Supplier rationalisation study", "Tail spend analysis", "PO compliance review", "Maverick spend identification"] },
              { code: "80101102", title: "Category strategy development", description: "Development of sourcing strategies for specific spend categories.", exampleItems: ["Category plan facilitation", "Make-or-buy analysis", "Market scan report", "Sourcing strategy workshop", "Supplier market analysis"] },
              { code: "80101103", title: "UNSPSC classification services", description: "Coding, enrichment and quality assurance of purchase data against the UNSPSC taxonomy.", exampleItems: ["PO line coding project", "ERP data enrichment", "Taxonomy implementation", "Spend data remediation", "Classification QA audit"] },
              { code: "80101104", title: "Contract management advisory", description: "Design and implementation of contract management frameworks and governance structures.", exampleItems: ["KPI framework design", "SLA development", "Supplier scorecard build", "Contract renegotiation support", "Governance model design"] },
            ],
          },
          {
            code: "801012",
            title: "Facilities management consulting",
            commodities: [
              { code: "80101201", title: "FM strategy and benchmarking", description: "Strategic review and benchmarking of FM service delivery and operating models.", exampleItems: ["FM operating model review", "Cost benchmarking study", "Insource vs outsource analysis", "FM market review", "TFM strategy development"] },
              { code: "80101202", title: "FM technology consulting", description: "Selection and implementation advisory for CAFM, BMS and IoT platforms.", exampleItems: ["CAFM system selection", "BMS integration scoping", "IoT sensor strategy", "Asset register build", "Digital twin roadmap"] },
              { code: "80101203", title: "Condition survey and asset management", description: "Physical surveys and lifecycle modelling to inform capital planning.", exampleItems: ["Building condition survey", "Asset lifecycle modelling", "Capex planning model", "Backlog maintenance assessment", "RICS-compliant survey"] },
            ],
          },
        ],
      },
      {
        code: "8011",
        title: "Human resources services",
        classes: [
          {
            code: "801111",
            title: "Recruitment services",
            commodities: [
              { code: "80111101", title: "Permanent recruitment", description: "Search and selection for permanent professional and technical roles.", exampleItems: ["Procurement manager hire", "FM director search", "Category manager placement", "Buyer recruitment", "Supply chain analyst hire"] },
              { code: "80111102", title: "Temporary and contract staffing", description: "Provision of temporary workers and contractors for short-term requirements.", exampleItems: ["Interim category manager", "Contract FM consultant", "Temp admin support", "Cover receptionist", "Project coordinator contract"] },
              { code: "80111103", title: "Executive search", description: "Senior leadership and C-suite search and selection.", exampleItems: ["CPO search", "CFO appointment", "Non-exec director search", "MD placement", "Board advisor search"] },
            ],
          },
          {
            code: "801112",
            title: "Training and development",
            commodities: [
              { code: "80111201", title: "Procurement training", description: "Classroom, online and blended learning programmes covering procurement skills and tools.", exampleItems: ["CIPS qualification support", "Negotiation skills course", "Category management training", "Contract law workshop", "e-procurement platform training"] },
              { code: "80111202", title: "Leadership and management training", description: "Development programmes for managers and senior leaders.", exampleItems: ["Leadership accelerator", "Management essentials course", "Coaching programme", "360 feedback programme", "Mentoring scheme"] },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "73",
    title: "Industrial Production and Maintenance Services",
    color: "#ea580c",
    families: [
      {
        code: "7310",
        title: "Maintenance and repair services",
        classes: [
          {
            code: "731011",
            title: "HVAC maintenance",
            commodities: [
              { code: "73101101", title: "Planned preventive maintenance — HVAC", description: "Scheduled maintenance of heating, ventilation and air conditioning systems.", exampleItems: ["AHU filter change", "Chiller PPM", "Fan coil unit service", "Cooling tower PPM", "VRF system service"] },
              { code: "73101102", title: "HVAC reactive repair", description: "Unplanned fault diagnosis and repair of HVAC plant and equipment.", exampleItems: ["Chiller breakdown repair", "VAV box replacement", "Controls fault fix", "Compressor replacement", "Refrigerant recharge"] },
              { code: "73101103", title: "Air quality testing and balancing", description: "Commissioning, testing and balancing of ventilation systems and IAQ monitoring.", exampleItems: ["Ventilation balancing", "IAQ monitoring", "Clean room testing", "Extract fan commissioning", "Pressure differential test"] },
            ],
          },
          {
            code: "731012",
            title: "Electrical systems maintenance",
            commodities: [
              { code: "73101201", title: "Electrical testing and inspection", description: "Periodic inspection and testing of fixed wiring, portable appliances and emergency systems.", exampleItems: ["EICR report", "PAT testing programme", "Emergency lighting test", "Earth continuity test", "RCD trip testing"] },
              { code: "73101202", title: "HV and LV switchgear maintenance", description: "Planned and reactive maintenance of high and low voltage electrical distribution.", exampleItems: ["HV switchgear PPM", "LV panel service", "Transformer maintenance", "UPS maintenance", "Generator load test"] },
              { code: "73101203", title: "Lighting maintenance", description: "Lamp replacement, luminaire cleaning and lighting control system maintenance.", exampleItems: ["Lamp replacement programme", "LED retrofit", "Lighting control service", "DALI system maintenance", "Emergency exit sign check"] },
              { code: "73101204", title: "BMS maintenance and support", description: "Maintenance, fault diagnosis and optimisation of building management systems.", exampleItems: ["BMS controller service", "Trend BMS support", "Niagara framework maintenance", "BACnet integration fault fix", "Energy optimisation tuning"] },
            ],
          },
          {
            code: "731013",
            title: "Plumbing and drainage maintenance",
            commodities: [
              { code: "73101301", title: "Plumbing reactive repairs", description: "Unplanned repair of leaks, burst pipes, valves and plumbing fixtures.", exampleItems: ["Burst pipe repair", "Tap replacement", "Cistern fault fix", "Valve replacement", "Waste blockage clearance"] },
              { code: "73101302", title: "Drainage maintenance and CCTV", description: "Planned and reactive drainage maintenance including CCTV survey and jetting.", exampleItems: ["CCTV drainage survey", "Drain jetting contract", "Root removal", "Drain lining", "Manhole inspection"] },
              { code: "73101303", title: "Water hygiene services", description: "Water treatment, sampling and L8 compliance management across building water systems.", exampleItems: ["Water sampling programme", "TMV service", "Sentinel outlet flush", "Scale inhibitor dosing", "Risk assessment update"] },
            ],
          },
        ],
      },
      {
        code: "7311",
        title: "Mechanical engineering services",
        classes: [
          {
            code: "731111",
            title: "Lift and escalator maintenance",
            commodities: [
              { code: "73111101", title: "Lift maintenance and inspection", description: "Statutory and non-statutory maintenance, inspection and repair of passenger and goods lifts.", exampleItems: ["Lift PPM contract", "LOLER inspection", "Lift modernisation", "Emergency breakdown cover", "Door operator replacement"] },
              { code: "73111102", title: "Escalator and moving walk maintenance", description: "Planned preventive maintenance and repair of escalators and travelators.", exampleItems: ["Escalator PPM", "Step replacement", "Handrail replacement", "Safety device test", "Travelator service"] },
            ],
          },
          {
            code: "731112",
            title: "Compressed air and gas systems",
            commodities: [
              { code: "73111201", title: "Compressed air system maintenance", description: "Maintenance of compressors, dryers, receivers and distribution pipework.", exampleItems: ["Compressor service", "Air dryer maintenance", "Receiver inspection", "Pipework leak test", "Filter change programme"] },
              { code: "73111202", title: "Medical gas systems maintenance", description: "Maintenance and validation of medical gas pipeline systems in healthcare environments.", exampleItems: ["MGPS PPM contract", "Alarm panel test", "Outlet valve service", "Purity testing", "MGPS validation"] },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "78",
    title: "Transportation and Storage Services",
    color: "#0891b2",
    families: [
      {
        code: "7810",
        title: "Freight and cargo transport",
        classes: [
          {
            code: "781011",
            title: "Road freight services",
            commodities: [
              { code: "78101101", title: "Full load road haulage", description: "Full vehicle loads transported by road between fixed origin and destination points.", exampleItems: ["FTL pallet delivery", "Construction materials haulage", "Equipment transport", "Temperature-controlled FTL", "Abnormal load movement"] },
              { code: "78101102", title: "Groupage and part loads", description: "Consolidation and multi-drop delivery of less-than-truckload consignments.", exampleItems: ["LTL groupage service", "Multi-drop delivery run", "Pallet network service", "Consolidation hub service", "Mixed consignment delivery"] },
              { code: "78101103", title: "Same-day courier", description: "Same-day collection and delivery of time-critical documents and parcels.", exampleItems: ["Urgent document delivery", "Medical specimen courier", "Same-day parcel run", "Legal document service", "Key and access delivery"] },
            ],
          },
          {
            code: "781012",
            title: "Specialist logistics",
            commodities: [
              { code: "78101201", title: "Furniture and equipment removal", description: "Office and commercial moves including dismantling, transport and reinstallation.", exampleItems: ["Office relocation", "IT equipment move", "Archive storage move", "Laboratory equipment move", "Furniture disposal"] },
              { code: "78101202", title: "Secure and confidential logistics", description: "Transport and destruction of confidential documents and high-value assets.", exampleItems: ["Confidential shredding", "Secure document transport", "Cash-in-transit", "Artwork and valuables move", "Data tape collection"] },
            ],
          },
        ],
      },
      {
        code: "7811",
        title: "Passenger transport",
        classes: [
          {
            code: "781111",
            title: "Ground passenger transport",
            commodities: [
              { code: "78111101", title: "Executive car hire", description: "Chauffeured executive car services for business travel and VIP transfers.", exampleItems: ["Airport transfer", "Executive taxi account", "Corporate shuttle", "VIP chauffeur service", "Meet and greet transfer"] },
              { code: "78111102", title: "Bus and coach hire", description: "Charter hire of buses and coaches for groups, events and regular routes.", exampleItems: ["Staff shuttle bus", "Conference transfer coach", "Event transport", "Airport coach service", "School contract service"] },
              { code: "78111103", title: "Fleet management services", description: "Management of company vehicle fleets including maintenance, fuel and compliance.", exampleItems: ["Fleet leasing contract", "Fuel card management", "Telematics service", "Driver risk assessment", "Vehicle maintenance programme"] },
            ],
          },
        ],
      },
      {
        code: "7812",
        title: "Storage and warehousing",
        classes: [
          {
            code: "781211",
            title: "Commercial storage services",
            commodities: [
              { code: "78121101", title: "General warehousing", description: "Storage of commercial goods in ambient warehouse conditions.", exampleItems: ["Pallet storage contract", "Bonded warehouse", "Pick and pack service", "Inventory management", "Cross-docking service"] },
              { code: "78121102", title: "Temperature-controlled storage", description: "Chilled and frozen storage for perishable goods and pharmaceutical products.", exampleItems: ["Cold chain storage", "Frozen goods storage", "Pharmaceutical cold store", "Chilled produce storage", "Vaccine storage facility"] },
              { code: "78121103", title: "Document and archive storage", description: "Off-site storage, indexing and retrieval of paper and digital records.", exampleItems: ["Archive box storage", "Deed storage", "Medical record storage", "Scan on demand service", "Secure shredding service"] },
            ],
          },
        ],
      },
    ],
  },
  {
    code: "81",
    title: "Engineering and Technology Services",
    color: "#be185d",
    families: [
      {
        code: "8110",
        title: "Professional engineering services",
        classes: [
          {
            code: "811011",
            title: "Civil and structural engineering",
            commodities: [
              { code: "81101101", title: "Structural design services", description: "Structural engineering design for buildings, bridges and civil infrastructure.", exampleItems: ["Structural calculations", "Steel frame design", "Foundation design", "Bridge design", "Retaining wall design"] },
              { code: "81101102", title: "Ground investigation", description: "Geotechnical investigation, contamination surveys and site characterisation.", exampleItems: ["Trial pit and bore hole survey", "Contamination assessment", "Geotechnical report", "Phase 1 desk study", "Phase 2 intrusive survey"] },
              { code: "81101103", title: "Transport and infrastructure planning", description: "Transport assessments, travel plans and infrastructure design.", exampleItems: ["Transport assessment", "Travel plan", "Traffic impact study", "Road safety audit", "Parking strategy"] },
            ],
          },
          {
            code: "811012",
            title: "Mechanical and electrical engineering",
            commodities: [
              { code: "81101201", title: "MEP design services", description: "Mechanical, electrical and plumbing building services design for new and refurbished buildings.", exampleItems: ["HVAC design package", "Electrical schematics", "Plumbing layout", "Drainage design", "BMS specification"] },
              { code: "81101202", title: "Energy performance consulting", description: "Energy auditing, dynamic modelling and improvement recommendations.", exampleItems: ["ESOS audit", "Energy model (TM54)", "DEC and EPC assessment", "Net zero roadmap", "Solar PV feasibility"] },
              { code: "81101203", title: "Commissioning management", description: "Management and witnessing of building services commissioning activities.", exampleItems: ["Commissioning management", "Soft landings support", "Seasonal commissioning", "BMS commissioning", "BSRIA testing and balancing"] },
            ],
          },
          {
            code: "811013",
            title: "Environmental engineering",
            commodities: [
              { code: "81101301", title: "Environmental impact assessment", description: "Assessment of development impacts on ecology, noise, air quality and landscape.", exampleItems: ["EIA coordination", "Ecological survey", "Noise impact study", "Air quality assessment", "BREEAM assessment"] },
              { code: "81101302", title: "Flood risk assessment", description: "Site-specific assessment of fluvial, surface and groundwater flood risk.", exampleItems: ["FRA for planning", "Sequential test support", "SuDS design", "Hydraulic modelling", "Catchment flood study"] },
            ],
          },
        ],
      },
      {
        code: "8111",
        title: "Technology and IT services",
        classes: [
          {
            code: "811111",
            title: "Software development",
            commodities: [
              { code: "81111101", title: "Bespoke application development", description: "Custom software design and development for web, mobile and enterprise platforms.", exampleItems: ["Web application build", "Mobile app development", "API integration", "Legacy system modernisation", "SaaS platform build"] },
              { code: "81111102", title: "ERP and enterprise system implementation", description: "Configuration and implementation of ERP, CAFM and enterprise software platforms.", exampleItems: ["SAP implementation", "Oracle ERP rollout", "CAFM system deployment", "CRM implementation", "Finance system migration"] },
            ],
          },
          {
            code: "811112",
            title: "IT infrastructure services",
            commodities: [
              { code: "81111201", title: "Network design and installation", description: "Design, supply and installation of LAN, WAN and wireless network infrastructure.", exampleItems: ["LAN infrastructure build", "Wi-Fi network deployment", "MPLS WAN circuit", "Network switch installation", "SD-WAN implementation"] },
              { code: "81111202", title: "Cybersecurity services", description: "Penetration testing, vulnerability assessment and security operations.", exampleItems: ["Pen testing service", "Vulnerability scan", "SOC monitoring", "ISO 27001 audit", "Security awareness training"] },
              { code: "81111203", title: "Cloud services and migration", description: "Cloud architecture, migration and managed services across public and hybrid cloud.", exampleItems: ["AWS migration", "Azure managed service", "Cloud cost optimisation", "Hybrid cloud design", "Disaster recovery as a service"] },
            ],
          },
        ],
      },
    ],
  },
];
