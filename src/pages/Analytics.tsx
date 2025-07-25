import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { useState } from "react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30days");

  // Mock analytics data
  const salesData = [
    { day: "Mon", sales: 12000, orders: 45, expenses: 8000 },
    { day: "Tue", sales: 15000, orders: 52, expenses: 9500 },
    { day: "Wed", sales: 18000, orders: 61, expenses: 11000 },
    { day: "Thu", sales: 14000, orders: 48, expenses: 8500 },
    { day: "Fri", sales: 22000, orders: 73, expenses: 13000 },
    { day: "Sat", sales: 28000, orders: 89, expenses: 16000 },
    { day: "Sun", sales: 25000, orders: 78, expenses: 14500 },
  ];

  const monthlyData = [
    { month: "Jan", sales: 45000, profit: 15000 },
    { month: "Feb", sales: 52000, profit: 18000 },
    { month: "Mar", sales: 48000, profit: 16000 },
    { month: "Apr", sales: 61000, profit: 22000 },
    { month: "May", sales: 68000, profit: 25000 },
    { month: "Jun", sales: 72000, profit: 28000 },
  ];

  const popularItems = [
    { name: "Vada Pav", sales: 45, color: "#FF6B35" },
    { name: "Dosa", sales: 38, color: "#F7931E" },
    { name: "Chai", sales: 62, color: "#FFD23F" },
    { name: "Samosa", sales: 28, color: "#06FFA5" },
    { name: "Pani Puri", sales: 35, color: "#3D5AF1" },
  ];

  const metrics = [
    {
      title: "Total Revenue",
      value: "₹1,34,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "This month"
    },
    {
      title: "Total Orders",
      value: "346",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "This month"
    },
    {
      title: "Daily Customers",
      value: "67",
      change: "-2.1%",
      trend: "down", 
      icon: Users,
      description: "Average"
    },
    {
      title: "Profit Margin",
      value: "38.5%",
      change: "+3.2%",
      trend: "up",
      icon: Target,
      description: "This month"
    }
  ];

  const achievements = [
    {
      title: "Best Week Ever!",
      description: "Highest sales in a single week",
      date: "2 days ago",
      type: "sales"
    },
    {
      title: "Customer Favorite",
      description: "Vada Pav reached 100+ orders",
      date: "1 week ago",
      type: "product"
    },
    {
      title: "Efficiency Master",
      description: "Reduced waste by 15%",
      date: "2 weeks ago",
      type: "efficiency"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Business Analytics</h1>
            <p className="text-muted-foreground">
              Track your performance and identify growth opportunities
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 3 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-soft transition-smooth">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="flex items-center space-x-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-accent" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.trend === "up" ? "text-accent" : "text-destructive"
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {metric.description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Sales */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Weekly Performance</CardTitle>
              <CardDescription>Sales vs Expenses over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `₹${value?.toLocaleString()}`, 
                      name === 'sales' ? 'Sales' : 'Expenses'
                    ]}
                  />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" name="sales" />
                  <Bar dataKey="expenses" fill="hsl(var(--accent))" name="expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Popular Items */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Top Items</CardTitle>
              <CardDescription>Most popular items this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={popularItems}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="sales"
                  >
                    {popularItems.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} orders`, 'Sales']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {popularItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.sales}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Growth</CardTitle>
              <CardDescription>Sales and profit trends over 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value?.toLocaleString()}`, 'Amount']} />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Recent Achievements
              </CardTitle>
              <CardDescription>Your business milestones and successes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-warm rounded-lg">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">
                        {achievement.description}
                      </p>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <Card className="mt-8 border-2 bg-gradient-warm">
          <CardHeader>
            <CardTitle className="text-foreground">📊 AI-Powered Insights</CardTitle>
            <CardDescription>Smart recommendations based on your data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">🎯 Peak Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Your busiest time is 7-9 PM on weekends. Consider increasing inventory.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">📈 Growth Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Chai has highest profit margin (65%). Consider promoting it more.
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">💡 Cost Optimization</h4>
                <p className="text-sm text-muted-foreground">
                  Switch to bulk onion purchase to save ₹500/month on expenses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;