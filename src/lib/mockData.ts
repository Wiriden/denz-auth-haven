
import { Activity, Category, Certificate, Item, ItemAssignment, MaintenanceLog, Profile, UserCertificate } from './api';

// Mock user profile data
export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Johan Andersson',
    role: 'admin',
    department: 'IT Avdelning',
    contact: 'johan@example.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Emma Karlsson',
    role: 'user',
    department: 'Produktion',
    contact: 'emma@example.com',
    status: 'active',
  },
  {
    id: '3',
    name: 'Anders Nilsson',
    role: 'user',
    department: 'Lager',
    contact: 'anders@example.com',
    status: 'sick',
  },
  {
    id: '4',
    name: 'Maria Johansson',
    role: 'user',
    department: 'Produktion',
    contact: 'maria@example.com',
    status: 'vacation',
  },
];

// Mock certificates
export const mockCertificates: Certificate[] = [
  { id: '1', name: 'Truckkort A', description: 'Certifiering för motviktstruck' },
  { id: '2', name: 'Heta Arbeten', description: 'Certifikat för svetsning och skärning' },
  { id: '3', name: 'Första Hjälpen', description: 'Grundläggande sjukvårdsutbildning' },
  { id: '4', name: 'Fallskydd', description: 'Certifiering för arbete på höjd' },
];

// Calculate date X days from now
const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

// Mock user certificates with expiry dates
export const mockUserCertificates: UserCertificate[] = [
  { 
    id: '1', 
    user_id: '1', 
    certificate_id: '1', 
    expiry_date: daysFromNow(90), 
    certificate_name: 'Truckkort A', 
    user_name: 'Johan Andersson',
    days_left: 90 
  },
  { 
    id: '2', 
    user_id: '1', 
    certificate_id: '2', 
    expiry_date: daysFromNow(45), 
    certificate_name: 'Heta Arbeten', 
    user_name: 'Johan Andersson',
    days_left: 45 
  },
  { 
    id: '3', 
    user_id: '2', 
    certificate_id: '3', 
    expiry_date: daysFromNow(20), 
    certificate_name: 'Första Hjälpen', 
    user_name: 'Emma Karlsson',
    days_left: 20 
  },
  { 
    id: '4', 
    user_id: '3', 
    certificate_id: '4', 
    expiry_date: daysFromNow(15), 
    certificate_name: 'Fallskydd', 
    user_name: 'Anders Nilsson',
    days_left: 15 
  },
];

// Mock categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Handverktyg', description: 'Manuella verktyg', itemCount: 25 },
  { id: '2', name: 'Elverktyg', description: 'Eldrivna verktyg', itemCount: 15 },
  { id: '3', name: 'Skyddsutrustning', description: 'Personlig skyddsutrustning', itemCount: 30 },
  { id: '4', name: 'Mätutrustning', description: 'Precisionsinstrument', itemCount: 8 },
];

// Mock items
export const mockItems: Item[] = [
  { 
    id: '1', 
    name: 'Borrmaskin Bosch', 
    description: 'Professional 18V', 
    category_id: '2', 
    serial_number: 'BOS-18V-001', 
    status: 'available', 
    purchase_date: '2023-01-15', 
    last_checked: '2023-12-01', 
    item_type: 'tool', 
    category_name: 'Elverktyg' 
  },
  { 
    id: '2', 
    name: 'Skyddshjälm', 
    description: 'Gul, Klass B', 
    category_id: '3', 
    serial_number: 'HSK-B-002', 
    status: 'checked-out', 
    purchase_date: '2023-03-10', 
    last_checked: '2023-11-15', 
    item_type: 'safety', 
    category_name: 'Skyddsutrustning',
    assigned_to: 'Emma Karlsson'
  },
  { 
    id: '3', 
    name: 'Skiftnyckelsats', 
    description: '8-19mm', 
    category_id: '1', 
    serial_number: 'WRS-8-19-003', 
    status: 'maintenance', 
    purchase_date: '2022-11-05', 
    last_checked: '2023-10-20', 
    item_type: 'tool', 
    category_name: 'Handverktyg' 
  },
  { 
    id: '4', 
    name: 'Laser Avståndsmätare', 
    description: 'Precision 1mm', 
    category_id: '4', 
    serial_number: 'LDM-P1-004', 
    status: 'available', 
    purchase_date: '2023-06-18', 
    last_checked: '2023-12-05', 
    item_type: 'tool', 
    category_name: 'Mätutrustning' 
  },
  { 
    id: '5', 
    name: 'Hörselskydd', 
    description: 'Dämpning 32dB', 
    category_id: '3', 
    serial_number: 'EAR-32-005', 
    status: 'checked-out', 
    purchase_date: '2023-02-22', 
    last_checked: '2023-11-10', 
    item_type: 'safety', 
    category_name: 'Skyddsutrustning',
    assigned_to: 'Anders Nilsson'
  },
  { 
    id: '6', 
    name: 'Vinkelslip Makita', 
    description: '125mm, 720W', 
    category_id: '2', 
    serial_number: 'MAK-125-006', 
    status: 'maintenance', 
    purchase_date: '2022-12-10', 
    last_checked: '2023-10-15', 
    item_type: 'tool', 
    category_name: 'Elverktyg' 
  },
  { 
    id: '7', 
    name: 'Skyddsglasögon', 
    description: 'UV-skydd, reptåliga', 
    category_id: '3', 
    serial_number: 'PSG-UV-007', 
    status: 'available', 
    purchase_date: '2023-05-05', 
    last_checked: '2023-11-20', 
    item_type: 'safety', 
    category_name: 'Skyddsutrustning' 
  }
];

// Mock item assignments
export const mockItemAssignments: ItemAssignment[] = [
  { 
    id: '1', 
    item_id: '2', 
    user_id: '2', 
    assigned_date: '2023-12-01', 
    item_name: 'Skyddshjälm', 
    user_name: 'Emma Karlsson' 
  },
  { 
    id: '2', 
    item_id: '5', 
    user_id: '3', 
    assigned_date: '2023-12-03', 
    item_name: 'Hörselskydd', 
    user_name: 'Anders Nilsson' 
  },
  { 
    id: '3', 
    item_id: '1', 
    user_id: '4', 
    assigned_date: '2023-11-25', 
    return_date: '2023-11-28', 
    item_name: 'Borrmaskin Bosch', 
    user_name: 'Maria Johansson' 
  },
  { 
    id: '4', 
    item_id: '7', 
    user_id: '2', 
    assigned_date: '2023-11-20', 
    return_date: '2023-11-22', 
    item_name: 'Skyddsglasögon', 
    user_name: 'Emma Karlsson' 
  }
];

// Mock maintenance logs
export const mockMaintenanceLogs: MaintenanceLog[] = [
  { 
    id: '1', 
    item_id: '3', 
    user_id: '1', 
    maintenance_date: '2023-10-20', 
    description: 'Rengöring och oljning', 
    next_maintenance_date: '2024-01-20', 
    item_name: 'Skiftnyckelsats', 
    user_name: 'Johan Andersson' 
  },
  { 
    id: '2', 
    item_id: '6', 
    user_id: '1', 
    maintenance_date: '2023-10-15', 
    description: 'Byte av kolborstar', 
    next_maintenance_date: '2024-01-15', 
    item_name: 'Vinkelslip Makita', 
    user_name: 'Johan Andersson' 
  }
];

// Mock activities
export const mockActivities: Activity[] = [
  { 
    id: '1', 
    title: 'Material utlånat', 
    description: 'Material Skyddshjälm har lånats ut till Emma Karlsson', 
    user_id: '2', 
    related_item_id: '2', 
    priority: 'low', 
    timestamp: '2023-12-01T10:15:00Z', 
    date: 'idag', 
    user_name: 'Emma Karlsson', 
    item_name: 'Skyddshjälm' 
  },
  { 
    id: '2', 
    title: 'Material utlånat', 
    description: 'Material Hörselskydd har lånats ut till Anders Nilsson', 
    user_id: '3', 
    related_item_id: '5', 
    priority: 'low', 
    timestamp: '2023-12-03T14:30:00Z', 
    date: 'idag', 
    user_name: 'Anders Nilsson', 
    item_name: 'Hörselskydd' 
  },
  { 
    id: '3', 
    title: 'Material återlämnat', 
    description: 'Material Borrmaskin Bosch har lämnats tillbaka av Maria Johansson', 
    user_id: '4', 
    related_item_id: '1', 
    priority: 'low', 
    timestamp: '2023-11-28T16:45:00Z', 
    date: 'igår', 
    user_name: 'Maria Johansson', 
    item_name: 'Borrmaskin Bosch' 
  },
  { 
    id: '4', 
    title: 'Underhåll genomfört', 
    description: 'Underhåll på Skiftnyckelsats har utförts av Johan Andersson', 
    user_id: '1', 
    related_item_id: '3', 
    priority: 'medium', 
    timestamp: '2023-10-20T09:00:00Z', 
    date: '2023-10-20', 
    user_name: 'Johan Andersson', 
    item_name: 'Skiftnyckelsats' 
  },
  { 
    id: '5', 
    title: 'Underhåll genomfört', 
    description: 'Underhåll på Vinkelslip Makita har utförts av Johan Andersson', 
    user_id: '1', 
    related_item_id: '6', 
    priority: 'medium', 
    timestamp: '2023-10-15T13:20:00Z', 
    date: '2023-10-15', 
    user_name: 'Johan Andersson', 
    item_name: 'Vinkelslip Makita' 
  },
  { 
    id: '6', 
    title: 'Nytt certifikat tillagt', 
    description: 'Certifikat Fallskydd har lagts till för Anders Nilsson', 
    user_id: '3', 
    priority: 'high', 
    timestamp: '2023-11-15T11:10:00Z', 
    date: '2023-11-15', 
    user_name: 'Anders Nilsson' 
  }
];

// Store the currently logged-in user (for mock authentication)
let currentUser: Profile | null = null;

export const getMockUser = (): Profile | null => {
  return currentUser;
};

export const setMockUser = (user: Profile | null): void => {
  currentUser = user;
};
