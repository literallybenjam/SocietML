/* jshint browser:true */
/* SocietML by @literallybenjam */
(function(){
    "use strict";
    var a=document.documentElement,
        C,
        c,
        d,
        i,
        F=function(){
            /* jshint validthis:true */
            var C = this;
            if(!C)return;
            C.D.body.textContent="";
            C.I={};
            C.r.setAttribute("hidden","");
            C.c.style.display="block";
            C.c.style.height=C.d.scrollHeight+"px";
        },
        M=function(){
            /* jshint validthis:true */
            var C=this,
                a=true,
                E,
                I,
                i,
                j,
                m,
                n,
                P,
                p;
            if(!C)return;
            C.M=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.m=new MutationObserver(function(){
                /* jshint validthis:true */
                if(M instanceof Array&&this)M.forEach(function(m){
                },this);
            });
            C.M.I=C.m.I=C.I=I={n:[],t:[],b:[]};
            C.D.body.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="currentColor" stroke="none"><defs><path id="societml-msg_left_arrow" d="M 1 0 L 0 1 L 1 2 Z"/><path id="societml-msg_right_arrow" d="M 0 0 L 1 1 L 0 2 Z"/></defs></svg>';
            for(i=0;i<C.r.children.length;i++){
                n=C.r.children.item(i);
                if(n.tagName.toLowerCase()!=="p")continue;
                C.D.body.appendChild(E=C.D.createElement("p"));
                p=E;
                while(p&&(p=p.previousElementSibling)){
                    if(p.tagName.toLowerCase()==="p")break;
                }
                j=n.hasAttribute("data-societml-name")?I.n.indexOf(n.getAttribute("data-societml-name")):I.n.indexOf(p?p.getAttribute("data-societml-name"):undefined);
                if(j===-1){
                    j=I.n.length;
                    I.n.push(n.getAttribute("data-societml-name"));
                    I.t.push(n.getAttribute("data-societml-text"));
                    I.b.push(n.getAttribute("data-societml-bg"));
                }
                E.setAttribute("data-societml-name",I.n[j]);
                m=n.textContent.trim().substr(0,4)==="/me "?true:false;
                if(!p||I.n[j]!==p.getAttribute("data-societml-name")||m){
                    if(p&&p.classList.contains("societml-msg"))p.innerHTML+=a?'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(p.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>':'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(p.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                    if(m){
                        E.className="societml-me";
                        E.title=I.n[j];
                        if(n.hasAttribute("data-societml-datetime"))n.title+=" @ "+n.getAttribute("data-societml-datetime");
                        E.appendChild(C.D.createElement("b")).textContent=I.n[j];
                        E.appendChild(C.D.createTextNode(n.textContent.trim().substr(3)));
                    }
                    else{
                        E.className="societml-intro";
                        E.setAttribute("data-societml-name",I.n[j]);
                        if(I.n[j]!==P)E.textContent=I.n[j];
                    }
                    if(p&&I.n[j]!==p.getAttribute("data-societml-name")){
                        P=p.getAttribute("data-societml-name");
                        a=!a;
                    }
                    if(a)E.classList.add("societml-rt");
                    else E.classList.add("societml-lf");
                    C.D.body.appendChild(E=C.D.createElement("p"));
                }
                E.className="societml-msg";
                E.title=I.n[j];
                if(n.hasAttribute("data-societml-datetime"))n.title+=" @ "+n.getAttribute("data-societml-datetime");
                E.style.color=I.t[j];
                E.style.background=I.b[j];
                E.setAttribute("data-societml-name",I.n[j]);
                if(a)E.classList.add("societml-rt");
                else E.classList.add("societml-lf");
                E.textContent=n.textContent;
            }
            if(C.D.body.lastElementChild&&C.D.body.lastElementChild.classList.contains("societml-msg"))C.D.body.lastElementChild.innerHTML+=a?'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(C.D.body.lastElementChild.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>':'<svg class="societml-arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="'+I.b[I.n.indexOf(C.D.body.lastElementChild.getAttribute("data-societml-name"))]+'" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
            C.D.head.appendChild(C.D.createElement("style")).innerHTML='html{margin:0;padding:0;background:white;font-size:15px;line-height:18px;font-family:Helvetica Neue,Helvetica,sans-serif;font-weight:300;letter-spacing:.03125em;}body{margin:0;padding:15px;}body>svg{display:none;}.societml-me{position:relative;margin:6px auto;padding:0;max-width:475px;font-style:italic;color:#636363;text-align:center;}.societml-msg{position:relative;margin:3px 0;padding:6px;border-radius:3px;max-width:463px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;}.societml-msg.societml-lf{margin:3px auto 3px 6px;}.societml-msg.societml-rt{margin:3px 6px 3px auto;}.societml-arrow{position:absolute;top:0;width:6px;height:100%;}.societml-msg.societml-lf .societml-arrow{left:-6px;}.societml-msg.societml-rt .societml-arrow{right:-6px;}.societml-intro{margin:6px 6px 0;padding:0 6px;max-width:463px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;color:#636363;font-size:9px;font-weight:bold;letter-spacing:.125em;line-height:12px;}.societml-intro.societml-lf{margin:6px auto 0 6px;text-align:left;}.societml-intro.societml-rt{margin:6px 6px 0 auto;text-align:right;}';
            C.r.setAttribute("hidden","");
            C.c.style.display="block";
            C.c.style.height=C.d.scrollHeight+"px";
        },
        R=a.querySelectorAll("*[data-societml-type]"),
        r;
    for(i=0;i<R.length;i++){
        r=R.item(i);
        c=document.createElement("iframe");
        c.id=i<10?"societml-frame_0"+i:"societml-frame_"+i;
        c.setAttribute("style","display:none;margin:auto;border:none;border-radius:3px;padding:0;width:100%;max-width:768px;min-width:320px;max-height:568px;height:1px;");
        r.parentElement.insertBefore(c,r);
        C=c.contentWindow;
        C.c=c;
        C.r=r;
        C.document.open();
        C.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"></head><body></body></html>');
        C.document.close();
        C.D=C.document;
        C.d=C.D.documentElement;
        C.i={fb:F,msg:M}[r.getAttribute("data-societml-type").toLowerCase()];
        if(C.i)C.i();
    }
})();
