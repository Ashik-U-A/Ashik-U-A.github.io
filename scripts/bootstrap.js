function update_progress(progress) {
    document.querySelector("#progress-bar").style.width = progress + "%";
}

function change_preloader_text(text) {
    let para = document.querySelector(".pre-loader p");
    para.style.opacity = 0;
    setTimeout(()=>{
        para.innerHTML = text;
        para.style.opacity = 1;
    }, 400);
}

function bootstrap_libraries() {
    fetch_lib("three.min.js", event => {
        update_progress((event.loaded / event.total) * 100);
    }).then(()=>{
        change_preloader_text("Pre-loader and Libraries tested. This site is under development");
    });
}

function fetch_lib(library_name, progress_event_handler) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "libs/" + library_name);
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    document.body.appendChild((()=>{
                        let library_script_tag = document.createElement("script");
                        library_script_tag.innerHTML = request.responseText;
                        console.log(library_script_tag);
                        return library_script_tag;
                    })());
                    resolve();
                }
                else {
                    reject();
                }
            }
        };
        request.onprogress = progress_event_handler;
        request.send();
    });
}