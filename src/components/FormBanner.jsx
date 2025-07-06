// FormBanner.js
import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Trophy, Zap, Star } from "lucide-react";
import { eventTimeLine } from "../data/tvData";
const allEvents = eventTimeLine.flatMap((day) => day.events);

const FormBanner = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveEvent((prev) => (prev + 1) % allEvents.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEventClick = (index) => {
    if (index !== activeEvent) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveEvent(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const event = allEvents[activeEvent];

  return (
    <div className="w-full h-[90vh] bg-black rounded-2xl px-8 pt-6 pb-4 shadow-2xl border-2 border-yellow-500/30 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-yellow-400 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-yellow-400 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-yellow-400 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-yellow-400 rounded-br-2xl"></div>

      {/* Golden glow */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Star className="text-yellow-400 mr-2 animate-pulse" size={24} />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#f2ca46] via-yellow-300 to-[#daa425] bg-clip-text text-transparent">
              Featured Events
            </h2>
            <Star className="text-yellow-400 ml-2 animate-pulse" size={24} />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-2"></div>
        </div>

        {/* Main content with scroll */}
        <div
          className="flex flex-col justify-between overflow-y-auto small-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className={`transition-all duration-500 mb-6 ${
              isAnimating
                ? "opacity-0 transform scale-95"
                : "opacity-100 transform scale-100"
            }`}
          >
            <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-500/10 to-yellow-400/20 p-[2px] rounded-xl shadow-2xl shadow-yellow-400/20 ">
              <div className="bg-black rounded-lg p-6 border border-yellow-400/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="text-2xl mr-2 p-2 bg-yellow-400/10 rounded-lg border border-yellow-400/30 flex-shrink-0">
                      {event.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl font-bold text-yellow-400 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 text-sm font-medium">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4 min-w-fit">
  <div className="flex items-center justify-end text-yellow-300 mb-1">
    <Calendar size={14} className="mr-2 flex-shrink-0" />
    <span className="text-sm font-medium whitespace-nowrap">{event.date}</span>
  </div>

  {event.title.includes("24-Hour") || event.title.includes("24 - Hour") ? (
    <div className="flex items-center text-yellow-300 overflow-hidden">
      <Clock size={16} className="mr-1.5 flex-shrink-0 mt-0.5" />
      <div className="relative w-[160px] overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee text-sm font-medium">
          {event.time}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-start justify-end text-yellow-300">
      <Clock size={16} className="mr-1.5 flex-shrink-0 mt-0.5" />
      <div className="text-sm font-medium leading-tight text-right max-w-[140px] break-words">
        {event.time}
      </div>
    </div>
  )}
</div>
                </div>
                {event.venue && (
                  <div className="flex items-center text-yellow-300 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm font-medium">{event.venue}</span>
                  </div>
                )}

                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">
                  {event.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {event.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs text-gray-300 bg-yellow-400/5 p-2 rounded border border-yellow-400/20"
                    >
                      <Zap size={12} className="mr-2 text-yellow-400" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mb-6">
            {allEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => handleEventClick(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === activeEvent
                    ? "bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-110"
                    : "bg-transparent border-yellow-400/50 hover:border-yellow-400 hover:bg-yellow-400/20"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 mb-6">
            {allEvents.map((event, index) => (
              <button
                key={event.id}
                onClick={() => handleEventClick(index)}
                className={`p-3 rounded-lg transition-all duration-300 text-center border-2 ${
                  index === activeEvent
                    ? "bg-yellow-400/10 border-yellow-400 shadow-lg shadow-yellow-400/20"
                    : "bg-black/50 border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/5"
                }`}
              >
                <div className="text-lg mb-1">{event.icon}</div>
                <div
                  className={`text-xs font-bold ${
                    index === activeEvent ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {event.title.includes("24 - Hour") || event.title.includes("24-Hour") 
                    ? "Hackathon" 
                    : event.title.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBanner;