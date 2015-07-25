/* jslint asi:true, browser:true */

var SocietML = {
    getStyleElement: undefined,
    parse: undefined
};

SocietML.parse = function(e) {

    if (!e) e = document.documentElement;
    else if (e instanceof Document) e = e.documentElement;
    else if (!(e instanceof Element)) e = document.documentElement;
    if (!e.dataset) return;

    var i;
    var elements = e.querySelectorAll("*[data-societml-type]");
    var this_element;
    var frame;
    var content;
    var data;

    for (i = 0; i < elements.length; i++) {

        //  Sets up the containing iframe  //
        this_element = elements.item(i);
        frame = document.createElement("iframe");
        if (i < 10) frame.id = frame.id = "societml-frame_0" + i;
        else frame.id = "societml-frame_" + i;
        frame.setAttribute("style", "display: none; margin: 0 auto; border: none; border-radius: 6px; padding: 6px; width: 100%; max-width: 768px; min-width: 320px; max-height: 568px;");
        this_element.parentElement.insertBefore(frame, this_element);
        content = frame.contentWindow.document;
        content.open();
        content.write('<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank"></head><body></body></html>');
        content.close();

        //  Runs code based on iframe type  //
        switch (this_element.dataset.societmlType.toLowerCase()) {

            case "msg":

                //  Creates arrows  //

                content.body.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="currentColor" stroke="none"><defs><path id="societml-msg_left_arrow" d="M 1 0 L 0 1 L 1 2 Z"/><path id="societml-msg_right_arrow" d="M 0 0 L 1 1 L 0 2 Z"/></defs></svg>';

                //  Sets up message data  //
                data = {n: 0, i: 0, j:0, names: [], text: [], bg: [], align: true, current: undefined, previous: undefined, container: content.createElement("blockquote"), msg: undefined};

                //  Loops over each message  //
                for (data.i = 0; data.i < this_element.children.length; data.i++) {

                    //  Only <p> elements are supported in msg frames  //
                    if (this_element.children.item(i).tagName.toLowerCase() !== "p" || !this_element.children.item(data.i).dataset) continue;

                    //  Sets data.n and populates names, text, bg if necessary  //
                    if (this_element.children.item(data.i).dataset.societmlName) data.n = data.names.indexOf(this_element.children.item(data.i).dataset.societmlName);
                    else data.n = data.names.indexOf(data.previous);
                    if (data.n === -1) {
                        data.n = data.names.length;
                        data.names.push(this_element.children.item(data.i).dataset.societmlName);
                        data.text.push(this_element.children.item(data.i).dataset.societmlText);
                        data.bg.push(this_element.children.item(data.i).dataset.societmlBg);
                    }

                    //  Keeps track of the current and previous names; switch alignment  //
                    if (data.names[data.n] !== data.current) {
                        if (data.container.children.length) {
                            if (data.align) data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>';
                            else data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                            data.msg = content.createElement("hr");
                            if (data.names[data.n] === data.previous) data.msg.className = "societml-msg_break_small";
                            else data.msg.className = "societml-msg_break";
                            data.container.appendChild(data.msg);
                        }
                        data.previous = data.current;
                        data.current = data.names[data.n];
                        data.align = !data.align;
                    }

                    //  Creates the message  //
                    data.msg = content.createElement("p");
                    data.msg.className = "societml-msg";
                    data.msg.title = data.names[data.n];
                    if (this_element.children.item(data.i).dataset.societmlDatetime) data.msg.title += " @ " + this_element.children.item(data.i).dataset.societmlDatetime;
                    data.msg.style.color = data.text[data.n];
                    data.msg.style.background = data.bg[data.n];
                    data.msg.dataset.societmlName = data.names[data.n];
                    if (data.align) data.msg.classList.add("societml-align_right");
                    else data.msg.classList.add("societml-align_left");

                    //  Fills the message with content  //
                    for (data.j = 0; data.j < this_element.children.item(data.i).childNodes.length; data.j++) {
                        data.msg.appendChild(content.importNode(this_element.children.item(data.i).childNodes.item(data.j), true));
                    }

                    //  Appends the message to the container  //
                    data.container.appendChild(data.msg);

                }

                //  Adds the arrow to the last message  //
                if (data.container.children.length) {
                    if (data.align) data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_right_arrow"></svg>';
                    else data.container.lastElementChild.innerHTML += '<svg class="societml-msg_arrow" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 2" preserveAspectRatio="xMinYMid" fill="' + data.bg[data.names.indexOf(data.container.lastElementChild.dataset.societmlName)] + '" stroke="none"><use xlink:href="#societml-msg_left_arrow"></svg>';
                    data.container.appendChild(data.msg);
                }

                //  Adds the container and styling info to the frame  //
                content.head.appendChild(content.createElement("style")).innerHTML = 'html,body{margin:0;padding:0;font-size:15px;line-height:18px;font-family:Helvetica Neue,Helvetica,sans-serif;font-weight:300;letter-spacing:.03125em;}body>svg{display:none;}.societml-msg{position:relative;margin:3px 0;padding:6px;border-radius:3px;max-width:475px;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;}.societml-msg.societml-align_left{margin:3px auto 3px 6px;}.societml-msg.societml-align_right{margin:3px 6px 3px auto;}.societml-msg_arrow{position:absolute;top:0;width:6px;height:100%;}.societml-msg.societml-align_left .societml-msg_arrow{left:-6px;}.societml-msg.societml-align_right .societml-msg_arrow{right:-6px;}.societml-msg_break,.societml-msg_break_small{margin:0;border:none;padding:0;height:0;background:transparent;}.societml-msg_break+.societml-msg,.societml-msg_break_small+.societml-msg,.societml-msg:first-child{margin-top:18px;}.societml-msg_break+.societml-msg::before,.societml-msg:first-child::before{position:absolute;top:-12px;left:6px;right:6px;color:#636363;font-size:9px;font-weight:bold;letter-spacing:.125em;line-height:12px;content:attr(data-societml-name);}.societml-msg_break+.societml-msg.societml-align_left::before,.societml-msg.societml-align_left:first-child::before{text-align:left;}.societml-msg_break+.societml-msg.societml-align_right::before,.societml-msg.societml-align_right:first-child::before{text-align:right;}';
                content.body.appendChild(data.container);

                break;

            default:
                continue;

        }

        this_element.parentElement.removeChild(this_element);
        frame.style.display = "block";
        frame.style.height = content.documentElement.scrollHeight + "px";

    }

}
