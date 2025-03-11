
import { supabase } from './supabase';

// Typer
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

// Användare/Profiler
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) return null;
    
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (profileError) throw profileError;
    if (!data) throw new Error('Ingen profil hittades');
    
    return data as Profile;
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
    throw error;
  }
};

export const getProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data as Profile[];
};

export const updateProfile = async (id: string, profile: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Profile;
};

// Certifikat
export const getCertificates = async () => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data as Certificate[];
};

export const getUserCertificates = async (userId?: string) => {
  let query = supabase
    .from('active_certificates')
    .select('*')
    .order('days_left');
    
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as UserCertificate[];
};

export const addCertificateToUser = async (userId: string, certificateId: string, expiryDate: string) => {
  const { data, error } = await supabase
    .rpc('add_certificate_to_user', {
      user_id: userId,
      certificate_id: certificateId,
      expires_on: expiryDate
    });
    
  if (error) throw error;
  return data;
};

// Kategorier
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*, items(count)');
    
  if (error) throw error;
  
  return data.map(category => ({
    ...category,
    itemCount: category.items?.[0]?.count || 0
  })) as Category[];
};

export const createCategory = async (category: Partial<Category>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
    
  if (error) throw error;
  return data as Category;
};

// Utrustning
export const getItems = async (categoryId?: string, status?: string, itemType?: string) => {
  let query = supabase
    .from('items')
    .select(`
      *,
      categories(name),
      item_assignments(user_id, profiles(name))
    `)
    .order('name');
    
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  if (status) {
    query = query.eq('status', status);
  }
  
  if (itemType) {
    query = query.eq('item_type', itemType);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data.map(item => {
    const active_assignment = item.item_assignments?.find(a => !a.return_date);
    return {
      ...item,
      category_name: item.categories?.name,
      assigned_to: active_assignment?.profiles?.name
    };
  }) as Item[];
};

export const createItem = async (item: Partial<Item>) => {
  const { data, error } = await supabase
    .from('items')
    .insert(item)
    .select()
    .single();
    
  if (error) throw error;
  return data as Item;
};

export const updateItem = async (id: string, item: Partial<Item>) => {
  const { data, error } = await supabase
    .from('items')
    .update(item)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data as Item;
};

export const checkoutItem = async (itemId: string, userId: string) => {
  const { data, error } = await supabase
    .rpc('checkout_item', {
      item_id: itemId,
      user_id: userId
    });
    
  if (error) throw error;
  return data;
};

export const checkinItem = async (itemId: string) => {
  const { data, error } = await supabase
    .rpc('checkin_item', {
      item_id: itemId
    });
    
  if (error) throw error;
  return data;
};

// Utlåningar
export const getItemAssignments = async (userId?: string, returnedOnly = false) => {
  let query = supabase
    .from('item_assignments')
    .select(`
      *,
      items(name, serial_number),
      profiles(name)
    `)
    .order('assigned_date', { ascending: false });
    
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  if (returnedOnly) {
    query = query.not('return_date', 'is', null);
  } else {
    query = query.is('return_date', null);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  return data.map(assignment => ({
    ...assignment,
    item_name: assignment.items?.name,
    user_name: assignment.profiles?.name
  })) as ItemAssignment[];
};

// Aktiviteter
export const getActivities = async (limit = 10) => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      profiles(name),
      items(name)
    `)
    .order('timestamp', { ascending: false })
    .limit(limit);
    
  if (error) throw error;
  
  return data.map(activity => {
    // Formatera datum till "idag", "igår" eller datum
    const activityDate = new Date(activity.timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let date = activityDate.toLocaleDateString('sv-SE');
    if (activityDate.toDateString() === today.toDateString()) {
      date = 'idag';
    } else if (activityDate.toDateString() === yesterday.toDateString()) {
      date = 'igår';
    }
    
    return {
      ...activity,
      date,
      user_name: activity.profiles?.name,
      item_name: activity.items?.name
    };
  }) as Activity[];
};

// Logga aktivitet manuellt
export const logActivity = async (activity: Partial<Activity>) => {
  const { data, error } = await supabase
    .from('activities')
    .insert(activity)
    .select()
    .single();
    
  if (error) throw error;
  return data as Activity;
};
