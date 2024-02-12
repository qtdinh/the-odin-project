(()=>{"use strict";class e{constructor(e){this.name=e,this.tasks=[]}addTask(e){this.tasks.push(e)}removeTask(e){this.tasks=this.tasks.filter((t=>t.name!==e))}getTasks(){return this.tasks}}class t{constructor(e,t,n,s){this.name=e,this.description=t,this.dueDate=n,this.priority=s}}const n=[],s=document.getElementById("add-project"),c=document.getElementById("new-task"),o=document.getElementById("create-task"),r=document.getElementById("create-project"),d=document.querySelector("#projects"),a=document.querySelector(".list-container ol"),i=document.getElementById("details"),l=document.getElementById("task-editor"),u=document.getElementById("project-editor"),m=document.querySelector(".close-task-modal"),p=document.querySelector(".close-project-modal");function h(e){a.innerHTML="",e.getTasks().forEach((t=>{const n=document.createElement("li");n.innerText=t.name;const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","w-6 h-6 text-gray-800 remove-task dark:text-white"),s.setAttribute("aria-hidden","true"),s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("fill","none"),s.setAttribute("viewBox","0 0 24 24");const c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttribute("stroke","currentColor"),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round"),c.setAttribute("stroke-width","2"),c.setAttribute("d","M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"),s.appendChild(c),n.appendChild(s),n.querySelector(".remove-task").addEventListener("click",(s=>{s.stopPropagation(),e.removeTask(t.name),n.remove()})),n.addEventListener("click",(()=>{!function(e,t){const n=document.createElement("h2"),s=document.createElement("button"),c=document.querySelector(".details-inner");s.innerText="×",s.classList.add("close-modal"),c.innerHTML="",n.innerText=`${t.name}`,c.appendChild(s),c.appendChild(n),s.addEventListener("click",(()=>{i.classList.remove("open")}));const o=document.createElement("p");o.setAttribute("id",`${e}`),o.innerHTML=`<strong>Project: </strong> ${e}`,c.appendChild(o);const r=Object.entries(t);for(let e=1;e<r.length;e++){const[t,n]=r[e],s=t.replace(/([A-Z])/g," $1").replace(/^./,(e=>e.toUpperCase())),o=document.createElement("p");o.setAttribute("id",`${s}`),o.innerHTML=`<strong>${s}: </strong> ${n}`,c.appendChild(o)}}(e.name,t),i.classList.add("open")})),a.appendChild(n)}))}m.addEventListener("click",(e=>{e.preventDefault(),l.classList.remove("open")})),p.addEventListener("click",(e=>{e.preventDefault(),u.classList.remove("open")})),s.addEventListener("click",(()=>{u.classList.add("open")})),c.addEventListener("click",(()=>{l.classList.add("open")})),o.addEventListener("click",(e=>{!function(){const e=document.getElementById("task-name").value,s=document.getElementById("task-desc").value,c=document.getElementById("due-date").value,o=document.querySelector("input[name='priority']:checked").value,r=document.querySelector(".selected"),d=document.getElementsByName("task")[0];let a=v;r&&(a=n[r.getAttribute("project-id")]);const i=new t(e,s,c,o);a.addTask(i),r&&h(a),d.reset()}(),e.preventDefault(),l.classList.remove("open")})),r.addEventListener("click",(t=>{!function(){const t=document.createElement("div"),s=document.querySelector("#project-name").value,c=document.createElement("span"),o=document.getElementsByName("project")[0];t.classList.add("project-wrapper"),c.innerText="-",c.setAttribute("id","remove-project"),c.addEventListener("click",(()=>{!function(){const e=document.querySelector(".selected").getAttribute("project-id");document.querySelector(".selected").parentNode.remove(),n.splice(e,1),console.log(n)}()}));const r=new e(s),a=document.createElement("li");a.innerText=s,a.setAttribute("project-id",n.length),a.addEventListener("click",(()=>{const e=document.querySelector(".selected");e&&e.classList.remove("selected"),h(r),a.classList.add("selected")})),t.appendChild(a),t.appendChild(c),d.appendChild(t),n.push(r),o.reset()}(),t.preventDefault(),u.classList.remove("open")}));const v=new e("Default"),k=document.createElement("li");k.innerText="Default",k.setAttribute("project-id",n.length),n.push(v),k.addEventListener("click",(()=>{const e=document.querySelector(".selected");e&&e.classList.remove("selected"),h(v),k.classList.add("selected")})),d.appendChild(k);const E=new t("Example Todo","Description","2024-02-01","High"),g=new t("Example Todo1","Description","2024-02-02","High"),L=new t("Example Todo2","Description","2024-02-03","High"),y=new t("Example Todo3","Description","2024-02-04","High");v.addTask(E),v.addTask(g),v.addTask(L),v.addTask(y),console.log(n)})();