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
      'Computer Science undergraduate with hands-on experience building full-stack web applications using React, Node.js, and Spring Boot. Skilled in designing RESTful APIs, real-time systems, and database-driven applications, with a strong foundation in data structures, algorithms, and system design. Proven ability to lead technical teams and deliver projects adopted by hundreds of users. Seeking an SDE role to apply strong problem-solving skills and full-stack development experience.',
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
          'Implemented real-time chat and session scheduling using Socket.io, reducing coordination time by 40%.',
          'Designed RESTful APIs and a normalized MongoDB schema, cutting average query response time by 35%.'
        ]
      },
      {
        title: 'Campus Connect – Event Management System',
        tech: 'Java, Spring Boot, MySQL, Thymeleaf',
        period: 'Aug 2025 – Nov 2025',
        bullets: [
          'Developed a college event registration and management system used by 5 student clubs and 800+ students.',
          'Automated email notifications and QR-code based attendance, reducing manual check-in time by 60%.',
          'Deployed the application on Render with CI/CD via GitHub Actions.'
        ]
      },
      {
        title: 'Pathfinders Visualizer – DSA Algorithm Visualization Tool',
        tech: 'JavaScript, HTML5 Canvas, CSS3',
        period: 'Mar 2025 – Apr 2025',
        bullets: [
          "Built an interactive visualizer for Dijkstra's, A*, BFS and DFS pathfinding algorithms on a grid.",
          'Open-sourced on GitHub with 120+ stars and adopted by peers for DSA revision.'
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
      },
      {
        role: 'Coordinator, College Coding Club',
        period: 'Jul 2024 – Jun 2025',
        bullets: [
          'Organized 3 coding contests and 2 hackathons with 300+ combined participants.',
          'Managed logistics, problem-setting, and judging for inter-college competitive programming events.'
        ]
      }
    ],
    achievements: [
      'Hackathon Coordinator – TechFest 2024'
    ]
  });

  const [downloading, setDownloading] = useState(false);

  // Field change helpers
  const handleEduChange = (idx, field, value) => {
    const updated = [...data.education];
    updated[idx][field] = value;
    setData({ ...data, education: updated });
  };

  const handleSkillChange = (field, value) => {
    setData({ ...data, skills: { ...data.skills, [field]: value } });
  };

  const handleProjectChange = (idx, field, value) => {
    const updated = [...data.projects];
    updated[idx][field] = value;
    setData({ ...data, projects: updated });
  };

  const handleProjectBulletChange = (projIdx, bulletIdx, value) => {
    const updated = [...data.projects];
    updated[projIdx].bullets[bulletIdx] = value;
    setData({ ...data, projects: updated });
  };

  const handleRespChange = (idx, field, value) => {
    const updated = [...data.responsibilities];
    updated[idx][field] = value;
    setData({ ...data, responsibilities: updated });
  };

  const handleRespBulletChange = (respIdx, bulletIdx, value) => {
    const updated = [...data.responsibilities];
    updated[respIdx].bullets[bulletIdx] = value;
    setData({ ...data, responsibilities: updated });
  };

  const handleAchievementChange = (idx, value) => {
    const updated = [...data.achievements];
    updated[idx] = value;
    setData({ ...data, achievements: updated });
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-sheet');
    setDownloading(true);

    const opt = {
      margin: 0,
      filename: `${data.name.replace(/\s+/g, '_')}_Resume.pdf`,
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

  return (
    <div className="layout-container">
      {/* Complete All-Field Editor Sidebar */}
      <div className="editor-sidebar no-print">
        <h2 className="editor-title">Resume Live Editor</h2>

        {/* 1. Header Information */}
        <div className="editor-section-box">
          <h3>Personal Details</h3>
          <div className="field-group">
            <label>Full Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Target Role / Subtitle</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>LinkedIn URL</label>
            <input
              type="text"
              value={data.linkedin}
              onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>GitHub URL</label>
            <input
              type="text"
              value={data.github}
              onChange={(e) => setData({ ...data, github: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>LeetCode URL</label>
            <input
              type="text"
              value={data.leetcode}
              onChange={(e) => setData({ ...data, leetcode: e.target.value })}
            />
          </div>
        </div>

        {/* 2. Summary */}
        <div className="editor-section-box">
          <h3>Summary</h3>
          <div className="field-group">
            <textarea
              rows="4"
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
            />
          </div>
        </div>

        {/* 3. Education */}
        <div className="editor-section-box">
          <h3>Education</h3>
          {data.education.map((edu, idx) => (
            <div key={idx} className="sub-item-box">
              <label className="sub-label">Entry #{idx + 1}</label>
              <input
                type="text"
                placeholder="Institution"
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
                placeholder="Duration (e.g. 2023 – 2027)"
                value={edu.period}
                onChange={(e) => handleEduChange(idx, 'period', e.target.value)}
                style={{ marginBottom: '4px' }}
              />
              <input
                type="text"
                placeholder="Relevant Coursework (optional)"
                value={edu.coursework}
                onChange={(e) => handleEduChange(idx, 'coursework', e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* 4. Technical Skills */}
        <div className="editor-section-box">
          <h3>Technical Skills</h3>
          <div className="field-group">
            <label>Languages</label>
            <input
              type="text"
              value={data.skills.languages}
              onChange={(e) => handleSkillChange('languages', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Web Technologies</label>
            <input
              type="text"
              value={data.skills.webTech}
              onChange={(e) => handleSkillChange('webTech', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Databases</label>
            <input
              type="text"
              value={data.skills.databases}
              onChange={(e) => handleSkillChange('databases', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Tools & Platforms</label>
            <input
              type="text"
              value={data.skills.tools}
              onChange={(e) => handleSkillChange('tools', e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>Core Concepts</label>
            <input
              type="text"
              value={data.skills.coreConcepts}
              onChange={(e) => handleSkillChange('coreConcepts', e.target.value)}
            />
          </div>
        </div>

        {/* 5. Projects */}
        <div className="editor-section-box">
          <h3>Projects</h3>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="sub-item-box">
              <label className="sub-label">Project #{idx + 1}</label>
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
                placeholder="Duration"
                value={proj.period}
                onChange={(e) => handleProjectChange(idx, 'period', e.target.value)}
                style={{ marginBottom: '6px' }}
              />
              <label style={{ fontSize: '10px', color: '#64748b' }}>Bullets:</label>
              {proj.bullets.map((b, bIdx) => (
                <textarea
                  key={bIdx}
                  rows="2"
                  value={b}
                  onChange={(e) => handleProjectBulletChange(idx, bIdx, e.target.value)}
                  style={{ marginBottom: '4px', fontSize: '11px' }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* 6. Positions of Responsibility */}
        <div className="editor-section-box">
          <h3>Positions of Responsibility</h3>
          {data.responsibilities.map((resp, idx) => (
            <div key={idx} className="sub-item-box">
              <label className="sub-label">Role #{idx + 1}</label>
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
              {resp.bullets.map((b, bIdx) => (
                <textarea
                  key={bIdx}
                  rows="2"
                  value={b}
                  onChange={(e) => handleRespBulletChange(idx, bIdx, e.target.value)}
                  style={{ marginBottom: '4px', fontSize: '11px' }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* 7. Achievements */}
        <div className="editor-section-box">
          <h3>Achievements & Certifications</h3>
          {data.achievements.map((ach, idx) => (
            <div key={idx} className="field-group">
              <input
                type="text"
                value={ach}
                onChange={(e) => handleAchievementChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button className="export-btn" onClick={handleDownloadPDF} disabled={downloading}>
          {downloading ? 'Generating PDF...' : 'Download Clickable A4 PDF'}
        </button>
      </div>

      {/* A4 Sheet Preview Canvas */}
      <div className="preview-canvas-wrapper">
        <div className="a4-sheet" id="resume-sheet">
          {/* Header */}
          <div className="sheet-header">
            <h1 className="header-name">{data.name}</h1>
            <div className="header-title">{data.title}</div>
            <div className="header-contact">
              {data.location} | {data.phone} | <a href={`mailto:${data.email}`}>{data.email}</a> |{' '}
              <a href={data.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> |{' '}
              <a href={data.github} target="_blank" rel="noreferrer">GitHub</a> |{' '}
              <a href={data.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
            </div>
          </div>

          {/* Summary */}
          <div className="section-head">SUMMARY</div>
          <p className="body-copy">{data.summary}</p>

          {/* Education */}
          <div className="section-head">EDUCATION</div>
          {data.education.map((edu, idx) => (
            <div key={idx} className="block-item">
              <div className="row-split">
                <span className="bold-txt">{edu.institution}</span>
                <span className="date-txt">{edu.period}</span>
              </div>
              <div className="sub-degree">{edu.degree}</div>
              {edu.coursework && (
                <div className="body-copy">
                  <strong>Relevant Coursework:</strong> {edu.coursework}
                </div>
              )}
            </div>
          ))}

          {/* Technical Skills */}
          <div className="section-head">TECHNICAL SKILLS</div>
          <div className="body-copy"><strong>Languages:</strong> {data.skills.languages}</div>
          <div className="body-copy"><strong>Web Technologies:</strong> {data.skills.webTech}</div>
          <div className="body-copy"><strong>Databases:</strong> {data.skills.databases}</div>
          <div className="body-copy"><strong>Tools & Platforms:</strong> {data.skills.tools}</div>
          <div className="body-copy"><strong>Core Concepts:</strong> {data.skills.coreConcepts}</div>

          {/* Projects */}
          <div className="section-head">PROJECTS</div>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="block-item">
              <div className="row-split">
                <span className="bold-txt">{proj.title}</span>
                <span className="date-txt">{proj.period}</span>
              </div>
              <div className="sub-degree">{proj.tech}</div>
              <ul className="sheet-list">
                {proj.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="body-copy">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Positions of Responsibility */}
          <div className="section-head">POSITIONS OF RESPONSIBILITY</div>
          {data.responsibilities.map((resp, idx) => (
            <div key={idx} className="block-item">
              <div className="row-split">
                <span className="bold-txt">{resp.role}</span>
                <span className="date-txt">{resp.period}</span>
              </div>
              <ul className="sheet-list">
                {resp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="body-copy">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Achievements & Certifications */}
          <div className="section-head">ACHIEVEMENTS & CERTIFICATIONS</div>
          <ul className="sheet-list">
            {data.achievements.map((ach, idx) => (
              <li key={idx} className="body-copy">{ach}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
