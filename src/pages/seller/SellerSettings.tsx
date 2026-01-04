import React, { useState, useEffect } from 'react';
import {
  User, Lock, Bell, Store, CreditCard, Upload, Check, Globe,
  FileText, ShieldCheck, Truck, Award, Camera, Loader2
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type TabType = 'profile' | 'store' | 'export' | 'certifications' | 'logistics' | 'documents';

const SellerSettings: React.FC = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  const [storeData, setStoreData] = useState({
    business_name: '',
    business_address: '',
    business_description: '',
    business_email: '',
    business_phone: '',
    operating_hours: '',
    website_url: '',
    avatar_url: '',
  });

  const [exportData, setExportData] = useState({
    exporter_name: '',
    exporter_address: '',
    exporter_license: '',
    processor_name: '',
    processor_license: '',
    destination_markets: [] as string[],
    farm_vessel_id: '',
    processing_facility_id: '',
    harvest_method: '',
    feed_type: '',
    antibiotic_policy: '',
  });

  const [certificationData, setCertificationData] = useState({
    haccp_certified: false,
    haccp_cert_number: '',
    haccp_expiry_date: '',
    haccp_pending_approval: false,
    haccp_approved: false,
    gap_certified: false,
    gap_cert_number: '',
    gap_expiry_date: '',
    gap_pending_approval: false,
    gap_approved: false,
    gmp_certified: false,
    gmp_cert_number: '',
    gmp_expiry_date: '',
    gmp_pending_approval: false,
    gmp_approved: false,
    msc_certified: false,
    msc_cert_number: '',
    msc_pending_approval: false,
    msc_approved: false,
    asc_certified: false,
    asc_cert_number: '',
    asc_pending_approval: false,
    asc_approved: false,
    sanitary_cert_number: '',
    sanitary_cert_expiry: '',
  });

  const [logisticsData, setLogisticsData] = useState({
    cold_storage_certified: false,
    cold_storage_cert_number: '',
    reefer_container_details: '',
    transport_insurance_details: '',
    environmental_compliance: '',
  });

  const [documentsData, setDocumentsData] = useState({
    certificate_of_origin: '',
    export_permit_number: '',
    export_permit_expiry: '',
  });

  useEffect(() => {
    fetchSellerData();
  }, [profile]);

  const fetchSellerData = async () => {
    if (!profile) return;

    try {
      // Get seller profile
      const { data: sellerProfile, error } = await supabase
        .from('seller_profiles')
        .select('*')
        .eq('user_id', profile.id)
        .single();

      if (error) throw error;

      setSellerId(sellerProfile.id);

      // Populate form data
      setStoreData({
        business_name: sellerProfile.business_name || '',
        business_address: sellerProfile.business_address || '',
        business_description: sellerProfile.business_description || '',
        business_email: sellerProfile.business_email || '',
        business_phone: sellerProfile.business_phone || '',
        operating_hours: sellerProfile.operating_hours || '',
        website_url: sellerProfile.website_url || '',
        avatar_url: sellerProfile.avatar_url || '',
      });

      setExportData({
        exporter_name: sellerProfile.exporter_name || '',
        exporter_address: sellerProfile.exporter_address || '',
        exporter_license: sellerProfile.exporter_license || '',
        processor_name: sellerProfile.processor_name || '',
        processor_license: sellerProfile.processor_license || '',
        destination_markets: sellerProfile.destination_markets || [],
        farm_vessel_id: sellerProfile.farm_vessel_id || '',
        processing_facility_id: sellerProfile.processing_facility_id || '',
        harvest_method: sellerProfile.harvest_method || '',
        feed_type: sellerProfile.feed_type || '',
        antibiotic_policy: sellerProfile.antibiotic_policy || '',
      });

      setCertificationData({
        haccp_certified: sellerProfile.haccp_certified || false,
        haccp_cert_number: sellerProfile.haccp_cert_number || '',
        haccp_expiry_date: sellerProfile.haccp_expiry_date || '',
        haccp_pending_approval: sellerProfile.haccp_pending_approval || false,
        haccp_approved: sellerProfile.haccp_approved || false,
        gap_certified: sellerProfile.gap_certified || false,
        gap_cert_number: sellerProfile.gap_cert_number || '',
        gap_expiry_date: sellerProfile.gap_expiry_date || '',
        gap_pending_approval: sellerProfile.gap_pending_approval || false,
        gap_approved: sellerProfile.gap_approved || false,
        gmp_certified: sellerProfile.gmp_certified || false,
        gmp_cert_number: sellerProfile.gmp_cert_number || '',
        gmp_expiry_date: sellerProfile.gmp_expiry_date || '',
        gmp_pending_approval: sellerProfile.gmp_pending_approval || false,
        gmp_approved: sellerProfile.gmp_approved || false,
        msc_certified: sellerProfile.msc_certified || false,
        msc_cert_number: sellerProfile.msc_cert_number || '',
        msc_pending_approval: sellerProfile.msc_pending_approval || false,
        msc_approved: sellerProfile.msc_approved || false,
        asc_certified: sellerProfile.asc_certified || false,
        asc_cert_number: sellerProfile.asc_cert_number || '',
        asc_pending_approval: sellerProfile.asc_pending_approval || false,
        asc_approved: sellerProfile.asc_approved || false,
        sanitary_cert_number: sellerProfile.sanitary_cert_number || '',
        sanitary_cert_expiry: sellerProfile.sanitary_cert_expiry || '',
      });

      setLogisticsData({
        cold_storage_certified: sellerProfile.cold_storage_certified || false,
        cold_storage_cert_number: sellerProfile.cold_storage_cert_number || '',
        reefer_container_details: sellerProfile.reefer_container_details || '',
        transport_insurance_details: sellerProfile.transport_insurance_details || '',
        environmental_compliance: sellerProfile.environmental_compliance || '',
      });

      setDocumentsData({
        certificate_of_origin: sellerProfile.certificate_of_origin || '',
        export_permit_number: sellerProfile.export_permit_number || '',
        export_permit_expiry: sellerProfile.export_permit_expiry || '',
      });

      setImagePreview(sellerProfile.avatar_url);

      // Get user profile data
      setProfileData({
        full_name: profile.full_name || '',
        email: user?.email || '',
        phone: profile.phone || '',
      });
    } catch (error) {
      console.error('Error fetching seller data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load seller data',
        variant: 'destructive',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      let avatarUrl = storeData.avatar_url;

      // Upload avatar if a new image was selected
      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${sellerId}-${Date.now()}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('profile-images')
            .upload(filePath, imageFile, {
              cacheControl: '3600',
              upsert: true,
            });

          if (uploadError) {
            console.error('Upload error:', uploadError);
            toast({
              title: 'Warning',
              description: 'Profile updated but avatar upload failed. Please ensure "profile-images" storage bucket exists.',
              variant: 'default',
            });
          } else {
            // Get public URL
            const { data: { publicUrl } } = supabase.storage
              .from('profile-images')
              .getPublicUrl(filePath);

            avatarUrl = publicUrl;
          }
        } catch (uploadError) {
          console.error('Avatar upload error:', uploadError);
        }
      }

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          phone: profileData.phone,
        })
        .eq('id', profile!.id);

      if (profileError) throw profileError;

      // Update seller profile with avatar URL
      if (avatarUrl) {
        const { error: avatarError } = await supabase
          .from('seller_profiles')
          .update({ avatar_url: avatarUrl })
          .eq('id', sellerId);

        if (avatarError) {
          console.error('Error updating avatar URL:', avatarError);
        } else {
          setStoreData({ ...storeData, avatar_url: avatarUrl });
          setImagePreview(avatarUrl);
        }
      }

      toast({
        title: 'Success',
        description: imageFile ? 'Profile and avatar updated successfully' : 'Profile updated successfully',
      });

      // Clear the image file after successful upload
      setImageFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStore = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .update(storeData)
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Store information updated successfully',
      });
    } catch (error) {
      console.error('Error updating store:', error);
      toast({
        title: 'Error',
        description: 'Failed to update store information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExport = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .update(exportData)
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Export information updated successfully',
      });
    } catch (error) {
      console.error('Error updating export info:', error);
      toast({
        title: 'Error',
        description: 'Failed to update export information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCertifications = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      // Set certifications to pending approval if they were just checked
      const updates = { ...certificationData };

      // HACCP
      if (certificationData.haccp_certified && !certificationData.haccp_approved) {
        updates.haccp_pending_approval = true;
      }

      // GAP
      if (certificationData.gap_certified && !certificationData.gap_approved) {
        updates.gap_pending_approval = true;
      }

      // GMP
      if (certificationData.gmp_certified && !certificationData.gmp_approved) {
        updates.gmp_pending_approval = true;
      }

      // MSC
      if (certificationData.msc_certified && !certificationData.msc_approved) {
        updates.msc_pending_approval = true;
      }

      // ASC
      if (certificationData.asc_certified && !certificationData.asc_approved) {
        updates.asc_pending_approval = true;
      }

      const { error } = await supabase
        .from('seller_profiles')
        .update(updates)
        .eq('id', sellerId);

      if (error) throw error;

      // Update local state
      setCertificationData(updates);

      toast({
        title: 'Success',
        description: 'Certifications submitted for approval. Admin will review shortly.',
      });
    } catch (error) {
      console.error('Error updating certifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to update certifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLogistics = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .update(logisticsData)
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Logistics information updated successfully',
      });
    } catch (error) {
      console.error('Error updating logistics:', error);
      toast({
        title: 'Error',
        description: 'Failed to update logistics information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDocuments = async () => {
    if (!sellerId) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('seller_profiles')
        .update(documentsData)
        .eq('id', sellerId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Export documents updated successfully',
      });
    } catch (error) {
      console.error('Error updating documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to update export documents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: User },
    { id: 'store' as TabType, label: 'Store Information', icon: Store },
    { id: 'export' as TabType, label: 'Export Details', icon: Globe },
    { id: 'certifications' as TabType, label: 'Certifications', icon: ShieldCheck },
    { id: 'logistics' as TabType, label: 'Logistics', icon: Truck },
    { id: 'documents' as TabType, label: 'Export Documents', icon: FileText },
  ];

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Settings"
      subtitle="Manage your seller account and export compliance"
    >
      <div className="max-w-5xl">
        {/* Tabs */}
        <div className="bg-card border border-border rounded-2xl p-2 mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-6">Profile Information</h3>

              {/* Avatar Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <label htmlFor="avatar-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>
                          <Camera className="h-4 w-4 mr-2" />
                          Change Photo
                        </span>
                      </Button>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    value={profileData.full_name}
                    onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={profileData.email}
                    disabled
                    className="h-12 bg-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+255 XXX XXX XXX"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Store Information Tab */}
        {activeTab === 'store' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-6">Store Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <Input
                  value={storeData.business_name}
                  onChange={(e) => setStoreData({ ...storeData, business_name: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Business Address</label>
                <Input
                  value={storeData.business_address}
                  onChange={(e) => setStoreData({ ...storeData, business_address: e.target.value })}
                  placeholder="Full business address"
                  className="h-12"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <textarea
                  value={storeData.business_description}
                  onChange={(e) => setStoreData({ ...storeData, business_description: e.target.value })}
                  rows={4}
                  placeholder="Tell customers about your business..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Email</label>
                <Input
                  type="email"
                  value={storeData.business_email}
                  onChange={(e) => setStoreData({ ...storeData, business_email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Phone</label>
                <Input
                  value={storeData.business_phone}
                  onChange={(e) => setStoreData({ ...storeData, business_phone: e.target.value })}
                  placeholder="+255 XXX XXX XXX"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Operating Hours</label>
                <Input
                  value={storeData.operating_hours}
                  onChange={(e) => setStoreData({ ...storeData, operating_hours: e.target.value })}
                  placeholder="e.g., Mon-Fri 8AM-5PM"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <Input
                  type="url"
                  value={storeData.website_url}
                  onChange={(e) => setStoreData({ ...storeData, website_url: e.target.value })}
                  placeholder="https://"
                  className="h-12"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveStore} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Store Information'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Export Details Tab */}
        {activeTab === 'export' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-semibold">Export & Traceability Details</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Complete information required for international fish export
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-3">Exporter Information</h4>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Exporter Name</label>
                  <Input
                    value={exportData.exporter_name}
                    onChange={(e) => setExportData({ ...exportData, exporter_name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Exporter License Number</label>
                  <Input
                    value={exportData.exporter_license}
                    onChange={(e) => setExportData({ ...exportData, exporter_license: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Exporter Address</label>
                  <Input
                    value={exportData.exporter_address}
                    onChange={(e) => setExportData({ ...exportData, exporter_address: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <h4 className="font-medium mb-3">Processing Facility</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Processor Name</label>
                  <Input
                    value={exportData.processor_name}
                    onChange={(e) => setExportData({ ...exportData, processor_name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Processor License</label>
                  <Input
                    value={exportData.processor_license}
                    onChange={(e) => setExportData({ ...exportData, processor_license: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Processing Facility ID</label>
                  <Input
                    value={exportData.processing_facility_id}
                    onChange={(e) => setExportData({ ...exportData, processing_facility_id: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Farm/Vessel ID</label>
                  <Input
                    value={exportData.farm_vessel_id}
                    onChange={(e) => setExportData({ ...exportData, farm_vessel_id: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="md:col-span-2 mt-4">
                  <h4 className="font-medium mb-3">Traceability Information</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Harvest Method</label>
                  <Input
                    value={exportData.harvest_method}
                    onChange={(e) => setExportData({ ...exportData, harvest_method: e.target.value })}
                    placeholder="e.g., Net fishing, Aquaculture"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Feed Type</label>
                  <Input
                    value={exportData.feed_type}
                    onChange={(e) => setExportData({ ...exportData, feed_type: e.target.value })}
                    placeholder="e.g., Organic, Commercial"
                    className="h-12"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Antibiotic Policy</label>
                  <textarea
                    value={exportData.antibiotic_policy}
                    onChange={(e) => setExportData({ ...exportData, antibiotic_policy: e.target.value })}
                    rows={3}
                    placeholder="Describe your antibiotic usage policy..."
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveExport} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Export Details'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-semibold">Food Safety & Sustainability Certifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Required for international fish exports
              </p>
            </div>

            <div className="space-y-6">
              {/* HACCP */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={certificationData.haccp_certified}
                      onChange={(e) => setCertificationData({ ...certificationData, haccp_certified: e.target.checked })}
                      className="w-5 h-5 rounded border-border"
                    />
                    <div>
                      <h4 className="font-medium">HACCP Certified</h4>
                      <p className="text-sm text-muted-foreground">Hazard Analysis and Critical Control Points</p>
                    </div>
                  </div>
                  {certificationData.haccp_approved && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      ✓ Approved
                    </span>
                  )}
                  {certificationData.haccp_pending_approval && !certificationData.haccp_approved && (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                      ⏳ Pending Approval
                    </span>
                  )}
                </div>
                {certificationData.haccp_certified && (
                  <div className="grid md:grid-cols-2 gap-4 ml-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificate Number</label>
                      <Input
                        value={certificationData.haccp_cert_number}
                        onChange={(e) => setCertificationData({ ...certificationData, haccp_cert_number: e.target.value })}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <Input
                        type="date"
                        value={certificationData.haccp_expiry_date}
                        onChange={(e) => setCertificationData({ ...certificationData, haccp_expiry_date: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* GAP */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={certificationData.gap_certified}
                    onChange={(e) => setCertificationData({ ...certificationData, gap_certified: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <div>
                    <h4 className="font-medium">GAP Certified</h4>
                    <p className="text-sm text-muted-foreground">Good Aquaculture Practices</p>
                  </div>
                </div>
                {certificationData.gap_certified && (
                  <div className="grid md:grid-cols-2 gap-4 ml-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificate Number</label>
                      <Input
                        value={certificationData.gap_cert_number}
                        onChange={(e) => setCertificationData({ ...certificationData, gap_cert_number: e.target.value })}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <Input
                        type="date"
                        value={certificationData.gap_expiry_date}
                        onChange={(e) => setCertificationData({ ...certificationData, gap_expiry_date: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* GMP */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={certificationData.gmp_certified}
                    onChange={(e) => setCertificationData({ ...certificationData, gmp_certified: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <div>
                    <h4 className="font-medium">GMP Certified</h4>
                    <p className="text-sm text-muted-foreground">Good Manufacturing Practices</p>
                  </div>
                </div>
                {certificationData.gmp_certified && (
                  <div className="grid md:grid-cols-2 gap-4 ml-8">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificate Number</label>
                      <Input
                        value={certificationData.gmp_cert_number}
                        onChange={(e) => setCertificationData({ ...certificationData, gmp_cert_number: e.target.value })}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <Input
                        type="date"
                        value={certificationData.gmp_expiry_date}
                        onChange={(e) => setCertificationData({ ...certificationData, gmp_expiry_date: e.target.value })}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* MSC */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={certificationData.msc_certified}
                    onChange={(e) => setCertificationData({ ...certificationData, msc_certified: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <div>
                    <h4 className="font-medium">MSC Certified</h4>
                    <p className="text-sm text-muted-foreground">Marine Stewardship Council (Sustainability)</p>
                  </div>
                </div>
                {certificationData.msc_certified && (
                  <div className="ml-8">
                    <label className="block text-sm font-medium mb-2">Certificate Number</label>
                    <Input
                      value={certificationData.msc_cert_number}
                      onChange={(e) => setCertificationData({ ...certificationData, msc_cert_number: e.target.value })}
                      className="h-10 max-w-md"
                    />
                  </div>
                )}
              </div>

              {/* ASC */}
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={certificationData.asc_certified}
                    onChange={(e) => setCertificationData({ ...certificationData, asc_certified: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <div>
                    <h4 className="font-medium">ASC Certified</h4>
                    <p className="text-sm text-muted-foreground">Aquaculture Stewardship Council</p>
                  </div>
                </div>
                {certificationData.asc_certified && (
                  <div className="ml-8">
                    <label className="block text-sm font-medium mb-2">Certificate Number</label>
                    <Input
                      value={certificationData.asc_cert_number}
                      onChange={(e) => setCertificationData({ ...certificationData, asc_cert_number: e.target.value })}
                      className="h-10 max-w-md"
                    />
                  </div>
                )}
              </div>

              {/* Sanitary Certificate */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sanitary Certificate Number</label>
                  <Input
                    value={certificationData.sanitary_cert_number}
                    onChange={(e) => setCertificationData({ ...certificationData, sanitary_cert_number: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sanitary Cert Expiry</label>
                  <Input
                    type="date"
                    value={certificationData.sanitary_cert_expiry}
                    onChange={(e) => setCertificationData({ ...certificationData, sanitary_cert_expiry: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveCertifications} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Certifications'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Logistics Tab */}
        {activeTab === 'logistics' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-semibold">Cold-chain & Logistics Information</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Transport and storage requirements for fish exports
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={logisticsData.cold_storage_certified}
                    onChange={(e) => setLogisticsData({ ...logisticsData, cold_storage_certified: e.target.checked })}
                    className="w-5 h-5 rounded border-border"
                  />
                  <div>
                    <h4 className="font-medium">Cold Storage Certified</h4>
                    <p className="text-sm text-muted-foreground">Temperature-controlled facility certification</p>
                  </div>
                </div>
                {logisticsData.cold_storage_certified && (
                  <div className="ml-8">
                    <label className="block text-sm font-medium mb-2">Certificate Number</label>
                    <Input
                      value={logisticsData.cold_storage_cert_number}
                      onChange={(e) => setLogisticsData({ ...logisticsData, cold_storage_cert_number: e.target.value })}
                      className="h-10 max-w-md"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Reefer Container Details</label>
                <textarea
                  value={logisticsData.reefer_container_details}
                  onChange={(e) => setLogisticsData({ ...logisticsData, reefer_container_details: e.target.value })}
                  rows={3}
                  placeholder="Describe available reefer containers, temperature ranges, capacity..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Transport Insurance Details</label>
                <textarea
                  value={logisticsData.transport_insurance_details}
                  onChange={(e) => setLogisticsData({ ...logisticsData, transport_insurance_details: e.target.value })}
                  rows={3}
                  placeholder="Insurance provider, policy number, coverage details..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Environmental Compliance</label>
                <textarea
                  value={logisticsData.environmental_compliance}
                  onChange={(e) => setLogisticsData({ ...logisticsData, environmental_compliance: e.target.value })}
                  rows={3}
                  placeholder="Environmental certifications, waste management practices..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveLogistics} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Logistics Information'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Export Documents Tab */}
        {activeTab === 'documents' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-semibold">Legal & Export Documents</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Required legal documentation for international trade
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Certificate of Origin</label>
                <Input
                  value={documentsData.certificate_of_origin}
                  onChange={(e) => setDocumentsData({ ...documentsData, certificate_of_origin: e.target.value })}
                  placeholder="Certificate number or reference"
                  className="h-12"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Export Permit Number</label>
                  <Input
                    value={documentsData.export_permit_number}
                    onChange={(e) => setDocumentsData({ ...documentsData, export_permit_number: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Export Permit Expiry</label>
                  <Input
                    type="date"
                    value={documentsData.export_permit_expiry}
                    onChange={(e) => setDocumentsData({ ...documentsData, export_permit_expiry: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                <h4 className="font-medium text-blue-900 mb-2">Document Upload (Coming Soon)</h4>
                <p className="text-sm text-blue-700">
                  Upload scanned copies of certificates, permits, and other export documents.
                  This feature will be available soon to help you maintain a complete digital record.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={handleSaveDocuments} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Export Documents'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SellerSettings;
