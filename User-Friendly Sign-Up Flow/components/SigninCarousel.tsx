import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield, Zap, Users, ArrowRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: "Welcome back to your productivity hub",
    description: "Join thousands of professionals who trust our platform to streamline their workflow and boost team collaboration.",
    icon: <Users className="w-12 h-12 text-white" />,
    stats: [
      { label: "Active Users", value: "50K+" },
      { label: "Teams", value: "2.5K+" },
      { label: "Projects Completed", value: "100K+" }
    ]
  },
  {
    id: 2,
    title: "Enterprise-grade security you can trust",
    description: "Your data is protected with bank-level encryption, SSO integration, and compliance with SOC 2 and GDPR standards.",
    icon: <Shield className="w-12 h-12 text-white" />,
    testimonial: {
      quote: "The security features give us complete peace of mind. We can focus on our work knowing our data is safe.",
      author: "Sarah Chen",
      role: "Security Lead",
      company: "TechCorp",
      avatar: "SC"
    }
  },
  {
    id: 3,
    title: "Lightning-fast performance",
    description: "Experience seamless collaboration with real-time syncing, instant notifications, and 99.9% uptime guarantee.",
    icon: <Zap className="w-12 h-12 text-white" />,
    testimonial: {
      quote: "The speed and reliability are incredible. Our team productivity has increased by 40% since we started using this platform.",
      author: "Marcus Rodriguez",
      role: "Product Manager",
      company: "InnovateNow",
      avatar: "MR"
    }
  }
];

export function SigninCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full max-w-lg mx-auto text-white">
      {/* Main Content */}
      <div className="text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
            {current.icon}
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold leading-tight">
            {current.title}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {current.description}
          </p>
        </div>

        {/* Stats */}
        {current.stats && (
          <div className="grid grid-cols-3 gap-6 py-6">
            {current.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {current.testimonial && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-white/95 italic text-lg">
              "{current.testimonial.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-medium">
                {current.testimonial.avatar}
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">
                  {current.testimonial.author}
                </div>
                <div className="text-sm text-white/80">
                  {current.testimonial.role} at {current.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-12">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-white/20 rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <div className="text-center space-y-3">
          <div className="text-sm text-white/80">Trusted by leading companies worldwide</div>
          <div className="flex items-center justify-center space-x-6 text-white/60">
            <div className="font-semibold">Microsoft</div>
            <div>•</div>
            <div className="font-semibold">Spotify</div>
            <div>•</div>
            <div className="font-semibold">Airbnb</div>
            <div>•</div>
            <div className="font-semibold">Slack</div>
          </div>
        </div>
      </div>
    </div>
  );
}