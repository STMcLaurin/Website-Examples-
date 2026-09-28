
function q(s){return document.querySelector(s)}
const BUSINESS_EMAIL="REPLACE_WITH_BUSINESS_EMAIL";
function loader(){
 document.body.insertAdjacentHTML('afterbegin','<div class="page-loader"><div class="loader-card"><div class="loader-symbol">WB</div><h2>Business Website</h2><p>PROFESSIONAL SERVICES</p><div class="loadbar"><i></i></div></div></div>');
 setTimeout(()=>q('.page-loader')?.classList.add('hide'),520);
 document.querySelectorAll('.card,.section-title,.about-split,.form-shell,.feature-strip').forEach(x=>x.classList.add('reveal'));
 let io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
}
document.addEventListener('DOMContentLoaded',loader);
function openService(title,body,includes){
 q('#modalTitle').textContent=title;q('#modalBody').textContent=body;q('#modalIncludes').innerHTML=includes.map(x=>'<li>'+x+'</li>').join('');q('#serviceModal').classList.add('open');
}
function closeModal(){q('#serviceModal')?.classList.remove('open')}
function contactMail(e){e.preventDefault();let f=new FormData(e.target);if(BUSINESS_EMAIL.startsWith('REPLACE_')){q('#ok').style.display='block';q('#ok').innerHTML='<b>Business email configuration required before launch.</b>';return}location.href='mailto:'+BUSINESS_EMAIL+'?subject='+encodeURIComponent('New website inquiry from '+f.get('name'))+'&body='+encodeURIComponent('Name: '+f.get('name')+'\nPhone: '+f.get('phone')+'\nEmail: '+f.get('email')+'\n\n'+f.get('message'))}
function simulatedSubmit(e,kind){e.preventDefault();q('#ok').style.display='block';q('#ok').innerHTML=kind==='auto'?'<b>Thank you. Your request has been received.</b><br>A confirmation has been prepared and your request is ready for scheduling follow-up.':'<b>Thank you. Your request has been received.</b><br>Your information is now available to the business team for follow-up.'}
function loginDemo(e,t){
  e.preventDefault();
  const email=(q('#email')?.value||'').trim().toLowerCase();
  const password=q('#password')?.value||'';
  const err=q('#err');
  if(email==='demo@business.com' && password==='Demo123!'){
    localStorage.setItem('white_label_portal_auth','true');
    localStorage.setItem('white_label_portal_tier',t);
    window.location.href='dashboard.html';
  } else {
    if(err) err.textContent='Incorrect sample login. Use demo@business.com and Demo123!';
  }
}
function guard(t){
  const ok=localStorage.getItem('white_label_portal_auth')==='true';
  const tier=localStorage.getItem('white_label_portal_tier');
  if(!ok || tier!==t){ window.location.replace('login.html'); }
}
function logout(){
  localStorage.removeItem('white_label_portal_auth');
  localStorage.removeItem('white_label_portal_tier');
  window.location.href='login.html';
}
function fake(m){alert(m)}

function portalGo(page){window.location.href=page+'.html'}

// --- White-label simulated full-stack data layer ---
const DBKEY='wl_fullstack_db_v1';
function dbSeed(){
 return {
  leads:[
   {id:'L-1001',name:'Jordan Miller',email:'jordan@example.com',phone:'(315) 555-0148',service:'Signature Service',status:'New',source:'Website',created:'2026-09-23',notes:'Requested information about a deep cleaning.'},
   {id:'L-1002',name:'Acme Office',email:'office@example.com',phone:'(315) 555-0177',service:'Business Service',status:'Estimate Sent',source:'Website',created:'2026-09-22',notes:'Recurring office service inquiry.'}
  ],
  customers:[
   {id:'C-2001',name:'Taylor Reed',email:'taylor@example.com',phone:'(315) 555-0190',status:'Active',service:'Transition Service'}
  ],
  estimates:[
   {id:'E-2050',customer:'Acme Office',amount:780,status:'Sent'},
   {id:'E-2049',customer:'Taylor Reed',amount:450,status:'Accepted'}
  ],
  jobs:[{id:'J-881',customer:'Taylor Reed',date:'2026-09-23',status:'In Progress',amount:450}],
  invoices:[
   {id:'INV-410',customer:'Taylor Reed',amount:450,status:'Paid'},
   {id:'INV-411',customer:'Acme Office',amount:780,status:'Pending'}
  ],
  appointments:[{id:'A-1',customer:'Taylor Reed',date:'2026-09-23',time:'09:00',type:'Service'}],
  messages:[{id:'M-1',customer:'Jordan Miller',body:'Thank you. Thursday morning works for the estimate.',direction:'Inbound',date:'Today · 10:14 AM'}],
  notifications:[
   {id:'N-1',text:'New website inquiry from Jordan Miller',read:false},
   {id:'N-2',text:'Estimate E-2049 accepted by Taylor Reed',read:false}
  ],
  activity:[
   {id:'ACT-1',text:'Website inquiry received from Jordan Miller',date:'Today · 9:42 AM'},
   {id:'ACT-2',text:'Estimate E-2049 accepted',date:'Yesterday · 4:10 PM'}
  ],
  automations:[
   {id:'AUTO-1',name:'New Inquiry Response',enabled:true},
   {id:'AUTO-2',name:'Appointment Reminder',enabled:true},
   {id:'AUTO-3',name:'Post-Service Follow-Up',enabled:true}
  ],
  portalUsers:[
   {id:'U-1',name:'Primary Admin',email:'admin@business.com',role:'Owner Admin',status:'Active'},
   {id:'U-2',name:'Operations Manager',email:'manager@business.com',role:'Manager',status:'Active'},
   {id:'U-3',name:'Taylor Reed',email:'customer@business.com',role:'Customer',status:'Active'}
  ],
  statusUpdates:[
   {id:'UP-1',customer:'Taylor Reed',title:'Service confirmed',body:'Your upcoming service is confirmed for September 30 at 9:00 AM.',date:'Sep 23 · 2:15 PM'},
   {id:'UP-2',customer:'Taylor Reed',title:'Estimate accepted',body:'Your estimate has been accepted and added to your account.',date:'Sep 22 · 4:10 PM'}
  ]
 };
}
function db(){let x=localStorage.getItem(DBKEY);if(!x){let s=dbSeed();localStorage.setItem(DBKEY,JSON.stringify(s));return s}try{return JSON.parse(x)}catch(e){let s=dbSeed();localStorage.setItem(DBKEY,JSON.stringify(s));return s}}
function saveDb(d){localStorage.setItem(DBKEY,JSON.stringify(d))}
function uid(prefix){return prefix+'-'+Math.floor(1000+Math.random()*9000)}
function addActivity(d,text){d.activity.unshift({id:uid('ACT'),text,date:new Date().toLocaleString()})}
function addNotice(d,text){d.notifications.unshift({id:uid('N'),text,read:false})}
function resetDemoData(){localStorage.removeItem(DBKEY);location.reload()}
function submitConnectedRequest(e,tier){
 e.preventDefault();let f=new FormData(e.target),d=db();
 let lead={id:uid('L'),name:f.get('name')||'Website Visitor',email:f.get('email')||'',phone:f.get('phone')||'',service:f.get('service')||'General Service',status:'New',source:'Website',created:new Date().toISOString().slice(0,10),notes:f.get('message')||''};
 d.leads.unshift(lead);addNotice(d,'New website inquiry from '+lead.name);addActivity(d,'Website request received from '+lead.name);
 if(tier==='automation') addActivity(d,'Customer acknowledgement prepared for '+lead.name);
 saveDb(d);let ok=q('#ok');if(ok){ok.style.display='block';ok.innerHTML='<b>Thank you, '+lead.name+'. Your request has been received.</b><br>We will follow up using the contact information you provided.'} e.target.reset();
}
function statusClass(s){return /paid|won|accepted|active|completed|confirmed/i.test(s)?'good':/new|sent|qualified|pending/i.test(s)?'blue':'warn'}
function renderLeadTable(){
 let el=q('#leadRows');if(!el)return;let term=(q('#leadSearch')?.value||'').toLowerCase(),st=q('#leadFilter')?.value||'All';
 let rows=db().leads.filter(x=>(!term||JSON.stringify(x).toLowerCase().includes(term))&&(st==='All'||x.status===st));
 el.innerHTML=rows.map(x=>`<tr><td><button class="linkbtn" onclick="openLead('${x.id}')">${x.name}</button><small>${x.email}</small></td><td>${x.service}</td><td>${x.source}</td><td><span class="status ${statusClass(x.status)}">${x.status}</span></td><td><select onchange="setLeadStatus('${x.id}',this.value)">${['New','Contacted','Estimate Scheduled','Estimate Sent','Won','Lost'].map(s=>`<option ${s===x.status?'selected':''}>${s}</option>`).join('')}</select></td></tr>`).join('');
}
function openLead(id){let x=db().leads.find(a=>a.id===id);if(!x)return;openDataModal('Lead '+x.id,`<div class="data-grid"><div class="data-item"><small>Name</small><b>${x.name}</b></div><div class="data-item"><small>Service</small><b>${x.service}</b></div><div class="data-item"><small>Email</small>${x.email}</div><div class="data-item"><small>Phone</small>${x.phone}</div></div><p><b>Notes</b><br>${x.notes||'No notes yet.'}</p><div class="portal-actions"><button class="btn" onclick="createEstimateFromLead('${x.id}')">Create Estimate</button><button class="btn alt" onclick="archiveLead('${x.id}')">Archive</button></div>`)}
function setLeadStatus(id,status){let d=db(),x=d.leads.find(a=>a.id===id);if(x){x.status=status;addActivity(d,x.name+' changed to '+status);saveDb(d);renderLeadTable();renderMetrics()}}
function archiveLead(id){let d=db();d.leads=d.leads.filter(x=>x.id!==id);saveDb(d);closeDataModal();renderLeadTable();renderMetrics()}
function createEstimateFromLead(id){let d=db(),x=d.leads.find(a=>a.id===id);if(!x)return;let amount=prompt('Estimate amount','350');if(amount===null)return;let e={id:uid('E'),customer:x.name,amount:Number(amount)||0,status:'Draft'};d.estimates.unshift(e);x.status='Estimate Sent';addActivity(d,'Estimate '+e.id+' created for '+x.name);addNotice(d,'Estimate '+e.id+' ready for '+x.name);saveDb(d);closeDataModal();alert('Estimate '+e.id+' created.');renderLeadTable();renderMetrics()}
function renderMetrics(){let d=db();document.querySelectorAll('[data-metric]').forEach(el=>{let k=el.dataset.metric,v=0;if(k==='leads')v=d.leads.filter(x=>x.status==='New').length;if(k==='estimates')v=d.estimates.length;if(k==='customers')v=d.customers.length;if(k==='jobs')v=d.jobs.length;if(k==='revenue')v='$'+d.invoices.filter(x=>x.status==='Paid').reduce((a,b)=>a+b.amount,0).toLocaleString();if(k==='due')v=d.invoices.filter(x=>x.status!=='Paid').length;el.textContent=v})}
function renderNotifications(){let d=db(),el=q('#notificationList');if(!el)return;el.innerHTML=d.notifications.map(n=>`<div class="notice-row"><span class="notif-dot ${n.read?'read':''}"></span><div>${n.text}</div></div>`).join('')||'<p>No notifications.</p>';let b=q('#noticeBadge');if(b)b.textContent=d.notifications.filter(n=>!n.read).length}
function markNoticesRead(){let d=db();d.notifications.forEach(n=>n.read=true);saveDb(d);renderNotifications()}
function renderEstimates(){let el=q('#estimateRows');if(!el)return;el.innerHTML=db().estimates.map(x=>`<tr><td>${x.id}</td><td>${x.customer}</td><td>$${x.amount.toLocaleString()}</td><td><span class="status ${statusClass(x.status)}">${x.status}</span></td><td><button class="mini" onclick="estimateAction('${x.id}')">Open</button></td></tr>`).join('')}
function estimateAction(id){let d=db(),x=d.estimates.find(a=>a.id===id);openDataModal('Estimate '+id,`<p><b>${x.customer}</b></p><h2>$${x.amount.toLocaleString()}</h2><p>Status: ${x.status}</p><div class="portal-actions"><button class="btn" onclick="acceptEstimate('${id}')">Accept & Create Job</button><button class="btn alt" onclick="fake('Printable estimate opened')">Print</button></div>`)}
function acceptEstimate(id){let d=db(),e=d.estimates.find(x=>x.id===id);if(!e)return;e.status='Accepted';let existing=d.customers.find(x=>x.name===e.customer);if(!existing)d.customers.unshift({id:uid('C'),name:e.customer,email:'customer@example.com',phone:'',status:'Active',service:'Service'});let job={id:uid('J'),customer:e.customer,date:new Date().toISOString().slice(0,10),status:'Pending',amount:e.amount};d.jobs.unshift(job);addActivity(d,'Estimate '+id+' accepted and job '+job.id+' created');addNotice(d,'New job '+job.id+' created for '+e.customer);saveDb(d);closeDataModal();renderEstimates();renderMetrics();alert('Estimate accepted. Job '+job.id+' created.')}
function renderJobs(){let el=q('#jobRows');if(!el)return;el.innerHTML=db().jobs.map(x=>`<tr><td>${x.id}</td><td>${x.customer}</td><td>${x.date}</td><td><span class="status ${statusClass(x.status)}">${x.status}</span></td><td><button class="mini" onclick="completeJob('${x.id}')">${x.status==='Completed'?'Completed':'Complete'}</button></td></tr>`).join('')}
function completeJob(id){let d=db(),j=d.jobs.find(x=>x.id===id);if(!j||j.status==='Completed')return;j.status='Completed';let inv={id:uid('INV'),customer:j.customer,amount:j.amount||350,status:'Pending'};d.invoices.unshift(inv);addActivity(d,'Job '+id+' completed; invoice '+inv.id+' created');addNotice(d,'Invoice '+inv.id+' ready for '+j.customer);saveDb(d);renderJobs();renderMetrics();alert('Job completed and invoice created.')}
function renderInvoices(){let el=q('#invoiceRows');if(!el)return;el.innerHTML=db().invoices.map(x=>`<tr><td>${x.id}</td><td>${x.customer}</td><td>$${x.amount.toLocaleString()}</td><td><span class="status ${statusClass(x.status)}">${x.status}</span></td><td>${x.status==='Paid'?'<b>Paid</b>':`<button class="mini" onclick="openCheckout('${x.id}')">Pay</button>`}</td></tr>`).join('')}
function openCheckout(id){let x=db().invoices.find(a=>a.id===id);openDataModal('Secure Checkout',`<div class="checkout"><p>Invoice <b>${x.id}</b></p><h2>$${x.amount.toLocaleString()}</h2><label>Card number</label><input value="4242 4242 4242 4242"><div class="data-grid"><div><label>Expiry</label><input value="12/29"></div><div><label>CVC</label><input value="123"></div></div><p class="sim-note">Simulated payment — no card information is transmitted.</p><button class="btn" onclick="payInvoice('${id}')">Complete Payment</button></div>`)}
function payInvoice(id){let d=db(),x=d.invoices.find(a=>a.id===id);if(!x)return;x.status='Paid';addActivity(d,'Payment received for '+id);addNotice(d,'Payment received: '+id+' · $'+x.amount);saveDb(d);closeDataModal();renderInvoices();renderMetrics();alert('Payment successful.')}
function renderCustomers(){let el=q('#customerCards');if(!el)return;el.innerHTML=db().customers.map(x=>`<div class="card"><h3>${x.name}</h3><p>${x.email||''}<br>${x.phone||''}</p><span class="status good">${x.status}</span><p><button class="mini" onclick="openCustomer('${x.id}')">View Record</button></p></div>`).join('')}
function openCustomer(id){let d=db(),x=d.customers.find(a=>a.id===id);let related=d.jobs.filter(j=>j.customer===x.name);openDataModal(x.name,`<div class="data-grid"><div class="data-item"><small>Email</small>${x.email}</div><div class="data-item"><small>Phone</small>${x.phone}</div></div><h3>Service History</h3><p>${related.length?related.map(j=>j.id+' · '+j.status).join('<br>'):'No completed service history yet.'}</p><textarea id="customerNote" placeholder="Add internal note"></textarea><button class="btn" onclick="fake('Note saved')">Save Note</button>`)}
function renderActivity(){let el=q('#activityList');if(!el)return;el.innerHTML=db().activity.slice(0,8).map(x=>`<div class="timeline-item"><small>${x.date}</small><b>${x.text}</b></div>`).join('')}
function renderMessages(){let el=q('#messageList');if(!el)return;el.innerHTML=db().messages.map(x=>`<div class="message-bubble"><small>${x.customer} · ${x.date}</small><p>${x.body}</p></div>`).join('')}
function sendMessage(){let name=q('#msgCustomer').value.trim(),body=q('#msgBody').value.trim();if(!name||!body)return;let d=db();d.messages.unshift({id:uid('M'),customer:name,body,direction:'Outbound',date:'Just now'});addActivity(d,'Message sent to '+name);saveDb(d);q('#msgBody').value='';renderMessages()}
function renderAutomations(){let el=q('#automationCards');if(!el)return;el.innerHTML=db().automations.map(x=>`<div class="card"><h3>${x.name}</h3><p>Connected workflow rule</p><button class="mini" onclick="toggleAutomation('${x.id}')">${x.enabled?'Active':'Paused'}</button></div>`).join('')}
function toggleAutomation(id){let d=db(),x=d.automations.find(a=>a.id===id);x.enabled=!x.enabled;addActivity(d,x.name+' '+(x.enabled?'enabled':'paused'));saveDb(d);renderAutomations()}
function openDataModal(title,body){let m=q('#dataModal');if(!m){document.body.insertAdjacentHTML('beforeend','<div class="modal" id="dataModal" onclick="if(event.target===this)closeDataModal()"><div class="modal-card"><button class="modal-close" onclick="closeDataModal()">×</button><h2 id="dataModalTitle"></h2><div id="dataModalBody"></div></div></div>');m=q('#dataModal')}q('#dataModalTitle').textContent=title;q('#dataModalBody').innerHTML=body;m.classList.add('open')}
function closeDataModal(){q('#dataModal')?.classList.remove('open')}
document.addEventListener('DOMContentLoaded',()=>{renderMetrics();renderNotifications();renderLeadTable();renderEstimates();renderJobs();renderInvoices();renderCustomers();renderActivity();renderMessages();renderAutomations()});

// --- v7 customer portal + advanced simulated account administration ---
const CUSTOMER_AUTH='wl_customer_portal_auth';
function customerLogin(e){
 e.preventDefault();
 let email=(q('#custEmail')?.value||'').trim().toLowerCase(),pass=q('#custPassword')?.value||'';
 if(email==='customer@business.com'&&pass==='Customer123!'){
   localStorage.setItem(CUSTOMER_AUTH,'true');window.location.href='customer-dashboard.html';
 } else q('#custErr').textContent='Use customer@business.com and Customer123!';
}
function customerGuard(){if(localStorage.getItem(CUSTOMER_AUTH)!=='true')window.location.replace('customer-login.html')}
function customerLogout(){localStorage.removeItem(CUSTOMER_AUTH);window.location.href='customer-login.html'}
function renderPortalUsers(){
 let el=q('#portalUserRows');if(!el)return;let d=db();
 el.innerHTML=d.portalUsers.map(u=>`<div class="account-row"><div><b>${u.name}</b><small>${u.email}</small></div><div><select onchange="updateUser('${u.id}','role',this.value)">${['Owner Admin','Manager','Staff','Customer'].map(r=>`<option ${r===u.role?'selected':''}>${r}</option>`).join('')}</select></div><div><span class="status ${u.status==='Active'?'good':'warn'}">${u.status}</span></div><div><button class="mini" onclick="toggleUser('${u.id}')">${u.status==='Active'?'Disable':'Enable'}</button></div><button class="mini" onclick="deleteUser('${u.id}')">Delete</button></div>`).join('');
}
function addPortalUser(){
 let name=prompt('User name');if(!name)return;let email=prompt('Email');if(!email)return;
 let d=db();d.portalUsers.push({id:uid('U'),name,email,role:'Staff',status:'Active'});addActivity(d,'Portal account created for '+name);saveDb(d);renderPortalUsers();
}
function updateUser(id,key,val){let d=db(),u=d.portalUsers.find(x=>x.id===id);if(u){u[key]=val;addActivity(d,u.name+' account updated');saveDb(d)}}
function toggleUser(id){let d=db(),u=d.portalUsers.find(x=>x.id===id);if(u){u.status=u.status==='Active'?'Disabled':'Active';addActivity(d,u.name+' account '+u.status.toLowerCase());saveDb(d);renderPortalUsers()}}
function deleteUser(id){if(!confirm('Delete this sample account?'))return;let d=db(),u=d.portalUsers.find(x=>x.id===id);d.portalUsers=d.portalUsers.filter(x=>x.id!==id);if(u)addActivity(d,u.name+' account deleted');saveDb(d);renderPortalUsers()}
function resetUserPassword(id){let d=db(),u=d.portalUsers.find(x=>x.id===id);if(u){addActivity(d,'Password reset link prepared for '+u.name);saveDb(d);alert('Sample password reset link prepared for '+u.email)}}
function postCustomerUpdate(){
 let title=q('#updateTitle').value.trim(),body=q('#updateBody').value.trim(),customer=q('#updateCustomer').value.trim()||'Taylor Reed';if(!title||!body)return alert('Add a title and update.');
 let d=db();d.statusUpdates.unshift({id:uid('UP'),customer,title,body,date:'Just now'});addActivity(d,'Portal status update posted for '+customer);addNotice(d,'Portal update published for '+customer);saveDb(d);q('#updateTitle').value='';q('#updateBody').value='';renderAdminUpdates();alert('Status update posted to the customer portal.');
}
function renderAdminUpdates(){let el=q('#adminUpdates');if(!el)return;el.innerHTML=db().statusUpdates.map(x=>`<div class="status-update"><small>${x.customer} · ${x.date}</small><h4>${x.title}</h4><p>${x.body}</p><button class="mini" onclick="deleteUpdate('${x.id}')">Delete</button></div>`).join('')}
function deleteUpdate(id){let d=db();d.statusUpdates=d.statusUpdates.filter(x=>x.id!==id);saveDb(d);renderAdminUpdates();renderCustomerUpdates()}
function renderCustomerUpdates(){let el=q('#customerUpdates');if(!el)return;el.innerHTML=db().statusUpdates.filter(x=>x.customer==='Taylor Reed').map(x=>`<div class="status-update"><small>${x.date}</small><h4>${x.title}</h4><p>${x.body}</p></div>`).join('')||'<p>No account updates.</p>'}
function renderCustomerInvoices(){let el=q('#customerInvoices');if(!el)return;let d=db(),rows=d.invoices.filter(x=>x.customer==='Taylor Reed'||x.customer==='Acme Office');el.innerHTML=rows.map(x=>`<div class="invoice-card"><div><b>${x.id}</b><br><small>${x.customer}</small></div><div><b>$${x.amount.toLocaleString()}</b><br><span class="status ${statusClass(x.status)}">${x.status}</span></div>${x.status==='Paid'?'<button class="mini" onclick="fake(\'Receipt opened\')">View Receipt</button>':`<button class="btn" onclick="openCustomerCheckout('${x.id}')">Pay Invoice</button>`}</div>`).join('')}
function openCustomerCheckout(id){let x=db().invoices.find(a=>a.id===id);openDataModal('Pay Invoice '+id,`<div class="checkout"><h2>$${x.amount.toLocaleString()}</h2><label>Name on card</label><input value="Taylor Reed"><label>Card number</label><input value="4242 4242 4242 4242"><div class="data-grid"><div><label>Expiry</label><input value="12/29"></div><div><label>CVC</label><input value="123"></div></div><p class="sim-note"><b>Sample checkout only.</b> No payment or card data is transmitted.</p><button class="btn" onclick="customerPayInvoice('${id}')">Pay $${x.amount.toLocaleString()}</button></div>`)}
function customerPayInvoice(id){let d=db(),x=d.invoices.find(a=>a.id===id);if(!x)return;x.status='Paid';addActivity(d,'Customer paid '+id+' through portal');addNotice(d,'Customer payment received: '+id+' · $'+x.amount);d.statusUpdates.unshift({id:uid('UP'),customer:'Taylor Reed',title:'Payment received',body:'Payment for '+id+' was received successfully.',date:'Just now'});saveDb(d);closeDataModal();renderCustomerInvoices();renderCustomerUpdates();alert('Payment successful. Thank you.')}
function renderCustomerAppointments(){let el=q('#customerAppointments');if(!el)return;el.innerHTML=db().appointments.filter(x=>x.customer==='Taylor Reed').map(x=>`<div class="card"><h3>${x.type}</h3><p>${x.date} · ${x.time}</p><span class="status good">Confirmed</span></div>`).join('')}
function renderCustomerMessages(){let el=q('#custMessageList');if(!el)return;el.innerHTML=db().messages.filter(x=>x.customer==='Taylor Reed'||x.customer==='Jordan Miller').map(x=>`<div class="message-bubble"><small>${x.date}</small><p>${x.body}</p></div>`).join('')}
function sendCustomerMessage(){let body=q('#custMsgBody').value.trim();if(!body)return;let d=db();d.messages.unshift({id:uid('M'),customer:'Taylor Reed',body,direction:'Inbound',date:'Just now'});addActivity(d,'Customer portal message received from Taylor Reed');addNotice(d,'New customer portal message from Taylor Reed');saveDb(d);q('#custMsgBody').value='';renderCustomerMessages();alert('Message sent.')}
document.addEventListener('DOMContentLoaded',()=>{renderPortalUsers();renderAdminUpdates();renderCustomerUpdates();renderCustomerInvoices();renderCustomerAppointments();renderCustomerMessages()});
