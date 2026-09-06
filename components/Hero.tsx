import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight, ChevronDown, Car, Wrench, Tractor } from 'lucide-react';
import type { Dictionary } from '@/lib/dictionary';
import bgImage from '../public/bgImage.avif';

interface HeroProps {
  dictionary: Dictionary;
}

const Hero = ({ dictionary }: HeroProps) => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const scrollToBenefits = () => {
    const benefitsSection = document.getElementById('benefits');
    if (benefitsSection) {
      benefitsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
          quality={90}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 mt-8 sm:mt-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
            </span>
            <span className="line-clamp-1">Официальные партнеры Copart, IAAI, Manheim, Mobile.de, Autoplius.lt
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            {dictionary.hero.title}
          </h1>
        </div>

        {/* Services highlights — full container width so 3 columns stay readable */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 w-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Car className="h-6 w-6 shrink-0 text-primary" />
                <h2 className="text-base lg:text-lg font-semibold text-white leading-snug">Автомобили из США, КИТАЯ И КОРЕИ</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Выгода до 40% от цен на рынке РБ</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Полное таможенное оформление</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Wrench className="h-6 w-6 shrink-0 text-primary" />
                <h2 className="text-base lg:text-lg font-semibold text-white leading-snug">Машинокомплекты и двигатели оптом из США и Англии</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Оригинальные детали</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Быстрая доставка</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 h-full">
              <div className="flex items-center gap-3 mb-3">
                <Tractor className="h-6 w-6 shrink-0 text-primary" />
                <h2 className="text-base lg:text-lg font-semibold text-white leading-snug">Техника и спецтехника</h2>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Гидроциклы</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Квадроциклы</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Моторные лодки,  катера</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/90">
                  <div className="h-1 w-2 bg-primary rounded-full" />
                  <span>Строительная техника</span>
                </li>
              </ul>
            </div>
        </div>

        <div className="max-w-3xl">
          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-white/90 mb-8 sm:mb-10">
            {dictionary.hero.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="h-1 w-4 sm:w-6 bg-primary rounded-full" />
                <p className="text-sm sm:text-base overflow-hidden whitespace-nowrap">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-24 sm:mb-0">
            <Button
              variant="consultation"
              size="lg"
              className="w-full sm:w-auto h-[56px] px-8 text-base"
            >
              <a
                href={dictionary.global.tgLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full"
                aria-label="Получить консультацию в Telegram"
              >
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                {dictionary.hero.cta}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToBenefits}
              className="w-full sm:w-auto h-[56px] px-8 text-base bg-transparent border-white hover:bg-white/10 hover:text-white text-white"
            >
              <span>Подробнее</span>
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-200 hover:opacity-80 cursor-pointer group p-4 sm:bottom-4"
        aria-label="Прокрутить вниз"
      >
        <div className="text-white/60 text-xs sm:text-sm group-hover:text-white/80 transition-colors">
          Узнать больше
        </div>
        <div className="flex flex-col items-center">
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 animate-bounce" aria-hidden="true" />
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </button>
    </section>
  );
};

export default Hero;