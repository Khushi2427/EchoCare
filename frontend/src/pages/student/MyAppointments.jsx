import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isPast, parseISO } from "date-fns";
import { getUserAppointments } from "../../services/appointmentService";

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { 
  Calendar, 
  Clock, 
  Phone, 
  Video, 
  MessageSquare, 
  MoreVertical,
  CalendarCheck2,
  AlertCircle,
  ExternalLink
} from "lucide-react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAppointments()
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const upcoming = appointments.filter(a => !isPast(parseISO(a.date)));
  const history = appointments.filter(a => isPast(parseISO(a.date)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const AppointmentCard = ({ a }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card className="group hover:shadow-md transition-all duration-200 border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Status & Time */}
          <div className="md:w-48 bg-slate-50 p-6 flex flex-col justify-center items-center border-r border-slate-100 text-center">
            <Badge className={cn("mb-3 capitalize font-semibold shadow-sm", getStatusColor(a.status))}>
              {a.status || "Scheduled"}
            </Badge>
            <p className="text-sm font-bold text-slate-900">{format(parseISO(a.date), "EEE, MMM do")}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {a.timeSlot}
            </p>
          </div>

          {/* Right Side: Details */}
          <CardContent className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src={a.counsellorId?.profilePic} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {a.counsellorId?.name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-none">
                    {a.counsellorId?.name || "Counsellor Removed"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 italic capitalize">
                    {a.meetingType || "Voice Call"} Session
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {a.counsellorId?.phone && (
                  <Button variant="outline" size="icon" asChild className="rounded-full">
                    <a href={`tel:${a.counsellorId.phone}`} title="Call">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                   <Video className="w-4 h-4" />
                   <span>Join Meeting</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <MessageSquare className="w-4 h-4" />
                   <span>Chat</span>
                </div>
              </div>
              
              <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                View Details <ExternalLink className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled therapy sessions and history.</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-2xl">
          <CalendarCheck2 className="w-8 h-8 text-primary" />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 bg-slate-100 p-1">
          <TabsTrigger value="upcoming" className="rounded-lg data-[state=active]:shadow-sm">
            Upcoming <Badge variant="secondary" className="ml-2 px-1.5 py-0">{upcoming.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg data-[state=active]:shadow-sm">
            Past Sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <AnimatePresence>
            {upcoming.length > 0 ? (
              upcoming.map((a) => <AppointmentCard key={a._id} a={a} />)
            ) : (
              <NoAppointments message="No upcoming sessions found." />
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <AnimatePresence>
            {history.length > 0 ? (
              history.map((a) => <AppointmentCard key={a._id} a={a} />)
            ) : (
              <NoAppointments message="You haven't had any sessions yet." />
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Helper Footer */}
      <div className="mt-12 p-4 border border-dashed border-slate-300 rounded-xl flex items-start gap-3 bg-slate-50/50">
        <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
        <p className="text-sm text-slate-500">
          Need to reschedule? Please contact your counsellor at least 24 hours in advance. 
          Session links will appear 5 minutes before the start time.
        </p>
      </div>
    </div>
  );
};

const NoAppointments = ({ message }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="text-center py-20 border-2 border-dashed rounded-2xl border-slate-200"
  >
    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
      <Calendar className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-medium text-slate-900">{message}</h3>
    <Button variant="link" className="mt-2 text-primary">Browse available counsellors</Button>
  </motion.div>
);

// Helper for Tailwind Class Merging (if not already in your project)
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export default MyAppointments;