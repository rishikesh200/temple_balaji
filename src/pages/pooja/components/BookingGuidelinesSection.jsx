import React from 'react';
import { Info, Shirt, Package, QrCode, MinusCircle, Ban, VolumeX, Sparkles } from 'lucide-react';

const guidelines = [
  {
    title: 'Dress Code',
    description: 'Men: Dhoti or Lungi with Angavastram.\nWomen: Saree or Chudidhar with Dupatta.',
    icon: <Shirt className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
  // {
  //   title: 'Materials Provided',
  //   description: 'The temple provides all necessary items like flowers, camphor, and oil for the rituals.',
  //   icon: <Package className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  // },
  {
    title: 'ID Proof',
    description: 'Original ID proof is mandatory for online booked sevas for verification.',
    icon: <QrCode className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
  {
    title: 'Restrictions',
    description: 'Photography and mobile phones are strictly prohibited inside the sanctum.',
    icon: <MinusCircle className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
  {
    title: 'Prohibited Items',
    description: 'Consumption of non-vegetarian food, alcohol, or smoking within temple premises is strictly prohibited.',
    icon: <Ban className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
  {
    title: 'Mobile Phones',
    description: 'Please keep your mobile phones on silent mode to maintain a serene atmosphere.',
    icon: <VolumeX className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
  {
    title: 'Cleanliness',
    description: 'Help us maintain the purity and cleanliness of the temple premises. Please use the dustbins provided.',
    icon: <Sparkles className="w-7 h-7 text-gold" strokeWidth={1.5} />,
  },
];

const BookingGuidelinesSection = () => {
  return (
    <section className="bg-maroon-dark py-16 px-6 md:px-10 border-y border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Content */}
        <div className="lg:w-[35%] flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-serif text-gold font-semibold tracking-wide">
            Seva Guidelines
          </h2>
          <p className="text-white/90 leading-relaxed text-[15px]">
            To maintain the sanctity of the rituals, devotees are requested to strictly adhere to the following rules.
          </p>
          <div className="flex items-center gap-3 mt-2 text-white/90">
            <Info className="w-5 h-5 text-gold" strokeWidth={1.5} />
            <span className="text-[15px]">Reporting time: 30 mins before Pooja.</span>
          </div>
           <p className="text-white/90 leading-relaxed text-[15px]">
           The temple provides all necessary items like flowers, camphor, and oil for the rituals.
          </p>
        </div>

        {/* Right Content - Grid */}
        <div className="lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {guidelines.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-gold text-[16px]">{item.title}</h3>
                <p className="text-[14.5px] text-white/80 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingGuidelinesSection;