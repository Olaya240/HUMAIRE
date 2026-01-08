import { ArrowRight, Shield, Sparkles, Users, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 animate-fade-in">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 animate-scale-in"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/50 to-white rounded-full blur-3xl opacity-40 animate-scale-in" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8 animate-slide-down">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="tracking-wide uppercase text-[11px] font-bold opacity-80">Introducing HUMAIRE 1.0</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-8 font-display flex flex-wrap justify-center gap-x-3 gap-y-1">
            {[
              { text: "Human-first", gradient: false },
              { text: "Ethical", gradient: false },
              { text: "AI", gradient: false },
              { text: "for", gradient: false },
              { text: "Safer", gradient: true },
              { text: "Digital", gradient: true },
              { text: "Futures", gradient: true },
            ].map((word, index) => (
              <span
                key={index}
                className={`inline-block opacity-0 animate-slide-up ${word.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {word.text}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Analyze CVs and job postings to detect bias, suggest ethical rewrites,
            and match candidates with opportunities all while maintaining human dignity
            and fairness at the core.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-auto text-lg rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 h-auto text-lg rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-gray-500 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Bias-Free Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-6 h-6 text-blue-600" />,
              title: "Bias Detection",
              desc: "Advanced AI identifies discriminatory language in job postings and CVs, highlighting potential issues before they cause harm."
            },
            {
              icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
              title: "Ethical Rewrites",
              desc: "Get instant suggestions for inclusive, fair language that maintains your message while removing bias and discrimination."
            },
            {
              icon: <Users className="w-6 h-6 text-emerald-600" />,
              title: "Fair Matching",
              desc: "Connect candidates based on skills and values, not demographics, creating truly equitable hiring processes."
            }
          ].map((feature, i) => (
            <div key={i} className={`group p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 animate-slide-up`} style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section id="about-us" className="bg-gray-50 py-32 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">
            Building Fairer Workplaces
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-light">
            "HUMAIRE combines cutting edge AI with human centered ethics to create
            a platform that doesn't just detect bias it actively helps organizations
            build more inclusive, equitable, and fair hiring practices."
          </p>
        </div>
      </section>
    </div>
  );
}