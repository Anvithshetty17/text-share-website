import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import AdBanner from "../components/AdBanner";
import BannerAdBox from "../components/BannerAdBox";

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      github: ''
    },
    summary: '',
    education: [
      {
        degree: '',
        institution: '',
        year: '',
        gpa: ''
      }
    ],
    experience: [
      {
        title: '',
        company: '',
        duration: '',
        description: ''
      }
    ],
    skills: [''],
    projects: [
      {
        name: '',
        description: '',
        technologies: ''
      }
    ],
    certifications: ['']
  });

  const templates = {
    modern: 'Modern',
    classic: 'Classic',
    minimal: 'Minimal'
  };

  const updateFormData = (section, index, field, value) => {
    if (section === 'personalInfo' || section === 'summary') {
      setFormData(prev => ({
        ...prev,
        [section]: section === 'personalInfo' 
          ? { ...prev[section], [field]: value }
          : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index 
            ? (typeof item === 'string' ? value : { ...item, [field]: value })
            : item
        )
      }));
    }
  };

  const addItem = (section) => {
    const newItem = section === 'education' 
      ? { degree: '', institution: '', year: '', gpa: '' }
      : section === 'experience'
      ? { title: '', company: '', duration: '', description: '' }
      : section === 'projects'
      ? { name: '', description: '', technologies: '' }
      : '';

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const generatePDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 0.5,
      filename: `${formData.personalInfo.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const ResumePreview = () => {
    const ModernTemplate = () => (
      <div className="resume-template modern-template">
             <AdBanner />
        <div className="resume-header">
          <h1>{formData.personalInfo.fullName || 'Your Name'}</h1>
          <div className="contact-info">
            {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
            {formData.personalInfo.phone && <span>{formData.personalInfo.phone}</span>}
            {formData.personalInfo.address && <span>{formData.personalInfo.address}</span>}
          </div>
          <div className="social-links">
            {formData.personalInfo.linkedIn && <span>LinkedIn: {formData.personalInfo.linkedIn}</span>}
            {formData.personalInfo.github && <span>GitHub: {formData.personalInfo.github}</span>}
          </div>
        </div>

        {formData.summary && (
          <div className="resume-section">
            <h2>Professional Summary</h2>
            <p>{formData.summary}</p>
          </div>
        )}

        {formData.education.some(edu => edu.degree || edu.institution) && (
          <div className="resume-section">
            <h2>Education</h2>
            {formData.education.map((edu, index) => (
              (edu.degree || edu.institution) && (
                <div key={index} className="education-item">
                  <div className="item-header">
                    <h3>{edu.degree}</h3>
                    <span className="year">{edu.year}</span>
                  </div>
                  <p className="institution">{edu.institution}</p>
                  {edu.gpa && <p className="gpa">GPA: {edu.gpa}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {formData.experience.some(exp => exp.title || exp.company) && (
          <div className="resume-section">
            <h2>Experience</h2>
            {formData.experience.map((exp, index) => (
              (exp.title || exp.company) && (
                <div key={index} className="experience-item">
                  <div className="item-header">
                    <h3>{exp.title}</h3>
                    <span className="duration">{exp.duration}</span>
                  </div>
                  <p className="company">{exp.company}</p>
                  {exp.description && <p className="description">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {formData.skills.some(skill => skill.trim()) && (
          <div className="resume-section">
            <h2>Skills</h2>
            <div className="skills-list">
              {formData.skills.filter(skill => skill.trim()).join(' • ')}
            </div>
          </div>
        )}

        {formData.projects.some(proj => proj.name || proj.description) && (
          <div className="resume-section">
            <h2>Projects</h2>
            {formData.projects.map((proj, index) => (
              (proj.name || proj.description) && (
                <div key={index} className="project-item">
                  <h3>{proj.name}</h3>
                  {proj.description && <p className="description">{proj.description}</p>}
                  {proj.technologies && <p className="technologies">Technologies: {proj.technologies}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {formData.certifications.some(cert => cert.trim()) && (
          <div className="resume-section">
            <h2>Certifications</h2>
            <ul>
              {formData.certifications.filter(cert => cert.trim()).map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

    return (
      <div id="resume-preview" className="resume-preview">
        <ModernTemplate />
      </div>
    );
  };

  return (
    <div className="resume-builder-page">
    <BannerAdBox />
      <div className="page-header text-center mb-4">
        <h1>Resume Builder</h1>
        <p className="text-muted">
          Create professional resumes with our easy-to-use builder and download as PDF.
        </p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          Edit Resume
        </button>
        <button 
          className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      {activeTab === 'form' && (
        <div className="form-section">
          <div className="template-selector mb-4">
            <div className="card">
              <h3 className="card-title">Choose Template</h3>
              <div className="template-options">
                {Object.entries(templates).map(([key, name]) => (
                  <button
                    key={key}
                    className={`btn ${selectedTemplate === key ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setSelectedTemplate(key)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-2">
            {/* Personal Information */}
            <div className="card">
              <h3 className="card-title">Personal Information</h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => updateFormData('personalInfo', null, 'fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', null, 'email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updateFormData('personalInfo', null, 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.personalInfo.address}
                  onChange={(e) => updateFormData('personalInfo', null, 'address', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.personalInfo.linkedIn}
                  onChange={(e) => updateFormData('personalInfo', null, 'linkedIn', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.personalInfo.github}
                  onChange={(e) => updateFormData('personalInfo', null, 'github', e.target.value)}
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>

            {/* Professional Summary */}
            <div className="card">
              <h3 className="card-title">Professional Summary</h3>
              <div className="form-group">
                <label className="form-label">Summary</label>
                <textarea
                  className="form-textarea"
                  value={formData.summary}
                  onChange={(e) => updateFormData('summary', null, null, e.target.value)}
                  placeholder="Brief professional summary highlighting your key strengths and experience..."
                  rows={6}
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="card">
            <h3 className="card-title">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="dynamic-item">
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.degree}
                      onChange={(e) => updateFormData('education', index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Institution</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.institution}
                      onChange={(e) => updateFormData('education', index, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.year}
                      onChange={(e) => updateFormData('education', index, 'year', e.target.value)}
                      placeholder="2023"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GPA (optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.gpa}
                      onChange={(e) => updateFormData('education', index, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>
                {formData.education.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeItem('education', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addItem('education')}>
              Add Education
            </button>
          </div>

          {/* Experience */}
          <div className="card">
            <h3 className="card-title">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="dynamic-item">
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.title}
                      onChange={(e) => updateFormData('experience', index, 'title', e.target.value)}
                      placeholder="Software Developer"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.company}
                      onChange={(e) => updateFormData('experience', index, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.duration}
                      onChange={(e) => updateFormData('experience', index, 'duration', e.target.value)}
                      placeholder="Jan 2022 - Present"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={exp.description}
                    onChange={(e) => updateFormData('experience', index, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
                {formData.experience.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeItem('experience', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addItem('experience')}>
              Add Experience
            </button>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 className="card-title">Skills</h3>
            {formData.skills.map((skill, index) => (
              <div key={index} className="dynamic-item-inline">
                <input
                  type="text"
                  className="form-input"
                  value={skill}
                  onChange={(e) => updateFormData('skills', index, null, e.target.value)}
                  placeholder="JavaScript, React, Node.js"
                />
                {formData.skills.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeItem('skills', index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addItem('skills')}>
              Add Skill
            </button>
          </div>

          {/* Projects */}
          <div className="card">
            <h3 className="card-title">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="dynamic-item">
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={project.name}
                    onChange={(e) => updateFormData('projects', index, 'name', e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={project.description}
                    onChange={(e) => updateFormData('projects', index, 'description', e.target.value)}
                    placeholder="Brief description of the project..."
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Technologies</label>
                  <input
                    type="text"
                    className="form-input"
                    value={project.technologies}
                    onChange={(e) => updateFormData('projects', index, 'technologies', e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                {formData.projects.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeItem('projects', index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addItem('projects')}>
              Add Project
            </button>
          </div>

          {/* Certifications */}
          <div className="card">
            <h3 className="card-title">Certifications</h3>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="dynamic-item-inline">
                <input
                  type="text"
                  className="form-input"
                  value={cert}
                  onChange={(e) => updateFormData('certifications', index, null, e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
                {formData.certifications.length > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-danger btn-small"
                    onClick={() => removeItem('certifications', index)}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => addItem('certifications')}>
              Add Certification
            </button>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="preview-section">
          <div className="preview-actions mb-3">
            <button className="btn btn-success" onClick={generatePDF}>
              📄 Download PDF
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('form')}>
              ← Back to Edit
            </button>
          </div>
          <ResumePreview />
        </div>
      )}

      <style jsx>{`
        .template-options {
          display: flex;
          gap: 1rem;
        }

        .dynamic-item {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .dynamic-item-inline {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .btn-small {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        .preview-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .resume-preview {
          background: white;
          color: #000;
          max-width: 8.5in;
          margin: 0 auto;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .resume-template {
          padding: 0.5in;
          font-family: 'Times New Roman', serif;
          line-height: 1.4;
        }

        .resume-header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }

        .resume-header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }

        .contact-info, .social-links {
          margin: 0.5rem 0;
          font-size: 12px;
        }

        .contact-info span, .social-links span {
          margin: 0 0.5rem;
        }

        .resume-section {
          margin-bottom: 1rem;
        }

        .resume-section h2 {
          font-size: 16px;
          color: #333;
          border-bottom: 1px solid #333;
          margin-bottom: 0.5rem;
          padding-bottom: 0.2rem;
        }

        .education-item, .experience-item, .project-item {
          margin-bottom: 0.75rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-header h3 {
          margin: 0;
          font-size: 14px;
          color: #333;
        }

        .year, .duration {
          font-size: 12px;
          color: #666;
        }

        .institution, .company {
          font-style: italic;
          font-size: 12px;
          color: #666;
          margin: 0.2rem 0;
        }

        .description, .gpa, .technologies {
          font-size: 11px;
          color: #333;
          margin: 0.2rem 0;
        }

        .skills-list {
          font-size: 12px;
          color: #333;
        }

        .resume-section ul {
          margin: 0;
          padding-left: 1rem;
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }

          .preview-actions {
            flex-direction: column;
            align-items: center;
          }

          .dynamic-item-inline {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
