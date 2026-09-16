export default {export default {
  async fetch(request, env, ctx) {
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Cyber Defense LLC</title>
    <style>
        :root { --bg: #02040a; --surf: #0d1117; --card: #161b22; --border: #30363d; --primary: #58a6ff; --green: #2ea44f; --text: #c9d1d9; --white: #f0f6fc; --mute: #8b949e; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; padding-top: 70px; }
        header { background: rgba(13,17,23,0.9); border-bottom: 1px solid var(--border); position: fixed; top: 0; width: 100%; z-index: 1000; }
        .nav-c { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
        nav ul { display: flex; list-style: none; gap: 2rem; }
        nav a { color: var(--mute); text-decoration: none; font-weight: 600; cursor: pointer; }
        nav a:hover, nav a.active { color: var(--primary); }
        .btn { background: var(--green); color: var(--white); border: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .hero { padding: 6rem 2rem 4rem 2rem; text-align: center; background: radial-gradient(circle, #161b22 0%, var(--bg) 70%); border-bottom: 1px solid var(--border); }
        .hero h1 { font-size: 2.8rem; font-weight: 800; color: var(--white); margin-bottom: 1rem; }
        .hero p { max-width: 750px; margin: 0 auto 2rem auto; color: var(--mute); font-size: 1.1rem; }
        .comp-box { max-width: 1200px; margin: 2rem auto 0 auto; background: var(--surf); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; display: flex; gap: 1.5rem; align-items: center; }
        main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .view { display: none; }
        .view.active { display: block; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
        .card { background: var(--surf); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; position: relative; }
        .price { font-size: 2.2rem; font-weight: 800; color: var(--white); margin: 1rem 0; font-family: monospace; }
        .flist { list-style: none; margin: 1.5rem 0; border-top: 1px solid var(--border); padding-top: 1rem; color: var(--mute); }
        .flist li::before { content: "✓ "; color: var(--primary); font-weight: 800; }
        .terminal { background: #010409; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; font-family: monospace; height: 250px; overflow-y: auto; color: var(--primary); }
        .overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; align-items: center; justify-content: center; }
        .modal { background: var(--surf); border: 1px solid var(--border); border-radius: 12px; padding: 2.5rem; max-width: 480px; width: 100%; position: relative; }
        .close { position: absolute; top: 1rem; right: 1rem; cursor: pointer; color: var(--mute); font-size: 1.5rem; }
        .f-grp { margin-bottom: 1.25rem; }
        .f-grp label { display: block; font-size: 0.85rem; color: var(--mute); margin-bottom: 0.4rem; font-weight: 600; }
        .f-grp input, .f-grp select, .f-grp textarea { width: 100%; background: var(--bg); border: 1px solid var(--border); padding: 0.7rem; border-radius: 6px; color: var(--white); font-family: inherit; }
    </style>
</head>
<body>
    <header>
        <div class="nav-c">
            <div class="brand-logo" style="font-weight:800; color:var(--white);">🛡️ Okagyeson <span style="color:var(--primary);">Cyber Defense</span></div>
            <nav>
                <ul>
                    <li><a onclick="show('soc')" id="m-soc" class="active">SOC Center</a></li>
                    <li><a onclick="show('matrix')" id="m-matrix">Core Offerings</a></li>
                    <li><a onclick="show('careers')" id="m-careers">Careers Portal</a></li>
                </ul>
            </nav>
            <button class="btn" onclick="modal('audit-m', true)">Consultation</button>
        </div>
    </header>

    <div class="hero">
        <h1>Enterprise Perimeter Architecture & Managed Telemetry</h1>
        <p>Providing custom, ironclad information assurance, regulatory compliance enforcement, and autonomous boundary controls engineered specifically to secure both small operations and growing medium enterprises.</p>
        <button class="btn" onclick="show('matrix')">View Protection Tiers</button>
        <button class="btn" style="background:transparent; border:1px solid var(--border);" onclick="show('soc')">Access SOC Console</button>
        
        <div class="comp-box">
            <div style="font-size: 2.5rem;">🏥</div>
            <div style="text-align: left;">
                <h3 style="color:var(--white); margin-bottom:0.3rem;">Specialized Healthcare Data & HIPAA Infrastructure Assurance</h3>
                <p style="color:var(--mute); font-size:0.9rem;">Okagyeson Cyber Defense maintains specialized blue-team methodologies for safeguarding sensitive Protected Health Information (PHI), managing regulatory metrics, and enforcing rigorous health record access isolation parameters across clinical networks.</p>
            </div>
        </div>
    </div>

    <main>
        <section id="v-soc" class="view active">
            <h2 style="margin-bottom:1.5rem; color:var(--white);">Security Operations Center</h2>
            <div class="grid" style="margin-bottom:2rem;">
                <div class="card"><h4>Boundary State</h4><div style="font-size:2rem; font-weight:800; color:var(--green);">PROTECTED</div></div>
                <div class="card"><h4>Mitigations (24h)</h4><div style="font-size:2rem; font-weight:800; color:var(--primary); font-family:monospace;" id="threat-counter">14,204</div></div>
            </div>
            <h3 style="color:var(--mute); margin-bottom:0.5rem; font-size:1rem;">Active Threat Signal Stream</h3>
            <div class="terminal" id="console-stream"><div>[SUCCESS] Core SIEM event parsing pipelines running green. Monitoring edge nodes.</div></div>
        </section>

        <section id="v-matrix" class="view">
            <h2 style="margin-bottom:1.5rem; color:var(--white); text-align:center;">Commercial Defense Offerings</h2>
            <div class="grid">
                <div class="card">
                    <span style="color:var(--primary); font-weight:700; font-size:0.8rem;">Small Business Tier</span>
                    <h3 style="color:var(--white); margin-top:0.3rem;">Guardian Shield</h3>
                    <p style="color:var(--mute); font-size:0.9rem; margin-top:0.5rem;">Edge mitigation controls, endpoint asset mapping, and blockades built for small jobs under 50 endpoints.</p>
                    <div class="price">$299 <span style="font-size:1rem; color:var(--mute); font-weight:400;">/ mo</span></div>
                    <ul class="flist"><li>Continuous Perimeter Network Assays</li><li>Advanced Sandbox Email Protections</li><li>Weekly Compliance Posture Audits</li></ul>
                    <button class="btn" style="width:100%; background:transparent; border:1px solid var(--primary); color:var(--primary);" onclick="modal('audit-m', true)">Deploy Guardian Shield</button>
                </div>
                <div class="card" style="border-color:var(--primary);">
                    <span style="color:var(--green); font-weight:700; font-size:0.8rem;">Medium Enterprise Tier</span>
                    <h3 style="color:var(--white); margin-top:0.3rem;">Omni Defense Matrix</h3>
                    <p style="color:var(--mute); font-size:0.9rem; margin-top:0.5rem;">Full hybrid architecture environments, proactive threat hunting loops, and complete compliance framework controls.</p>
                    <div class="price">$899 <span style="font-size:1rem; color:var(--mute); font-weight:400;">/ mo</span></div>
                    <ul class="flist"><li>24/7 Human-Led Threat Hunting</li><li>Full Virtual Lab & Topology Mapping</li><li>Continuous Automated Penetration Analysis</li></ul>
                    <button class="btn" style="width:100%;" onclick="modal('audit-m', true)">Deploy Omni Matrix</button>
                </div>
            </div>
        </section>

        <section id="v-careers" class="view">
            <h2 style="margin-bottom:1.5rem; color:var(--white);">Careers Command Portal</h2>
            <div class="card" style="display:flex; justify-content:between; align-items:center; flex-direction:row;">
                <div style="flex-grow:1;"><h3 style="color:var(--white);">SOC Security Analyst (Tier II)</h3><p style="color:var(--mute); font-size:0.9rem;">Remote Operations Profile / Full-Time Enterprise</p></div>
                <button class="btn" onclick="modal('job-m', true)">Apply for Placement</button>
            </div>
        </section>
    </main>

    <div id="audit-m" class="overlay"><div class="modal"><span class="close" onclick="modal('audit-m', false)">&times;</span><h3>Request Corporate Audit</h3><form onsubmit="fire(event)"><div class="f-grp"><label>Company Name</label><input type="text" required></div><div class="f-grp"><label>Integration Framework</label><select><option>Small Business Tier ($299/mo)</option><option>Medium Enterprise Profile ($899/mo)</option></select></div><button class="btn" style="width:100%; margin-top:0.5rem;">Initiate Posture Integration</button></form></div></div>

  async fetch(request, env, ctx) {
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Cyber Defense LLC</title>
    <style>
        :root { --bg: #02040a; --surf: #0d1117; --card: #161b22; --border: #30363d; --primary: #58a6ff; --green: #2ea44f; --text: #c9d1d9; --white: #f0f6fc; --mute: #8b949e; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, system-ui, sans-serif; line-height: 1.6; padding-top: 70px; }
        header { background: rgba(13,17,23,0.9); border-bottom: 1px solid var(--border); position: fixed; top: 0; width: 100%; z-index: 1000; }
        .nav-c { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
        nav ul { display: flex; list-style: none; gap: 2rem; }
        nav a { color: var(--mute); text-decoration: none; font-weight: 600; cursor: pointer; }
        nav a:hover, nav a.active { color: var(--primary); }
        .btn { background: var(--green); color: var(--white); border: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .hero { padding: 6rem 2rem 4rem 2rem; text-align: center; background: radial-gradient(circle, #161b22 0%, var(--bg) 70%); border-bottom: 1px solid var(--border); }
        .hero h1 { font-size: 2.8rem; font-weight: 800; color: var(--white); margin-bottom: 1rem; }
        .hero p { max-width: 750px; margin: 0 auto 2rem auto; color: var(--mute); font-size: 1.1rem; }
        .comp-box { max-width: 1200px; margin: 2rem auto 0 auto; background: var(--surf); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; display: flex; gap: 1.5rem; align-items: center; }
        main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .view { display: none; }
        .view.active { display: block; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
        .card { background: var(--surf); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; position: relative; }
        .price { font-size: 2.2rem; font-weight: 800; color: var(--white); margin: 1rem 0; font-family: monospace; }
        .flist { list-style: none; margin: 1.5rem 0; border-top: 1px solid var(--border); padding-top: 1rem; color: var(--mute); }
        .flist li::before { content: "✓ "; color: var(--primary); font-weight: 800; }
        .terminal { background: #010409; border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; font-family: monospace; height: 250px; overflow-y: auto; color: var(--primary); }
        .overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; align-items: center; justify-content: center; }
        .modal { background: var(--surf); border: 1px solid var(--border); border-radius: 12px; padding: 2.5rem; max-width: 480px; width: 100%; position: relative; }
        .close { position: absolute; top: 1rem; right: 1rem; cursor: pointer; color: var(--mute); font-size: 1.5rem; }
        .f-grp { margin-bottom: 1.25rem; }
        .f-grp label { display: block; font-size: 0.85rem; color: var(--mute); margin-bottom: 0.4rem; font-weight: 600; }
        .f-grp input, .f-grp select, .f-grp textarea { width: 100%; background: var(--bg); border: 1px solid var(--border); padding: 0.7rem; border-radius: 6px; color: var(--white); font-family: inherit; }
    </style>
</head>
<body>
    <header>
        <div class="nav-c">
            <div class="brand-logo" style="font-weight:800; color:var(--white);">🛡️ Okagyeson <span style="color:var(--primary);">Cyber Defense</span></div>
            <nav>
                <ul>
                    <li><a onclick="show('soc')" id="m-soc" class="active">SOC Center</a></li>
                    <li><a onclick="show('matrix')" id="m-matrix">Core Offerings</a></li>
                    <li><a onclick="show('careers')" id="m-careers">Careers Portal</a></li>
                </ul>
            </nav>
            <button class="btn" onclick="modal('audit-m', true)">Consultation</button>
        </div>
    </header>

    <div class="hero">
        <h1>Enterprise Perimeter Architecture & Managed Telemetry</h1>
        <p>Providing custom, ironclad information assurance, regulatory compliance enforcement, and autonomous boundary controls engineered specifically to secure both small operations and growing medium enterprises.</p>
        <button class="btn" onclick="show('matrix')">View Protection Tiers</button>
        <button class="btn" style="background:transparent; border:1px solid var(--border);" onclick="show('soc')">Access SOC Console</button>
        
        <div class="comp-box">
            <div style="font-size: 2.5rem;">🏥</div>
            <div style="text-align: left;">
                <h3 style="color:var(--white); margin-bottom:0.3rem;">Specialized Healthcare Data & HIPAA Infrastructure Assurance</h3>
                <p style="color:var(--mute); font-size:0.9rem;">Okagyeson Cyber Defense maintains specialized blue-team methodologies for safeguarding sensitive Protected Health Information (PHI), managing regulatory metrics, and enforcing rigorous health record access isolation parameters across clinical networks.</p>
            </div>
        </div>
    </div>

    <main>
        <section id="v-soc" class="view active">
            <h2 style="margin-bottom:1.5rem; color:var(--white);">Security Operations Center</h2>
            <div class="grid" style="margin-bottom:2rem;">
                <div class="card"><h4>Boundary State</h4><div style="font-size:2rem; font-weight:800; color:var(--green);">PROTECTED</div></div>
                <div class="card"><h4>Mitigations (24h)</h4><div style="font-size:2rem; font-weight:800; color:var(--primary); font-family:monospace;" id="threat-counter">14,204</div></div>
            </div>
            <h3 style="color:var(--mute); margin-bottom:0.5rem; font-size:1rem;">Active Threat Signal Stream</h3>
            <div class="terminal" id="console-stream"><div>[SUCCESS] Core SIEM event parsing pipelines running green. Monitoring edge nodes.</div></div>
        </section>

        <section id="v-matrix" class="view">
            <h2 style="margin-bottom:1.5rem; color:var(--white); text-align:center;">Commercial Defense Offerings</h2>
            <div class="grid">
                <div class="card">
                    <span style="color:var(--primary); font-weight:700; font-size:0.8rem;">Small Business Tier</span>
                    <h3 style="color:var(--white); margin-top:0.3rem;">Guardian Shield</h3>
                    <p style="color:var(--mute); font-size:0.9rem; margin-top:0.5rem;">Edge mitigation controls, endpoint asset mapping, and blockades built for small jobs under 50 endpoints.</p>
                    <div class="price">$299 <span style="font-size:1rem; color:var(--mute); font-weight:400;">/ mo</span></div>
                    <ul class="flist"><li>Continuous Perimeter Network Assays</li><li>Advanced Sandbox Email Protections</li><li>Weekly Compliance Posture Audits</li></ul>
                    <button class="btn" style="width:100%; background:transparent; border:1px solid var(--primary); color:var(--primary);" onclick="modal('audit-m', true)">Deploy Guardian Shield</button>
                </div>
                <div class="card" style="border-color:var(--primary);">
                    <span style="color:var(--green); font-weight:700; font-size:0.8rem;">Medium Enterprise Tier</span>
                    <h3 style="color:var(--white); margin-top:0.3rem;">Omni Defense Matrix</h3>
                    <p style="color:var(--mute); font-size:0.9rem; margin-top:0.5rem;">Full hybrid architecture environments, proactive threat hunting loops, and complete compliance framework controls.</p>
                    <div class="price">$899 <span style="font-size:1rem; color:var(--mute); font-weight:400;">/ mo</span></div>
                    <ul class="flist"><li>24/7 Human-Led Threat Hunting</li><li>Full Virtual Lab & Topology Mapping</li><li>Continuous Automated Penetration Analysis</li></ul>
                    <button class="btn" style="width:100%;" onclick="modal('audit-m', true)">Deploy Omni Matrix</button>
                </div>
            </div>
        </section>

        <section id="v-careers" class="view">
            <h2 style="margin-bottom:1.5rem; color:var(--white);">Careers Command Portal</h2>
            <div class="card" style="display:flex; justify-content:between; align-items:center; flex-direction:row;">
                <div style="flex-grow:1;"><h3 style="color:var(--white);">SOC Security Analyst (Tier II)</h3><p style="color:var(--mute); font-size:0.9rem;">Remote Operations Profile / Full-Time Enterprise</p></div>
                <button class="btn" onclick="modal('job-m', true)">Apply for Placement</button>
            </div>
        </section>
    </main>

    <div id="audit-m" class="overlay"><div class="modal"><span class="close" onclick="modal('audit-m', false)">&times;</span><h3>Request Corporate Audit</h3><form onsubmit="fire(event)"><div class="f-grp"><label>Company Name</label><input type="text" required></div><div class="f-grp"><label>Integration Framework</label><select><option>Small Business Tier ($299/mo)</option><option>Medium Enterprise Profile ($899/mo)</option></select></div><button class="btn" style="width:100%; margin-top:0.5rem;">Initiate Posture Integration</button></form></div></div>
×Submit Defensive CredentialsFull NameEmailGitHub / Portfolio URLCore CompetenciesTransmit Candidate Profile© 2026 Okagyeson Cyber Defense LLC. Secure Gateway Panel Operations.function show(id) {document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));document.getElementById('v-' + id).classList.add('active');document.getElementById('m-' + id).classList.add('active');}function modal(id, open) { document.getElementById(id).style.display = open ? 'flex' : 'none'; }function fire(e) { e.preventDefault(); alert("Payload Transmitted. The Okagyeson Operations Center will process this data within 2 hours."); document.querySelectorAll('.overlay').forEach(o => o.style.display = 'none'); }const term = document.getElementById('console-stream');let count = 14204;setInterval(() => {count += Math.floor(Math.random() * 3) + 1;document.getElementById('threat-counter').textContent = count.toLocaleString();const div = document.createElement('div');div.textContent = "[" + new Date().toLocaleTimeString() + "] EDGE NODE STATE: Ingress threat probe isolated and dropped.";term.appendChild(div);if(term.children.length > 6) term.removeChild(term.children[0]);term.scrollTop = term.scrollHeight;}, 4000);`;return new Response(htmlBody, { headers: { "content-type": "text/html;charset=UTF-8" } });},};
