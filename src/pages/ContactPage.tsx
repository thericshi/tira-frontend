import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import './StaticPages.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// SVG Chevron Icon for FAQ
const ChevronIcon = () => (
    <svg className="faq-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days."
    },
    {
      question: "Can I schedule a demo?",
      answer: "Absolutely! Contact us through the form above to schedule a personalized demo of our platform."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "No, TIRA is focused on providing value to individual traders and investors. However, we may in the future consider providing customized solutions for enterprises."
    }
  ];

  return (
    <div className="contact-page">
      <Header />
      
      <main className="page-content">
        <div className="page-header">
            <div className="container">
                <h1>Contact Us</h1>
                <p>Have questions about TIRA? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>
        </div>

        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>Whether you're interested in learning more about our platform, need technical support, or want to explore partnership opportunities, we are here to help.</p>
                </div>

                <div className="contact-form-card">
                  <form onSubmit={handleSubmit} className="contact-form">
                    {success && (
                      <div className="success-message">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <div className="select-wrapper">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="press">Press Inquiry</option>
                          <option value="feedback">Product Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="form-submit-btn" disabled={loading}>
                      {loading && <div className="loading-spinner"></div>}
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
            </div>
        </div>
        
        <div className="faq-section">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className={`faq-item ${openFAQ === index ? 'open' : ''}`}>
                  <button 
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFAQ === index}
                  >
                    <h4>{faq.question}</h4>
                    <ChevronIcon />
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;