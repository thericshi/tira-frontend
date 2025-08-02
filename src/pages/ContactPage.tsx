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
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent technical support issues, we aim to respond within 4 hours."
    },
    {
      question: "Do you offer phone support?",
      answer: "Currently, we provide support primarily through email and our in-app messaging system. This allows us to provide detailed, documented responses to your questions."
    },
    {
      question: "Can I schedule a demo?",
      answer: "Absolutely! Contact us through the form above or email business@tira.ai to schedule a personalized demo of our platform."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Not yet, but we are working to provide customized enterprise solutions for institutional clients."
    }
  ];

  return (
    <div className="contact-page">
      <Header />
      
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>Contact Us</h1>
            <p>Have questions about TIRA? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Whether you're interested in learning more about our platform, need technical support, or want to explore partnership opportunities, our team is here to help.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <h4>📧 Email</h4>
                  <p><a href="mailto:hello@tira.ai">hello@tira.ai</a></p>
                  <span>General inquiries and support</span>
                </div>
                
                <div className="contact-method">
                  <h4>💼 Business</h4>
                  <p><a href="mailto:business@tira.ai">business@tira.ai</a></p>
                  <span>Partnerships and enterprise solutions</span>
                </div>
                
                <div className="contact-method">
                  <h4>🛠️ Support</h4>
                  <p><a href="mailto:support@tira.ai">support@tira.ai</a></p>
                  <span>Technical support and account issues</span>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              
              {success && (
                <div className="success">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
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
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="press">Press Inquiry</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
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

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading && <span className="loading-spinner"></span>}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="faq-section">
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
                    <span className="faq-icon">
                      {openFAQ === index ? '−' : '+'}
                    </span>
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
