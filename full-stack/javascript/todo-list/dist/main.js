(()=>{"use strict";class e{constructor(e){this.name=e,this.tasks=[]}addTask(e){this.tasks.push(e)}getTasks(){return this.tasks}}class t{constructor(e,t,n,o){this.name=e,this.description=t,this.dueDate=n,this.priority=o}}const n=[],o=document.getElementById("new-project"),d=document.getElementById("add-todo"),c=document.getElementById("project-submit"),s=document.getElementById("todo-submit"),i=document.querySelector("#projects"),l=document.querySelector(".list-container ol"),a=document.getElementById("modal"),r=document.getElementById("close-modal");function u(e){l.innerHTML="",e.getTasks().forEach((e=>{const t=document.createElement("li");t.innerText=e.name,t.addEventListener("click",(()=>{console.log("opened"),a.classList.add("open")})),l.appendChild(t)}))}o.addEventListener("click",(()=>{document.getElementById("project-dialog").showModal()})),d.addEventListener("click",(()=>{document.getElementById("todo-dialog").showModal()})),c.addEventListener("click",(()=>{!function(){const t=document.querySelector("#project-name").value;if(t<=0)return;const o=new e(t),d=document.createElement("li");d.innerText=t,d.addEventListener("click",(()=>{u(o)})),i.appendChild(d),n.push(o),console.log(n)}()})),s.addEventListener("click",(()=>{!function(){const e=document.querySelector("#todo-name").value,n=document.querySelector("#todo-desc").value,o=document.querySelector("#due-date").value,d=document.querySelector("#priority").value;if(e.length<=0)return;const c=new t(e,n,o,d);m.addTask(c),console.log(m)}()})),r.addEventListener("click",(()=>{a.classList.remove("open")}));const m=new e("Default");n.push(m);const p=document.createElement("li");p.innerText="Default",p.addEventListener("click",(()=>{u(m)})),i.appendChild(p);const E=new t("Example Todo","Description","2024-02-01","High"),h=new t("Example Todo1","Description","2024-02-01","High"),g=new t("Example Todo2","Description","2024-02-01","High"),k=new t("Example Todo3","Description","2024-02-01","High");m.addTask(E),m.addTask(h),m.addTask(g),m.addTask(k),console.log(n)})();