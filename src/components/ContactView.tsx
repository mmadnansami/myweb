import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Send, 
  ArrowRight,
  LogIn,
  LogOut,
  User as UserIcon,
  MessageSquareCode,
  ShieldCheck,
  Globe,
  MapPin
} from "lucide-react";
import { auth, signInWithGoogle, logout, addGuestbookMessage, getGuestbookMessages, GuestbookMessage } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function ContactView() {
  // Auth User State
  const [user, setUser] = useState<User | null>(null);
  
  // Guestbook Board State
  const [guestbookList, setGuestbookList] = useState<GuestbookMessage[]>([]);
  const [newGuestbookMsg, setNewGuestbookMsg] = useState("");
  const [guestbookLoading, setGuestbookLoading] = useState(true);
  const [guestbookSubmitting, setGuestbookSubmitting] = useState(false);
  const [guestbookError, setGuestbookError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to Auth State
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Load Guestbook messages
    loadMessages();

    return () => unsubscribe();
  }, []);

  const loadMessages = async () => {
    setGuestbookLoading(true);
    try {
      const msgs = await getGuestbookMessages();
      setGuestbookList(msgs);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setGuestbookLoading(false);
    }
  };

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setGuestbookError("Please sign in with Google first to leave a message.");
      return;
    }
    if (!newGuestbookMsg.trim()) return;

    setGuestbookSubmitting(true);
    setGuestbookError(null);

    try {
      await addGuestbookMessage(
        user.displayName || "Anonymous",
        user.email || "",
        newGuestbookMsg.trim(),
        user.photoURL || ""
      );
      setNewGuestbookMsg("");
      // Reload messages list
      await loadMessages();
    } catch (err: any) {
      console.error("Failed to post message:", err);
      setGuestbookError("Failed to save your message. Please try again.");
    } finally {
      setGuestbookSubmitting(false);
    }
  };

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingCompany, setBookingCompany] = useState("");
  const [bookingService, setBookingService] = useState("All three");
  const [bookingDateTime, setBookingDateTime] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  
  // Quick Message State
  const [quickName, setQuickName] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickSubject, setQuickSubject] = useState("");
  const [quickMessage, setQuickMessage] = useState("");

  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  // Constants
  const CONTACT_EMAIL = "muttakiadnansami@gmail.com";
  const CONTACT_WHATSAPP = "+8801317680620";

  // Handle Book a Meeting - Email Route
  const handleBookingEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) {
      alert("Please fill in the required fields: Your name and Email.");
      return;
    }

    const emailSubject = `Discovery Call Request - ${bookingName}`;
    const emailBody = `Hi Muttaki,

I would like to book a discovery call with you.

Details:
- Name: ${bookingName}
- Email: ${bookingEmail}
- Phone: ${bookingPhone || "Not provided"}
- Company: ${bookingCompany || "Not provided"}
- Service of interest: ${bookingService}
- Preferred Date/Time: ${bookingDateTime || "Not provided"}

Project details:
${bookingMessage || "Not provided"}

Best regards,
${bookingName}`;

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    setBookingSubmitted(true);
  };

  // Handle Book a Meeting - WhatsApp Route
  const handleBookingWhatsApp = () => {
    if (!bookingName || !bookingEmail) {
      alert("Please fill in the required fields: Your name and Email.");
      return;
    }

    const wsText = `Assalamu Alaikum Muttaki, I'd like to book a call:
- *Name*: ${bookingName}
- *Email*: ${bookingEmail}
- *Company*: ${bookingCompany || "Not provided"}
- *Service*: ${bookingService}
- *Preferred Date/Time*: ${bookingDateTime || "Not provided"}
- *Project*: ${bookingMessage || "None"}`;

    const waUrl = `https://wa.me/8801317680620?text=${encodeURIComponent(wsText)}`;
    window.open(waUrl, "_blank");
    setBookingSubmitted(true);
  };

  // Handle Quick Message Send
  const handleQuickMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickEmail || !quickMessage) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailSubject = `Quick Message: ${quickSubject || "Inquiry from website"}`;
    const emailBody = `Hi Muttaki,

You received a quick message from your website contact form.

- Sender: ${quickName}
- Email: ${quickEmail}

Message:
${quickMessage}

Best regards,
${quickName}`;

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    setQuickSubmitted(true);
  };

  return (
    <div id="contact-view" className="space-y-16 py-8">
      
      {/* Hero Header */}
      <section id="contact-hero" className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest text-purple-200 uppercase font-semibold">
            GET IN TOUCH
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Let's build your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            AI-directed brand world.
          </span>
        </h1>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Book a discovery call by email or send it straight to my WhatsApp. I personally read and reply to every inquiry within 24 hours.
        </p>
      </section>

      {/* Grid split: direct contacts vs booking form */}
      <section id="contact-content" className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Direct contacts */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Direct Channels</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              If you prefer to bypass forms, feel free to contact me directly through these official accounts.
            </p>

            <div className="space-y-4 pt-2">
              {/* Email item */}
              <a 
                id="direct-channel-email"
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-purple-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICIAL EMAIL</span>
                  <span className="text-sm font-semibold text-zinc-200 block truncate group-hover:text-white">{CONTACT_EMAIL}</span>
                </div>
              </a>

              {/* WhatsApp item */}
              <a 
                id="direct-channel-whatsapp"
                href={`https://wa.me/8801317680620`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">WHATSAPP DIRECT</span>
                  <span className="text-sm font-semibold text-zinc-200 block group-hover:text-white">+880 1317 680620</span>
                </div>
              </a>

              {/* Phone item */}
              <a 
                id="direct-channel-phone"
                href="tel:+8801317680620"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">DIRECT PHONE LINE</span>
                  <span className="text-sm font-semibold text-zinc-200 block group-hover:text-white">+880 1317 680620</span>
                </div>
              </a>

              {/* Office Address Location item */}
              <div 
                id="direct-channel-location"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-pink-500/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">OFFICE ADDRESS</span>
                  <span className="text-sm font-semibold text-zinc-200 block group-hover:text-white">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>RESPONSE TIME</span>
              <span className="text-emerald-400 font-bold">&lt; 24 HOURS</span>
            </div>
          </div>

          {/* Quick Message Form Card */}
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <h2 className="font-display text-xl font-bold text-white">Send a Quick Message</h2>
            
            {quickSubmitted ? (
              <div className="p-6 rounded-xl bg-purple-950/10 border border-purple-500/20 text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto" />
                <h3 className="font-display font-bold text-sm text-white">Message formatted!</h3>
                <p className="text-xs text-zinc-400">Opening your email application to dispatch the inquiry. Thank you!</p>
                <button 
                  id="reset-quick-form"
                  onClick={() => setQuickSubmitted(false)}
                  className="text-xs font-semibold text-purple-400 underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form id="quick-message-form" onSubmit={handleQuickMessage} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">YOUR NAME *</label>
                    <input 
                      id="quick-input-name"
                      type="text" 
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Adnan" 
                      className="w-full p-3 rounded-lg text-sm glass-input text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">EMAIL *</label>
                    <input 
                      id="quick-input-email"
                      type="email" 
                      required
                      value={quickEmail}
                      onChange={(e) => setQuickEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full p-3 rounded-lg text-sm glass-input text-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">SUBJECT</label>
                  <input 
                    id="quick-input-subject"
                    type="text" 
                    value={quickSubject}
                    onChange={(e) => setQuickSubject(e.target.value)}
                    placeholder="Project Inquiry" 
                    className="w-full p-3 rounded-lg text-sm glass-input text-zinc-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">MESSAGE *</label>
                  <textarea 
                    id="quick-input-message"
                    required
                    rows={4}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Tell me what you'd like to build..." 
                    className="w-full p-3 rounded-lg text-sm glass-input text-zinc-100"
                  />
                </div>

                <button
                  id="quick-send-btn"
                  type="submit"
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right column: Book a meeting form */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                Book a Discovery Call
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Please complete the briefing sheet below. The system will format a high-fidelity brief ready to dispatch directly via email or instantly sync onto WhatsApp for live scheduling.
              </p>
            </div>

            {bookingSubmitted ? (
              <div className="p-8 rounded-2xl bg-purple-950/15 border border-purple-500/20 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-purple-400 mx-auto" />
                <h3 className="font-display font-bold text-lg text-white">Discovery Call brief prepared!</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                  By the grace of Allah, your brief is formatted. Muttaki will review it and reply inside 24 hours. Let's build something beautiful!
                </p>
                <button 
                  id="reset-booking-form"
                  onClick={() => setBookingSubmitted(false)}
                  className="text-sm font-semibold text-purple-400 underline cursor-pointer"
                >
                  Prepare another scheduling brief
                </button>
              </div>
            ) : (
              <form id="booking-form" onSubmit={handleBookingEmail} className="space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Your Name *</label>
                    <input 
                      id="booking-input-name"
                      type="text" 
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Muttaki Adnan" 
                      className="w-full p-3 rounded-lg text-sm glass-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Email Address *</label>
                    <input 
                      id="booking-input-email"
                      type="email" 
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="name@company.com" 
                      className="w-full p-3 rounded-lg text-sm glass-input"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Phone (optional)</label>
                    <input 
                      id="booking-input-phone"
                      type="tel" 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834" 
                      className="w-full p-3 rounded-lg text-sm glass-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Company (optional)</label>
                    <input 
                      id="booking-input-company"
                      type="text" 
                      value={bookingCompany}
                      onChange={(e) => setBookingCompany(e.target.value)}
                      placeholder="Starlight Tech" 
                      className="w-full p-3 rounded-lg text-sm glass-input"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Service interested in</label>
                    <select 
                      id="booking-select-service"
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full p-3 rounded-lg text-sm glass-input bg-zinc-950 focus:border-purple-500/50 cursor-pointer"
                    >
                      <option value="AI Creative Direction">AI Creative Direction</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Growth Strategy">Growth Strategy</option>
                      <option value="All three">All three pillars</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Preferred date / time</label>
                    <input 
                      id="booking-input-datetime"
                      type="text" 
                      value={bookingDateTime}
                      onChange={(e) => setBookingDateTime(e.target.value)}
                      placeholder="e.g. Wednesday 3pm EST" 
                      className="w-full p-3 rounded-lg text-sm glass-input"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Tell me about your project</label>
                  <textarea 
                    id="booking-input-message"
                    rows={5}
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    placeholder="Briefly describe your objectives, existing stack, and expected outcomes..." 
                    className="w-full p-3 rounded-lg text-sm glass-input"
                  />
                </div>

                {/* Dispatch Actions split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <button
                    id="booking-send-email-btn"
                    type="submit"
                    className="py-4 rounded-xl bg-white hover:bg-zinc-100 text-black font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </button>
                  <button
                    id="booking-send-whatsapp-btn"
                    type="button"
                    onClick={handleBookingWhatsApp}
                    className="py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send to WhatsApp
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </section>

      {/* FIREBASE GUESTBOOK & COLLABORATION BOARD */}
      <section id="contact-guestbook" className="max-w-7xl mx-auto px-4 mt-20 pt-16 border-t border-zinc-900 space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-purple-300 uppercase font-semibold">
              LIVE COLLABORATORS BOARD
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Leave a note on Adnan's project board.
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Sign in with Google to securely authorize your identity and pin your message or feedback to our live Firestore database.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Guestbook input column */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 space-y-6">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <MessageSquareCode className="w-5 h-5 text-purple-400" />
              Write a message
            </h3>

            {user ? (
              <form id="firebase-guestbook-form" onSubmit={handleGuestbookSubmit} className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 glow-purple shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-xs text-zinc-400">
                        <UserIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.displayName}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">YOUR NOTE</label>
                  <textarea
                    id="guestbook-input"
                    rows={4}
                    required
                    maxLength={280}
                    value={newGuestbookMsg}
                    onChange={(e) => setNewGuestbookMsg(e.target.value)}
                    placeholder="Type your feedback, advice, greeting, or project idea here (max 280 characters)..."
                    className="w-full p-3.5 rounded-xl text-sm glass-input text-zinc-100"
                  />
                </div>

                {guestbookError && (
                  <p className="text-xs text-red-400 font-sans">{guestbookError}</p>
                )}

                <button
                  id="guestbook-submit-btn"
                  type="submit"
                  disabled={guestbookSubmitting || !newGuestbookMsg.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {guestbookSubmitting ? "Posting..." : "Post to Board"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 px-4 space-y-4 rounded-2xl bg-zinc-900/20 border border-dashed border-zinc-800">
                <ShieldCheck className="w-10 h-10 text-zinc-600 mx-auto" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-300">Identity Authorization Required</p>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                    To prevent spam, you must authenticate securely via official Google Sign-in to post a note.
                  </p>
                </div>
                <button
                  id="guestbook-auth-btn"
                  onClick={signInWithGoogle}
                  className="py-3 px-6 rounded-xl bg-white hover:bg-zinc-100 text-black font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In with Google
                </button>
              </div>
            )}
          </div>

          {/* Guestbook display board column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white">Live Feed ({guestbookList.length})</h3>
              <button
                id="guestbook-refresh-btn"
                onClick={loadMessages}
                className="text-[11px] font-mono text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 px-2.5 py-1 rounded-md bg-zinc-900/40 transition-colors cursor-pointer"
              >
                Refresh Board
              </button>
            </div>

            {guestbookLoading ? (
              <div className="flex items-center justify-center py-16 text-zinc-500 gap-2 font-mono text-xs">
                <span className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                Synchronizing with Firestore...
              </div>
            ) : guestbookList.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-zinc-900/10 border border-zinc-900 text-zinc-500 text-xs font-mono">
                No notes pinned yet. Be the first to leave a message!
              </div>
            ) : (
              <div id="guestbook-messages-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {guestbookList.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-4 hover:-translate-y-0.5 duration-200"
                  >
                    <p className="text-zinc-300 text-sm leading-relaxed italic font-sans break-words">
                      "{msg.message}"
                    </p>
                    <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-800/40">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
                        {msg.photoURL ? (
                          <img src={msg.photoURL} alt={msg.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 uppercase">
                            {msg.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-zinc-200 block truncate leading-tight uppercase">
                          {msg.name}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Verified Collaborator
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
