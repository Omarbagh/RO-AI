"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserProfile,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import {
  User,
  Mail,
  Calendar,
  Edit3,
  Shield,
  Bell,
  Globe,
  MapPin,
  Phone,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(user?.publicMetadata?.bio || "");

  const handleSaveBio = async () => {
    if (!user) return;
    
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          bio: tempBio,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleCancelEdit = () => {
    setTempBio(user?.publicMetadata?.bio || "");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-center">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <User className="h-4 w-4 text-indigo-500" />
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => openUserProfile()}
            className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            <Shield className="size-4" />
            Account Settings
          </Button>
          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg shadow-md"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="size-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 w-full">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 w-full">
          {/* Personal Information Card */}
          <Card className="border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                      className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.fullName || "No name set"}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p className="font-medium">
                          {user.primaryPhoneNumber?.phoneNumber || "Not set"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">
                          {typeof user.unsafeMetadata?.location === "string" && user.unsafeMetadata.location !== ""
                            ? user.unsafeMetadata.location
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Member since</p>
                        <p className="font-medium">
                          {new Date(user.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Last active</p>
                        <p className="font-medium">
                          {new Date(user.lastSignInAt!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio Section */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-indigo-600" />
                About Me
              </CardTitle>
              <CardDescription>
                A brief description about yourself
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={typeof tempBio === "string" ? tempBio : ""}
                    onChange={(e) => setTempBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSaveBio}
                      className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Save className="size-4" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="gap-2"
                    >
                      <X className="size-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">
                    {typeof user.unsafeMetadata?.bio === "string" && user.unsafeMetadata.bio !== "" 
                      ? user.unsafeMetadata.bio 
                      : "No bio added yet."}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="mt-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <Edit3 className="size-4 mr-2" />
                    Add/Edit Bio
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 w-full">
          {/* Account Status */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email verified</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.primaryEmailAddress?.verification.status === "verified" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {user.primaryEmailAddress?.verification.status === "verified" ? "Verified" : "Pending"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">2FA enabled</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.twoFactorEnabled 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Account status</span>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-gray-700 hover:text-indigo-600 hover:border-indigo-200"
                  onClick={() => openUserProfile({ 
                    // @ts-expect-error - Clerk types might not be up to date
                    initialPage: "email" 
                  })}
                >
                  <Mail className="h-4 w-4" />
                  Update Email
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-gray-700 hover:text-indigo-600 hover:border-indigo-200"
                  onClick={() => openUserProfile({ 
                    // @ts-expect-error - Clerk types might not be up to date
                    initialPage: "password" 
                  })}
                >
                  <Shield className="h-4 w-4" />
                  Change Password
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-gray-700 hover:text-indigo-600 hover:border-indigo-200"
                  onClick={() => openUserProfile({ 
                    // @ts-expect-error - Clerk types might not be up to date
                    initialPage: "account" 
                  })}
                >
                  <User className="h-4 w-4" />
                  Account Details
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                Profile Completion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-[#4F46E5] rounded-full transition-all duration-500"
                    style={{ width: `${calculateProfileCompletion(user)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {calculateProfileCompletion(user)}% complete
                </p>
                
                <div className="space-y-2">
                  {[
                    { label: "Profile photo", completed: !!user.imageUrl },
                    { label: "Full name", completed: !!user.fullName },
                    { label: "Email verified", completed: user.primaryEmailAddress?.verification.status === "verified" },
                    { label: "Bio added", completed: !!user.unsafeMetadata?.bio },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        item.completed ? "bg-green-500" : "bg-gray-300"
                      }`} />
                      <span className={`text-sm ${
                        item.completed ? "text-gray-700" : "text-gray-400"
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate profile completion percentage
function calculateProfileCompletion(user: any): number {
  const checks = [
    !!user.imageUrl,
    !!user.fullName,
    user.primaryEmailAddress?.verification.status === "verified",
    !!user.unsafeMetadata?.bio,
  ];
  
  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}