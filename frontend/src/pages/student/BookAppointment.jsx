import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import { bookAppointment } from "../../services/appointmentService";

// Icons
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Phone, 
  ChevronLeft, 
  CheckCircle2,
  ShieldCheck,
  Heart
} from "lucide-react";

/* ── Google Fonts ── */
(() => {
  if (document.getElementById("echocare-fonts")) return;
  const l = document.createElement("link");
  l.id = "echocare-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Global CSS ── */
(() => {
  if (document.getElementById("echocare-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-css";
  s.textContent = `
    :root {
      --sage: #6B9E6B;
      --sage-hover: #598559;
      --sage-light: #EEF5EE;
      --sage-mid: #B8D4B8;
      --cream: #FAFAF7;
      --warm: #F6F0E8;
      --charcoal: #1A1A1A;
      --charcoal-2: #2C2C2C;
      --charcoal-3: #3E3E3E;
      --body: #4A4A4A;
      --muted: #7A7A7A;
      --light-muted: #A0A0A0;
      --border: rgba(0,0,0,0.08);
      --border-light: rgba(0,0,0,0.05);
      --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
      --r-sm: 14px;
      --r-md: 20px;
      --r-lg: 28px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    .serif { font-family: 'Cormorant Garamond', serif; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--charcoal); color: #fff;
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .btn-sage:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input, button, textarea, select {
      font-family: 'Outfit', sans-serif;
    }
    .calendar-day {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .calendar-day:hover {
      background: var(--sage-light);
      color: var(--sage);
    }
    .calendar-day.selected {
      background: var(--sage);
      color: #fff;
    }
    .calendar-day.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Simple Calendar component since we're removing shadcn/ui dependency
const SimpleCalendar = ({ mode, selected, onSelect, disabled }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentMonth.getMonth() && 
           today.getFullYear() === currentMonth.getFullYear();
  };

  const isSelected = (day) => {
    if (!selected) return false;
    return selected.getDate() === day && 
           selected.getMonth() === currentMonth.getMonth() && 
           selected.getFullYear() === currentMonth.getFullYear();
  };

  const isDisabled = (day) => {
    if (!disabled) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return disabled(date);
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      {/* Calendar Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          onClick={prevMonth}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "transparent",
            cursor: "pointer",
            color: "var(--body)"
          }}
        >
          ←
        </button>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: "var(--charcoal)" }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={nextMonth}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "transparent",
            cursor: "pointer",
            color: "var(--body)"
          }}
        >
          →
        </button>
      </div>

      {/* Weekday Headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} style={{ height: 36 }} />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              onClick={() => !disabled && onSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
              disabled={disabled}
              className="calendar-day"
              style={{
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                background: selected ? "var(--sage)" : today ? "var(--sage-light)" : "transparent",
                color: selected ? "#fff" : today ? "var(--sage)" : "var(--charcoal)",
                border: "none",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.3 : 1,
                fontWeight: selected || today ? 500 : 400
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

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
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      padding: "32px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -100 }} />
      <div className="blob" style={{ width: 300, height: 300, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: "600px", width: "100%", position: "relative", zIndex: 10 }}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost"
          style={{
            marginBottom: 24,
            padding: "8px 16px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13
          }}
        >
          <ChevronLeft size={16} style={{ transition: "transform 0.2s" }} />
          Back to Counsellors
        </button>

        <motion.div {...fadeUp(0)}>
          <div className="card" style={{ overflow: "hidden" }}>
            
            {/* Card Header */}
            <div style={{
              background: "var(--sage)",
              padding: "32px 24px",
              color: "#fff"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <CalendarIcon size={24} color="white" />
                </div>
                <div>
                  <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 4 }}>
                    Book Your Session
                  </h2>
                  <p style={{ fontSize: 13, opacity: 0.9 }}>
                    All sessions are private and confidential
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Card Content */}
              <div style={{ padding: "32px 24px" }}>
                
                {/* 1. Meeting Type Selection */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 16
                  }}>
                    1. Select Consultation Mode
                  </label>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {/* Voice Call Option */}
                    <div>
                      <input
                        type="radio"
                        id="call"
                        name="meetingType"
                        value="call"
                        checked={meetingType === "call"}
                        onChange={(e) => setMeetingType(e.target.value)}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="call"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          padding: "20px",
                          borderRadius: 12,
                          border: "2px solid",
                          borderColor: meetingType === "call" ? "var(--sage)" : "var(--border)",
                          background: meetingType === "call" ? "var(--sage-light)" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        <Phone size={20} color={meetingType === "call" ? "var(--sage)" : "var(--muted)"} />
                        <span style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: meetingType === "call" ? "var(--sage)" : "var(--charcoal)"
                        }}>
                          Voice Call
                        </span>
                      </label>
                    </div>

                    {/* Video Call Option (Commented out as in original) */}
                    {/* <div>
                      <input
                        type="radio"
                        id="video"
                        name="meetingType"
                        value="video"
                        checked={meetingType === "video"}
                        onChange={(e) => setMeetingType(e.target.value)}
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="video"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          padding: "20px",
                          borderRadius: 12,
                          border: "2px solid",
                          borderColor: meetingType === "video" ? "var(--sage)" : "var(--border)",
                          background: meetingType === "video" ? "var(--sage-light)" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        <Video size={20} color={meetingType === "video" ? "var(--sage)" : "var(--muted)"} />
                        <span style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: meetingType === "video" ? "var(--sage)" : "var(--charcoal)"
                        }}>
                          Video Meet
                        </span>
                      </label>
                    </div> */}
                  </div>
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />

                {/* 2. Date and Time Selection */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                  
                  {/* Date Selection */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 16
                    }}>
                      2. Choose Date
                    </label>
                    <SimpleCalendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 16
                    }}>
                      3. Select Time Slot
                    </label>
                    <div style={{
                      maxHeight: 280,
                      overflowY: "auto",
                      paddingRight: 8
                    }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            style={{
                              width: "100%",
                              padding: "12px 16px",
                              borderRadius: 8,
                              border: "1px solid",
                              borderColor: timeSlot === slot ? "var(--sage)" : "var(--border)",
                              background: timeSlot === slot ? "var(--sage-light)" : "transparent",
                              color: timeSlot === slot ? "var(--sage)" : "var(--body)",
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}
                          >
                            <Clock size={16} color={timeSlot === slot ? "var(--sage)" : "var(--muted)"} />
                            <span style={{ fontSize: 14 }}>{slot}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: "24px",
                background: "var(--cream)",
                borderTop: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <ShieldCheck size={14} color="var(--sage)" />
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    Your data is protected by end-to-end encryption.
                  </span>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: loading || !timeSlot ? "var(--muted)" : "var(--charcoal)",
                    cursor: loading || !timeSlot ? "not-allowed" : "pointer"
                  }}
                  disabled={loading || !timeSlot}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: "2px solid #fff",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BookAppointment;