import React from 'react';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
     <AdBanner />
      
      <div className="card">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">About GoText</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GoText was born from a simple yet powerful vision: to create a comprehensive digital platform that 
              simplifies and enhances the way people share information, manage links, and build their professional 
              presence online. Founded by passionate developers and digital enthusiasts, our journey began when we 
              recognized the need for a unified solution that combines essential online tools in one accessible, 
              user-friendly platform.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              What started as a small project to solve personal productivity challenges has evolved into a robust 
              platform serving thousands of users worldwide. Our team consists of dedicated professionals from 
              diverse backgrounds, including software development, user experience design, digital marketing, and 
              customer support, all united by a common goal: making digital life simpler and more efficient for 
              everyone.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that technology should empower users, not overwhelm them. This philosophy drives every 
              decision we make, from the features we develop to the user interfaces we design. Our commitment to 
              simplicity, security, and reliability has made GoText a trusted choice for individuals, students, 
              professionals, and businesses who need dependable digital tools.
            </p>
          </section>
<BannerAdBox />
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At GoText, our mission is to democratize access to essential digital tools by providing a free, 
              secure, and intuitive platform that empowers users to share information efficiently, manage their 
              digital presence effectively, and build professional opportunities confidently. We strive to break 
              down barriers that prevent people from fully utilizing the potential of digital technology.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to fostering digital literacy and providing tools that help users navigate the 
              increasingly complex digital landscape. Our platform serves as a bridge between technical complexity 
              and user accessibility, ensuring that powerful digital tools remain approachable for users of all 
              technical skill levels.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through continuous innovation and user-centered design, we aim to anticipate and meet the evolving 
              needs of our global user community. We believe that by providing reliable, feature-rich tools at 
              no cost, we can contribute to a more connected, productive, and equitable digital world where 
              everyone has access to the tools they need to succeed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GoText offers a comprehensive suite of digital tools designed to address the most common challenges 
              faced by modern internet users. Our platform integrates multiple services into a cohesive ecosystem 
              that promotes efficiency and productivity while maintaining the highest standards of security and 
              user privacy.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-primary">📝 Text Sharing</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our secure text sharing service allows users to quickly share documents, notes, code snippets, 
                  and other text content through generated links. With features like password protection, 
                  expiration dates, and view tracking, users can control how their content is accessed and shared.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-primary">🔗 Link Shortening</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Transform long, unwieldy URLs into clean, manageable short links that are perfect for social 
                  media, email campaigns, and professional communications. Our link shortener includes analytics, 
                  custom aliases, and bulk processing capabilities.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-primary">📄 Resume Builder</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Create professional, ATS-friendly resumes with our intuitive resume builder. Choose from 
                  multiple templates, customize layouts, and export in various formats to ensure your resume 
                  stands out in today's competitive job market.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-primary">🎓 Student Tools</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Access a collection of educational tools designed specifically for students, including citation 
                  generators, grade calculators, study planners, and collaboration features that make academic 
                  life more organized and productive.
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              All our services are designed with user privacy and data security as top priorities. We employ 
              industry-standard encryption, secure data handling practices, and transparent privacy policies to 
              ensure that user information remains protected at all times. Our commitment to security extends 
              beyond technical measures to include regular audits, staff training, and compliance with international 
              data protection standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Security First</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We prioritize user data protection and privacy in every aspect of our platform, implementing 
                  robust security measures and transparent data handling practices.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold mb-2 text-primary">User-Centric Design</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Every feature and interface element is designed with the user experience in mind, ensuring 
                  accessibility, intuitive navigation, and efficient workflows.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-3">🌟</div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Continuous Innovation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We constantly evolve our platform based on user feedback, emerging technologies, and changing 
                  digital needs to provide cutting-edge solutions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Community and Support</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The GoText community is at the heart of everything we do. We believe that the best digital tools 
              are created through collaboration between developers and users. Our community includes students, 
              professionals, educators, content creators, and digital enthusiasts from around the world who share 
              feedback, suggestions, and creative use cases that help us improve our platform continuously.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We maintain active communication channels through various platforms, including social media, forums, 
              and direct feedback systems. Our support team is committed to providing timely, helpful assistance 
              to ensure that every user can maximize the value they get from our tools. We view every user 
              interaction as an opportunity to learn and improve.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're a first-time user seeking guidance or a power user with advanced feature requests, 
              we welcome your participation in our community. Your experiences, challenges, and successes help 
              shape the future of GoText and ensure that we continue to serve the diverse needs of our global 
              user base effectively.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Looking Forward</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As we look to the future, GoText remains committed to expanding our service offerings while 
              maintaining the core principles that have made us successful: simplicity, security, and user-focused 
              design. We are actively developing new features and tools based on user feedback and emerging digital 
              trends, always with the goal of providing more value to our community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our roadmap includes enhanced collaboration features, mobile applications, API access for developers, 
              and integration capabilities with popular productivity platforms. We are also exploring emerging 
              technologies like artificial intelligence and machine learning to provide smarter, more personalized 
              user experiences while maintaining our commitment to privacy and data protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary">Join Our Journey</h2>
            <p className="text-gray-700 leading-relaxed">
              We invite you to be part of the GoText story. Whether you're using our tools for personal projects, 
              academic work, or professional endeavors, your participation helps us build a better platform for 
              everyone. Share your feedback, suggest new features, and help us spread the word about GoText to 
              others who might benefit from our services. Together, we can continue to make digital life simpler, 
              more secure, and more productive for users around the world.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
