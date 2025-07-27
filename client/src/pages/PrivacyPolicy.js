import React from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
           <AdBanner />
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to GoText ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website and use our services, including text sharing, 
              link shortening, and resume building tools.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using GoText, you agree to the collection and use of information in accordance with 
              this Privacy Policy. If you do not agree with our policies and practices, please do not use our services. 
              We may update this policy from time to time, and we will notify you of any changes by posting the new 
              Privacy Policy on this page.
            </p>
          </section>
<BannerAdBox />
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect several types of information from and about users of our website and services. This includes 
              information you provide directly to us, information we collect automatically when you use our services, 
              and information from third parties. The types of information we may collect include personal information 
              that can identify you and non-personal information that does not directly identify you.
            </p>
            <h3 className="text-xl font-medium mb-3 text-primary">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Contact information such as email addresses when you contact us or subscribe to our newsletter</li>
              <li>User-generated content including text documents, links, and resume information you choose to share</li>
              <li>Account information if you create an account with us, including usernames and encrypted passwords</li>
              <li>Communication data when you interact with our customer support or feedback systems</li>
            </ul>
            <h3 className="text-xl font-medium mb-3 text-primary">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Device information including IP address, browser type, operating system, and device identifiers</li>
              <li>Usage data such as pages visited, time spent on our site, and feature usage patterns</li>
              <li>Technical data including cookies, web beacons, and similar tracking technologies</li>
              <li>Performance data to help us improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for various purposes, all aimed at providing, maintaining, and improving 
              our services. Our primary goal is to deliver the best possible user experience while respecting your 
              privacy and maintaining the security of your data. We process your information based on legitimate 
              business interests, your consent, and our legal obligations.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide and maintain our text sharing, link shortening, and resume building services</li>
              <li>To process and store your shared content securely and make it accessible when needed</li>
              <li>To communicate with you about our services, updates, and respond to your inquiries</li>
              <li>To analyze usage patterns and improve our website functionality and user experience</li>
              <li>To detect, prevent, and address technical issues, security threats, and fraudulent activity</li>
              <li>To comply with legal obligations and protect our rights and the rights of our users</li>
              <li>To personalize your experience and provide relevant content and recommendations</li>
              <li>For marketing purposes, only with your explicit consent and with easy opt-out options</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We value your privacy and do not sell, trade, or otherwise transfer your personal information to third 
              parties without your consent, except as described in this Privacy Policy. We may share your information 
              in certain limited circumstances, always with appropriate safeguards and only when necessary for legitimate 
              business purposes or legal compliance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share information with trusted service providers who assist us in operating our website and 
              conducting our business, such as hosting providers, analytics services, and customer support platforms. 
              These parties are contractually obligated to keep your information confidential and use it only for 
              the specific services they provide to us.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We may also disclose your information when we believe in good faith that disclosure is necessary to 
              protect our rights, protect your safety or the safety of others, investigate fraud, or respond to 
              government requests or legal proceedings. In the event of a business transaction such as a merger or 
              acquisition, your information may be transferred as part of that transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Data Security and Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. These measures include 
              encryption, secure servers, regular security assessments, and employee training on data protection 
              practices. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in 
              this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer 
              need your information, we will securely delete or anonymize it. You have the right to request deletion 
              of your personal information, subject to certain legal exceptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have several rights regarding your personal information, and we are committed to helping you 
              exercise these rights. These rights may vary depending on your location and applicable laws, but 
              generally include the right to access, correct, delete, and control how your information is used.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access: You can request information about the personal data we hold about you</li>
              <li>Correction: You can request that we correct any inaccurate or incomplete information</li>
              <li>Deletion: You can request that we delete your personal information in certain circumstances</li>
              <li>Portability: You can request a copy of your data in a commonly used format</li>
              <li>Opt-out: You can unsubscribe from marketing communications at any time</li>
              <li>Cookie control: You can manage cookie preferences through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, our data practices, or your rights regarding 
              your personal information, please contact us. We are committed to addressing your concerns and will 
              respond to your inquiries promptly. You can reach us through our contact page or by email, and we 
              will work with you to resolve any privacy-related issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
