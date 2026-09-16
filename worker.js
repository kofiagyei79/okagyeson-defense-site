export default {
  async fetch(request, env, ctx) {
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Okagyeson Defense Systems</title>
    <style>
        :root { --bg: #070a13; --card: #0f1424; --border: #1e294b; --text: #f8fafc; --sec: #94a3b8; --blue: #38bdf8; --green: #4ade80; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--bg); color: var(--text); font-family: system-ui, sans-serif; padding-top: 80px; }
        header { background: rgba(15,20,36,0.9); border-bottom: 1px solid var(--border); position: fixed; top: 0; width: 100%; z-index: 1000; }
        .nav-box { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
        nav ul { display: flex; list-style: none; gap: 1.5rem; }
        nav a { color: var(--sec); text-decoration: none; font-weight: 500; cursor: pointer; }
        nav a:hover, nav a.active { color: var(--blue); }
        .btn { background: #0284c7; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-weight: 600; cursor: pointer; }
        main { max-width: 1200px; margin: 2rem auto; padding: 0 2rem; }
        .section { display: none; }
        .section.active { display: block; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; }
        .console { background: #020617; border: 1px solid var(--border); border-radius: 8px; padding: 1rem; font-family: monospace; height: 200px; overflow-y: auto; color: var(--blue); }
        .modal { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); z-index:2000; align-items:center; justify-content:center; }
        .modal-content { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 2rem; max-width: 450px; width: 100%; position: relative; }
        .close { position: absolute; top: 1rem; right: 1rem; cursor: pointer; color: var(--sec); font-size: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: var(--sec); }
        .form-group input, .form-group textarea, .form-group select { width: 100%; background: var(--bg); border: 1px solid var(--border); padding: 0.6rem; border-radius: 4px; color: var(--text); }
    </style>
</head>
<body>
    <header>
        <div class="nav-box">
            <div style="font-weight:700; font-size:1.2rem;">🛡️ Okagyeson <span style="color:var(--blue);">Defense</span></div>
            <nav>
                <ul>
                    <li><a onclick="tab('soc')" id="m-soc" class="active">SOC Ops</a></li>
                    <li><a onclick="tab('srv')" id="m-srv">Services</a></li>
                    <li><a onclick="tab('car')" id="m-car">Careers</a></li>
                </ul>
            </nav>
            <button class="btn" onclick="openM('srv-m')">Request Audit</button>
        </div>
    </header>
    <main>
        <section id="s-soc" class="section active">
            <h2 style="margin-bottom:1.5rem;">Security Operations Center</h2>
            <div class="grid">
                <div class="card"><h3>System Firewall</h3><div style="font-size:2rem; font-weight:700; color:var(--green);">SECURE</div></div>
                <div class="card"><h3>Mitigations (24h)</h3><div style="font-size:2rem; font-weight:700; font-family:monospace;" id="counter">14,204</div></div>
            </div>
            <h3 style="margin-bottom:0.5rem; color:var(--sec);">Live System Protection Logs</h3>
            <div class="console" id="logs"><div>[INFO] Okagyeson Defensive Perimeter Active.</div></div>
        </section>
        <section id="s-srv" class="section">
            <h2 style="margin-bottom:1.5rem; text-align:center;">Enterprise Security Profiling</h2>
            <div class="grid">
                <div class="card">
                    <h3>Guardian Shield</h3>
                    <p style="color:var(--sec); margin: 0.5rem 0;">Perimeter management engineered for Small Jobs (under 50 endpoints).</p>
                    <div style="font-size:1.8rem; font-weight:700; margin: 1rem 0;">$299<span style="font-size:0.9rem; color:var(--sec);">/mo</span></div>
                    <button class="btn" onclick="openM('srv-m')">Deploy Guard Tier</button>
                </div>
                <div class="card" style="border-color: var(--blue);">
                    <h3>Omni Matrix</h3>
                    <p style="color:var(--sec); margin: 0.5rem 0;">Full environment operations scaled for Medium Enterprises.</p>
                    <div style="font-size:1.8rem; font-weight:700; margin: 1rem 0;">$899<span style="font-size:0.9rem; color:var(--sec);">/mo</span></div>
                    <button class="btn" onclick="openM('srv-m')">Deploy Enterprise Tier</button>
                </div>
            </div>
        </section>
        <section id="s-car" class="section">
            <h2 style="margin-bottom:1.5rem;">Defense Engineering Careers</h2>
            <div class="card" style="flex-direction:row; justify-content:space-between; align-items:center;">
                <div><h3>L2 SOC Analyst</h3><p style="color:var(--sec);">Remote Ops / Global Matrix Support</p></div>
                <button class="btn" onclick="openM('car-m')">Apply Now</button>
            </div>
        </section>
    </main>
    <div id="srv-m" class="modal"><div class="modal-content"><span class="close" onclick="closeM('srv-m')">&times;</span><h3>Request Cyber Coverage</h3><form onsubmit="send(event)"><div class="form-group"><label>Company Name</label><input type="text" required></div><div class="form-group"><label>Target Tier</label><select><option>Small Business ($299/mo)</option><option>Medium Enterprise ($899/mo)</option></select></div><button class="btn" style="width:100%;">Submit Request</button></form></div></div>
    <div id="car-m" class="modal"><div class="modal-content"><span class="close" onclick="closeM('car-m')">&times;</span><h3>Submit Engineering Profile</h3><form onsubmit="send(event)"><div class="form-group"><label>Full Name</label><input type="text" required></div><div class="form-group"><label>Email</label><input type="email" required></div><div class="form-group"><label>Specializations</label><textarea required rows="3"></textarea></div><button class="btn" style="width:100%;">Submit Credentials</button></form></div></div>
    <script>
        function tab(id) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            document.getElementById('s-'+id).classList.add('active');
            document.getElementById('m-'+id).classList.add('active');
        }
        function openM(id) { document.getElementById(id).style.display = 'flex'; }
        function closeM(id) { document.getElementById(id).style.display = 'none'; }
        function send(e) { e.preventDefault(); alert("Encrypted Package Dispatched to Operations Center."); document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); }
        const box = document.getElementById('logs');
        let count = 14204;
        setInterval(() => {
            count += Math.floor(Math.random() * 3) + 1;
            document.getElementById('counter').textContent = count.toLocaleString();
            const div = document.createElement('div');
            div.textContent = "[" + new Date().toLocaleTimeString() + "] NODE PROTECTION: Perimeter probe isolated successfully.";
            box.appendChild(div);
            if(box.children.length > 6) box.removeChild(box.children[0]);
            box.scrollTop = box.scrollHeight;
        }, 4000);
    </script>
</body>
   </html>
    `;
    return new Response(htmlBody, { headers: { "content-type": "text/html;charset=UTF-8" } });
  },
};



 
