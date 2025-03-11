
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: string
          department?: string
          contact?: string
          hire_date?: string
          status: 'active' | 'inactive' | 'sick' | 'vacation'
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id: string
          name: string
          role?: string
          department?: string
          contact?: string
          hire_date?: string
          status?: 'active' | 'inactive' | 'sick' | 'vacation'
        }
        Update: {
          id?: string
          name?: string
          role?: string
          department?: string
          contact?: string
          hire_date?: string
          status?: 'active' | 'inactive' | 'sick' | 'vacation'
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
        }
      }
      items: {
        Row: {
          id: string
          name: string
          description?: string
          category_id?: string
          serial_number?: string
          status: 'available' | 'checked-out' | 'maintenance' | 'lost'
          purchase_date?: string
          last_checked?: string
          item_type: 'tool' | 'safety'
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          category_id?: string
          serial_number?: string
          status?: 'available' | 'checked-out' | 'maintenance' | 'lost'
          purchase_date?: string
          last_checked?: string
          item_type: 'tool' | 'safety'
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category_id?: string
          serial_number?: string
          status?: 'available' | 'checked-out' | 'maintenance' | 'lost'
          purchase_date?: string
          last_checked?: string
          item_type?: 'tool' | 'safety'
        }
      }
      certificates: {
        Row: {
          id: string
          name: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
        }
      }
      user_certificates: {
        Row: {
          id: string
          user_id: string
          certificate_id: string
          expiry_date: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          user_id: string
          certificate_id: string
          expiry_date: string
        }
        Update: {
          id?: string
          user_id?: string
          certificate_id?: string
          expiry_date?: string
        }
      }
      item_assignments: {
        Row: {
          id: string
          item_id: string
          user_id: string
          assigned_date: string
          return_date?: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          item_id: string
          user_id: string
          assigned_date?: string
          return_date?: string
        }
        Update: {
          id?: string
          item_id?: string
          user_id?: string
          assigned_date?: string
          return_date?: string
        }
      }
      maintenance_logs: {
        Row: {
          id: string
          item_id: string
          user_id?: string
          maintenance_date: string
          description?: string
          next_maintenance_date?: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          item_id: string
          user_id?: string
          maintenance_date?: string
          description?: string
          next_maintenance_date?: string
        }
        Update: {
          id?: string
          item_id?: string
          user_id?: string
          maintenance_date?: string
          description?: string
          next_maintenance_date?: string
        }
      }
      activities: {
        Row: {
          id: string
          title: string
          description?: string
          user_id?: string
          related_item_id?: string
          priority?: 'low' | 'medium' | 'high'
          timestamp: string
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          user_id?: string
          related_item_id?: string
          priority?: 'low' | 'medium' | 'high'
          timestamp?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          user_id?: string
          related_item_id?: string
          priority?: 'low' | 'medium' | 'high'
          timestamp?: string
        }
      }
    }
    Views: {
      active_certificates: {
        Row: {
          id?: string
          user_id?: string
          certificate_id?: string
          expiry_date?: string
          certificate_name?: string
          user_name?: string
          days_left?: number
        }
      }
    }
    Functions: {
      add_certificate_to_user: {
        Args: {
          user_id: string
          certificate_id: string
          expires_on: string
        }
        Returns: Json
      }
      checkout_item: {
        Args: {
          item_id: string
          user_id: string
        }
        Returns: Json
      }
      checkin_item: {
        Args: {
          item_id: string
        }
        Returns: Json
      }
    }
  }
}
