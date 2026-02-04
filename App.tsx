
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Tag, 
  PlaneTakeoff, 
  PlaneLanding, 
  Utensils, 
  Backpack, 
  Luggage, 
  Baby,
  X,
  Info,
  ShieldAlert,
  MapPin
} from 'lucide-react';
import { FlightInfo, PaymentMethod } from './types';

// Utility to handle images for airlines
const AIRLINE_LOGOS = {
  GARUDA: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Garuda_Indonesia_Logo.svg/1200px-Garuda_Indonesia_Logo.svg.png",
  AIRASIA: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_Logo.svg/1200px-AirAsia_Logo.svg.png"
};

const Header: React.FC = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-50">
    <button className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 transition-transform active:scale-95">
      <ChevronLeft size={22} strokeWidth={2.5} />
    </button>
    <h1 className="text-lg font-bold text-gray-900 tracking-tight">Booking Summary</h1>
    <div className="w-10" />
  </header>
);

const FlightSegment: React.FC<{ info: FlightInfo; logo: string; type: 'departure' | 'return' }> = ({ info, logo, type }) => {
  const Icon = type === 'departure' ? PlaneTakeoff : PlaneLanding;
  
  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-50 rounded-lg text-orange-500">
            <Icon size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            {type === 'departure' ? 'Departure' : 'Return'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <img src={logo} alt={info.airline} className="h-3 object-contain grayscale brightness-50 opacity-60" />
          <span className="text-[10px] font-bold text-gray-300">{info.flightCode}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-1">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-900 tracking-tighter leading-none">{info.departureTime}</span>
          <span className="text-xs font-bold text-gray-500 mt-1">{info.departureCity}</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="h-[1.5px] flex-1 bg-gray-100 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-gray-900 tracking-tighter leading-none">{info.arrivalTime}</span>
          <span className="text-xs font-bold text-gray-500 mt-1">{info.arrivalCity}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400 tracking-wide mt-2">
        <span>{info.date}</span>
        <div className="flex items-center gap-1">
          <Clock size={10} />
          <span>{info.duration}</span>
        </div>
      </div>
    </div>
  );
};

const RulesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="w-full h-1.5 flex justify-center mt-3">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>
        
        <div className="px-6 pt-4 pb-10 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Rules & Info</h2>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-400">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <div className="flex items-center gap-2 mb-3 text-orange-500">
                <ShieldAlert size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Fare Rules</h3>
              </div>
              <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Cancellation Fee</span>
                  <span className="font-bold text-gray-800">Rp 500.000 / pax</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Reschedule Fee</span>
                  <span className="font-bold text-gray-800">Rp 200.000 + Fare Diff</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Refundable</span>
                  <span className="font-bold text-green-600">Yes (Partial)</span>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3 text-blue-500">
                <MapPin size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Transit Information</h3>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs text-gray-600 leading-relaxed">
                  Both flights GA880 and QZ202 are <span className="font-bold text-gray-800">Direct Flights</span>. No layovers or aircraft changes are scheduled for this itinerary. Please arrive at the airport 3 hours before departure for international document verification.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3 text-purple-500">
                <Info size={18} />
                <h3 className="text-sm font-bold uppercase tracking-wider">Baggage Policy</h3>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 shrink-0" />
                  <span>Liquid, Aerosol and Gel (LAG) must be in containers of max 100ml.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1 shrink-0" />
                  <span>Powerbanks must be under 20.000 mAh and carried in cabin baggage only.</span>
                </div>
              </div>
            </section>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-8 py-4 bg-black text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

const SlideToPay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [sliderPos, setSliderPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const containerWidth = 340; 
  const thumbWidth = 56;
  const maxTravel = containerWidth - thumbWidth - 8;

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX - sliderPos);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let newX = clientX - startX;
    newX = Math.max(0, Math.min(newX, maxTravel));
    setSliderPos(newX);
  };

  const handleEnd = () => {
    if (sliderPos > maxTravel * 0.9) {
      setSliderPos(maxTravel);
      onComplete();
    } else {
      setSliderPos(0);
    }
    setIsDragging(false);
  };

  return (
    <div 
      className="relative h-14 bg-black rounded-full flex items-center px-1.5 select-none overflow-hidden transition-all active:scale-[0.98]"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white font-bold text-sm tracking-wide">
          Slide to pay <span className="opacity-40">>>></span>
        </span>
      </div>
      <div
        className={`w-11 h-11 bg-white rounded-full flex items-center justify-center text-black shadow-md cursor-grab active:cursor-grabbing transition-transform ${isDragging ? '' : 'transition-all duration-300'}`}
        style={{ transform: `translateX(${sliderPos}px)` }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <ChevronRight size={20} strokeWidth={3} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethod.CREDIT_DEBIT);
  const [isPassengerExpanded, setIsPassengerExpanded] = useState(false);
  const [isPriceExpanded, setIsPriceExpanded] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Static payment deadline information
  const paymentDeadline = "Fri, 3 Oct 2025, 08:30 AM";

  const outboundInfo: FlightInfo = {
    airline: "Garuda Indonesia",
    flightCode: "GA880",
    departureTime: "10:00",
    departureCity: "DPS",
    departureTerminal: "T1",
    arrivalTime: "13:30",
    arrivalCity: "BKK",
    arrivalTerminal: "T2",
    date: "Fri, 3 Oct 2025",
    duration: "3h 30m",
    logo: ""
  };

  const returnInfo: FlightInfo = {
    airline: "AirAsia",
    flightCode: "QZ202",
    departureTime: "18:00",
    departureCity: "BKK",
    departureTerminal: "T1",
    arrivalTime: "22:00",
    arrivalCity: "CGK",
    arrivalTerminal: "",
    date: "Wed, 5 Nov 2025",
    duration: "4h 00m",
    logo: ""
  };

  const passengers = [
    { 
      name: 'Reviana L', 
      type: 'Adult',
      outbound: { cabin: '7kg', checked: '20kg', service: 'Standard Meal' },
      inbound: { cabin: '7kg', checked: '25kg', service: 'Premium Meal' }
    },
    { 
      name: 'Mayang S', 
      type: 'Adult',
      outbound: { cabin: '7kg', checked: '20kg', service: 'Standard Meal' },
      inbound: { cabin: '7kg', checked: '25kg', service: 'Standard Meal' }
    },
    { 
      name: 'Dimas P', 
      type: 'Child',
      outbound: { cabin: '7kg', checked: '20kg', service: 'No Meal' },
      inbound: { cabin: '7kg', checked: '20kg', service: 'No Meal' }
    },
    { 
      name: 'Anisa K', 
      type: 'Child',
      outbound: { cabin: '7kg', checked: '20kg', service: 'Snack Box' },
      inbound: { cabin: '7kg', checked: '25kg', service: 'Premium Meal' }
    },
    { 
      name: 'Rizky O', 
      type: 'Infant',
      outbound: { cabin: '-', checked: '-', service: 'Baby Food' },
      inbound: { cabin: '-', checked: '-', service: 'Baby Food' }
    }
  ];

  const adultCount = passengers.filter(p => p.type === 'Adult').length;
  const childCount = passengers.filter(p => p.type === 'Child').length;
  const infantCount = passengers.filter(p => p.type === 'Infant').length;
  
  const passengerSummaryText = [
    adultCount > 0 ? `${adultCount} Adult${adultCount > 1 ? 's' : ''}` : null,
    childCount > 0 ? `${childCount} Child${childCount > 1 ? 'ren' : ''}` : null,
    infantCount > 0 ? `${infantCount} Infant${infantCount > 1 ? 's' : ''}` : null
  ].filter(Boolean).join(', ');

  const renderBaggageDetails = (p: typeof passengers[0], segment: 'outbound' | 'inbound') => {
    const details = segment === 'outbound' ? p.outbound : p.inbound;
    if (p.type === 'Infant') {
      return (
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 italic">
          <Baby size={12} />
          <span>No baggage allowance</span>
        </div>
      );
    }
    return (
      <>
        <div className="flex items-center gap-1">
          <Backpack size={12} className="text-gray-400" />
          <span>Cabin: {details.cabin}</span>
        </div>
        <div className="flex items-center gap-1">
          <Luggage size={12} className="text-gray-400" />
          <span>Checked: {details.checked}</span>
        </div>
      </>
    );
  };

  const getPassengerTypeStyle = (type: string) => {
    switch(type) {
      case 'Child': return 'text-blue-500/80 bg-blue-50';
      case 'Infant': return 'text-purple-500/80 bg-purple-50';
      default: return 'text-orange-500/80 bg-orange-50';
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl shadow-green-100">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-8 max-w-[240px]">Your payment has been received. Your e-ticket is being processed.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-black text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          View E-Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col antialiased pb-10">
      <Header />

      <main className="flex-1 px-5 pt-4 pb-40">
        {/* Card 1: Flight Summary */}
        <div className="bg-white rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 mb-4 overflow-hidden">
          <div className="p-6">
            <FlightSegment info={outboundInfo} logo={AIRLINE_LOGOS.GARUDA} type="departure" />
            <div className="my-2 border-t border-dashed border-gray-100" />
            <FlightSegment info={returnInfo} logo={AIRLINE_LOGOS.AIRASIA} type="return" />
            <button 
              onClick={() => setIsRulesModalOpen(true)}
              className="mt-4 w-full text-center text-[10px] font-black text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-[0.1em] active:scale-95"
            >
              View detailed rules & transit info >
            </button>
          </div>
        </div>

        {/* Card 2: Passengers & Baggage */}
        <button 
          onClick={() => setIsPassengerExpanded(!isPassengerExpanded)}
          className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mb-3 px-5 py-4 flex flex-col transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-400">
                <Users size={18} />
                <Briefcase size={16} />
                <Utensils size={14} />
              </div>
              <span className="text-sm font-bold text-gray-800">Passengers & Baggage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-gray-400 max-w-[150px] truncate text-right">
                {passengerSummaryText}
              </span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isPassengerExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {isPassengerExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-50 space-y-6 text-left">
              {/* Departure Block */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-3 bg-orange-400 rounded-full"></div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Departure: DPS → BKK</h4>
                </div>
                <div className="space-y-3">
                  {passengers.map((p, i) => (
                    <div key={i} className="bg-slate-50/50 rounded-xl p-3 border border-gray-100/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-gray-800">{i + 1}. {p.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${getPassengerTypeStyle(p.type)}`}>
                          {p.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        {renderBaggageDetails(p, 'outbound')}
                        <div className="flex items-center gap-1 ml-auto">
                          <Utensils size={12} className="text-gray-400" />
                          <span className="font-medium text-gray-600">{p.outbound.service}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Block */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-3 bg-blue-400 rounded-full"></div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Return: BKK → CGK</h4>
                </div>
                <div className="space-y-3">
                  {passengers.map((p, i) => (
                    <div key={i} className="bg-slate-50/50 rounded-xl p-3 border border-gray-100/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[12px] font-bold text-gray-800">{i + 1}. {p.name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${getPassengerTypeStyle(p.type)}`}>
                          {p.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        {renderBaggageDetails(p, 'inbound')}
                        <div className="flex items-center gap-1 ml-auto">
                          <Utensils size={12} className="text-gray-400" />
                          <span className="font-medium text-gray-600">{p.inbound.service}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </button>

        {/* Card 3: Price Breakdown */}
        <button 
          onClick={() => setIsPriceExpanded(!isPriceExpanded)}
          className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 mb-8 px-5 py-4 flex flex-col transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="text-gray-400">
                <Tag size={18} />
              </div>
              <span className="text-sm font-bold text-gray-800">Price Breakdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-orange-500">Rp 10.000.000</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isPriceExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {isPriceExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-50 space-y-2 text-left text-xs text-gray-500">
              <div className="flex justify-between">
                <span>Fare ({passengerSummaryText})</span>
                <span className="font-bold text-gray-700">Rp 9.200.000</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Service</span>
                <span className="font-bold text-gray-700">Rp 800.000</span>
              </div>
            </div>
          )}
        </button>

        {/* Section 4: Payment Method */}
        <section>
          <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-4 px-1">Payment method</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setSelectedPayment(PaymentMethod.CREDIT_DEBIT)}
              className={`w-full p-4 rounded-[20px] border flex items-center justify-between transition-all ${selectedPayment === PaymentMethod.CREDIT_DEBIT ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 opacity-80">
                  <div className="w-8 h-5 bg-blue-600 rounded-[3px] flex items-center justify-center">
                    <span className="text-[8px] text-white font-black italic">VISA</span>
                  </div>
                  <div className="w-8 h-5 bg-red-500 rounded-[3px] flex items-center justify-center overflow-hidden">
                    <div className="flex -space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-orange-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">Credit/Debit Card ****1234</div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === PaymentMethod.CREDIT_DEBIT ? 'border-orange-500' : 'border-gray-200'}`}>
                {selectedPayment === PaymentMethod.CREDIT_DEBIT && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
              </div>
            </button>

            <button 
              onClick={() => setSelectedPayment(PaymentMethod.BCA_VA)}
              className={`w-full p-4 rounded-[20px] border flex items-center justify-between transition-all ${selectedPayment === PaymentMethod.BCA_VA ? 'border-orange-500 bg-orange-50/10' : 'border-gray-200 bg-white'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-5 bg-blue-900 rounded-[3px] flex items-center justify-center text-white text-[9px] font-black">
                  BCA
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">BCA Virtual Account</div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === PaymentMethod.BCA_VA ? 'border-orange-500' : 'border-gray-200'}`}>
                {selectedPayment === PaymentMethod.BCA_VA && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesModalOpen} onClose={() => setIsRulesModalOpen(false)} />

      {/* Footer Fixed */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-gray-100 max-w-md mx-auto z-50 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pay before</span>
          <div className="flex items-center gap-1 text-red-500 font-bold">
            <Clock size={12} fill="currentColor" fillOpacity={0.1} />
            <span className="text-[13px]">{paymentDeadline}</span>
          </div>
        </div>
        <SlideToPay onComplete={() => setPaymentSuccess(true)} />
      </footer>
    </div>
  );
};

export default App;
