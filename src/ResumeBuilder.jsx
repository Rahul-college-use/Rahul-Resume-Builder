import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './ResumeBuilder.css';

export default function ResumeBuilder() {
  const [data, setData] = useState({
    name: 'RAHUL KUMAR',
    title: 'B.Tech Computer Science Engineering | Aspiring Software Development Engineer',
    location: 'Patna, Bihar, India',
    phone: '+91 91998 55936',
    email: 'rahul.cse@gmail.com',
    linkedin: 'https://linkedin.com/in/rahul-kumar',
    github: 'https://github.com/rahulkumar',
    leetcode: 'https://leetcode.com/rahulkumar',
    summary:
      'Computer Science undergraduate with hands-on experience building full-stack web applications using React, Node.js, and Spring Boot. Skilled in designing RESTful APIs, real-time systems, and database-driven applications, with a strong foundation in data structures, algorithms, and system design.',
    education: [
      {
        institution: 'Government Engineering College Jehanabad, Jehanabad',
        degree: 'Bachelor of Technology in Computer Science and Engineering | CGPA: 7.1 / 10',
        period: '2023 – 2027',
        coursework: 'Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks'
      },
      {
        institution: 'Bindeshwar Singh College, Danapur',
        degree: 'Senior Secondary (CBSE), PCM | 77.0%',
        period: '2020 – 2022',
        coursework: ''
      }
    ],
    skills: {
      languages: 'C, Java, Python, JavaScript, PHP, SQL',
      webTech: 'React.js, Node.js, Express.js, HTML5, CSS3, REST APIs',
      databases: 'MySQL, MongoDB',
      tools: 'Git, GitHub, Postman, VS Code, Linux',
      coreConcepts: 'Data Structures & Algorithms, OOP, System Design Basics, DBMS, Operating Systems, Computer Networks'
    },
    projects: [
      {
        title: 'Skill Swap – Peer-to-Peer Learning Platform',
        tech: 'React.js, Node.js, Express.js, MongoDB, Socket.io',
        period: 'Jan 2026 – Mar 2026',
        bullets: [
          'Built a full-stack platform enabling students to exchange skills via live video sessions, serving 300+ registered test users.',
          'Implemented real-time chat and session scheduling using Socket.io, reducing coordination time by 40%.'
        ]
      },
      {
        title: 'Campus Connect – Event Management System',
        tech: 'Java, Spring Boot, MySQL, Thymeleaf',
        period: 'Aug 2025 – Nov 2025',
        bullets: [
          'Developed a college event registration and management system used by 5 student clubs and 800+ students.',
          'Automated email notifications and QR-code based attendance, reducing manual check-in time by 60%.'
        ]
      }
    ],
    responsibilities: [
      {
        role: 'Technical Lead, Google Developer Student Club (GDSC)',
        period: 'Aug 2026 – Present',
        bullets: [
          'Led a team of 8 members to organize 4 technical workshops attended by 200+ students.'
        ]
      }
    ],
    achievements: [
      'Hackathon Coordinator – TechFest 2024'
    ]
  });

  const [downloading, setDownloading] = useState(false);

  // Education handlers
  const handleEduChange = (idx, field, value) => {
    const updated = [...data.education];
    updated[idx][field] = value;
    setData({ ...data, education: updated });
  };
  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { institution: '', degree: '', period: '', coursework: '' }]
    });
  };
  const removeEducation = (idx) => {
    setData({ ...data, education: data.education.filter((_, i) => i !== idx) });
  };

  // Skill handler
  const handleSkillChange = (field, value) => {
    setData({ ...data, skills: { ...data.skills, [field]: value } });
  };

  // Projects handlers
  const handleProjectChange = (idx, field, value) => {
    const updated = [...data.projects];
    updated[idx][field] = value;
    setData({ ...data, projects: updated });
  };
  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: '', tech: '', period: '', bullets: [''] }]
    });
  };
  const removeProject = (idx) => {
    setData({ ...data, projects: data.projects.filter((_, i) => i !== idx) });
  };
  const handleProjectBulletChange = (projIdx, bIdx, value) => {
    const updated = [...data.projects];
    updated[projIdx].bullets[bIdx] = value;
    setData({ ...data, projects: updated });
  };
  const addProjectBullet = (projIdx) => {
    const updated = [...data.projects];
    updated[projIdx].bullets.push('');
    setData({ ...data, projects: updated });
  };
  const removeProjectBullet = (projIdx, bIdx) => {
    const updated = [...data.projects];
    updated[projIdx].bullets = updated[projIdx].bullets.filter((_, i) => i !== bIdx);
    setData({ ...data, projects: updated });
  };

  // Responsibilities handlers
  const handleRespChange = (idx, field, value) => {
    const updated = [...data.responsibilities];
    updated[idx][field] = value;
    setData({ ...data, responsibilities: updated });
  };
  const addResponsibility = () => {
    setData({
      ...data,
      responsibilities: [...data.responsibilities, { role: '', period: '', bullets: [''] }]
    });
  };
  const removeResponsibility = (idx) => {
    setData({ ...data, responsibilities: data.responsibilities.filter((_, i) => i !== idx) });
  };
  const handleRespBulletChange = (respIdx, bIdx, value) => {
    const updated = [...data.responsibilities];
    updated[respIdx].bullets[bIdx] = value;
    setData({ ...data, responsibilities: updated });
  };
  const addRespBullet = (respIdx) => {
    const updated = [...data.responsibilities];
    updated[respIdx].bullets.push('');
    setData({ ...data, responsibilities: updated });
  };
  const removeRespBullet = (respIdx, bIdx) => {
    const updated = [...data.responsibilities];
    updated[respIdx].bullets = updated[respIdx].bullets.filter((_, i) => i !== bIdx);
    setData({ ...data, responsibilities: updated });
  };

  // Achievements handlers
  const handleAchievementChange = (idx, value) => {
    const updated = [...data.achievements];
    updated[idx] = value;
    setData({ ...data, achievements: updated });
  };
  const addAchievement = () => {
    setData({ ...data, achievements: [...data.achievements, ''] });
  };
  const removeAchievement = (idx) => {
    setData({ ...data, achievements: data.achievements.filter((_, i) => i !== idx) });
  };

  // Single-Page PDF Download
  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-sheet');
    setDownloading(true);

    const opt = {
      margin: 0,
      filename: `${(data.name || 'Resume').replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setDownloading(false))
      .catch((err) => {
        console.error(err);
        setDownloading(false);
      });
  };

  const hasAnySkill = Object.values(data.skills).some((val) => val && val.trim() !== '');

  return (
    <div className="layout-container">
      {/* Dynamic Full-Control Sidebar */}
      <div className="editor-sidebar no-print">
        <h2 className="editor-title">Resume Customizer</h2>

        {/* 1. Header Details */}
        <div className="editor-section-box">
          <h3>Contact & Header</h3>
          <div className="field-group">
            <label>Full Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Rahul Kumar"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Target Role (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Software Development Engineer"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Location (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Patna, Bihar, India"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Phone (Optional)</label>
            <input
              type="text"
              placeholder="e.g. +91 91998 55936"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Email (Optional)</label>
            <input
              type="email"
              placeholder="e.g. rahul.cse@gmail.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>LinkedIn URL (Optional)</label>
            <input
              type="text"
              placeholder="e.g. https://linkedin.com/in/..."
              value={data.linkedin}
              onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>GitHub URL (Optional)</label>
            <input
              type="text"
              placeholder="e.g. https://github.com/..."
              value={data.github}
              onChange={(e) => setData({ ...data, github: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>LeetCode URL (Optional)</label>
            <input
              type="text"
              placeholder="e.g. https://leetcode.com/..."
              value={data.leetcode}
              onChange={(e) => setData({ ...data, leetcode: e.target.value })}
            />
          </div>
        </div>

        {/* 2. Summary */}
        <div className="editor-section-box">
          <h3>Professional Summary</h3>
          <div className="field-group">
            <textarea
              rows="3"
              placeholder="Leave empty to hide summary..."
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
            />
          </div>
        </div>

        {/* 3. Education */}
        <div className="editor-section-box">
          <div className="section-head-bar">
            <h3>Education</h3>
            <button className="add-btn" onClick={addEducation}>+ Add</button>
          </div>
          {data.education.map((edu, idx) => (
            <div key={idx} className="sub-item-box">
              <div className="item-action-bar">
                <span className="sub-label">Entry #{idx + 1}</span>
                <button className="del-btn" onClick={() => removeEducation(idx)}>Remove</button>
              </div>
              <input
                type="text"
                placeholder="Institution Name"
                value={edu.institution}
                onChange={(e) => handleEduChange(idx, 'institution', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Degree / Percentage"
                value={edu.degree}
                onChange={(e) => handleEduChange(idx, 'degree', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Period (e.g. 2023 – 2027)"
                value={edu.period}
                onChange={(e) => handleEduChange(idx, 'period', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Coursework (Optional)"
                value={edu.coursework}
                onChange={(e) => handleEduChange(idx, 'coursework', e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* 4. Technical Skills */}
        <div className="editor-section-box">
          <h3>Technical Skills (Optional)</h3>
          <div className="field-group">
            <label>Languages</label>
            <input
              type="text"
              placeholder="e.g. C, Java, Python"
              value={data.skills.languages}
              onChange={(e) => handleSkillChange('languages', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Web Technologies</label>
            <input
              type="text"
              placeholder="e.g. React.js, Node.js, Express.js"
              value={data.skills.webTech}
              onChange={(e) => handleSkillChange('webTech', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Databases</label>
            <input
              type="text"
              placeholder="e.g. MySQL, MongoDB"
              value={data.skills.databases}
              onChange={(e) => handleSkillChange('databases', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Tools & Platforms</label>
            <input
              type="text"
              placeholder="e.g. Git, GitHub, Postman"
              value={data.skills.tools}
              onChange={(e) => handleSkillChange('tools', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Core Concepts</label>
            <input
              type="text"
              placeholder="e.g. DSA, OOP, DBMS, OS"
              value={data.skills.coreConcepts}
              onChange={(e) => handleSkillChange('coreConcepts', e.target.value)}
            />
          </div>
        </div>

        {/* 5. Projects */}
        <div className="editor-section-box">
          <div className="section-head-bar">
            <h3>Projects</h3>
            <button className="add-btn" onClick={addProject}>+ Add Project</button>
          </div>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="sub-item-box">
              <div className="item-action-bar">
                <span className="sub-label">Project #{idx + 1}</span>
                <button className="del-btn" onClick={() => removeProject(idx)}>Remove</button>
              </div>
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Tech Stack"
                value={proj.tech}
                onChange={(e) => handleProjectChange(idx, 'tech', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Duration (e.g. Jan 2026 – Mar 2026)"
                value={proj.period}
                onChange={(e) => handleProjectChange(idx, 'period', e.target.value)}
                style={{ marginBottom: '6px' }}
              />
              <div className="item-action-bar">
                <label style={{ fontSize: '10px', color: '#64748b' }}>Bullets</label>
                <button className="mini-add-btn" onClick={() => addProjectBullet(idx)}>+ Bullet</button>
              </div>
              {proj.bullets.map((b, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  <input
                    type="text"
                    placeholder="Bullet point description"
                    value={b}
                    onChange={(e) => handleProjectBulletChange(idx, bIdx, e.target.value)}
                  />
                  <button className="mini-del-btn" onClick={() => removeProjectBullet(idx, bIdx)}>✕</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 6. Positions of Responsibility */}
        <div className="editor-section-box">
          <div className="section-head-bar">
            <h3>Positions of Responsibility</h3>
            <button className="add-btn" onClick={addResponsibility}>+ Add Role</button>
          </div>
          {data.responsibilities.map((resp, idx) => (
            <div key={idx} className="sub-item-box">
              <div className="item-action-bar">
                <span className="sub-label">Role #{idx + 1}</span>
                <button className="del-btn" onClick={() => removeResponsibility(idx)}>Remove</button>
              </div>
              <input
                type="text"
                placeholder="Role / Title"
                value={resp.role}
                onChange={(e) => handleRespChange(idx, 'role', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Duration"
                value={resp.period}
                onChange={(e) => handleRespChange(idx, 'period', e.target.value)}
                style={{ marginBottom: '6px' }}
              />
              <div className="item-action-bar">
                <label style={{ fontSize: '10px', color: '#64748b' }}>Bullets</label>
                <button className="mini-add-btn" onClick={() => addRespBullet(idx)}>+ Bullet</button>
              </div>
              {resp.bullets.map((b, bIdx) => (
                <div key={bIdx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  <input
                    type="text"
                    placeholder="Bullet point description"
                    value={b}
                    onChange={(e) => handleRespBulletChange(idx, bIdx, e.target.value)}
                  />
                  <button className="mini-del-btn" onClick={() => removeRespBullet(idx, bIdx)}>✕</button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 7. Achievements */}
        <div className="editor-section-box">
          <div className="section-head-bar">
            <h3>Achievements & Certifications</h3>
            <button className="add-btn" onClick={addAchievement}>+ Add</button>
          </div>
          {data.achievements.map((ach, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
              <input
                type="text"
                placeholder="Achievement / Certificate description"
                value={ach}
                onChange={(e) => handleAchievementChange(idx, e.target.value)}
              />
              <button className="mini-del-btn" onClick={() => removeAchievement(idx)}>✕</button>
            </div>
          ))}
        </div>

        <button className="export-btn" onClick={handleDownloadPDF} disabled={downloading}>
          {downloading ? 'Generating Single Page PDF...' : 'Download Clickable A4 PDF'}
        </button>
      </div>

      {/* A4 Sheet Preview Canvas */}
      <div className="preview-canvas-wrapper">
        <div className="a4-sheet" id="resume-sheet">
          {/* Header */}
          <div className="sheet-header">
            {data.name && <h1 className="header-name">{data.name}</h1>}
            {data.title && <div className="header-title">{data.title}</div>}
            <div className="header-contact">
              {data.location && <span>{data.location}</span>}
              {data.location && data.phone && <span> | </span>}
              {data.phone && <span>{data.phone}</span>}
              {(data.location || data.phone) && data.email && <span> | </span>}
              {data.email && <a href={`mailto:${data.email}`}>{data.email}</a>}
              {data.linkedin && <span> | <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>}
              {data.github && <span> | <a href={data.github} target="_blank" rel="noreferrer">GitHub</a></span>}
              {data.leetcode && <span> | <a href={data.leetcode} target="_blank" rel="noreferrer">LeetCode</a></span>}
            </div>
          </div>

          {/* Summary (Optional) */}
          {data.summary && data.summary.trim() !== '' && (
            <>
              <div className="section-head">SUMMARY</div>
              <p className="body-copy">{data.summary}</p>
            </>
          )}

          {/* Education (Optional) */}
          {data.education.length > 0 && (
            <>
              <div className="section-head">EDUCATION</div>
              {data.education.map((edu, idx) => (
                <div key={idx} className="block-item">
                  <div className="row-split">
                    <span className="bold-txt">{edu.institution}</span>
                    <span className="date-txt">{edu.period}</span>
                  </div>
                  {edu.degree && <div className="sub-degree">{edu.degree}</div>}
                  {edu.coursework && (
                    <div className="body-copy">
                      <strong>Relevant Coursework:</strong> {edu.coursework}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {/* Technical Skills (Optional) */}
          {hasAnySkill && (
            <>
              <div className="section-head">TECHNICAL SKILLS</div>
              {data.skills.languages && <div className="body-copy"><strong>Languages:</strong> {data.skills.languages}</div>}
              {data.skills.webTech && <div className="body-copy"><strong>Web Technologies:</strong> {data.skills.webTech}</div>}
              {data.skills.databases && <div className="body-copy"><strong>Databases:</strong> {data.skills.databases}</div>}
              {data.skills.tools && <div className="body-copy"><strong>Tools & Platforms:</strong> {data.skills.tools}</div>}
              {data.skills.coreConcepts && <div className="body-copy"><strong>Core Concepts:</strong> {data.skills.coreConcepts}</div>}
            </>
          )}

          {/* Projects (Optional) */}
          {data.projects.length > 0 && (
            <>
              <div className="section-head">PROJECTS</div>
              {data.projects.map((proj, idx) => (
                <div key={idx} className="block-item">
                  <div className="row-split">
                    <span className="bold-txt">{proj.title}</span>
                    <span className="date-txt">{proj.period}</span>
                  </div>
                  {proj.tech && <div className="sub-degree">{proj.tech}</div>}
                  <ul className="sheet-list">
                    {proj.bullets.filter(b => b.trim() !== '').map((bullet, bIdx) => (
                      <li key={bIdx} className="body-copy">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* Positions of Responsibility (Optional) */}
          {data.responsibilities.length > 0 && (
            <>
              <div className="section-head">POSITIONS OF RESPONSIBILITY</div>
              {data.responsibilities.map((resp, idx) => (
                <div key={idx} className="block-item">
                  <div className="row-split">
                    <span className="bold-txt">{resp.role}</span>
                    <span className="date-txt">{resp.period}</span>
                  </div>
                  <ul className="sheet-list">
                    {resp.bullets.filter(b => b.trim() !== '').map((bullet, bIdx) => (
                      <li key={bIdx} className="body-copy">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}

          {/* Achievements & Certifications (Optional) */}
          {data.achievements.filter(a => a.trim() !== '').length > 0 && (
            <>
              <div className="section-head">ACHIEVEMENTS & CERTIFICATIONS</div>
              <ul className="sheet-list">
                {data.achievements.filter(a => a.trim() !== '').map((ach, idx) => (
                  <li key={idx} className="body-copy">{ach}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
