export const MOCK_ISSUES = [
  {
    _id: "CF-2026-001",
    id: "CF-2026-001",
    title: "Broken Streetlight",
    category: "Broken Streetlight",
    description: "Streetlight is not working near the main road. Complete darkness after 7 PM causing safety concerns for pedestrians and commuters.",
    location: "Patna Main Road",
    address: "Patna Main Road, Near Pillar 42, Sector 3",
    coordinates: { lat: 25.5941, lng: 85.1376 },
    priority: "High",
    status: "Reported",
    assignedDepartment: "Electrical",
    assignedAuthority: null,
    reporterName: "Rajesh Kumar",
    reporterEmail: "rajesh.k@example.com",
    reporterPhone: "+91 98765 43210",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        actor: "Rajesh Kumar (Citizen)",
        note: "Issue submitted through CityFix Portal."
      }
    ],
    resolutionNotes: null,
    isDemo: true
  },
  {
    _id: "CF-2026-002",
    id: "CF-2026-002",
    title: "Road Pothole",
    category: "Pothole",
    description: "Deep pothole developed following recent monsoon showers. Multiple two-wheelers have skidded and damaged suspensions.",
    location: "Gandhi Chowk",
    address: "Gandhi Chowk Roundabout, East Crossroad",
    coordinates: { lat: 25.6123, lng: 85.1432 },
    priority: "Medium",
    status: "In Progress",
    assignedDepartment: "Roads & Transport",
    assignedAuthority: "Er. Ramesh Verma (Executive Eng.)",
    reporterName: "Priya Sharma",
    reporterEmail: "priya.s@example.com",
    reporterPhone: "+91 98765 11223",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
        actor: "Priya Sharma (Citizen)",
        note: "Citizen reported hazardous road crater."
      },
      {
        stage: "Under Review",
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        actor: "Municipal Dispatcher",
        note: "Site verified via road surveillance camera."
      },
      {
        stage: "In Progress",
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        actor: "Er. Ramesh Verma (Executive Eng.)",
        note: "Cold bitumen patch crew deployed to Gandhi Chowk."
      }
    ],
    resolutionNotes: "Repair crew on site with hot-mix patcher truck.",
    isDemo: true
  },
  {
    _id: "CF-2026-003",
    id: "CF-2026-003",
    title: "Water Leakage",
    category: "Water Leakage",
    description: "High pressure municipal main pipeline ruptured. Potable water is flooding the street and causing acute water loss to 200+ households.",
    location: "Station Road",
    address: "Station Road, opposite Central Railway Gate 2",
    coordinates: { lat: 25.6011, lng: 85.1254 },
    priority: "Critical",
    status: "Under Review",
    assignedDepartment: "Water Supply",
    assignedAuthority: "Sanjay Jha (Zonal Officer)",
    reporterName: "Aman Verma",
    reporterEmail: "aman.v@example.com",
    reporterPhone: "+91 98223 34455",
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
        actor: "Aman Verma (Citizen)",
        note: "High priority burst pipeline reported."
      },
      {
        stage: "Under Review",
        timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        actor: "Sanjay Jha (Zonal Officer)",
        note: "Valves being isolated to prevent structural soil erosion."
      }
    ],
    resolutionNotes: null,
    isDemo: true
  },
  {
    _id: "CF-2026-004",
    id: "CF-2026-004",
    title: "Overflowing Waste Bin",
    category: "Garbage/Waste",
    description: "Community waste bin has not been cleared for 4 days. Strong odor, stray animals scattering trash on the pedestrian walkway.",
    location: "Market Area",
    address: "Market Complex, Block B Lane 4",
    coordinates: { lat: 25.6088, lng: 85.1501 },
    priority: "High",
    status: "Resolved",
    assignedDepartment: "Sanitation",
    assignedAuthority: "Sunil Das (Sanitation Inspector)",
    reporterName: "Sunita Roy",
    reporterEmail: "sunita.r@example.com",
    reporterPhone: "+91 98112 44332",
    imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        actor: "Sunita Roy (Citizen)",
        note: "Complaint lodged with photographic evidence."
      },
      {
        stage: "Under Review",
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: "Sanitation Desk",
        note: "Route scheduled for sanitation compactor."
      },
      {
        stage: "In Progress",
        timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        actor: "Truck Unit #14",
        note: "Sanitation vehicle assigned."
      },
      {
        stage: "Resolved",
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        actor: "Sunil Das (Sanitation Inspector)",
        note: "Area thoroughly sanitized, bin emptied, and lime powder sprinkled."
      }
    ],
    resolutionNotes: "Area thoroughly sanitized, bin emptied, and lime powder sprinkled.",
    isDemo: true
  },
  {
    _id: "CF-2026-005",
    id: "CF-2026-005",
    title: "Damaged Drain",
    category: "Drainage",
    description: "Stormwater concrete slab caved in over the main sewer channel. Heavy pedestrian hazard, especially in evening hours.",
    location: "Ashiana Road",
    address: "Ashiana Road, near SBI ATM Crossing",
    coordinates: { lat: 25.6189, lng: 85.1098 },
    priority: "Medium",
    status: "Resolved",
    assignedDepartment: "Drainage",
    assignedAuthority: "Alok Nandan (Sub-Divisional Eng.)",
    reporterName: "Vikram Malhotra",
    reporterEmail: "vikram.m@example.com",
    reporterPhone: "+91 97711 55667",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        actor: "Vikram Malhotra (Citizen)",
        note: "Hazardous slab breach reported."
      },
      {
        stage: "In Progress",
        timestamp: new Date(Date.now() - 40 * 3600 * 1000).toISOString(),
        actor: "Civil Works Team",
        note: "Precast heavy-duty RCC cover slab fabricated."
      },
      {
        stage: "Resolved",
        timestamp: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
        actor: "Alok Nandan (Sub-Divisional Eng.)",
        note: "New reinforced RCC cover installed and edge sealed."
      }
    ],
    resolutionNotes: "New reinforced RCC cover installed and edge sealed.",
    isDemo: true
  },
  {
    _id: "CF-2026-006",
    id: "CF-2026-006",
    title: "Fallen Tree Blocking Roadway",
    category: "Damaged Public Infrastructure",
    description: "Large banyan branch snapped during gusty wind, blocking both lanes of traffic. Power lines partially snagged.",
    location: "Boring Road",
    address: "Boring Road Crossing, near Women's College",
    coordinates: { lat: 25.6154, lng: 85.1189 },
    priority: "Critical",
    status: "In Progress",
    assignedDepartment: "Emergency Services",
    assignedAuthority: "Disaster Response Wing",
    reporterName: "Sneha Kapur",
    reporterEmail: "sneha.k@example.com",
    reporterPhone: "+91 99100 88776",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        actor: "Sneha Kapur (Citizen)",
        note: "Urgent emergency notice."
      },
      {
        stage: "In Progress",
        timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
        actor: "Municipal Chainsaw Crew",
        note: "Branch clearing underway; traffic diverted."
      }
    ],
    resolutionNotes: null,
    isDemo: true
  },
  {
    _id: "CF-2026-007",
    id: "CF-2026-007",
    title: "Illegal Hoarding Threatening Walkers",
    category: "Traffic/Safety",
    description: "Massive metal promotional billboard tilted precariously during storm, hanging over the public sidewalk.",
    location: "Kankarbagh Main Circle",
    address: "Kankarbagh Colony More",
    coordinates: { lat: 25.5902, lng: 85.1611 },
    priority: "High",
    status: "Under Review",
    assignedDepartment: "Public Works",
    assignedAuthority: "Building Safety Cell",
    reporterName: "Manoj Tiwari",
    reporterEmail: "manoj.t@example.com",
    reporterPhone: "+91 98450 12345",
    imageUrl: null,
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    timeline: [
      {
        stage: "Reported",
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        actor: "Manoj Tiwari",
        note: "Hazardous advertisement structure."
      }
    ],
    resolutionNotes: null,
    isDemo: true
  }
];
