import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Icons
import { User, Mail, Phone, Loader2, Save, ShieldCheck } from "lucide-react";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => toast.error("Failed to load profile data"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile({
        name: form.name,
        phone: form.phone,
      });
      toast.success("Profile updated successfully", {
        description: "Your changes have been saved to our servers.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-slate-500 font-medium">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header Section (Avatar removed) */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">{form.name}</h1>
          <p className="text-slate-500">Manage your account information and preferences.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  This information will be visible to your assigned counsellors.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      value={form.email}
                      className="pl-10 bg-slate-50 text-slate-500 border-dashed cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <p className="text-[12px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Email cannot be changed for security reasons.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="bg-slate-50/50 py-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="min-w-[140px] shadow-sm"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;