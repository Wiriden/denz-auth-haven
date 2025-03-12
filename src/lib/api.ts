
import { mockActivities, mockCategories, mockCertificates, mockItemAssignments, 
         mockItems, mockMaintenanceLogs, mockProfiles, mockUserCertificates,
         getMockUser, setMockUser } from './mockData';

// Types
export type Profile = {
  id: string;
  name: string;
  role: string;
  department?: string;
  contact?: string;
  hire_date?: string;
  status: 'active' | 'inactive' | 'sick' | 'vacation';
};

export type Certificate = {
  id: string;
  name: string;
  description?: string;
};

export type UserCertificate = {
  id: string;
  user_id: string;
  certificate_id: string;
  expiry_date: string;
  certificate_name?: string;
  user_name?: string;
  days_left?: number;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  itemCount?: number;
};

export type Item = {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  serial_number?: string;
  status: 'available' | 'checked-out' | 'maintenance' | 'lost';
  purchase_date?: string;
  last_checked?: string;
  item_type: 'tool' | 'safety';
  category_name?: string;
  assigned_to?: string;
};

export type ItemAssignment = {
  id: string;
  item_id: string;
  user_id: string;
  assigned_date: string;
  return_date?: string;
  item_name?: string;
  user_name?: string;
};

export type MaintenanceLog = {
  id: string;
  item_id: string;
  user_id?: string;
  maintenance_date: string;
  description?: string;
  next_maintenance_date?: string;
  item_name?: string;
  user_name?: string;
};

export type Activity = {
  id: string;
  title: string;
  description?: string;
  user_id?: string;
  related_item_id?: string;
  priority?: 'low' | 'medium' | 'high';
  timestamp: string;
  date?: string;
  user_name?: string;
  item_name?: string;
};

// Helper to simulate async API calls
const mockAsync = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300);
  });
};

// Users/Profiles
export const getCurrentUser = async () => {
  return mockAsync(getMockUser());
};

export const getProfiles = async () => {
  return mockAsync(mockProfiles);
};

export const updateProfile = async (id: string, profile: Partial<Profile>) => {
  const index = mockProfiles.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Profil hittades inte');
  
  const updatedProfile = { ...mockProfiles[index], ...profile };
  mockProfiles[index] = updatedProfile as Profile;
  
  // Update current user if the updated profile is the logged-in user
  if (getMockUser()?.id === id) {
    setMockUser(updatedProfile as Profile);
  }
  
  return mockAsync(updatedProfile as Profile);
};

// Certificates
export const getCertificates = async () => {
  return mockAsync(mockCertificates);
};

export const getUserCertificates = async (userId?: string) => {
  if (userId) {
    return mockAsync(mockUserCertificates.filter(cert => cert.user_id === userId));
  }
  return mockAsync(mockUserCertificates);
};

export const addCertificateToUser = async (userId: string, certificateId: string, expiryDate: string) => {
  const user = mockProfiles.find(p => p.id === userId);
  const certificate = mockCertificates.find(c => c.id === certificateId);
  
  if (!user || !certificate) throw new Error('Användare eller certifikat hittades inte');
  
  const existingCert = mockUserCertificates.find(
    c => c.user_id === userId && c.certificate_id === certificateId
  );
  
  if (existingCert) return mockAsync({ success: false, message: 'Användaren har redan detta certifikat' });
  
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  const newCert: UserCertificate = {
    id: String(mockUserCertificates.length + 1),
    user_id: userId,
    certificate_id: certificateId,
    expiry_date: expiryDate,
    certificate_name: certificate.name,
    user_name: user.name,
    days_left: daysLeft
  };
  
  mockUserCertificates.push(newCert);
  
  return mockAsync({ success: true, message: 'Certifikat tillagt för användaren' });
};

// Categories
export const getCategories = async () => {
  return mockAsync(mockCategories);
};

export const createCategory = async (category: Partial<Category>) => {
  const newCategory: Category = {
    id: String(mockCategories.length + 1),
    name: category.name || 'Ny kategori',
    description: category.description,
    itemCount: 0
  };
  
  mockCategories.push(newCategory);
  
  return mockAsync(newCategory);
};

// Items
export const getItems = async (categoryId?: string, status?: string, itemType?: string) => {
  let filteredItems = [...mockItems];
  
  if (categoryId) {
    filteredItems = filteredItems.filter(item => item.category_id === categoryId);
  }
  
  if (status) {
    filteredItems = filteredItems.filter(item => item.status === status);
  }
  
  if (itemType) {
    filteredItems = filteredItems.filter(item => item.item_type === itemType);
  }
  
  return mockAsync(filteredItems);
};

export const createItem = async (item: Partial<Item>) => {
  const newItem: Item = {
    id: String(mockItems.length + 1),
    name: item.name || 'Nytt objekt',
    description: item.description,
    category_id: item.category_id,
    serial_number: item.serial_number,
    status: item.status || 'available',
    purchase_date: item.purchase_date,
    last_checked: item.last_checked || new Date().toISOString().split('T')[0],
    item_type: item.item_type || 'tool',
    category_name: item.category_id 
      ? mockCategories.find(c => c.id === item.category_id)?.name 
      : undefined
  };
  
  mockItems.push(newItem);
  
  return mockAsync(newItem);
};

export const updateItem = async (id: string, item: Partial<Item>) => {
  const index = mockItems.findIndex(i => i.id === id);
  if (index === -1) throw new Error('Objekt hittades inte');
  
  const updatedItem = { ...mockItems[index], ...item };
  
  // Update category name if category changed
  if (item.category_id && item.category_id !== mockItems[index].category_id) {
    updatedItem.category_name = mockCategories.find(c => c.id === item.category_id)?.name;
  }
  
  mockItems[index] = updatedItem as Item;
  
  return mockAsync(updatedItem as Item);
};

export const checkoutItem = async (itemId: string, userId: string) => {
  const item = mockItems.find(i => i.id === itemId);
  const user = mockProfiles.find(p => p.id === userId);
  
  if (!item || !user) throw new Error('Objekt eller användare hittades inte');
  
  if (item.status === 'checked-out') {
    return mockAsync({ success: false, message: 'Objektet är redan utcheckat' });
  }
  
  // Update item status
  const itemIndex = mockItems.findIndex(i => i.id === itemId);
  mockItems[itemIndex] = { 
    ...item, 
    status: 'checked-out', 
    assigned_to: user.name 
  };
  
  // Create assignment
  const newAssignment: ItemAssignment = {
    id: String(mockItemAssignments.length + 1),
    item_id: itemId,
    user_id: userId,
    assigned_date: new Date().toISOString().split('T')[0],
    item_name: item.name,
    user_name: user.name
  };
  
  mockItemAssignments.push(newAssignment);
  
  // Create activity
  const newActivity: Activity = {
    id: String(mockActivities.length + 1),
    title: 'Material utlånat',
    description: `Material ${item.name} har lånats ut till ${user.name}`,
    user_id: userId,
    related_item_id: itemId,
    priority: 'low',
    timestamp: new Date().toISOString(),
    date: 'idag',
    user_name: user.name,
    item_name: item.name
  };
  
  mockActivities.push(newActivity);
  
  return mockAsync({ success: true, message: 'Objektet har checkats ut' });
};

export const checkinItem = async (itemId: string) => {
  const item = mockItems.find(i => i.id === itemId);
  
  if (!item) throw new Error('Objekt hittades inte');
  
  if (item.status !== 'checked-out') {
    return mockAsync({ success: false, message: 'Inget utcheckat objekt hittades' });
  }
  
  // Find active assignment
  const assignmentIndex = mockItemAssignments.findIndex(
    a => a.item_id === itemId && !a.return_date
  );
  
  if (assignmentIndex === -1) {
    return mockAsync({ success: false, message: 'Ingen aktiv utlåning hittades' });
  }
  
  const assignment = mockItemAssignments[assignmentIndex];
  
  // Update assignment with return date
  mockItemAssignments[assignmentIndex] = {
    ...assignment,
    return_date: new Date().toISOString().split('T')[0]
  };
  
  // Update item status
  const itemIndex = mockItems.findIndex(i => i.id === itemId);
  mockItems[itemIndex] = { 
    ...item, 
    status: 'available', 
    assigned_to: undefined 
  };
  
  // Create activity
  const newActivity: Activity = {
    id: String(mockActivities.length + 1),
    title: 'Material återlämnat',
    description: `Material ${item.name} har lämnats tillbaka av ${assignment.user_name}`,
    user_id: assignment.user_id,
    related_item_id: itemId,
    priority: 'low',
    timestamp: new Date().toISOString(),
    date: 'idag',
    user_name: assignment.user_name,
    item_name: item.name
  };
  
  mockActivities.push(newActivity);
  
  return mockAsync({ success: true, message: 'Objektet har checkats in' });
};

// Assignments
export const getItemAssignments = async (userId?: string, returnedOnly = false) => {
  let filteredAssignments = [...mockItemAssignments];
  
  if (userId) {
    filteredAssignments = filteredAssignments.filter(a => a.user_id === userId);
  }
  
  if (returnedOnly) {
    filteredAssignments = filteredAssignments.filter(a => a.return_date);
  } else {
    filteredAssignments = filteredAssignments.filter(a => !a.return_date);
  }
  
  return mockAsync(filteredAssignments);
};

// Activities
export const getActivities = async (limit = 10) => {
  // Sort by timestamp, descending
  const sortedActivities = [...mockActivities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return mockAsync(sortedActivities.slice(0, limit));
};

export const logActivity = async (activity: Partial<Activity>) => {
  const now = new Date();
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  let date = now.toLocaleDateString('sv-SE');
  if (now.toDateString() === today.toDateString()) {
    date = 'idag';
  } else if (now.toDateString() === yesterday.toDateString()) {
    date = 'igår';
  }
  
  const newActivity: Activity = {
    id: String(mockActivities.length + 1),
    title: activity.title || 'Ny aktivitet',
    description: activity.description,
    user_id: activity.user_id,
    related_item_id: activity.related_item_id,
    priority: activity.priority || 'low',
    timestamp: now.toISOString(),
    date,
    user_name: activity.user_id 
      ? mockProfiles.find(p => p.id === activity.user_id)?.name 
      : undefined,
    item_name: activity.related_item_id 
      ? mockItems.find(i => i.id === activity.related_item_id)?.name 
      : undefined
  };
  
  mockActivities.push(newActivity);
  
  return mockAsync(newActivity);
};
