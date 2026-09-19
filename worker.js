export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const secureKey = (typeof RESEND_API_KEY !== 'undefined') ? RESEND_API_KEY : (env && env.RESEND_API_KEY);

    // 1. ROUTE: Technical Service Consultation Requests
    if (path === "/api/v1/services/request" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const companyName = formData.get("company_name") || "Not Provided";
        const corporateEmail = formData.get("corporate_email") || "Not Provided";
        const coverageScope = formData.get("coverage_scope") || "LOCAL";

        if (!secureKey) throw new Error("RESEND_API_KEY variable is inaccessible.");

        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: { "Authorization": "Bearer " + secureKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "kofiagyei79@gmail.com",
            subject: "🚨 New Audit Request from " + companyName,
            html: `<h3>Okagyeson Defense Network Intake Alert</h3>
                   <p><strong>Company Name:</strong> ${companyName}</p>
                   <p><strong>Corporate Email:</strong> ${corporateEmail}</p>
                   <p><strong>Coverage Scope Target:</strong> ${coverageScope}</p>`
          })
        });

        if (!emailResponse.ok) { const errText = await emailResponse.text(); throw new Error(errText); }
        return new Response("<h1>[SUCCESS] Security Intake Received.</h1><p><a href='/'>Return to dashboard.</a></p>", { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
      } catch (err) { return new Response("<h1>Transmission Failure</h1><p>" + err.message + "</p>", { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }); }
    }

    // 2. ROUTE: Careers Application System Ingest with Attached PDF Document
    if (path === "/api/v1/careers/apply" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const fullName = formData.get("full_name") || "Not Provided";
        const email = formData.get("email") || "Not Provided";
        const targetRegion = formData.get("target_region") || "GLOBAL";
        const appliedRole = formData.get("applied_role") || "Not Provided";
        const file = formData.get("resume");

        if (!secureKey) throw new Error("RESEND_API_KEY variable is inaccessible.");
        if (!file || !(file instanceof File) || file.size === 0) {
          return new Response("<h1>Submission Error</h1><p>Missing PDF file upload.</p>", { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } });
        }

        const fileBuffer = await file.arrayBuffer();
        const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));

        const emailResponse = await fetch("https://resend.com", {
          method: "POST",
          headers: { "Authorization": "Bearer " + secureKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "onboarding@resend.dev",
            to: "kofiagyei79@gmail.com",
            subject: "💼 New Candidate Application: " + appliedRole,
            html: `<h3>New System Operator Application Ingested</h3>
                   <p><strong>Operator Name:</strong> ${fullName}</p>
                   <p><strong>Contact Email:</strong> ${email}</p>
                   <p><strong>Deployment Region:</strong> ${targetRegion}</p>
                   <p><strong>Applied Operational Role:</strong> ${appliedRole}</p>`,
            attachments: [{ filename: file.name || "resume.pdf", content: base64Content }]
          })
        });

        if (!emailResponse.ok) { const errText = await emailResponse.text(); throw new Error(errText); }
        return new Response("<h1>[SUCCESS] Operator Profile Deployed Successfully.</h1><p><a href='/'>Return to dashboard.</a></p>", { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
      } catch (err) { return new Response("<h1>Credential Ingestion Pipeline Error</h1><p>" + err.message + "</p>", { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }); }
    }

    // 3. ROUTE: Serve the Complete Visual User Dashboard Application
    const ui = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Defense Systems</title>
    <style>
        :root{--bg:#070a13;--card:#0f1424;--border:#1c254b;--text:#f2f3f6;--sec:#94a3b8;--blue:#38bdf8;--gold:#fbbf24;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background-color:var(--bg);color:var(--text);font-family:system-ui,sans-serif;padding-top:80px;}
        header{background:rgba(15,20,36,0.9);border-bottom:1px solid var(--border);position:fixed;top:0;width:100%;height:70px;display:flex;align-items:center;z-index:100;backdrop-filter:blur(8px);}
        .nav-box{max-width:1200px;margin:0 auto;width:100%;display:flex;justify-content:space-between;align-items:center;padding:0 2rem;}
        .nav-links{display:flex;list-style:none;gap:1.5rem;}
        .nav-links a{color:var(--sec);text-decoration:none;font-weight:500;cursor:pointer;}
        .nav-links a.active,.nav-links a:hover{color:var(--blue);}
        .btn{background:#0284c7;color:#fff;border:none;padding:0.5rem 1rem;border-radius:4px;font-weight:600;cursor:pointer;}
        main{max-width:1200px;margin:2rem auto;padding:0 2rem;}
        .section{display:none;}
        .section.active{display:block;}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem;margin-bottom:2rem;}
        .card{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:2rem;}
        .card h3{color:var(--blue);font-size:1.1rem;margin-bottom:0.75rem;}
        .card.cred h3{color:var(--gold);}
        .card p{font-size:0.95rem;color:var(--sec);line-height:1.5;}
        .console{background:#020617;border:1px solid var(--border);border-radius:8px;padding:1rem;font-family:monospace;font-size:0.85rem;height:180px;overflow-y:auto;color:#38bdf8;line-height:1.6;margin-top:1rem;}
        .form-group{margin-bottom:1.25rem;}
        .form-group label{display:block;margin-bottom:0.5rem;color:var(--sec);font-size:0.9rem;}
        .form-group input,.form-group select{width:100%;padding:0.75rem;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:#fff;font-size:1rem;}
        .form-group input[type="file"]{padding:0.5rem;background:var(--bg);border:1px dashed var(--border);color:var(--sec);cursor:pointer;}
    </style>
</head>
<body>
    <header><div class="nav-box"><div style="font-weight:700;font-size:1.3rem;">🛡️ Okagyeson <span style="color:var(--blue);">Defense</span></div><ul class="nav-links"><li><a onclick="showTab('services')" id="link-services" class="active">Our Services & Capabilities</a></li><li><a onclick="showTab('intake')" id="link-intake">Request Audit</a></li><li><a onclick="showTab('careers')" id="link-careers">Careers</a></li></ul><button class="btn" onclick="showTab('intake')">Contact Node</button></div></header>
    <main>
        <div id="sec-services" class="section active">
            <div style="margin-bottom:2rem;text-align:center;"><h1 style="font-size:2.2rem;margin-bottom:0.5rem;">Enterprise Defensive Cyber Capabilities</h1><p style="color:var(--sec);">Operational Excellence in High-Compliance Digital Warfare Countermeasures</p></div>
            <div class="grid">
                <div class="card"><h3>🛡️ Ethical Penetration Testing</h3><p>Simulating adversarial threat behaviors to target, probe, and uncover hidden structural flaws before malicious operators exploit them.</p></div>
                <div class="card"><h3>⚖️ Regulatory Compliance Systems</h3><p>Hardening network infrastructure scopes to strictly align with global data protection criteria benchmarks.</p></div>
                <div class="card"><h3>👁️ Real-Time SOC Telemetry</h3><p>Continuous network node perimeter surveillance. Intercepting traffic flows to isolate, contain, and neutralize anomalous payloads instantly.</p></div>
            </div>
            <div style="margin:3rem 0 1.5rem 0;text-align:center;"><h2 style="font-size:1.8rem;margin-bottom:0.5rem;">Verified Operator Credentials & Qualifications</h2><p style="color:var(--sec);">Certified Cybersecurity Expertise Mapping Internationally Recognized Standards</p></div>
            <div class="grid">
                <div class="card cred"><h3>🎓 Professional Education</h3><p><strong>BSc in Cybersecurity & Network Engineering</strong><br>Rigorous academic specialization in safe code architectures, advanced data traffic parsing, system hardening, and cryptography.</p></div>
                <div class="card cred"><h3>🏅 Technical Certifications</h3><p><strong>Certified Defensive Infrastructure Operator</strong><br>Validated mastery across enterprise packet inspection pipeline controls, threat countermeasure execution, and regulatory compliance.</p></div>
                <div class="card cred"><h3>🔑 Operational Clearances</h3><p><strong>Secure Cloud Perimeter Access Authority</strong><br>Authorized administration privileges across cloud-native application network switches, secure API gateways, and distributed clusters.</p></div>
            </div>
            <h3 style="margin:2rem 0 0.5rem 0;color:var(--sec);font-size:1rem;text-transform:uppercase;">Active Gateway Matrix Logs</h3>
ode perimeter surveillance. Intercepting traffic flows to isolate, contain, and neutralize anomalous payloads instantly.</p></div>
            </div>
            <div style="margin:3rem 0 1.5rem 0;text-align:center;"><h2 style="font-size:1.8rem;margin-bottom:0.5rem;">Verified Operator Credentials & Qualifications</h2><p style="color:var(--sec);">Certified Cybersecurity Expertise Mapping Internationally Recognized Standards</p></div>
            <div class="grid">
                <div class="card cred"><h3>🎓 Professional Education</h3><p><strong>BSc in Cybersecurity & Network Engineering</strong><br>Rigorous academic specialization in safe code architectures, advanced data traffic parsing, system hardening, and cryptography.</p></div>
                <div class="card cred"><h3>🏅 Technical Certifications</h3><p><strong>Certified Defensive Infrastructure Operator</strong><br>Validated mastery across enterprise packet inspection pipeline controls, threat countermeasure execution, and regulatory compliance.</p></div>
                <div class="card cred"><h3>🔑 Operational Clearances</h3><p><strong>Secure Cloud Perimeter Access Authority</strong><br>Authorized administration privileges across cloud-native application network switches, secure API gateways, and distributed clusters.</p></div>
            </div>
            <h3 style="margin:2rem 0 0.5rem 0;color:var(--sec);font-size:1rem;text-transform:uppercase;">Active Gateway Matrix Logs</h3>
            <div class="console">[SYSTEM OK] Okagyeson Perimeter Defensive Shunts Online.<br>[AUDIT] Multi-tier penetration verification frameworks fully deployed.<br>[VERIFIED] Operator credential matrix loaded successfully.<br>[READY] Accepting global B2B corporate assessment profiles.</div>
        </div>

        <div id="sec-intake" class="section">
            <h2 style="margin-bottom:1.5rem;text-align:center;">Initiate Security Infrastructure Audit</h2>
            <div class="card" style="max-width:600px;margin:0 auto;">
                <form action="/api/v1/services/request" method="POST">
                    <div class="form-group"><label>Company Name</label><input type="text" name="company_name" required></div>
                    <div class="form-group"><label>Corporate Email</label><input type="email" name="corporate_email" required></div>
                    <div class="form-group"><label>Coverage Target Tier</label>
                        <select name="coverage_scope">
                            <option value="LOCAL">Ethical Pentesting Scan (Local)</option>
                            <option value="REGIONAL">Full Infrastructure Compliance Review</option>
                            <option value="INTERCONTINENTAL">Global SOC Telemetry Deployment</option>
                        </select>
                    </div>
                    <button type="submit" class="btn" style="width:100%;padding:0.75rem;font-weight:bold;">Transmit Intake Profile</button>
                </form>
            </div>
        </div>

        <div id="sec-careers" class="section">
            <h2 style="margin-bottom:1.5rem;text-align:center;">Global Recruitment Pipeline</h2>
            <div class="card" style="max-width:600px;margin:0 auto;">
                <form action="/api/v1/careers/apply" method="POST" enctype="multipart/form-data">
                    <div class="form-group"><label>Full Name</label><input type="text" name="full_name" required></div>
                    <div class="form-group"><label>Email Address</label><input type="email" name="email" required></div>
                    <div class="form-group"><label>Target Deployment Region</label>
                        <select name="target_region">
                            <option value="GLOBAL">Global Node Matrix</option>
                            <option value="NORTH_AMERICA">North America Perimeter</option>
                            <option value="EUROPE">EMEA Systems</option>
                        </select>
                    </div>
                    <div class="form-group"><label>Applied Operational Role</label><input type="text" name="applied_role" placeholder="e.g. SOC Analyst, Security Engineer" required></div>
                    <div class="form-group">
                        <label>Operational Credentials / Resume (PDF Only)</label>
                        <input type="file" name="resume" accept=".pdf" required>
                    </div>
                    <button type="submit" class="btn" style="width:100%;padding:0.75rem;font-weight:bold;">Submit Operational Profile</button>
                </form>
            </div>
        </div>
    </main>

    <script>
        function showTab(id) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            document.getElementById('sec-' + id).classList.add('active');
            document.getElementById('link-' + id).classList.add('active');
        }
    </script>
</body>
</html>\`;

    return new Response(ui, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
