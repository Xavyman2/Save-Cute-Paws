"use client";

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Shield, Home, Stethoscope } from 'lucide-react';

const DonatePage = () => {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [showPayPal, setShowPayPal] = useState(false);

  const predefinedAmounts = ['10', '25', '50', '100'];

  const handleAmountClick = (newAmount: string) => {
    setAmount(newAmount);
    setCustomAmount('');
    setShowPayPal(false);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(value);
    }
    setShowPayPal(false);
  };

  const handleDonateClick = () => {
    if (parseFloat(amount) > 0) {
      setShowPayPal(true);
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount
        }
      }]
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Make a Donation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your generous donation helps us provide food, shelter, and medical care to animals in need. 
              Every contribution, big or small, makes a difference in saving lives.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$10</h3>
                <p className="text-gray-600">Feeds 3 animals for a day</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$25</h3>
                <p className="text-gray-600">Provides vaccinations</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Home className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$50</h3>
                <p className="text-gray-600">Shelter for a week</p>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Stethoscope className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">$100</h3>
                <p className="text-gray-600">Emergency medical care</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-900">Choose an Amount</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Select a donation amount or enter your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {predefinedAmounts.map((preAmount) => (
                    <Button
                      key={preAmount}
                      onClick={() => handleAmountClick(preAmount)}
                      variant={amount === preAmount ? "default" : "outline"}
                      className={`h-16 text-lg font-semibold ${
                        amount === preAmount 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'hover:bg-blue-50 hover:border-blue-300'
                      }`}
                    >
                      ${preAmount}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Or enter a custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                      $
                    </span>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="0.00"
                      className="pl-8 h-12 text-lg border-2 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  onClick={handleDonateClick}
                  className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  Donate ${amount}
                </Button>

                {/* PayPal Integration */}
                {showPayPal && (
                  <div className="mt-6">
                    <PayPalScriptProvider options={{ 
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                      currency: "USD"
                    }}>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        style={{
                          layout: 'vertical',
                          color: 'blue',
                          shape: 'rect',
                          label: 'donate'
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {/* Security Note */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <p className="text-sm text-green-800 font-medium">
                      Your donation is secure and encrypted. We never store your payment information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
