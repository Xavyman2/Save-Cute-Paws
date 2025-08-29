import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Terms of Service</h1>
      <p className="text-center text-muted-foreground mb-12 text-lg">
        Last updated: August 29, 2025
      </p>
      
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using the Save Cute Paws website ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
            If you disagree with any part of these terms, then you may not access the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. About Save Cute Paws</h2>
          <p className="text-muted-foreground leading-relaxed">
            Save Cute Paws is a nonprofit organization dedicated to rescuing, rehabilitating, and rehoming animals in need. 
            Our mission is to provide sanctuary and care for abandoned, abused, and neglected animals while promoting responsible pet ownership.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Adoption Services</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              <strong>Adoption Process:</strong> All potential adopters must complete our adoption application and screening process. 
              We reserve the right to approve or deny any adoption application at our discretion.
            </p>
            <p>
              <strong>Adoption Fees:</strong> Adoption fees help cover the cost of veterinary care, spaying/neutering, vaccinations, 
              and other essential services provided to our animals.
            </p>
            <p>
              <strong>Return Policy:</strong> If for any reason you cannot keep an adopted animal, you must return the animal to Save Cute Paws. 
              Transfer or rehoming to third parties without our knowledge is prohibited.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Donations and Volunteering</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              <strong>Donations:</strong> All donations are used directly for animal care, facility maintenance, and operational expenses. 
              Donations are tax-deductible to the extent allowed by law.
            </p>
            <p>
              <strong>Volunteer Services:</strong> Volunteers must complete our orientation process and agree to follow all safety protocols 
              and organizational policies while on our premises.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Website Usage</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              <strong>Permitted Use:</strong> You may use our website for lawful purposes related to learning about our organization, 
              adoption services, and making donations.
            </p>
            <p>
              <strong>Prohibited Activities:</strong> You may not use our website to transmit harmful or malicious content, 
              violate any laws, or interfere with the website's functionality.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy and Data Protection</h2>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to protecting your privacy. Information collected through our website and adoption process 
            is used solely for organizational purposes and is not shared with third parties except as required by law. 
            Please refer to our Privacy Policy for detailed information about data handling practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            Save Cute Paws strives to provide accurate information about our animals and services. However, we cannot guarantee 
            the completeness or accuracy of all information. Our liability is limited to the extent permitted by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Medical Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed">
            While we provide medical care and information about our animals, we are not a substitute for professional veterinary advice. 
            All adopted animals should receive ongoing veterinary care from licensed professionals.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with 
            an updated "Last Modified" date. Continued use of our services after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <div className="text-muted-foreground leading-relaxed">
            <p>If you have questions about these Terms of Service, please contact us:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Save Cute Paws</strong></p>
              <p>Email: legal@savecutepaws.org</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Animal Rescue Lane, Compassion City, ST 12345</p>
            </div>
          </div>
        </section>

        <div className="border-t pt-8 mt-12">
          <p className="text-center text-muted-foreground">
            Thank you for supporting Save Cute Paws and helping us make a difference in the lives of animals in need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
