import React from "react";
import { 
  Users, GraduationCap, Landmark, BookOpen, ClipboardCheck, DollarSign,
  MoreVertical, Eye, Edit, Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/layout/Layout";

interface StatCardData {
  name: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Teacher' | 'Admin';
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string | null;
}

const statsData: StatCardData[] = [
  { name: "Total Users", value: "1,245", change: "+12%", icon: Users, color: "text-blue-600" },
  { name: "Active Courses", value: "89", change: "+5%", icon: GraduationCap, color: "text-green-600" },
  { name: "Mock Tests", value: "156", change: "+8%", icon: ClipboardCheck, color: "text-purple-600" },
  { name: "Revenue", value: "$45,230", change: "+15%", icon: DollarSign, color: "text-orange-600" },
];

const recentUsers: User[] = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", role: "Student", status: "Active", avatar: null },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", role: "Student", status: "Active", avatar: null },
  { id: 3, name: "Amit Patel", email: "amit@example.com", role: "Teacher", status: "Active", avatar: null },
  { id: 4, name: "Neha Gupta", email: "neha@example.com", role: "Student", status: "Inactive", avatar: null },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", role: "Student", status: "Active", avatar: null },
];
 
const MobileStatCard: React.FC<{ stat: StatCardData }> = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
          <p className="text-lg font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
        </div>
        <Icon className={`h-6 w-6 ${stat.color} mt-1`} />
      </div>
    </Card>
  );
};
 
const MobileUserCard: React.FC<{ user: User; onAction: (action: string, id: number) => void }> = ({ user, onAction }) => (
  <Card className="p-4 mb-3 last:mb-0">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10 flex-shrink-0">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="text-xs">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          <Badge variant={user.role === "Teacher" ? "secondary" : "default"} className="text-xs px-2 py-0.5">
            {user.role}
          </Badge>
          <Badge variant={user.status === "Active" ? "default" : "secondary"} className="text-xs px-2 py-0.5">
            {user.status}
          </Badge>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onAction("view", user.id)}>
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("edit", user.id)}>
            <Edit className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={() => onAction("delete", user.id)}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Card>
);
 
export default function AdminDashboard() {
  // const [searchTerm, setSearchTerm] = useState<string>("");
 
  // const filteredUsers = recentUsers.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleAction = (action: string, userId: number) => {
    console.log(action, userId);
    
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6  mt-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => (
            <MobileStatCard key={index} stat={stat} />
          ))}
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <CardTitle className="text-base sm:text-lg">Recent Users</CardTitle>
                {/* <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Search users..."
                    className="h-9 w-full sm:w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline" size="sm" className="flex-shrink-0 min-w-[80px] sm:min-w-0">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div> */}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Mobile: Cards */}
              <div className="lg:hidden space-y-3">
                {recentUsers.map((user) => (
                  <MobileUserCard key={user.id} user={user} onAction={handleAction} />
                ))}
              </div>
              
              {/* Desktop: Table */}
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                              <AvatarFallback>
                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="hidden sm:inline">{user.name}</span>
                            <span className="sm:hidden truncate">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Teacher" ? "secondary" : "default"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleAction("view", user.id)}>
                                <Eye className="w-4 h-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("edit", user.id)}>
                                <Edit className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => handleAction("delete", user.id)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your platform efficiently
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2 sm:space-y-4">
              {[
                { icon: GraduationCap, label: "Create Course" },
                { icon: Landmark, label: "New Exam" },
                { icon: ClipboardCheck, label: "Mock Test" },
                { icon: BookOpen, label: "Upload Book" },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    className="w-full justify-start gap-2 h-10 sm:h-auto py-2 sm:py-3"
                    variant="outline"
 
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{action.label}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
 
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Platform Overview</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 sm:pb-6">
            {/* Mobile: Cards */}
            <div className="lg:hidden space-y-3">
              {[
                { category: "Courses", total: 89, active: 75, pending: 14, revenue: "$12,500" },
                { category: "Govt. Exams", total: 45, active: 40, pending: 5, revenue: "$8,200" },
                { category: "Prof. Courses", total: 23, active: 20, pending: 3, revenue: "$15,300" },
                { category: "Mock Tests", total: 156, active: 142, pending: 14, revenue: "$9,230" },
              ].map((row, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{row.category}</p>
                      <p className="text-xs text-muted-foreground">Total: {row.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${row.revenue}</p>
                      <p className="text-xs text-muted-foreground">Active: {row.active}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Desktop: Table */}
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { category: "Courses", total: 89, active: 75, pending: 14, revenue: "$12,500" },
                    { category: "Govt. Exams", total: 45, active: 40, pending: 5, revenue: "$8,200" },
                    { category: "Prof. Courses", total: 23, active: 20, pending: 3, revenue: "$15,300" },
                    { category: "Mock Tests", total: 156, active: 142, pending: 14, revenue: "$9,230" },
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.category}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>{row.active}</TableCell>
                      <TableCell>{row.pending}</TableCell>
                      <TableCell className="text-right font-medium">{row.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}