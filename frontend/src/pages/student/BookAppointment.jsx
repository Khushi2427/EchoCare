import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import { bookAppointment } from "../../services/appointmentService";

// Shadcn UI Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Phone, 
  ChevronLeft, 
  CheckCircle2,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const BookAppointment = () => {
  const { counsellorId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("");
  const [meetingType, setMeetingType] = useState("call");
  const [loading, setLoading] = useState(false);

  // Example slots - you could also fetch these from your API
  const timeSlots = ["10:00 - 10:30", "11:00 - 11:30", "16:00 - 16:30"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    setLoading(true);
    try {
      await bookAppointment({
        counsellorId,
        date: format(date, "yyyy-MM-dd"),
        timeSlot,
        meetingType,
      });
      
      toast.success("Appointment booked successfully!", {
        description: `${format(date, "PPP")} at ${timeSlot}`,
      });
      navigate("/student/appointments");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 group text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Counsellors
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-none shadow-xl ring-1 ring-slate-200">
            <CardHeader className="space-y-1 bg-slate-900 text-white rounded-t-xl py-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Book Your Session</CardTitle>
                  <CardDescription className="text-slate-400">
                    All sessions are private and confidential
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* 1. Meeting Type Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    1. Select Consultation Mode
                  </Label>
                  <RadioGroup 
                    value={meetingType} 
                    onValueChange={setMeetingType}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="call" id="call" className="peer sr-only" />
                      <Label
                        htmlFor="call"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <Phone className="mb-2 h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-sm">Voice Call</span>
                      </Label>
                    </div>
                    {/* <div>
                      <RadioGroupItem value="video" id="video" className="peer sr-only" />
                      <Label
                        htmlFor="video"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <Video className="mb-2 h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold text-sm">Video Meet</span>
                      </Label>
                    </div> */}
                  </RadioGroup>
                </div>

                <Separator />

                {/* 2. Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      2. Choose Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border shadow-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      3. Select Time Slot
                    </Label>
                    <ScrollArea className="h-[280px] w-full rounded-md">
                      <div className="space-y-2 pr-4">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={timeSlot === slot ? "default" : "outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal h-12 px-4",
                              timeSlot === slot && "ring-2 ring-primary ring-offset-1"
                            )}
                            onClick={() => setTimeSlot(slot)}
                          >
                            <Clock className="mr-2 h-4 w-4 opacity-50" />
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 p-6 md:p-8 border-t rounded-b-xl flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Your data is protected by end-to-end encryption.
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold" 
                  disabled={loading || !timeSlot}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Confirm Appointment
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;