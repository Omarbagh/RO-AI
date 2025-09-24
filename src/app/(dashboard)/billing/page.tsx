"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Crown,
  Sparkles,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
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

type Subscription = {
  id: string;
  status: "active" | "canceled" | "past_due" | "incomplete";
  price_id: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
};

type Invoice = {
  id: string;
  amount_due: number;
  amount_paid: number;
  status: "paid" | "open" | "draft" | "void";
  created: string;
  invoice_pdf?: string;
};

type Plan = {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "3 resume templates",
      "Basic customization",
      "PDF downloads (watermarked)",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9,
    interval: "month",
    popular: true,
    features: [
      "Unlimited resume templates",
      "Advanced customization",
      "PDF downloads (no watermark)",
      "AI-powered content suggestions",
      "Priority support",
      "Export to multiple formats",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 19,
    interval: "month",
    features: [
      "Everything in Pro",
      "AI resume optimization",
      "Cover letter generator",
      "Job matching alerts",
      "Dedicated success manager",
      "Custom branding",
    ],
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getStatusBadge = (status: string) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
  
  switch (status) {
    case "active":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "paid":
      return `${baseClasses} bg-green-100 text-green-800`;
    case "canceled":
      return `${baseClasses} bg-red-100 text-red-800`;
    case "past_due":
      return `${baseClasses} bg-yellow-100 text-yellow-800`;
    case "open":
      return `${baseClasses} bg-blue-100 text-blue-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

export default function BillingPage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchBillingData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await getToken({ template: "supabase" });
        if (!token) {
          setLoading(false);
          return;
        }

        const supabaseWithAuth = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } },
        );

        // Fetch subscription data
        const { data: subscriptionData } = await supabaseWithAuth
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (subscriptionData) {
          setSubscription(subscriptionData);
        }

        // Fetch invoices
        const { data: invoicesData } = await supabaseWithAuth
          .from("invoices")
          .select("*")
          .eq("user_id", user.id)
          .order("created", { ascending: false })
          .limit(10);

        setInvoices(invoicesData || []);
      } catch (err) {
        console.error("Error fetching billing data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, [user, isLoaded, getToken]);

  const currentPlan = subscription ? plans.find(p => p.id === subscription.price_id) : plans[0];

  const handleUpgrade = (plan: Plan) => {
    setSelectedPlan(plan);
    // In a real implementation, you would redirect to Stripe checkout
    console.log("Upgrading to plan:", plan);
  };

  const handleManageSubscription = () => {
    // In a real implementation, you would redirect to Stripe customer portal
    window.open("https://billing.stripe.com/p/login/test_14k6rD0AE8iZ1m89AA", "_blank");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden px-4 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
            Billing & Plans
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Choose the perfect plan for your career journey
          </p>
        </div>
        {subscription && (
          <Button
            onClick={handleManageSubscription}
            variant="outline"
            className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-all"
          >
            <CreditCard className="size-4" />
            Manage Subscription
          </Button>
        )}
      </div>

      {/* Current Plan Overview */}
      {subscription && currentPlan && (
        <div className="mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-br from-white to-green-50/30 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-3 rounded-lg bg-green-100/80">
                    <BadgeCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Current Plan: {currentPlan.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {subscription.cancel_at_period_end ? (
                        <span className="text-yellow-600">
                          Will cancel on {formatDate(subscription.current_period_end)}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          Active until {formatDate(subscription.current_period_end)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(currentPlan.price)}<span className="text-sm font-normal text-gray-600">/{currentPlan.interval}</span>
                  </p>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-indigo-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-100/80 group-hover:bg-indigo-200/60 transition-colors duration-300">
                <Crown className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Current Plan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentPlan?.name || "Free"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-green-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100/80 group-hover:bg-green-200/60 transition-colors duration-300">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {subscription?.cancel_at_period_end ? "Ends On" : "Renews On"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscription ? formatDate(subscription.current_period_end) : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all duration-300 group hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100/80 group-hover:bg-blue-200/60 transition-colors duration-300">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount_paid, 0) / 100)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 space-y-6 w-full">
          {/* Pricing Plans */}
          <Card className="border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                Choose Your Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                      plan.popular
                        ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-white shadow-md"
                        : "border-gray-200 bg-white"
                    } ${
                      currentPlan?.id === plan.id
                        ? "ring-2 ring-indigo-500 ring-opacity-50"
                        : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-gray-600">/{plan.interval}</span>
                      </div>
                      
                      <Button
                        onClick={() => handleUpgrade(plan)}
                        className={`w-full gap-2 ${
                          plan.popular
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : currentPlan?.id === plan.id
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                        disabled={currentPlan?.id === plan.id}
                      >
                        {currentPlan?.id === plan.id ? (
                          <>
                            <CheckCircle className="size-4" />
                            Current Plan
                          </>
                        ) : (
                          <>
                            <ArrowRight className="size-4" />
                            {currentPlan && plan.price > currentPlan.price ? "Upgrade" : "Downgrade"}
                          </>
                        )}
                      </Button>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Billing History
                <span className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full ml-2">
                  {invoices.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {invoices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>No billing history yet.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-gray-50/50">
                        <TableRow>
                          <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Date
                          </TableHead>
                          <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Amount
                          </TableHead>
                          <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Status
                          </TableHead>
                          <TableHead className="text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Invoice
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((invoice, index) => (
                          <TableRow
                            key={invoice.id}
                            className="animate-fade-in border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <TableCell className="font-medium">
                              {formatDate(invoice.created)}
                            </TableCell>
                            <TableCell className="text-sm text-gray-700">
                              {formatCurrency(invoice.amount_due / 100)}
                            </TableCell>
                            <TableCell>
                              <span className={getStatusBadge(invoice.status)}>
                                {invoice.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {invoice.invoice_pdf && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(invoice.invoice_pdf, '_blank')}
                                >
                                  Download
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 w-full">
          {/* Billing Information */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-indigo-600" />
                Billing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Plan</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {currentPlan?.name || "Free"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-semibold">
                    {subscription ? (
                      <span className={getStatusBadge(subscription.status)}>
                        {subscription.status}
                        {subscription.cancel_at_period_end && " (Canceling)"}
                      </span>
                    ) : (
                      <span className={getStatusBadge("active")}>Active</span>
                    )}
                  </p>
                </div>
                {subscription && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Billing Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatDate(subscription.current_period_end)}
                      </p>
                    </div>
                    <Button
                      onClick={handleManageSubscription}
                      variant="outline"
                      className="w-full gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    >
                      <CreditCard className="size-4" />
                      Update Payment Method
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover-lift">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                  <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Billing questions?</strong> Email us at support@resumeapp.com
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                  <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>Cancel anytime</strong> - No long-term contracts
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-indigo-50/30">
                  <div className="mt-1 size-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-sm">
                    <strong>30-day money-back guarantee</strong> on all paid plans
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={(o) => !o && setSelectedPlan(null)}>
        <DialogContent className="max-w-md w-full backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-indigo-600 flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Upgrade to {selectedPlan?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              You're about to upgrade to the <strong>{selectedPlan?.name}</strong> plan.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-lg">
                {formatCurrency(selectedPlan?.price || 0)}/{selectedPlan?.interval}
              </p>
              <p className="text-sm text-gray-600">Billed monthly</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
                <CreditCard className="size-4" />
                Continue to Payment
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setSelectedPlan(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}