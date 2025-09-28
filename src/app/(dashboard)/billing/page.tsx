"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserButton, useUser, SignedIn } from "@clerk/nextjs";
import { SubscriptionDetailsButton, CheckoutButton } from "@clerk/nextjs/experimental";
import {
  CreditCard,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  Star,
  Crown,
  Sparkles,
  FileText,
  Download,
  Palette,
  Wand2,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BillingPage() {
  const { user, isLoaded } = useUser();
  const { has } = useAuth();
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const hasProPlan = await has({ plan: "pro" });
        setIsProUser(hasProPlan);
      } catch (error) {
        console.error("Error checking pro status:", error);
        setIsProUser(false);
      } finally {
        setLoading(false);
      }
    };

    checkProStatus();
  }, [user, has]);

  const features = [
    {
      name: "AI-Powered Content Generation",
      free: "5 uses per month",
      pro: "Unlimited",
    },
    {
      name: "Professional Templates",
      free: "3 Basic Templates",
      pro: "20+ Premium Templates",
    },
    {
      name: "PDF Export",
      free: "With Watermark",
      pro: "No Watermark",
    },
    {
      name: "Cover Letter Generator",
      free: "Limited",
      pro: "Unlimited",
    },
    {
      name: "ATS Optimization",
      free: "Basic",
      pro: "Advanced",
    },
    {
      name: "Priority Support",
      free: "Standard",
      pro: "24/7 Priority",
    },
  ];

  const billingInfo = [
    { label: "Plan Status", value: isProUser ? "Active" : "Free Plan", valueColor: isProUser ? "text-green-600" : "text-gray-600" },
    { label: "Billing Cycle", value: "Monthly", valueColor: "text-gray-700" },
    { label: "Next Billing Date", value: isProUser ? "Next month" : "N/A", valueColor: "text-gray-700" },
    { label: "Payment Method", value: isProUser ? "Credit Card" : "Not applicable", valueColor: "text-gray-700" },
    { label: "Subscription Since", value: isProUser ? "Recently" : "N/A", valueColor: "text-gray-700" },
  ];

  if (loading) {
    return (
      <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
        <div className="flex justify-end mb-2 mt-2">
          <UserButton />
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-indigo-100 h-12 w-12 mb-3"></div>
            <div className="h-4 bg-indigo-100 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Manage your subscription and unlock premium features
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isProUser ? (
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full">
              <Crown className="h-4 w-4" />
              <span className="font-semibold">Pro Plan</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
              <FileText className="h-4 w-4" />
              <span className="font-semibold">Free Plan</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 w-full">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6 w-full">
          {/* Current Plan Card */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isProUser ? "Pro Plan" : "Free Plan"}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {isProUser
                      ? "Full access to all premium features"
                      : "Basic features with limitations"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {isProUser ? "$8.99" : "$0"}
                  </p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="mt-6">
                <SignedIn>
                  {isProUser ? (
                    <SubscriptionDetailsButton
                      subscriptionDetailsProps={{
                        appearance: {
                          elements: {
                            rootBox: "w-full",
                            card: "shadow-none border-0 p-0",
                          },
                        },
                      }}
                    >
                      <Button
                        variant="outline"
                        className="w-full gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      >
                        <CreditCard className="h-4 w-4" />
                        Manage Subscription
                      </Button>
                    </SubscriptionDetailsButton>
                  ) : (
                    <CheckoutButton
                      planId="cplan_33KrYL1vc8raNSjq4rFIRGhUCZ7"
                      planPeriod="month"
                      newSubscriptionRedirectUrl="/dashboard"
                      onSubscriptionComplete={() => {
                        console.log('Subscription completed!');
                        setIsProUser(true);
                      }}
                    >
                      <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Zap className="h-4 w-4" />
                        Upgrade to Pro - $8.99/month
                      </Button>
                    </CheckoutButton>
                  )}
                </SignedIn>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information Table */}
          <Card className="border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-600">
                        Item
                      </TableHead>
                      <TableHead className="text-sm font-medium text-gray-600 text-right">
                        Details
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingInfo.map((info, index) => (
                      <TableRow
                        key={info.label}
                        className="animate-fade-in border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TableCell className="font-medium text-gray-700 py-4">
                          {info.label}
                        </TableCell>
                        <TableCell className={`text-right py-4 font-semibold ${info.valueColor}`}>
                          {info.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 w-full">
          {/* Pro Benefits */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-yellow-50/30 border-l-4 border-amber-400 transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-600" />
                Pro Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-amber-50/50">
                  <Star className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    Unlimited AI content generation
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-amber-50/50">
                  <Palette className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">
                    20+ professional resume templates
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-amber-50/50">
                  <Download className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Watermark-free PDF exports</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Having issues with your subscription? We're here to help.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <Link href="mailto:info@novaweb.studio">
                      <Shield className="h-4 w-4" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}