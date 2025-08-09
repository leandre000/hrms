const CTASection = () => {
  return (
    <section className="bg-primary-600 section-padding">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of companies using HR Pro to streamline their workforce management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Start 15-Day Free Trial
            </button>
            <button className="btn-primary">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
