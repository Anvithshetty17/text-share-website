import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the GoText website and services operated by us. 
              By accessing or using our service, you agree to be bound by these Terms. If you disagree with any 
              part of these terms, then you may not access the service. These Terms apply to all visitors, users, 
              and others who access or use the service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update and change these Terms of Service from time to time without notice. 
              Any new features that augment or enhance the current service, including the release of new tools and 
              resources, shall be subject to the Terms of Service. Continued use of the service after any such 
              changes shall constitute your consent to such changes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can review the most current version of the Terms of Service at any time on this page. We reserve 
              the right to update, change, or replace any part of these Terms of Service by posting updates and/or 
              changes to our website. It is your responsibility to check this page periodically for changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GoText is a comprehensive platform that provides various digital tools and services to enhance your 
              productivity and online experience. Our primary services include secure text sharing capabilities, 
              URL shortening services, professional resume building tools, and various student-oriented utilities. 
              We strive to provide reliable, user-friendly, and secure services that meet the diverse needs of our users.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our text sharing service allows users to quickly and securely share text content through generated 
              links, making collaboration and information sharing more efficient. The URL shortening service helps 
              users create manageable, trackable short links for better link management. Our resume builder provides 
              professional templates and tools to help users create compelling resumes that stand out in today's 
              competitive job market.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We continuously work to improve our services and may add new features, modify existing ones, or 
              discontinue certain features as we deem necessary. We will make reasonable efforts to notify users 
              of significant changes to our services, but we reserve the right to modify our offerings at our 
              discretion to better serve our user community and maintain service quality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">User Accounts and Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and 
              current at all times. You are responsible for safeguarding the password and for all activities that 
              occur under your account. You agree not to disclose your password to any third party and to take 
              sole responsibility for any activities or actions under your account.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must notify us immediately upon becoming aware of any breach of security or unauthorized use of 
              your account. We will not be liable for any losses caused by any unauthorized use of your account. 
              You may be held liable for losses incurred by us or another party due to someone else using your 
              account or password.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You must be at least 13 years old to use our services</li>
              <li>You agree to provide accurate and truthful information when creating your account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You agree to accept responsibility for all activities under your account</li>
              <li>You must comply with all applicable laws and regulations when using our services</li>
              <li>You agree not to use our services for any illegal or unauthorized purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Acceptable Use Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use our services only for lawful purposes and in a way that does not infringe the 
              rights of, restrict, or inhibit anyone else's use and enjoyment of the service. Prohibited behavior 
              includes harassing or causing distress or inconvenience to any other user, transmitting obscene or 
              offensive content, or disrupting the normal flow of dialogue within our service.
            </p>
            <h3 className="text-xl font-medium mb-3 text-primary">Prohibited Uses</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Sharing content that is illegal, harmful, threatening, abusive, or defamatory</li>
              <li>Uploading or sharing copyrighted material without proper authorization</li>
              <li>Distributing spam, malware, viruses, or any other malicious code</li>
              <li>Attempting to gain unauthorized access to our systems or other users' accounts</li>
              <li>Using our services to harass, abuse, or harm other individuals or groups</li>
              <li>Engaging in any activity that could damage, disable, or impair our service</li>
              <li>Using automated systems or bots without explicit permission</li>
              <li>Sharing content that promotes violence, discrimination, or illegal activities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to terminate or suspend your access to our services immediately, without prior 
              notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. 
              Upon termination, your right to use the service will cease immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Content and Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our service allows you to post, link, store, share and otherwise make available certain information, 
              text, graphics, videos, or other material. You are responsible for the content that you post to the 
              service, including its legality, reliability, and appropriateness. By posting content to the service, 
              you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, 
              and distribute such content on and through the service.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain any and all of your rights to any content you submit, post, or display on or through the 
              service and you are responsible for protecting those rights. We take no responsibility and assume no 
              liability for content you or any third party posts on or through the service. However, by posting 
              content using the service, you grant us permission to use your content in accordance with these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The service and its original content, features, and functionality are and will remain the exclusive 
              property of GoText and its licensors. The service is protected by copyright, trademark, and other laws. 
              Our trademarks and trade dress may not be used in connection with any product or service without our 
              prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
              information when you use our service. By using our service, you agree to the collection and use of 
              information in accordance with our Privacy Policy. We are committed to protecting your personal 
              information and maintaining transparency about our data practices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to ensure a level of security appropriate 
              to the risk involved in processing your personal data. We regularly review our security measures and 
              update them as necessary to protect against unauthorized access, alteration, disclosure, or destruction 
              of your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Disclaimers and Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by 
              law, we exclude all representations, warranties, conditions, and terms whether express or implied, 
              statutory or otherwise. We do not warrant that the service will be uninterrupted, timely, secure, 
              or error-free.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In no event shall GoText, its directors, employees, partners, agents, suppliers, or affiliates be 
              liable for any indirect, incidental, special, consequential, or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your 
              access to or use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our contact page 
              or email. We are committed to addressing your concerns and will respond to your inquiries in a timely 
              manner. For urgent matters, please clearly mark your communication as such, and we will prioritize 
              our response accordingly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
