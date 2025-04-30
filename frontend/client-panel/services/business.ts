import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface BusinessInfo {
  id?: string;
  user_id: string;
  business_description?: string;
  products?: string[];
  services?: string[];
  pricing_info?: string;
  faqs?: string[];
  service_policies?: string;
  created_at?: string;
  updated_at?: string;
}

export const businessService = {
  async getBusinessData(): Promise<BusinessInfo | null> {
    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('business_info')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error al obtener datos del negocio:', error);
      return null;
    }

    return data;
  },

  async updateBusinessData(info: Partial<BusinessInfo>): Promise<boolean> {
    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const { error } = await supabase
      .from('business_info')
      .update({
        ...info,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error al actualizar datos del negocio:', error);
      return false;
    }

    return true;
  },

  async insertBusinessData(info: Omit<BusinessInfo, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    const { error } = await supabase
      .from('business_info')
      .insert({
        ...info,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error al insertar datos del negocio:', error);
      return false;
    }

    return true;
  }
}; 