import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { Fish, User, Phone, Store, Truck, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getDashboardPath } from '@/components/ProtectedRoute';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, createUserProfile } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    user_type: (user?.user_metadata?.user_type as UserType) || 'customer'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const userTypes = [
    {
      value: 'customer' as UserType,
      label: 'Customer',
      description: 'Buy fresh fish and seafood',
      icon: User
    },
    {
      value: 'seller' as UserType,
      label: 'Seller',
      description: 'Sell your fish products',
      icon: Store
    },
    {
      value: 'distributor' as UserType,
      label: 'Distributor',
      description: 'Deliver products to customers',
      icon: Truck
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await createUserProfile({
        full_name: formData.full_name,
        phone: formData.phone || undefined,
        user_type: formData.user_type
      });

      toast({
        title: 'Profile created successfully!',
        description: 'Welcome to Tanzania Fish Hub',
      });

      // Redirect to role-specific dashboard
      const dashboardPath = getDashboardPath(formData.user_type);
      navigate(dashboardPath, { replace: true });

    } catch (error: any) {
      console.error('Profile setup error:', error);

      const errorMessage = error.message || 'Failed to create profile. Please try again.';

      setErrors({
        submit: errorMessage
      });

      toast({
        title: 'Profile setup failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Fish className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">
            Tell us a bit about yourself to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">I want to join as:</label>
              <div className="grid grid-cols-3 gap-3">
                {userTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, user_type: type.value })}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        formData.user_type === type.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      )}
                    >
                      <Icon className={cn(
                        "h-6 w-6 mx-auto mb-2",
                        formData.user_type === type.value ? "text-blue-600" : "text-gray-400"
                      )} />
                      <p className="font-medium text-sm">{type.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="text-sm font-medium mb-2 block">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.full_name) setErrors({ ...errors, full_name: '' });
                  }}
                  className="pl-10 h-12"
                  placeholder="John Doe"
                  disabled={loading}
                  required
                />
              </div>
              {errors.full_name && (
                <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    handleChange(e);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className="pl-10 h-12"
                  placeholder="+255 712 345 678"
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating profile...
                </>
              ) : (
                <>
                  Complete Profile
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
