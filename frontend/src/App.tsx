import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import MacbookScrollAnimation from "./components/macbook-scroll";
import ProjectsSection from "./components/projects-section";
import ContactSection from "./components/contact-section";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#0d1224] text-white">
      <div className="relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
        <Navbar />
        <HeroSection />
      </div>

      <div className="relative z-10 isolate border-t border-[#25213b]">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-0 max-w-none"
          />
        </div>
        <div className="relative z-20 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <MacbookScrollAnimation />
        </div>
      </div>

      {/* Empty section */}
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-0 max-w-none -scale-x-100"
          />
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-[694px] max-w-none"
          />
          <div className="absolute top-[1390px] flex w-full -translate-y-[1px] justify-center z-10">
            <div className="w-3/4">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            </div>
          </div>
        </div>
        <div className="flex -translate-y-[1px] justify-center">
          <div className="w-3/4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>
        <div className="h-[1200px]" />
      </div>

      {/* Boot sequence scroll area */}
      <div id="boot-sequence" className="relative h-[3000px]" />

      {/* Projects */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-0 max-w-none"
          />
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-[794px] max-w-none -scale-y-100"
          />
        </div>
        <div className="flex -translate-y-[1px] justify-center">
          <div className="w-3/4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-3/4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>
        <div className="relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <ProjectsSection />
        </div>
      </div>

      {/* Contact */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-0 max-w-none"
          />
          <img
            src="/hero.svg"
            alt=""
            width={1572}
            height={795}
            className="absolute top-[794px] max-w-none -scale-y-100"
          />
        </div>
        <div className="flex -translate-y-[1px] justify-center">
          <div className="w-3/4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>
        <div className="relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default App;
