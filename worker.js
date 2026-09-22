export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const secureKey = env.RESEND_API_KEY;

    // ========================================================
    // ROUTE 1: LEADS / SECURE CLIENT AUDIT TICKET INGESTION
    // ========================================================
    if (path === "/api/v1/services/request" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const companyName = formData.get("company_name") || "Not Provided";
        const corporateEmail = formData.get("email") || "Not Provided";
        const details = formData.get("details") || "Not Provided";
        const severity = formData.get("severity") || "low";

        // Verified REST API gateway pathing
        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: { 
            "Authorization": "Bearer " + secureKey, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            from: "Okagyeson Intake <onboarding@resend.dev>",
            to: "kofiagyei79@gmail.com",
            subject: `🚨 [${severity.toUpperCase()}] New Client Ticket from ${companyName}`,
            html: `<h3>Okagyeson Defense Portal Client Intake</h3>
                   <p><strong>Company Name:</strong> ${companyName}</p>
                   <p><strong>Corporate Contact Email:</strong> ${corporateEmail}</p>
                   <p><strong>Severity Priority Level:</strong> ${severity.toUpperCase()}</p>
                   <p><strong>Log Excerpts & Context:</strong></p>
                   <pre style="background:#f1f5f9; padding:15px; border-radius:4px; color:#0f172a;">${details}</pre>`
          })
        });

        if (!emailResponse.ok) { 
          const errText = await emailResponse.text(); 
          throw new Error(errText); 
        }
        
        return new Response("<h1>[SUCCESS] Encrypted Ticket Transmitted Successfully.</h1><p><a href='/'>Return to main nodes dashboard.</a></p>", { 
          status: 200, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
      } catch (err) { 
        return new Response("<h1>Transmission Failure</h1><p>" + err.message + "</p>", { 
          status: 500, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        }); 
      }
    }

    // ========================================================
    // ROUTE 2: CAREERS APPLICATION ROUTER WITH MEMORY-SAFE PDF
    // ========================================================
    if (path === "/api/v1/careers/apply" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const fullName = formData.get("full_name") || "Not Provided";
        const applicantEmail = formData.get("email") || "Not Provided";
        const appliedRole = formData.get("primary_skill") || "Not Provided";
        const bio = formData.get("bio") || "Not Provided";
        const file = formData.get("resume");

        if (!file || !(file instanceof File) || file.size === 0) {
          return new Response("<h1>Submission Error</h1><p>Missing credentials attachment element. A PDF file upload is mandatory.</p>", { 
            status: 400, 
            headers: { "Content-Type": "text/html; charset=utf-8" } 
          });
        }

        // Memory-safe block conversion loop for large enterprise resumes
        const fileBuffer = await file.arrayBuffer();
        const uint8 = new Uint8Array(fileBuffer);
        let binaryStr = "";
        const chunkSize = 0xffff; 
        for (let i = 0; i < uint8.length; i += chunkSize) {
          binaryStr += String.fromCharCode.apply(null, uint8.subarray(i, i + chunkSize));
        }
        const base64Content = btoa(binaryStr);

        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: { 
            "Authorization": "Bearer " + secureKey, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            from: "Okagyeson Careers <onboarding@resend.dev>",
            to: "kofiagyei79@gmail.com", 
            reply_to: applicantEmail,
            subject: `🛡️ New Application: ${fullName} - ${appliedRole}`,
            html: `<h3>System Operator Application Log Ingested</h3>
                   <p><strong>Applicant Name:</strong> ${fullName}</p>
                   <p><strong>Contact Email:</strong> ${applicantEmail}</p>
                   <p><strong>Specialization Area:</strong> ${appliedRole}</p>
                   <p><strong>Profile Summary Statement:</strong></p>
                   <p style="background:#f1f5f9; padding:15px; border-radius:4px; color:#0f172a;">${bio}</p>
                   <p>The candidate's original resume document context is attached below.</p>`,
            attachments: [{ 
              filename: file.name || "resume.pdf", 
              content: base64Content,
              contentType: "application/pdf"
            }]
          })
        });

        if (!emailResponse.ok) { 
          const errText = await emailResponse.text(); 
          throw new Error(errText); 
        }
        
        return new Response("<h1>[SUCCESS] Application Profile Deployed.</h1><p>Our security operators will review your credentials context. <a href='/'>Return to main dashboard.</a></p>", { 
          status: 200, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        });
      } catch (err) { 
        return new Response("<h1>Submission Failure</h1><p>" + err.message + "</p>", { 
          status: 500, 
          headers: { "Content-Type": "text/html; charset=utf-8" } 
        }); 
      }
    }

    // ========================================================
    // ROUTE 3: FULL DYNAMIC STATIC ENTERPRISE PORTAL INTERFACE
    // ========================================================
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Cyber Defense LLC | Enterprise Portal</title>
    <style>
        :root {
            --primary: #0f172a;
            --secondary: #1e3a8a;
            --accent: #3b82f6;
            --text: #1e293b;
            --light: #f8fafc;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0; padding: 0; color: var(--text); background: var(--light); line-height: 1.6;
        }
        header {
            background: var(--primary); color: white; padding: 20px 5%; display: flex;
            justify-content: space-between; align-items: center; border-bottom: 3px solid var(--accent);
        }
        .container { max-width: 900px; margin: 40px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .hero { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: white; text-align: center; padding: 40px 20px; border-radius: 8px; margin-bottom: 30px; }
        .hero h1 { margin: 0 0 10px 0; font-size: 2.2rem; }
        .hero p { color: #93c5fd; margin: 0; font-size: 1.1rem; }
        .form-section { margin-bottom: 40px; padding-bottom: 30px; border-bottom: 1px solid #e2e8f0; }
        .form-section h2 { color: var(--secondary); border-left: 4px solid var(--accent); padding-left: 10px; margin-top: 0; }
        label { display: block; margin: 12px 0 6px 0; font-weight: 600; font-size: 0.9rem; }
        input, textarea, select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; font-size: 1rem; }
        input:focus, textarea:focus, select:focus { outline: 2px solid var(--accent); }
        button { background: var(--accent); color: white; border: none; padding: 12px 24px; font-size: 1rem; font-weight: bold; border-radius: 4px; cursor: pointer; transition: background 0.2s; margin-top: 15px; }
        button:hover { background: #2563eb; }
    </style>
</head>
<body>
    <header>
        <div style="font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">🛡️ OKAGYESON DEFENSE</div>
    </header>
    <div class="container">
        <div class="hero">
            <h1>Okagyeson Cyber Defense LLC</h1>
            <p>Managed Detection, Regulatory Compliance, &amp; Enterprise Architecture Securing Global Infrastructures</p>
        </div>

        <!-- FORM 1: CLIENT SERVICE INTAKE -->
        <div class="form-section">
            <h2>Incident Response &amp; Security Audit Request</h2>
            <form action="/api/v1/services/request" method="POST">
                <label for="company_name">Company / Organization Name</label>
                

                <label for="email">Corporate Contact Email</label>
                <input type="email" id="email" name="email" placeholder="operator@yourcompany.com" required>

                <label for="severity">Operational Priority Status</label>
                <select id="severity" name="severity">
                    <option value="low">Low - Routine Compliance / Scoping Audit</option>
                    <option value="medium">Medium - Vulnerability Management Analysis</option>
                    <option value="high">High - Active Network Compromise Threat Alert</option>
                </select>

                <label for="details">Log Excerpts / Operational Request Context</label>
                <textarea id="details" name="details" rows="5" placeholder="Paste syslog data or system infrastructure requirements..." required></textarea>

                <button type="submit">Transmit Encrypted Security Request</button>
            </form>
        </div>
                <!-- FORM 2: CAREERS SUBMISSION -->
        <div class="form-section" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
            <h2>Cyber Security Operations - Application Portal</h2>
            <form action="/api/v1/careers/apply" method="POST" enctype="multipart/form-data">
                <label for="full_name">Full Candidate Legal Name</label>
                <input type="text" id="full_name" name="full_name" placeholder="John Doe" required>

                <label for="email">Personal Operator Email</label>
                <input type="email" id="email" name="email" placeholder="candidate@email.com" required>

                <label for="primary_skill">Core Engineering Specialization</label>
                <select id="primary_skill" name="primary_skill">
                    <option value="soc_analyst">SOC Analyst / Threat Hunting Expert</option>
                    <option value="siem_engineer">SIEM Architecture Specialist (QRadar/Splunk)</option>
                    <option value="compliance_auditor">Healthcare Infrastructure Compliance Officer</option>
                    <option value="network_security">Perimeter Security Engineer (CCNA/pfSense)</option>
                </select>

                <label for="bio">Professional Profile &amp; Lab Experience Statement</label>
                <textarea id="bio" name="bio" rows="4" placeholder="Summarize your home lab configurations..." required></textarea>

                <label for="resume">Attach Credentials Record (Mandatory PDF format)</label>
                <input type="file" id="resume" name="resume" accept="application/pdf" required>

                <button type="submit">Deploy Engineering Application Profile</button>
            </form>
        </div>
    </div>
</body>
</html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};


