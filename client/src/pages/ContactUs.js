import React, { useState } from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
           <AdBanner />
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Get in touch with our team for any questions, feedback, or support needs.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                At GoText, we value communication with our users and are committed to providing exceptional 
                support and service. Whether you have questions about our features, need technical assistance, 
                or want to share feedback about your experience, we're here to help. Our dedicated support team 
                strives to respond to all inquiries promptly and professionally.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                We believe that open communication is essential for building and maintaining a strong relationship 
                with our user community. Your feedback, suggestions, and questions help us improve our services 
                and better serve your needs. We encourage you to reach out to us through any of the methods 
                provided below, and we will ensure that your message receives the attention it deserves.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-primary">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email Support</h4>
                    <p className="text-gray-600">support@gotext.com</p>
                    <p className="text-sm text-gray-500">Response time: 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Live Chat</h4>
                    <p className="text-gray-600">Available on our website</p>
                    <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🐦</div>
                  <div>
                    <h4 className="font-medium text-gray-800">Social Media</h4>
                    <p className="text-gray-600">@GoTextOfficial</p>
                    <p className="text-sm text-gray-500">Follow us for updates and quick support</p>
                  </div>
                </div>
              </div>
            </section>
<BannerAdBox />
            <section>
              <h3 className="text-xl font-semibold mb-4 text-primary">What We Can Help With</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Technical support and troubleshooting</li>
                <li>Account-related questions and assistance</li>
                <li>Feature requests and suggestions</li>
                <li>Bug reports and issue resolution</li>
                <li>Privacy and security concerns</li>
                <li>General questions about our services</li>
                <li>Partnership and collaboration inquiries</li>
                <li>Press and media requests</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-primary">Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to providing excellent customer service and support to all our users. Our team 
                consists of knowledgeable professionals who understand our platform inside and out, ensuring 
                that you receive accurate and helpful responses to your inquiries. We continuously train our 
                support staff to stay updated with the latest features and best practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Your satisfaction is our priority, and we work diligently to resolve any issues or concerns 
                you may have. We also value your feedback as it helps us identify areas for improvement and 
                develop new features that better serve our community's needs.
              </p>
            </section>
          </div>

          {/* Contact Form */}
          <div>
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">Send Us a Message</h2>
              <p className="text-gray-700 mb-6">
                Use the form below to send us a direct message. We'll get back to you as soon as possible with 
                a personalized response to address your specific needs or questions.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="account-help">Account Help</option>
                    <option value="privacy-security">Privacy & Security</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </section>

            <section className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="bg-gray-50 p-3 rounded-lg">
                  <summary className="font-medium text-gray-800 cursor-pointer">How quickly do you respond to messages?</summary>
                  <p className="text-gray-600 text-sm mt-2">We typically respond to all inquiries within 24-48 hours during business days. For urgent technical issues, we strive to respond even faster.</p>
                </details>
                
                <details className="bg-gray-50 p-3 rounded-lg">
                  <summary className="font-medium text-gray-800 cursor-pointer">Do you offer phone support?</summary>
                  <p className="text-gray-600 text-sm mt-2">Currently, we provide support through email, live chat, and our contact form. These channels allow us to provide detailed, documented assistance for your inquiries.</p>
                </details>
                
                <details className="bg-gray-50 p-3 rounded-lg">
                  <summary className="font-medium text-gray-800 cursor-pointer">Can I suggest new features?</summary>
                  <p className="text-gray-600 text-sm mt-2">Absolutely! We love hearing feature suggestions from our users. Please use the contact form with "Feature Request" as the subject, and provide as much detail as possible about your idea.</p>
                </details>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
